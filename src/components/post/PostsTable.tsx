import React, { useState } from "react";
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

import PostModal from "./PostModal";
import DeleteConfirmation from "./DeleteConfirmation";
import type { Post, PostsTableProps } from "../../types/types";
import Select from "../common/Select";

const PostsTable: React.FC<PostsTableProps> = ({ posts, onEdit, onDelete }) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleEditClick = (post: Post) => {
    setEditingPost(post);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  const handleModalClose = () => {
    setEditingPost(null);
  };

  const handleSubmit = (data: Post) => {
    onEdit(data);
    setEditingPost(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="border border-[#F5F5F5] text-[#243C7B]!">
                Post
              </TableCell>
              <TableCell className="border border-[#F5F5F5] text-[#243C7B]!">
                Type
              </TableCell>
              <TableCell className="border border-[#F5F5F5] text-[#243C7B]!">
                Sharing Time
              </TableCell>
              <TableCell className="border border-[#F5F5F5] text-[#243C7B]!">
                Status
              </TableCell>
              <TableCell className="border border-[#F5F5F5] text-[#243C7B]!">
                Publish Status
              </TableCell>
              <TableCell className="border border-[#F5F5F5] text-[#243C7B]!">
                Author
              </TableCell>
              <TableCell className="border border-[#F5F5F5] text-[#243C7B]!">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar src={post.image} variant="rounded" />
                    <Box>
                      <Typography variant="subtitle2">{post.title}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {post.description.substring(0, 50)}...
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
                  {new Date(post.sharingTime).toLocaleString()}
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
                      onClick={() => handleDeleteClick(post.id)}
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

      {editingPost && (
        <PostModal
          open={!!editingPost}
          onClose={handleModalClose}
          post={editingPost}
          onSubmit={handleSubmit}
        />
      )}

      <DeleteConfirmation
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default PostsTable;
