import React from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type SubmitHandler,
  type UseFormHandleSubmit,
} from "react-hook-form";

import { MdLibraryBooks } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { CiImageOn } from "react-icons/ci";
import { GoX } from "react-icons/go";
import { twMerge } from "tailwind-merge";

import { Editor, type EditorTextChangeEvent } from "primereact/editor";
import type { LanguageFormValues } from "../../../types/types";
import { CATEGORIES, LANGUAGES } from "../../../constants/enums";

type Step1FormValues = LanguageFormValues;

const Step1 = ({
  control,
  handleSubmit,
  onSubmitStep1,
  activeLang,
  errors,
  watchedCategory,
  watchedCoverImage,
  handleCoverImageChange,
  handleRemoveCoverImage,
  coverImagePreview,
}: {
  control: Control<Step1FormValues>;
  handleSubmit: UseFormHandleSubmit<Step1FormValues>;
  onSubmitStep1: SubmitHandler<Step1FormValues>;
  activeLang: "AZ" | "EN";
  errors: FieldErrors<Step1FormValues>;
  watchedCategory?: string;
  watchedCoverImage: File | null;
  handleCoverImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveCoverImage: () => void;
  coverImagePreview?: string | null;
}) => {
  return (
    <form
      className="flex flex-col gap-2 my-6"
      onSubmit={handleSubmit(onSubmitStep1)}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Title</label>
        <Controller
          name="title"
          control={control}
          rules={{
            required:
              activeLang === LANGUAGES.AZ
                ? `Title is required for ${activeLang}`
                : false,
          }}
          render={({ field }) => (
            <input
              {...field}
              className={`outline-0 px-3 py-2 shadow-[0_0_10.9px_0_#EBEBEB40] border ${
                errors.title ? "border-red-500" : "border-[#dbdbdb]"
              } rounded-xl`}
              id="title"
              type="text"
              placeholder={`Enter title for ${activeLang}`}
            />
          )}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="Slug">Slug</label>
        <Controller
          name="slug"
          control={control}
          rules={{
            required:
              activeLang === LANGUAGES.AZ
                ? `Slug is required for ${activeLang}`
                : false,
            pattern: {
              value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
              message: "Slug must be lowercase, alphanumeric, and use hyphens",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              className={`outline-0 px-3 py-2 shadow-[0_0_10.9px_0_#EBEBEB40] border ${
                errors.slug ? "border-red-500" : "border-[#dbdbdb]"
              } rounded-xl`}
              id="Slug"
              type="text"
              placeholder={`naa.edu.az/${activeLang.toLowerCase()}/...`}
            />
          )}
        />
        {errors.slug && (
          <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="Category">Category</label>
        <Controller
          name="category"
          control={control}
          rules={{
            required:
              activeLang === LANGUAGES.AZ
                ? "Category selection is required"
                : false,
          }}
          render={({ field }) => (
            <div className="mt-2 flex items-center gap-3">
              <div
                onClick={() => field.onChange(CATEGORIES.NEWS)}
                className={twMerge(
                  "cursor-pointer border px-2 py-1 w-max rounded-2xl flex items-center gap-1 duration-200",
                  watchedCategory === CATEGORIES.NEWS
                    ? "bg-[#1447E6] text-white border-[#1447E6]"
                    : "text-[#1447E6] border-[#1447E6]"
                )}
              >
                <MdLibraryBooks />
                {CATEGORIES.NEWS}
              </div>
              <div
                onClick={() => field.onChange(CATEGORIES.ANNOUNCEMENT)}
                className={twMerge(
                  "cursor-pointer border px-2 py-1 w-max rounded-2xl flex items-center gap-1 duration-200",
                  watchedCategory === CATEGORIES.ANNOUNCEMENT
                    ? "bg-[#1447E6] text-white border-[#1447E6]"
                    : "text-[#1447E6] border-[#1447E6]"
                )}
              >
                <TfiAnnouncement />
                {CATEGORIES.ANNOUNCEMENT}
              </div>
            </div>
          )}
        />
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      {activeLang === LANGUAGES.AZ && (
        <div>
          <label htmlFor="cover-image">
            Cover Image
            <div
              className={`border rounded-2xl flex items-center justify-center gap-2 cursor-pointer py-2 mt-1 ${
                errors.coverImage ? "border-red-500" : "border-[#F0F0F0]"
              }`}
            >
              <input
                id="cover-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverImageChange}
                disabled={!!watchedCoverImage || !!coverImagePreview}
              />
              <CiImageOn />
              <h3>Upload Cover Image</h3>
            </div>
          </label>
          {errors.coverImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.coverImage.message}
            </p>
          )}
          {(watchedCoverImage || coverImagePreview) && (
            <div className="mt-3 w-max">
              <div className="flex flex-col justify-center items-center">
                <div className=" w-32 h-32 rounded-xl overflow-hidden shadow-md">
                  <img
                    src={
                      watchedCoverImage
                        ? URL.createObjectURL(watchedCoverImage)
                        : (coverImagePreview as string)
                    }
                    alt="Cover Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-sm text-[#666666] cursor-pointer mt-1 border border-[#3DB23F] rounded-2xl px-2 py-1 w-max flex items-center gap-1">
                  {watchedCoverImage?.name || "Cover image"}
                  <button
                    type="button"
                    onClick={handleRemoveCoverImage}
                    className=" bg-red-500  cursor-pointer text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition"
                  >
                    <GoX className="text-sm" />
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="border border-[#F7F7F7] rounded-xl p-5">
        <h3 className="text-[#0A0A0A] text-sm">HTML Content</h3>
        <p className="text-[#717182] mt-1 mb-4">
          Use the toolbar to format your text with bold, italic, headers, lists,
          and more.
        </p>
        <div className="card">
          <Controller
            name="htmlContent"
            control={control}
            rules={{
              required:
                activeLang === LANGUAGES.AZ
                  ? `Content is required for ${activeLang}`
                  : false,
            }}
            render={({ field }) => (
              <Editor
                value={field.value}
                onTextChange={(event: EditorTextChangeEvent) =>
                  field.onChange(event.htmlValue || "")
                }
                style={{
                  height: "220px",
                  border: errors.htmlContent
                    ? "1px solid #ef4444"
                    : "1px solid #ccc",
                }}
              />
            )}
          />
        </div>
        {errors.htmlContent && (
          <p className="text-red-500 text-sm mt-1">
            {errors.htmlContent.message}
          </p>
        )}
      </div>

      <div className="flex justify-between gap-3 mt-4">
        <button
          type="submit"
          className="w-full py-2 text-white bg-[#243C7B] rounded-xl cursor-pointer hover:bg-[#1f3366] transition"
        >
          {activeLang === LANGUAGES.AZ
            ? "Next (Step 2)"
            : "Save EN & Next (Step 2)"}
        </button>
      </div>
    </form>
  );
};

export default Step1;
