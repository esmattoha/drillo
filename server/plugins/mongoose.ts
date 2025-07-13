import { connectToDB } from "../utils/mongoose";

export default defineNitroPlugin(async () => {
  await connectToDB();
});
