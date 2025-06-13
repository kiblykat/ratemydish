# RateMyDish Frontend

The frontend application for RateMyDish, built with React, TypeScript, and Apollo Client.

## Features

- Modern, responsive UI with Tailwind CSS and DaisyUI
- Real-time updates with GraphQL subscriptions
- User authentication and authorization
- Dish rating and review system
- Search and filtering functionality
- Location-based dish discovery

## Tech Stack

- React 18
- TypeScript
- Apollo Client
- React Router
- Tailwind CSS
- DaisyUI
- GraphQL

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
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── lib/           # Utility functions and configurations
  ├── types/         # TypeScript type definitions
  ├── App.tsx        # Main application component
  └── main.tsx       # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
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
