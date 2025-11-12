import { RxCross2 } from "react-icons/rx";

import { Dialog, DialogContent, DialogActions } from "@mui/material";

interface SuccessProps {
  open: boolean;
  onClose: () => void;
}

const Success = ({ open, onClose }: SuccessProps) => {
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
      <div className="p-4! rounded-4xl! text-center">
        <div className="flex justify-end">
          <RxCross2
            onClick={onClose}
            className="text-xl cursor-pointer font-bold"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="size-24 bg-[#CEFFE1] flex items-center justify-center rounded-full">
            <img
              src="/icons/check_circle.svg"
              className="text-[#D82C2C] w-10"
            />
          </div>
        </div>
        <DialogContent>
          <h1 className=" mt-6 mb-2 font-bold text-2xl">Added Successfully!</h1>
          <p>Your news added successfully</p>
        </DialogContent>
        <DialogActions>
          <div className="w-full flex justify-between gap-2.5">
            <button
              className="py-3 px-7 text-center border w-full border-[#E5E5E5] text-lg text-white cursor-pointer rounded-xl bg-[#243C7B] hover:opacity-90 duration-200"
              onClick={onClose}
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

export default Success;
