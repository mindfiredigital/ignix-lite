/* eslint-disable no-undef */
// ORIGINALLY FROM CLOUDFLARE WRANGLER:
// https://github.com/cloudflare/wrangler2/blob/main/.github/changeset-version.js

import { execFileSync } from 'child_process';

// This script is used by the `changeset.yml` workflow to update the version of the packages being released.
// The standard step is only to run `changeset version` but this does not update the pnpm-lock.yaml file.
// So we also run `pnpm install`, which does this update.
// This is a workaround until this is handled automatically by `changeset version`.
// See https://github.com/changesets/changesets/issues/421.
console.log('Running changeset version...');
execFileSync('pnpm', ['exec', 'changeset', 'version'], {
  stdio: 'inherit',
});
console.log('Changeset version completed');

console.log('Running pnpm install to update lockfile...');
execFileSync('pnpm', ['install', '--no-frozen-lockfile'], {
  stdio: 'inherit',
});
console.log('pnpm install completed');
