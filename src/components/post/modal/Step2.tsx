import React from "react";
import { GoX } from "react-icons/go";
import { BsUpload } from "react-icons/bs";

const Step2 = ({
  multipleImages,
  maxImages,
  handleMultipleImageChange,
  handleRemoveMultipleImage,
  backToStep1,
  onFinalSubmit,
  isAZFilled,
}: {
  multipleImages: File[];
  maxImages: number;
  handleMultipleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveMultipleImage: (index: number) => void;
  backToStep1: () => void;
  onFinalSubmit: (e?: React.BaseSyntheticEvent) => void | Promise<void>;
  isAZFilled: boolean;
}) => {
  return (
    <form className="flex flex-col gap-2 my-6" onSubmit={onFinalSubmit}>
      {!isAZFilled && (
        <p className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg">
          Warning: Required fields for the AZ (Azerbaijani) language (title and
          main content) are empty. Please click "Back" to complete the AZ
          content.
        </p>
      )}

      <div>
        <label htmlFor="multiple-images">
          <h3 className="font-semibold">Gallery Images</h3>
          JPG/PNG, multiple allowed (Max {maxImages})
          <div
            className={`border rounded-2xl flex flex-col gap-3 items-center justify-center cursor-pointer py-2 mt-1 h-full min-h-[150px] ${
              multipleImages.length > maxImages
                ? "border-red-500"
                : "border-[#F0F0F0]"
            }`}
          >
            <input
              id="multiple-images"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleMultipleImageChange}
              disabled={multipleImages.length >= maxImages}
            />
            <BsUpload className="text-3xl text-[#243C7B]" />
            <h3>
              {multipleImages.length >= maxImages
                ? `Limit reached (${maxImages} / ${maxImages})`
                : `Upload an image (${multipleImages.length} / ${maxImages})`}
            </h3>
          </div>
        </label>

        {multipleImages.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3">
            {multipleImages.map((file, index) => (
              <div key={index} className="flex items-center justify-center flex-col">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-md">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Additional Image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-sm cursor-pointer text-[#666666] mt-1 border border-[#3DB23F] rounded-2xl px-2 py-1 w-max flex items-center gap-1">
                  {file.name || "Cover image"}
                  <button
                    type="button"
                    onClick={() => handleRemoveMultipleImage(index)}
                    className=" bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition cursor-pointer"
                  >
                    <GoX className="text-sm" />
                  </button>
                </p>
                <p className="text-xs text-[#666666] mt-1 truncate w-24 text-center">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between gap-3 mt-4">
        <button
          type="button"
          onClick={backToStep1}
          className="w-full py-2 text-[#243C7B] border border-[#243C7B] bg-white rounded-xl cursor-pointer hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          type="submit"
          className="w-full py-2 text-white bg-[#243C7B] rounded-xl cursor-pointer hover:bg-[#1f3366] transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Step2;
