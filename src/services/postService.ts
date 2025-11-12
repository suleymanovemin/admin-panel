import type { Post, PostData } from "../types/types";

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    const res = await fetch("/data.json");
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
  },

  createPost: async (postData: PostData): Promise<Post> => {
    const formData = new FormData();

    formData.append("az_title", postData.AZ.title);
    formData.append("az_slug", postData.AZ.slug);
    formData.append("az_category", postData.AZ.category);
    formData.append("az_content", postData.AZ.htmlContent);
    if (postData.AZ.coverImage) {
      formData.append("cover_image", postData.AZ.coverImage);
    }

    formData.append("en_title", postData.EN.title);
    formData.append("en_slug", postData.EN.slug);
    formData.append("en_category", postData.EN.category);
    formData.append("en_content", postData.EN.htmlContent);
    if (postData.EN.coverImage) {
      formData.append("en_cover_image", postData.EN.coverImage);
    }

    postData.multipleImages.forEach((image) => {
      formData.append(`gallery_images`, image);
    });

    const mockResponse: Post = {
      id: Date.now().toString(),
      title: postData.AZ.title || postData.EN.title,
      content: postData.AZ.htmlContent || postData.EN.htmlContent,
      type: postData.AZ.category,
      image: postData.AZ.coverImage
        ? URL.createObjectURL(postData.AZ.coverImage)
        : "",
      date: new Date().toISOString(),
      status: "Active",
      publishStatus: "Draft",
      author: "Current User", 
    };

    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse;
  },

  updatePost: async (id: string, postData: PostData): Promise<Post> => {
    const formData = new FormData();

    formData.append("id", id);
    formData.append("az_title", postData.AZ.title);
    formData.append("az_slug", postData.AZ.slug);
    formData.append("az_category", postData.AZ.category);
    formData.append("az_content", postData.AZ.htmlContent);
    if (postData.AZ.coverImage) {
      formData.append("cover_image", postData.AZ.coverImage);
    }

    formData.append("en_title", postData.EN.title);
    formData.append("en_slug", postData.EN.slug);
    formData.append("en_category", postData.EN.category);
    formData.append("en_content", postData.EN.htmlContent);
    if (postData.EN.coverImage) {
      formData.append("en_cover_image", postData.EN.coverImage);
    }

    postData.multipleImages.forEach((image) => {
      formData.append(`gallery_images`, image);
    });

    const mockResponse: Post = {
      id,
      title: postData.AZ.title || postData.EN.title,
      content: postData.AZ.htmlContent || postData.EN.htmlContent,
      type: postData.AZ.category,
      image: postData.AZ.coverImage
        ? URL.createObjectURL(postData.AZ.coverImage)
        : "",
      date: new Date().toISOString(),
      status: "Active",
      publishStatus: "Draft",
      author: "Current User",
    };

    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse;
  },

  deletePost: async ()  => {
    await new Promise((resolve) => setTimeout(resolve, 300));
  },

  updatePublishStatus: async (
  )=> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    throw new Error("Not implemented - mock only");
  },
};

