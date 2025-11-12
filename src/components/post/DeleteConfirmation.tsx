import React from "react";
import { RxCross2 } from "react-icons/rx";

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

interface DeleteConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  postTitle: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  open,
  onClose,
  onConfirm,
  postTitle,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 6,
        },
      }}
    >
      <div className="p-6! rounded-4xl! text-center">
        <div className="flex justify-end">
          <RxCross2
            onClick={onClose}
            className="text-xl cursor-pointer font-bold"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="size-24 bg-[#FDEEEE] flex items-center justify-center rounded-full">
            <img src="/icons/trash.svg" className="text-[#D82C2C] w-10" />
          </div>
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h1 className=" mt-6 mb-2 font-bold text-2xl">Delete Post</h1>
            Are you sure you want to delete the post -{" "}
            <strong className="font-bold">{postTitle}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="w-full flex justify-between gap-2.5">
            <button
              className="py-3 px-7 text-center border w-full border-[#E5E5E5] text-lg hover:bg-[#E5E5E5] duration-200 rounded-xl cursor-pointer"
              onClick={onClose}
            >
              No
            </button>
            <button
              className="py-3 px-7 text-center border w-full border-[#E5E5E5] text-lg text-white cursor-pointer rounded-xl bg-[#D82C2C] hover:opacity-90 duration-200"
              onClick={onConfirm}
              color="error"
              autoFocus
            >
              Yes
            </button>
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default DeleteConfirmation;
