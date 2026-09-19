# Hotel Management System — Microservices

A learning project: a hotel booking system built as independent microservices instead of one monolith, to understand how services split up work, own their own data, and talk to each other over REST and events.

## Services

| Service | Responsibility | Database |
|---|---|---|
| `api-gateway` | Single public entry point. Verifies JWTs, routes requests to the right service, composes multi-service reads (e.g. the admin dashboard). | — |
| `auth-service` | Guest + Admin accounts, login, roles/permissions, JWT issuing | MongoDB |
| `booking-service` | Room types, rooms, availability, reservations, check-in/out, folio | PostgreSQL |
| `payment-service` | Payments, refunds, gateway integration | PostgreSQL |
| `notification-service` | In-app notifications + email, triggered by events from other services | MongoDB |

Services communicate two ways:
- **Synchronous REST**, through the gateway, for anything the user is actively waiting on (login, create booking, pay).
- **Asynchronous events** over RabbitMQ, for consequences of an action (`booking.created` → `payment.succeeded` → `booking.confirmed` → notification sent).

## Prerequisites

- Node.js (LTS)
- Docker Desktop

## Getting started

```bash
npm install        # installs and links all service dependencies (npm workspaces)
npm run dev         # docker compose up --build — starts Postgres, MongoDB, RabbitMQ and every service
```

RabbitMQ's management UI is available at `http://localhost:15672` (guest/guest) once running — useful for watching events land on queues while developing.

## Project structure

```
services/
  api-gateway/        public entry point
  auth-service/        accounts, login, roles
  booking-service/      rooms, reservations, folio
  payment-service/      payments, refunds
  notification-service/ email + in-app notifications
frontend/              React app (guest + admin UI)
docker-compose.yml      local infrastructure + services
```

Each service is self-contained: its own `package.json`, `.env`, `Dockerfile`, and `README.md` describing its endpoints and the events it publishes/consumes.

## Status

Early scaffolding — services are being built one at a time, starting with `auth-service`.
