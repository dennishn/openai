import type { ImagesResponse } from "openai";
import { ResponseError } from "@/types/response-error";

export type ImagePromptDTO = {
    openAiApiKey: string;
    object: string;
    artist: string;
    color: string;
    prompt?: string;
};

export type ImagePromptResponse = ImagesResponse & {};

export type ImagePromptResponseError = ResponseError & {};
