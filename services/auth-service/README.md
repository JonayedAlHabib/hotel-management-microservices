# auth-service

Owns Guest + Admin accounts, login, and JWT issuing. Maps to PRD UC-G01, UC-G02, UC-G03 (partial), UC-A01.

## Env vars

See `.env.example`. Copy to `.env` and adjust `MONGO_URI` — it should be just the host, **no database name at the end** (`mongodb://localhost:27017` standalone, `mongodb://mongo:27017` via docker-compose). The database name (`src/constant.js` → `DB_NAME`) is appended automatically in `src/db/db.js`.

## Project layout

- `src/index.js` — entry point: loads env, connects to Mongo, starts the HTTP server
- `src/app.js` — Express app: middleware, routes, and the centralized error handler
- `src/db/db.js` — Mongo connection logic
- `src/routes`, `src/controllers`, `src/middleware`, `src/models` — standard layering
- `src/utils/apiError.js` — `ApiError` class; `throw new ApiError(statusCode, message, errors)` anywhere (controller or middleware) and `app.js`'s error handler formats the response
- `src/utils/apiResponse.js` — `ApiResponse` class for consistent success payloads: `{ statusCode, data, message, success }`
- `src/utils/asyncHandler.js` — wraps async route handlers so a rejected promise reaches the error handler instead of hanging the request

## Endpoints

Every response is JSON. Success: `{ success: true, statusCode, data, message }`. Error: `{ success: false, message, errors: [] }`.

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/health` | — | Liveness check |
| POST | `/auth/register` | — | Creates a `GUEST` account only. 409 on duplicate email. |
| POST | `/auth/login` | — | Returns a JWT on valid credentials. |
| GET | `/auth/me` | Bearer token | Returns the current user from the token's `sub` claim. |

## Events

None yet. Will publish `user.registered` once the event bus (Phase 5 of the project roadmap) is wired in.

## Run standalone (without Docker)

```bash
npm install
npm run dev
```

Requires MongoDB reachable at the `MONGO_URI` in `.env` — either `docker compose up -d mongo` from the project root, or a local Mongo install.
