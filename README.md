# RateMyDish

A Singapore-focused food rating platform that allows users to rate and discover specific dishes at eateries and hawker centers.

## Features

- User authentication and profiles
- Dish ratings with detailed criteria (taste, portion, presentation)
- Location-based search and filtering
- Tag-based categorization (Halal, WiFi, Kids Friendly, etc.)
- Price tracking and portion size information
- User reviews and comments
- Photo uploads for dishes
- Search and filter functionality
- Responsive design for mobile and desktop

## Tech Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- DaisyUI

### Backend

- Node.js
- Express
- TypeScript
- GraphQL

### Database

- Supabase (PostgreSQL)

## Project Structure

```
ratemydish/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── types/        # TypeScript type definitions
│   │   ├── utils/        # Utility functions
│   │   └── graphql/      # GraphQL queries and mutations
│   └── public/           # Static assets
│
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Data models
│   │   ├── resolvers/    # GraphQL resolvers
│   │   ├── types/        # TypeScript type definitions
│   │   └── utils/        # Utility functions
│   └── tests/            # Backend tests
│
└── docs/                 # Documentation
```

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables
4. Start the development servers:

   ```bash
   # Start frontend
   cd client
   npm run dev

   # Start backend
   cd ../server
   npm run dev
   ```

## Database Schema

### Users

- id (UUID)
- email
- username
- password_hash
- created_at
- updated_at

### Dishes

- id (UUID)
- name
- description
- price
- portion_size
- location_id
- created_at
- updated_at

### Ratings

- id (UUID)
- dish_id
- user_id
- taste_rating
- portion_rating
- presentation_rating
- notes
- created_at
- updated_at

### Locations

- id (UUID)
- name
- address
- postal_code
- created_at
- updated_at

### Tags

- id (UUID)
- name
- created_at

### Dish_Tags

- dish_id
- tag_id

## API Endpoints

### GraphQL Queries

- getDish(id: ID!)
- getDishes(filter: DishFilter)
- getUser(id: ID!)
- getLocation(id: ID!)
- searchDishes(query: String!)

### GraphQL Mutations

- createDish(input: CreateDishInput!)
- updateDish(id: ID!, input: UpdateDishInput!)
- createRating(input: CreateRatingInput!)
- updateRating(id: ID!, input: UpdateRatingInput!)
- createUser(input: CreateUserInput!)
- updateUser(id: ID!, input: UpdateUserInput!)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT
