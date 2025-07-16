import { verifyToken } from "../../utils/jwt";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "session");
  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    return decoded;
  } catch {
    return null;
  }
});
