# aiext backend

FastAPI + SQLAlchemy backend for persisting submitted GitHub repository URLs to PostgreSQL.

## Stack

- FastAPI
- SQLAlchemy 2.x
- Alembic
- PostgreSQL (psycopg)

## Local setup

1. Create a virtual environment and install dependencies.

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Configure environment.

```bash
cp .env.example .env
```

3. Create a PostgreSQL database named `aiext` (or update `DATABASE_URL` in `.env`).

4. Run migrations.

```bash
alembic upgrade head
```

5. Start the API server.

```bash
uvicorn app.main:app --reload --port 8000
```

## API endpoints

- `GET /api/health`
- `POST /api/repos/analyze`

### Analyze request example

```json
{
  "repoUrl": "https://github.com/owner/repo"
}
```

### Analyze response example

```json
{
  "id": "14ebcbe6-6ace-4c10-a2f9-f92e6ef57a31",
  "repoUrl": "https://github.com/owner/repo",
  "connectedAt": "2026-03-20T18:00:00.000000+00:00",
  "repoName": "repo",
  "owner": "owner",
  "status": "connected"
}
```
