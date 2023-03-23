import * as Yup from "yup";
import type { ObjectSchema } from "yup";
import type { ImagePromptDTO } from "@/types/image-prompt";

export const imagePromptSchema: ObjectSchema<Omit<ImagePromptDTO, "openAiApiKey">> =
    Yup.object().shape({
        object: Yup.string().min(1, "Too Short").max(50, "Too Long").required("Required"),
        artist: Yup.string().min(1, "Too Short").max(50, "Too Long").required("Required"),
        color: Yup.string().min(1, "Too Short").max(50, "Too Long").required("Required"),
        prompt: Yup.string().optional(),
    });

export type ImagePromptSchema = Yup.InferType<typeof imagePromptSchema>;
