import * as Yup from "yup";
import type { ObjectSchema } from "yup";
import type { ImagePromptDTO } from "@/types/image-prompt";

export const openAiApiKeySchema: ObjectSchema<Pick<ImagePromptDTO, "openAiApiKey">> =
    Yup.object().shape({
        openAiApiKey: Yup.string().required("Required"),
    });

export type OpenAiApiKeySchema = Yup.InferType<typeof openAiApiKeySchema>;
