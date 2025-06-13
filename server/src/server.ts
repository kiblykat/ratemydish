import express from "express";
import { createServer } from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import dotenv from "dotenv";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { context } from "./graphql/context";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./utils/logger";

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);

// Create GraphQL schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create Apollo Server
const apolloServer = new ApolloServer({
  schema,
  plugins: [
    {
      async serverWillStart() {
        logger.info("Apollo Server starting up!");
      },
    },
  ],
});

// Create WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// Use WebSocket server with GraphQL
useServer({ schema, context }, wsServer);

async function startServer() {
  try {
    // Start Apollo Server
    await apolloServer.start();

    // Apply middleware
    app.use(
      "/graphql",
      cors<cors.CorsRequest>({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
      }),
      express.json(),
      expressMiddleware(apolloServer, {
        context,
      })
    );

    // Apply error handling middleware
    app.use(errorHandler);

    // Start HTTP server
    const port = process.env.PORT || 4000;
    httpServer.listen(port, () => {
      logger.info(`Server running at http://localhost:${port}/graphql`);
    });
  } catch (error) {
    logger.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
