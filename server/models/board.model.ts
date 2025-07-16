import { Document, Schema, Types, model } from "mongoose";

export interface BoardDocument extends Document {
  name: string;
  description?: string;
  lists: [string];
  owner: string;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;

  comparePassword: (password: string) => Promise<boolean>;
}

const boardSchema = new Schema(
  {
    name: {
      type: String,
      default: "Untitled Board",
    },
    description: {
      type: String,
      default: null,
    },
    lists: [
      {
        type: Types.ObjectId,
        ref: "List",
      },
    ],
    owner: {
      type: Types.ObjectId,
      ref: "User",
    },
    coverImage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Board = model<BoardDocument>("Board", boardSchema);
