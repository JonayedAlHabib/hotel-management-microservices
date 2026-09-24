module.exports = {
  apps: [
    {
      name: "auth-service",
      cwd: "./services/auth-service",
      script: "src/index.js",
      env: { PORT: 4001 },
    },
    {
      name: "booking-service",
      cwd: "./services/booking-service",
      script: "src/index.js",
      env: { PORT: 4002, DATABASE_URL: process.env.BOOKING_DATABASE_URL },
    },
    {
      name: "payment-service",
      cwd: "./services/payment-service",
      script: "src/index.js",
      env: { PORT: 4003, DATABASE_URL: process.env.PAYMENT_DATABASE_URL },
    },
    {
      name: "notification-service",
      cwd: "./services/notification-service",
      script: "src/index.js",
      env: { PORT: 4004, DATABASE_URL: process.env.NOTIFICATION_DATABASE_URL },
    },
    {
      name: "api-gateway",
      cwd: "./services/api-gateway",
      script: "src/index.js",
      env: {
        PORT: process.env.PORT || 4000,
        AUTH_SERVICE_URL: "http://localhost:4001",
        BOOKING_SERVICE_URL: "http://localhost:4002",
        PAYMENT_SERVICE_URL: "http://localhost:4003",
        NOTIFICATION_SERVICE_URL: "http://localhost:4004",
      },
    },
  ],
};
