import { useState } from "react";
import Filters from "../components/post/Filters";
import Heading from "../components/post/Heading";
import PostsTable from "../components/post/PostsTable";
import type { FiltersType, Post } from "../types/types";
import { mockPosts } from "../constants/posts";
import PostModal from "../components/post/PostModal";
import Success from "../components/post/Success";

const PostsPage = () => {
  const [filters, setFilters] = useState<FiltersType>({
    search: "",
    status: "all",
    category: "all",
  });
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleAddPost = (newPost: Post) => {
    setPosts([...posts, { ...newPost, id: Date.now().toString() }]);
    setIsAddModalOpen(false);
  };

  const handleEditPost = (updatedPost: Post) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id));
    setIsSuccessModalOpen(true);
  };

  return (
    <>
      <Heading setIsAddModalOpen={setIsAddModalOpen} />

      {/* Filters */}
      <Filters setFilters={setFilters} />

      {/* Table */}
      <PostsTable
        posts={mockPosts}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
      />

      {/* Add Post Modal */}
      {isAddModalOpen && (
        <PostModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddPost}
          post={null}
        />
      )}

      <Success
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </>
  );
};

export default PostsPage;
