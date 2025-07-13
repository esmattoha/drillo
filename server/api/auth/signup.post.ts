import signupSchema from "~/schemas/signup.schema";
import { User } from "~/server/models/user.model";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const validatedBody = signupSchema.safeParse(body);

  if (!validatedBody.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation error",
      data: validatedBody.error.flatten(),
    });
  }

  const userDetails = await User.create(validatedBody.data);

  return { ...userDetails, password: undefined };
});
