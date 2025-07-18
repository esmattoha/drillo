import type { BoardDocument } from "~/server/models/board.model";

export const useUseBoard = () => {
  const board: any = useState("board:data", () => null);
  const loading = useState("board:loading", () => false);
  const toast = useToast();

  const createBoard = async (payload: Partial<BoardDocument>) => {
    loading.value = true;
    try {
      const res = await $fetch("/api/boards", {
        method: "POST",
        body: payload,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
        },
      });
      board.value = res;
      toast.add({
        color: "success",
        title: "Success",
        description: "Board has been created Successfully.",
      });
    } catch (err: any) {
      toast.add({
        color: "error",
        title: "Error",
        description: err?.data?.statusMessage || err.message,
      });
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { createBoard, board };
};
