const { execSync } = require('child_process');
const os = require('os');

function run(cmd) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

if (os.platform() === 'win32') {
  run('scripts\\db-reset.bat');
} else {
  run('./scripts/db-reset.sh');
} 