module.exports = {
  apps: [
    {
      name: "api-gateway",
      cwd: "./api-gateway",
      script: "cmd.exe",
      args: "/c npm run start:dev",
      autorestart: true,
      watch: false
    },
    {
      name: "auth-service",
      cwd: "./auth-service",
      script: "cmd.exe",
      args: "/c npm run start:dev",
      autorestart: true,
      watch: false
    },
    {
      name: "booking-service",
      cwd: "./booking-service",
      script: "cmd.exe",
      args: "/c npm run start:dev",
      autorestart: true,
      watch: false
    },
    {
      name: "inventory-service",
      cwd: "./inventory-service",
      script: "cmd.exe",
      args: "/c npm run start:dev",
      autorestart: true,
      watch: false
    },
    {
      name: "payment-service",
      cwd: "./payment-service",
      script: "cmd.exe",
      args: "/c npm run start:dev",
      autorestart: true,
      watch: false
    },
    {
      name: "property-service",
      cwd: "./property-service",
      script: "cmd.exe",
      args: "run start:dev",
      autorestart: true,
      watch: false
    },
    {
      name: "search-service",
      cwd: "./search-service",
      script: "cmd.exe",
      args: "/c npm run start:dev",
      autorestart: true,
      watch: false
    },
  ],
};
