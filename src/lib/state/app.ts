import { create } from "zustand";
import { ImagePromptDTO } from "@/types/image-prompt";
import { submitImagePrompt } from "@/lib/fetchers/image-prompt";

export interface AppState {
    isLoading: boolean;
    isSubmitting: boolean;
    images: string[];
    // eslint-disable-next-line no-unused-vars
    setLoading: (isLoading: boolean) => void;
    // eslint-disable-next-line no-unused-vars
    setSubmitting: (isSubmitting: boolean) => void;
    // eslint-disable-next-line no-unused-vars
    setImages: (images: string[]) => void;
    // eslint-disable-next-line no-unused-vars
    submitPrompt: (imagePromptDTO: ImagePromptDTO) => void;
}

export const useAppStore = create<AppState>()((set) => ({
    isLoading: false,
    isSubmitting: false,
    images: [],
    setLoading: (isLoading) => set({ isLoading }),
    setSubmitting: (isSubmitting) => set({ isSubmitting }),
    setImages: (images) => set({ images }),
    submitPrompt: async (imagePromptDTO) => {
        set({ isSubmitting: true });

        const result = await submitImagePrompt(imagePromptDTO);

        set({ images: result.data.map((image) => image.b64_json ?? image.url ?? "") });
        set({ isSubmitting: false });
    },
}));
