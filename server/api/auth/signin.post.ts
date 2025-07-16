import signinSchema from "~/schemas/signin.schema";
import { generateToken } from "../../utils/jwt";
import { User } from "./../..//models/user.model";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const data = signinSchema.parse(body);

  const user = await User.findOne({ email: data.email });
  if (!user || !user?._id) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  const isMatch = await user.comparePassword(data?.password);
  if (!isMatch)
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });

  const token = generateToken({ id: user._id.toString(), email: user.email });

  return { token, user: { id: user._id, email: user.email, name: user.name } };
});
