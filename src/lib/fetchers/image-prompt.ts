import type { ImagePromptSchema } from "@/lib/schemas/image-prompt";
import type { ImagePromptResponse } from "@/types/image-prompt";
import { api } from "@/lib/fetchers/api";

export const submitImagePrompt = async (imagePrompt: ImagePromptSchema) =>
    api.url("/openai/image").post(imagePrompt).json<ImagePromptResponse>();
