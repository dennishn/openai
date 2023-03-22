import wretch from "wretch";
import { ImagePromptSchema } from "@/image-prompt/schema";
import { ImagesResponse } from "openai";

export const submitImagePrompt = async (imagePrompt: ImagePromptSchema) =>
    wretch("/api/openai/image").post(imagePrompt).json<ImagesResponse>();
