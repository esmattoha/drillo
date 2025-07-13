import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "~/server/models/user.model";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().auth.secret,

  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: "credentials",
      origin: useRuntimeConfig().auth.origin,

      async authorize(credentials: { email: string; password: string }) {
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          return null;
        }

        const isValid = await user.comparePassword(credentials.password);

        if (!isValid) {
          return null;
        }

        return user.toObject();
      },
    }),
  ],
});
