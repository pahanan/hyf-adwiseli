const { execSync } = require('child_process')
const os = require('os')
const fs = require('fs')

function run(cmd) {
	console.log(`$ ${cmd}`)
	execSync(cmd, { stdio: 'inherit' })
}

console.log('📦 Installing dependencies...')
run('npm install')

console.log('📝 Copying env.example to .env...')
if (!fs.existsSync('.env')) {
	if (os.platform() === 'win32') {
		run('copy env.example .env')
	} else {
		run('cp env.example .env')
	}
} else {
	console.log('.env already exists, skipping copy.')
}

if (os.platform() === 'win32') {
	console.log('🚀 Starting database services (Windows)...')
	run('scripts\\db-start.bat')
	console.log('⏳ Waiting for database to be ready...')
	run('ping -n 15 127.0.0.1 > nul')
	console.log('🏗️ Initializing database schema...')
	run('scripts\\db-init.bat')
	console.log('🌱 Seeding database with data...')
	run(
		'docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/10_data.sql'
	)
} else {
	console.log('🚀 Starting database services (Mac/Linux)...')
	run('./scripts/db-start.sh')
	console.log('⏳ Waiting for database to be ready...')
	run('sleep 15')
	console.log('🏗️ Initializing database schema...')
	run('./scripts/db-init.sh')
	console.log('🌱 Seeding database with data...')
	run(
		'docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/10_data.sql'
	)
}

console.log('✅ Setup complete! You are ready to go!')
