// server/api/auth/users.ts
import type { User } from "~/types/user";

interface MockUser extends User {
  password: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "123456",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "123456",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    password: "123456",
  },
];

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (event.node.req.method === "POST") {
    const user = mockUsers.find(
      (u) => u.email === body.email && u.password === body.password
    );

    if (user) {
      const { password, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token: "mock-jwt-token",
      };
    }

    throw createError({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }

  // Register
  if (event.node.req.method === "PUT") {
    // Verifica se email já existe
    if (mockUsers.some((u) => u.email === body.email)) {
      throw createError({
        statusCode: 400,
        message: "Email already registered",
      });
    }

    // Cria novo usuário
    const newUser = {
      id: mockUsers.length + 1,
      name: body.name,
      email: body.email,
      password: body.password,
    };

    mockUsers.push(newUser);

    const { password, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token: "mock-jwt-token",
    };
  }
});
