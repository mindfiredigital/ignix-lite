/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
// ORIGINALLY FROM CLOUDFLARE WRANGLER:
// https://github.com/cloudflare/wrangler2/blob/main/.github/changeset-version.js

import { exec } from 'child_process';

// This script is used by the `changeset.yml` workflow to update the version of the packages being released.
// The standard step is only to run `changeset version` but this does not update the pnpm-lock.yaml file.
// So we also run `pnpm install`, which does this update.
// This is a workaround until this is handled automatically by `changeset version`.
// See https://github.com/changesets/changesets/issues/421.
console.log('Running changeset version...');
exec('npx changeset version', (error, stdout, stderr) => {
  if (error) {
    console.error('Error running changeset version:', error);
    process.exit(1);
  }
  console.log(' Changeset version completed');

  console.log('Running pnpm install to update lockfile...');
  exec('pnpm install --no-frozen-lockfile', (error, stdout, stderr) => {
    if (error) {
      console.error('Error running pnpm install:', error);
      process.exit(1);
    }
    console.log('pnpm install completed');
  });
});