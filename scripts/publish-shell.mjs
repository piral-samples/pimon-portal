import { createServiceClient } from '@smapiot/piral-cloud-node';
import { config as loadEnv } from 'dotenv';
import { glob } from 'glob';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inc, maxSatisfying } from 'semver';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicReleaseDir = join(root, 'packages/frontend/portal-shell/dist/release');
loadEnv({ path: join(root, '.env') });

const feedServiceUrl = process.env.FEED_SERVICE_URL;
const feedName = process.env.FEED_NAME;
const pageApiKey = process.env.PAGE_API_KEY;

const client = createServiceClient({
  apiKey: pageApiKey,
  host: feedServiceUrl,
});

const page = await client.doQueryPages(feedName);
const latestVersion = maxSatisfying(
  page.items.map(({ version }) => version),
  '*',
);
const version = latestVersion ? inc(latestVersion, 'patch') : '0.0.1';
const files = await glob('**/*', { cwd: publicReleaseDir, nodir: true });

if (files.length === 0) {
  throw new Error(`No shell artifacts found in ${publicReleaseDir}`);
}

await client.doPublishPage(feedName, {
  version,
  type: 'custom',
  embed: 'no',
  files: await Promise.all(files.map(async (path) => [path, new Blob([await readFile(join(publicReleaseDir, path))])])),
});

console.log(`Published ${feedName} static page version ${version}.`);
