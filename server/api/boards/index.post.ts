import boardSchema from "~/schemas/board.schema";
import { Board } from "~/server/models/board.model";
import authMiddleware from "./../../middleware/1.auth";

export default defineEventHandler(async (event) => {
  await authMiddleware(event);
  const body = await readBody(event);
  const data = boardSchema.parse(body);

  const user = event.context.user;

  const createdBoard = await Board.create({
    ...data,
    owner: user?._id,
  });

  return createdBoard;
});
