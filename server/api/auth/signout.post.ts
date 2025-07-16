export default defineEventHandler((event) => {
  deleteCookie(event, "session");
  return { message: "Logged out" };
});
