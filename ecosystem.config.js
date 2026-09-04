module.exports = {
  apps: [
    {
      name: "api-gateway",
      cwd: "./api-gateway",
      script: "npm",
      args: "run start:dev",
      interpreter: "none",
      autorestart: true,
      watch: false,
    },

    {
      name: "auth-service",
      cwd: "./auth-service",
      script: "npm",
      args: "run start:dev",
      interpreter: "none",
      autorestart: true,
      watch: false,
    },

    {
      name: "booking-service",
      cwd: "./booking-service",
      script: "npm",
      args: "run start:dev",
      interpreter: "none",
      autorestart: true,
      watch: false,
    },

    {
      name: "inventory-service",
      cwd: "./inventory-service",
      script: "npm",
      args: "run start:dev",
      interpreter: "none",
      autorestart: true,
      watch: false,
    },

    {
      name: "payment-service",
      cwd: "./payment-service",
      script: "npm",
      args: "run start:dev",
      interpreter: "none",
      autorestart: true,
      watch: false,
    },

    {
      name: "property-service",
      cwd: "./property-service",
      script: "npm",
      args: "run start:dev",
      interpreter: "none",
      autorestart: true,
      watch: false,
    },
  ],
};