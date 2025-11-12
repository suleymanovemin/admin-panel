import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post, PostData } from "../types/types";
import { postService } from "../services/postService";

export const useNews = () => {
  return useQuery<Post[]>({
    queryKey: ["news"],
    queryFn: postService.getPosts,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData: PostData) => postService.createPost(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, postData }: { id: string; postData: PostData }) =>
      postService.updatePost(id, postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postService.deletePost(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
};

export const useUpdatePublishStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postService.updatePublishStatus(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
};