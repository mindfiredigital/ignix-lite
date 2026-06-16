import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const pkgDirs = readdirSync('packages').map(d => join('packages', d));

const versions = {};
for (const dir of pkgDirs) {
  const pkgPath = join(dir, 'package.json');
  if (!existsSync(pkgPath)) continue;
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  versions[pkg.name] = pkg.version;
}

for (const dir of pkgDirs) {
  const pkgPath = join(dir, 'package.json');
  if (!existsSync(pkgPath)) continue;
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  let changed = false;
  for (const depType of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
    if (!pkg[depType]) continue;
    for (const [dep, ver] of Object.entries(pkg[depType])) {
      if (ver.startsWith('workspace:') && versions[dep]) {
        pkg[depType][dep] = versions[dep];
        changed = true;
      }
    }
  }
  if (changed) {
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`Resolved workspace deps in ${pkgPath}`);
  }
}
