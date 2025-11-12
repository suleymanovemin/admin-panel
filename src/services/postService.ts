import type { Post, PostData } from "../types/types";

const API_BASE_URL = "/api/posts";

// Mock API functions - gerçek API'ye bağlanırken burayı değiştireceksiniz
export const postService = {
  // Get all posts
  getPosts: async (): Promise<Post[]> => {
    const res = await fetch("/data.json");
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
  },

  // Create new post
  createPost: async (postData: PostData): Promise<Post> => {
    // FormData oluştur
    const formData = new FormData();

    // AZ language data
    formData.append("az_title", postData.AZ.title);
    formData.append("az_slug", postData.AZ.slug);
    formData.append("az_category", postData.AZ.category);
    formData.append("az_content", postData.AZ.htmlContent);
    if (postData.AZ.coverImage) {
      formData.append("cover_image", postData.AZ.coverImage);
    }

    // EN language data
    formData.append("en_title", postData.EN.title);
    formData.append("en_slug", postData.EN.slug);
    formData.append("en_category", postData.EN.category);
    formData.append("en_content", postData.EN.htmlContent);
    if (postData.EN.coverImage) {
      formData.append("en_cover_image", postData.EN.coverImage);
    }

    // Multiple images
    postData.multipleImages.forEach((image, index) => {
      formData.append(`gallery_images`, image);
    });

    // Mock response - gerçek API'de bu kısım değişecek
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
      author: "Current User", // Gerçek API'de auth'dan gelecek
    };

    // Gerçek API çağrısı (şimdilik mock)
    // const res = await fetch(API_BASE_URL, {
    //   method: "POST",
    //   body: formData,
    // });
    // if (!res.ok) throw new Error("Failed to create post");
    // return res.json();

    // Simüle edilmiş delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse;
  },

  // Update existing post
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

    // Mock response
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

    // Gerçek API çağrısı
    // const res = await fetch(`${API_BASE_URL}/${id}`, {
    //   method: "PUT",
    //   body: formData,
    // });
    // if (!res.ok) throw new Error("Failed to update post");
    // return res.json();

    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse;
  },

  // Delete post
  deletePost: async (id: string): Promise<void> => {
    // Gerçek API çağrısı
    // const res = await fetch(`${API_BASE_URL}/${id}`, {
    //   method: "DELETE",
    // });
    // if (!res.ok) throw new Error("Failed to delete post");

    // Mock delay
    await new Promise((resolve) => setTimeout(resolve, 300));
  },

  // Update publish status
  updatePublishStatus: async (
    id: string,
    publishStatus: "Published" | "Draft" | "Scheduled"
  ): Promise<Post> => {
    // Gerçek API çağrısı
    // const res = await fetch(`${API_BASE_URL}/${id}/publish-status`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ publishStatus }),
    // });
    // if (!res.ok) throw new Error("Failed to update publish status");
    // return res.json();

    // Mock response
    await new Promise((resolve) => setTimeout(resolve, 300));
    throw new Error("Not implemented - mock only");
  },
};

