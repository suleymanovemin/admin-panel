import { useState, useEffect } from "react";
import Filters from "../components/post/Filters";
import Heading from "../components/post/Heading";
import PostsTable from "../components/post/PostsTable";
import type { FiltersType, Post, AlertType } from "../types/types";
import PostModal from "../components/post/PostModal";

import { useNews, useDeletePost } from "../hooks";
import Pagination from "../components/post/Pagination";
import AlertModal from "../components/post/AlertModal";
import TableSkeleton from "../components/post/Skeleton";

const PostsPage = () => {
  const { data, isLoading, error } = useNews();
  const deletePostMutation = useDeletePost();

  const [filters, setFilters] = useState<FiltersType>({
    search: "",
    status: "all",
    category: "all",
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<{
    isOpen: boolean;
    type: AlertType;
  }>({
    isOpen: false,
    type: "SUCCESS",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  useEffect(() => {
    if (data) {
      setPosts(data);
      setFilteredPosts(data);
    }
  }, [data]);

  useEffect(() => {
    let result = posts;

    if (filters.search) {
      result = result.filter((post) =>
        post.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.status !== "all") {
      result = result.filter(
        (post) => post.status.toLowerCase() === filters.status.toLowerCase()
      );
    }
    if (filters.category !== "all") {
      result = result.filter(
        (post) => post.type.toLowerCase() === filters.category.toLowerCase()
      );
    }

    setFilteredPosts(result);
    setCurrentPage(1);
  }, [filters, posts]);

  const start = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(start, start + postsPerPage);

  const handleDeletePost = async () => {
    try {
      await deletePostMutation.mutateAsync();
      setIsAlertModalOpen({ isOpen: true, type: "DELETE" });
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Heading
        setIsAddModalOpen={(open: boolean) => {
          if (open) setEditingPost(null);
          setIsAddModalOpen(open);
        }}
      />

      {/* Filters */}
      <Filters setFilters={setFilters} />

      {/* Table */}
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <PostsTable
          setAlert={(open: boolean, type: AlertType = "SUCCESS") =>
            setIsAlertModalOpen({ isOpen: open, type })
          }
          posts={currentPosts}
          onDelete={handleDeletePost}
          onOpenEdit={(post: Post) => {
            setEditingPost(post);
            setIsAddModalOpen(true);
          }}
        />
      )}

      {/*  Pagination */}
      <div className="mt-6">
        <Pagination
          totalPosts={filteredPosts.length}
          postsPerPage={postsPerPage}
          setPostsPerPage={setPostsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Add Post Modal */}
      {isAddModalOpen && (
        <PostModal
          open={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingPost(null);
          }}
          setAlert={(open: boolean, type: AlertType = "SUCCESS") =>
            setIsAlertModalOpen({ isOpen: open, type })
          }
          post={editingPost ?? undefined}
        />
      )}

      <AlertModal
        open={isAlertModalOpen.isOpen}
        onClose={() =>
          setIsAlertModalOpen({ isOpen: false, type: isAlertModalOpen.type })
        }
        type={isAlertModalOpen.type}
      />
    </>
  );
};

export default PostsPage;
