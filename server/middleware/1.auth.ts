import { verifyToken } from "../utils/jwt";

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);

  // ✅ Bypass middleware for public API routes
  const publicPaths = [
    "/api/auth/signin",
    "/api/auth/signup",
    "/api/public",
    "/auth/signin",
    "/auth/signup",
  ];
  if (publicPaths.some((path) => url.pathname.startsWith(path))) return;

  const authHeader = getHeader(event, "authorization");

  console.log(authHeader);

  if (!authHeader?.startsWith("Bearer ")) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authorization header missing",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    event.context.user = decoded;
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid or expired token",
    });
  }
});
