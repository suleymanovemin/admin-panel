import { Dialog } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

import { LANGUAGES } from "../../constants/enums";
import type { LanguageFormValues, PostData, Post, AlertType } from "../../types/types";
import LanguageToggle from "./modal/LanguageToggle";
import { useForm } from "react-hook-form";
import Step1 from "./modal/Step1";
import Step2 from "./modal/Step2";
import { useCreatePost, useUpdatePost } from "../../hooks";

const MAX_IMAGES = 3;

const defaultLanguageValues: LanguageFormValues = {
  title: "",
  slug: "",
  category: "",
  htmlContent: "",
  coverImage: null,
};

const defaultPostData: PostData = {
  AZ: defaultLanguageValues,
  EN: { ...defaultLanguageValues, category: "" },
  multipleImages: [],
};

interface Step1FormValues extends LanguageFormValues { }

const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const PostModal = ({
  open,
  onClose,
  initialData,
  setAlert,
  post,
}: {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<PostData>;
  setAlert: (open: boolean, type?: AlertType) => void;
  post?: Post;
}) => {
  const buildInitial = (): PostData => {
    if (initialData) {
      return { ...defaultPostData, ...initialData };
    }
    if (post) {
      const title = post.title ?? "";
      const slug = slugify(title);
      const category = (post.type as string) ?? "";
      const htmlContent = post.content ?? "";
      const az: LanguageFormValues = {
        title,
        slug,
        category,
        htmlContent,
        coverImage: null,
      };
      const en: LanguageFormValues = {
        title,
        slug,
        category,
        htmlContent,
        coverImage: null,
      };
      return { AZ: az, EN: en, multipleImages: [] };
    }
    return defaultPostData;
  };

  const [postData, setPostData] = useState<PostData>(buildInitial);

  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    () => (post && post.image ? post.image : null)
  );

  const [currentStep, setCurrentStep] = useState(1);

  const [activeLang, setActiveLang] = useState<"AZ" | "EN">(LANGUAGES.AZ);

  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors },
    trigger,
  } = useForm<Step1FormValues>({
    defaultValues: postData[activeLang],
    mode: "onBlur",
  });

  useEffect(() => {
    reset(postData[activeLang]);
  }, [activeLang, reset]);

  const watchedCategory = watch("category");
  const watchedCoverImage = watch("coverImage");

  const watchedMultipleImages = postData.multipleImages;

  const handleCoverImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;

      setValue("coverImage", file, { shouldValidate: true });

      setPostData((prev) => ({
        ...prev,
        AZ: { ...prev.AZ, coverImage: file },
        EN: { ...prev.EN, coverImage: file },
      }));

      if (file) {
        const blobUrl = URL.createObjectURL(file);
        setCoverImagePreview(blobUrl);
      }
    },
    [setValue]
  );

  const handleRemoveCoverImage = useCallback(() => {
    setValue("coverImage", null, { shouldValidate: true });

    setPostData((prev) => ({
      ...prev,
      AZ: { ...prev.AZ, coverImage: null },
      EN: { ...prev.EN, coverImage: null },
    }));

    setCoverImagePreview(null);

    const input = document.getElementById("cover-image") as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }, [setValue]);

  const handleMultipleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files ? Array.from(event.target.files) : [];
      const currentFiles = postData.multipleImages;

      if (currentFiles.length + files.length > MAX_IMAGES) {
        alert(
          `You can select up to ${MAX_IMAGES} files. Please reduce the number of files.`
        );
        return;
      }

      const updatedFiles = [...currentFiles, ...files];
      setPostData((prev) => ({
        ...prev,
        multipleImages: updatedFiles,
      }));

      event.target.value = "";
    },
    [postData.multipleImages]
  );

  const handleRemoveMultipleImage = useCallback(
    (indexToRemove: number) => {
      const updatedFiles = postData.multipleImages.filter(
        (_, index) => index !== indexToRemove
      );
      setPostData((prev) => ({
        ...prev,
        multipleImages: updatedFiles,
      }));
    },
    [postData.multipleImages]
  );

  const handleLanguageSwitch = (newLang: "AZ" | "EN") => {
    const currentValues = getValues();

    setPostData((prev) => ({
      ...prev,
      [activeLang]: currentValues,
    }));

    setActiveLang(newLang);
  };

  const onSubmitStep1 = async (data: Step1FormValues) => {
    const updatedPostData = {
      ...postData,
      [activeLang]: data,
    };
    setPostData(updatedPostData);

    const azData = activeLang === LANGUAGES.AZ ? data : updatedPostData.AZ;

    // treat either uploaded cover image (form field) OR existing preview URL as satisfying cover image requirement
    const isAZFilled =
      !!(
        azData.title &&
        azData.slug &&
        azData.category &&
        azData.htmlContent &&
        (azData.coverImage || coverImagePreview)
      );

    if (activeLang === LANGUAGES.AZ) {
      if (!isAZFilled) {
        await trigger(
          ["title", "slug", "category", "htmlContent", "coverImage"],
          { shouldFocus: true }
        );
        return;
      }
      setCurrentStep(2);
    } else if (activeLang === LANGUAGES.EN) {
      if (!isAZFilled) {
        alert("Please fill the required fields for the AZ (Azerbaijani) language first.");
        handleLanguageSwitch(LANGUAGES.AZ);
        return;
      }

      setCurrentStep(2);
    }
  };

  const onFinalSubmit = handleSubmit(async () => {
    console.log("Final data:", postData);

    try {
      if (post?.id) {
        await updatePostMutation.mutateAsync({
          id: post.id,
          postData,
        });
      } else {
        await createPostMutation.mutateAsync(postData);
      }
      setAlert(true, "SUCCESS");
      onClose();
    } catch (error) {
      console.error("Failed to save post:", error);
      alert("Failed to save post. Please try again.");
    }
  });

  const backToStep1 = () => {
    setCurrentStep(1);
    setActiveLang(LANGUAGES.AZ);
  };

  const totalSteps = 2;
  const headerText =
    currentStep === 1
      ? `Create News / Announcement - ${activeLang}`
      : "Add Additional Media";

  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 6,
        },
      }}
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <div className="p-4">
        <div className="flex justify-end">
          <RxCross2
            onClick={onClose}
            className="text-xl cursor-pointer font-bold"
          />
        </div>

        <div className="p-4">
          {currentStep === 1 && (
            <LanguageToggle
              activeLang={activeLang}
              onSwitch={handleLanguageSwitch}
            />
          )}

          <div className="flex items-center justify-between my-3">
            <h2 className="text-[28px]">{headerText}</h2>
            <h2 className="text-[28px]">
              <span className="text-[#243C7B]">{currentStep}</span>/{totalSteps}
            </h2>
          </div>

          <div className="w-full h-1.5 rounded-3xl bg-[#F3F3F3]">
            <div
              className="h-1.5 rounded-3xl bg-[#243C7B] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {currentStep === 1 && (
            <Step1
              control={control}
              handleSubmit={handleSubmit}
              onSubmitStep1={onSubmitStep1}
              activeLang={activeLang}
              errors={errors}
              watchedCategory={watchedCategory}
              watchedCoverImage={watchedCoverImage}
              handleCoverImageChange={handleCoverImageChange}
              handleRemoveCoverImage={handleRemoveCoverImage}
              coverImagePreview={coverImagePreview}
            />
          )}

          {currentStep === 2 && (
            <Step2
              multipleImages={watchedMultipleImages}
              maxImages={MAX_IMAGES}
              handleMultipleImageChange={handleMultipleImageChange}
              handleRemoveMultipleImage={handleRemoveMultipleImage}
              backToStep1={backToStep1}
              onFinalSubmit={onFinalSubmit}
              isAZFilled={
                !!(
                  postData.AZ.title &&
                  postData.AZ.slug &&
                  postData.AZ.category &&
                  postData.AZ.htmlContent
                )
              }
            />
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default PostModal;
