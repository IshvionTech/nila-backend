nila-backend/
│
├── package.json
├── tsconfig.json
├── .env.example
├── README.md
│
├── src/
│ ├── app.ts
│ ├── server.ts
│ │
│ ├── config/
│ │ ├── env.ts
│ │ └── db.ts
│ │
│ ├── middlewares/
│ │ ├── auth.middleware.ts
│ │ └── error.middleware.ts
│ │
│ ├── modules/
│ │ ├── auth/
│ │ │ ├── auth.routes.ts
│ │ │ ├── auth.controller.ts
│ │ │ ├── auth.service.ts
│ │ │ └── auth.repo.ts
│ │ │
│ │ ├── users/
│ │ ├── experts/
│ │ ├── appointments/
│ │ ├── payments/
│ │ ├── notifications/
│ │
│ ├── utils/
│ │ ├── jwt.ts
│ │ ├── otp.ts
│ │ └── logger.ts
│ │
│ └── types/
│ └── express.d.ts
│
├── db/
│ ├── migrations/
│ │  
│ │
│ └── seeds/
│  
│
├── scripts/
│ └── migrate.ts
│
└── logs/
