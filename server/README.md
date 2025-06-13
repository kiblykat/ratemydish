# RateMyDish Backend

The backend server for RateMyDish, built with Node.js, Express, TypeScript, and Apollo Server.

## Features

- GraphQL API with Apollo Server
- Real-time updates with WebSocket subscriptions
- User authentication with JWT
- PostgreSQL database with Supabase
- TypeScript for type safety
- Environment configuration

## Tech Stack

- Node.js
- Express
- TypeScript
- Apollo Server
- GraphQL
- PostgreSQL (Supabase)
- JWT Authentication

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
  ├── config/        # Configuration files
  ├── graphql/       # GraphQL schema and resolvers
  ├── middleware/    # Express middleware
  ├── models/        # Database models
  ├── services/      # Business logic
  ├── types/         # TypeScript type definitions
  ├── utils/         # Utility functions
  ├── app.ts         # Express application setup
  └── server.ts      # Server entry point
```

## API Documentation

### GraphQL Queries

- `dishes`: Get a list of dishes with optional filtering
- `dish(id: ID!)`: Get a single dish by ID
- `me`: Get the current user's profile

### GraphQL Mutations

- `createUser(input: CreateUserInput!)`: Register a new user
- `login(email: String!, password: String!)`: Authenticate a user
- `createDish(input: CreateDishInput!)`: Add a new dish
- `createRating(input: CreateRatingInput!)`: Submit a dish rating

### GraphQL Subscriptions

- `dishAdded`: Real-time updates when a new dish is added
- `ratingAdded`: Real-time updates when a new rating is submitted

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
