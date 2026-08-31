import { createServiceClient } from '@smapiot/piral-cloud-node';
import { glob } from 'glob';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inc, maxSatisfying } from 'semver';

const client = createServiceClient({
  apiKey: '290d2f81fd4f67bb21d9e35031411c1a5b23ae47c9f12fb105d78c898c1f2c2e',
  host: 'http://localhost:8000',
});

const feed = 'pimon-portal';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicReleaseDir = join(root, 'packages/frontend/portal-shell/dist/public/release');

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
