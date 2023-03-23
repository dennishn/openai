import { create } from "zustand";
import { ImagePromptDTO } from "@/types/image-prompt";

type UserImagePrompt = Omit<ImagePromptDTO, "openAiApiKey">;

export interface ImagePromptState {
    openAiApiKey: string;
    prompt: UserImagePrompt;
    setOpenAiApiKey: (openAiApiKey: string) => void;
    setUserImagePrompt: (prompt: UserImagePrompt) => void;
}

export const useImagePromptStore = create<ImagePromptState>()((set) => ({
    openAiApiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY || "",
    prompt: {
        object: "",
        artist: "",
        color: "",
        prompt: "",
    },
    setOpenAiApiKey: (openAiApiKey) => set({ openAiApiKey }),
    setUserImagePrompt: (prompt) => set({ prompt }),
}));
