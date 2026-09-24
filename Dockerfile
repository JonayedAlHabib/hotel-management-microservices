FROM node:20-slim


RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

RUN npm install -g pm2

WORKDIR /app


COPY services/auth-service/package*.json services/auth-service/
RUN npm install --omit=dev --prefix services/auth-service

COPY services/booking-service/package*.json services/booking-service/
RUN npm install --prefix services/booking-service

COPY services/payment-service/package*.json services/payment-service/
RUN npm install --prefix services/payment-service

COPY services/notification-service/package*.json services/notification-service/
RUN npm install --prefix services/notification-service

COPY services/api-gateway/package*.json services/api-gateway/
RUN npm install --omit=dev --prefix services/api-gateway

COPY frontend/package*.json frontend/
RUN npm install --prefix frontend

# --- Now the real source ---
COPY services/auth-service services/auth-service
COPY services/booking-service services/booking-service
COPY services/payment-service services/payment-service
COPY services/notification-service services/notification-service
COPY services/api-gateway services/api-gateway
COPY frontend frontend


RUN cd services/booking-service && npx prisma generate
RUN cd services/payment-service && npx prisma generate
RUN cd services/notification-service && npx prisma generate


RUN npm prune --omit=dev --prefix services/booking-service
RUN npm prune --omit=dev --prefix services/payment-service
RUN npm prune --omit=dev --prefix services/notification-service

RUN npm run build --prefix frontend

COPY ecosystem.config.cjs ./

EXPOSE 4000

CMD ["pm2-runtime", "ecosystem.config.cjs"]
