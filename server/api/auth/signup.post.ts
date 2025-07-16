import signupSchema from "~/schemas/signup.schema";
import { User } from "./../../models/user.model";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const data = signupSchema.parse(body);

  const exists = await User.findOne({ email: data.email });
  if (exists) {
    throw createError({
      statusCode: 400,
      statusMessage: "User already exists",
    });
  }

  const user = await User.create(data);

  return {
    message: "User created",
    user: { id: user._id, email: user.email, password: user?.password },
  };
});
