import bcrypt from "bcryptjs";
import { Document, Schema, model } from "mongoose";
import { passwordEncription } from "../utils/hash";

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  stripeCustomerId?: string;
  createdAt: Date;
  updatedAt: Date;

  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    stripeCustomerId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await passwordEncription(this.password);
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User = model<UserDocument>("User", userSchema);
