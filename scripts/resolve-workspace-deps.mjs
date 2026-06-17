import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const pkgDirs = readdirSync('packages').map(d => join('packages', d));

const versions = {};
const publishablePackages = new Map();
for (const dir of pkgDirs) {
  const pkgPath = join(dir, 'package.json');
  if (!existsSync(pkgPath)) continue;
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  versions[pkg.name] = pkg.version;
  if (!pkg.private) {
    publishablePackages.set(pkgPath, pkg.name);
  }
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

const unresolved = [];
for (const [pkgPath, pkgName] of publishablePackages) {
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  for (const depType of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
    if (!pkg[depType]) continue;
    for (const [dep, ver] of Object.entries(pkg[depType])) {
      if (typeof ver === 'string' && ver.startsWith('workspace:')) {
        unresolved.push(`${pkgName} -> ${depType}.${dep} (${ver})`);
      }
    }
  }
}

if (unresolved.length > 0) {
  console.error('Unresolved workspace dependencies remain:');
  for (const item of unresolved) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}
