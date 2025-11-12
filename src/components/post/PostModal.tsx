import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import type { Post } from "../../types/types";

interface PostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Post) => void;
  post: Post | null;
}

const PostModal: React.FC<PostModalProps> = ({
  open,
  onClose,
  onSubmit,
  post,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>({
    defaultValues: post || {
      id: "",
      image: "",
      title: "",
      description: "",
      type: "",
      sharingTime: new Date().toISOString(),
      status: "Draft",
      publishStatus: "Draft",
      author: "",
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{post ? "Edit Post" : "Create New Post"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            <Controller
              name="image"
              control={control}
              rules={{ required: "Image URL is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image URL"
                  fullWidth
                  error={!!errors.image}
                  helperText={errors.image?.message}
                />
              )}
            />

            <Controller
              name="type"
              control={control}
              rules={{ required: "Type is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.type}>
                  <InputLabel>Type</InputLabel>
                  <Select {...field} label="Type">
                    <MenuItem value="Article">Article</MenuItem>
                    <MenuItem value="Tutorial">Tutorial</MenuItem>
                    <MenuItem value="Guide">Guide</MenuItem>
                    <MenuItem value="News">News</MenuItem>
                  </Select>
                  {errors.type && (
                    <FormHelperText>{errors.type.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label="Status">
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Published">Published</MenuItem>
                    <MenuItem value="Archived">Archived</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="publishStatus"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Publish Status</InputLabel>
                  <Select {...field} label="Publish Status">
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Scheduled">Scheduled</MenuItem>
                    <MenuItem value="Published">Published</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PostModal;
