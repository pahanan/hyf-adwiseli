# Local Database Setup

This project uses Docker Compose to run PostgreSQL and Redis for local development. Prisma ORM is used for database access and migrations.

## Quick Start

Run this command in the `api` folder (works on Windows, Mac, and Linux):
```bash
npm run setup
```
This will:
- Install dependencies
- Copy `env.example` to `.env`
- Start the database (PostgreSQL on port 5435, Redis on 6379)
- Initialize the schema
- Seed the database with test data

---

## Database Management

You can use the following commands to manage the database (all are cross-platform):

| Command                | Description                       |
|------------------------|-----------------------------------|
| `npm run db:start`     | Start database services           |
| `npm run db:stop`      | Stop database services            |
| `npm run db:reset`     | Reset, re-init, and seed database |
| `npm run db:init`      | Initialize schema only            |
| `npm run db:logs`      | View database logs                |

- The database runs on port **5435** (PostgreSQL) and **6379** (Redis) on your local machine.
- The `.env` file is auto-generated from `env.example` during setup.
- All SQL schema and seed files are in the `sql/` folder.

## Troubleshooting
- If you get authentication errors, make sure your `.env` file matches the credentials in `docker-compose.yml`.
- If you want to change the database port, update both `docker-compose.yml` and `.env`.
- If you have issues with Docker volumes, try running the reset script to clear old data.

## Questions?
If you have any issues, please ask in the project chat or open an issue.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run db:start` | Start PostgreSQL and Redis services |
| `npm run db:stop` | Stop all database services |
| `npm run db:reset` | Reset database and reseed with fresh data |
| `npm run db:seed` | Seed database with mock data |
| `npm run db:logs` | View database logs |
| `npm run db:status` | Check container status |
| `npm run setup` | Complete first-time setup |

## Database Configuration

- **PostgreSQL**: `localhost:5435`
- **Database**: `hyf-adwi`
- **Username**: `root`
- **Password**: `12345`
- **Redis**: `localhost:6379`

## Environment Variables

Copy `env.example` to `.env` and update as needed:

```bash
cp env.example .env
```

## Data

The database comes pre-seeded with:
- 10 Interests (Fashion, Beauty, Technology, etc.)
- 3 Users (John Smith, Sarah Johnson, Michael Brown)
- 3 Influencers (Emma Wilson, Alex Chen, Maria Garcia)
- 3 Brands (TechCorp Solutions, Fashion Forward, Healthy Living Co)
- 3 Campaigns with different configurations
- And much more test data

## Team Notes

- Always use `npm run db:stop` before shutting down your computer
- Use `npm run db:reset` if you need fresh data
- The database data persists between restarts
- All team members should use the same database configuration 