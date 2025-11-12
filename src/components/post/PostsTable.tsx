import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Box,
  Typography,
} from "@mui/material";

import DeleteConfirmation from "./DeleteConfirmation";
import type { Post, PostsTableProps } from "../../types/types";
import Select from "./Select";
import { formatDate, formatTime } from "../../libs";

const PostsTable = ({ posts, onDelete, onOpenEdit }: PostsTableProps) => {
  const [deletePost, setDeletePost] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const handleDeleteClick = (post: Post) => {
    setDeletePost({ id: post.id, title: post.title });
  };

  const handleEditClick = (post: Post) => {
    if (onOpenEdit) onOpenEdit(post);
  };

  const handleDeleteConfirm = () => {
    if (deletePost) {
      onDelete(deletePost.id);
      setDeletePost(null);
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          height: "calc(100vh - 300px)",
          overflowY: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="border border-[#F5F5F5] text-[#243C7B]! font-semibold!">
                Post
              </TableCell>
              <TableCell className="border border-[#F5F5F5] text-[#243C7B]! font-semibold!">
                Type
              </TableCell>
              <TableCell className="border border-[#F5F5F5] text-[#243C7B]! font-semibold!">
                Sharing Time
              </TableCell>
              <TableCell className="border border-[#F5F5F5] text-[#243C7B]! font-semibold!">
                Status
              </TableCell>
              <TableCell className="border border-[#F5F5F5] text-[#243C7B]! font-semibold!">
                Publish Status
              </TableCell>
              <TableCell className="border border-[#F5F5F5] text-[#243C7B]! font-semibold!">
                Author
              </TableCell>
              <TableCell className="border border-[#F5F5F5] text-[#243C7B]! font-semibold!">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      className="w-32! h-24!"
                      src={post.image}
                      variant="rounded"
                    />
                    <Box>
                      <Typography
                        className="font-semibold! text-base!"
                        variant="subtitle2"
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        className="text-[#6A7282]! text-sm! mt-2!"
                        variant="caption"
                        color="textSecondary"
                      >
                        {post.content.substring(0, 50)}...
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <p className="text-[#1447E6] bg-[#C4DEFF] text-center p-1 rounded-4xl text-sm px-2.5">
                    {post.type}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="text-center">
                    <p className="text-base text-[#222222] mb-0.5">
                      {formatDate(post.date)}
                    </p>
                    <span className="text-[#AAAAAA] text-xs">
                      {formatTime(post.date)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-[#145E00] bg-[#E7FFE1] text-center p-2 rounded-4xl text-sm ">
                    {post.status}
                  </p>
                </TableCell>
                <TableCell>
                  <Select
                    options={[
                      {
                        value: "Published",
                        label: "Published",
                        status: true,
                      },
                      {
                        value: "Draft",
                        label: "Draft",
                        status: false,
                      },
                    ]}
                    label="Publish Status"
                    type="withStatus"
                    filterKey="publishStatus"
                    setFilters={() => {}}
                  />
                </TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>
                  <div className="flex">
                    <IconButton
                      onClick={() => handleEditClick(post)}
                      size="small"
                    >
                      <img src="/icons/edit.svg" alt="edit" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(post)}
                      size="small"
                      color="error"
                    >
                      <img src="/icons/trash.svg" alt="delete" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteConfirmation
        open={!!deletePost}
        onClose={() => setDeletePost(null)}
        onConfirm={handleDeleteConfirm}
        postTitle={deletePost?.title || ""}
      />
    </>
  );
};

export default PostsTable;
