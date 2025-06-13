import prisma from "../utils/db";
import { hashPassword } from "../utils/password";

async function main() {
  // Create a test user
  const hashedPassword = await hashPassword("password123");
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      username: "testuser",
      password: hashedPassword,
    },
  });

  // Create a test location
  const location = await prisma.location.upsert({
    where: { name: "Test Restaurant" },
    update: {},
    create: {
      name: "Test Restaurant",
      address: "123 Test Street, Test City",
    },
  });

  // Create a test dish
  const dish = await prisma.dish.upsert({
    where: { name: "Test Dish" },
    update: {},
    create: {
      name: "Test Dish",
      description: "A delicious test dish",
      locationId: location.id,
    },
  });

  // Create a test rating
  await prisma.rating.upsert({
    where: {
      id: "test-rating-1",
    },
    update: {},
    create: {
      id: "test-rating-1",
      userId: user.id,
      dishId: dish.id,
      tasteRating: 5,
      portionRating: 4,
      presentationRating: 5,
      notes: "This is a test rating",
    },
  });

  console.log("Database initialized with test data");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
