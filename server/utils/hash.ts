import bcrypt from "bcryptjs";

export async function passwordEncription(password: string) {
  const salt = await bcrypt.genSalt(10);

  const encryptedPassword = await bcrypt.hash(password, salt);

  return encryptedPassword;
}
