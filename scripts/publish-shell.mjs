import { createServiceClient } from '@smapiot/piral-cloud-node';
import { config as loadEnv } from 'dotenv';
import { glob } from 'glob';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inc, maxSatisfying } from 'semver';

loadEnv({ path: join(root, '.env') });

const feed = 'pimon-portal';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicReleaseDir = join(root, 'packages/frontend/portal-shell/dist/public/release');

const feedServiceUrl = process.env.FEED_SERVICE_URL;
const pageApiKey = process.env.PAGE_API_KEY;

const client = createServiceClient({
  apiKey: pageApiKey,
  host: feedServiceUrl,
});

const page = await client.doQueryPages(feed);
const latestVersion = maxSatisfying(
  page.items.map(({ version }) => version),
  '*',
);
const version = latestVersion ? inc(latestVersion, 'patch') : '0.0.1';
const files = await glob('**/*', { cwd: publicReleaseDir, nodir: true });

if (files.length === 0) {
  throw new Error(`No shell artifacts found in ${publicReleaseDir}`);
}

await client.doPublishPage(feed, {
  version,
  type: 'custom',
  embed: 'no',
  files: await Promise.all(files.map(async (path) => [path, new Blob([await readFile(join(publicReleaseDir, path))])])),
});

console.log(`Published ${feed} static page version ${version}.`);
