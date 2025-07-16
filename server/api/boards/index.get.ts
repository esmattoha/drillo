import authMiddleware from "./../../middleware/1.auth";

export default defineEventHandler(async (event) => {
  await authMiddleware(event);

  const user = event.context.user;
  return { message: "Secure content", user };
});
