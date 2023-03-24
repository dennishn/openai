import type { NextApiRequest, NextApiResponse } from "next";
import {
    Configuration,
    CreateImageRequestResponseFormatEnum,
    CreateImageRequestSizeEnum,
    OpenAIApi,
} from "openai";
import type { CreateImageRequest } from "openai";
import type {
    ImagePromptDTO,
    ImagePromptResponse,
    ImagePromptResponseError,
} from "@/types/image-prompt";

const imageCompletionDefaultOptions: Partial<CreateImageRequest> = {
    n: 3,
    size: CreateImageRequestSizeEnum._1024x1024,
    response_format: CreateImageRequestResponseFormatEnum.B64Json,
};

export default async function imageApiHandler(
    req: NextApiRequest,
    res: NextApiResponse<ImagePromptResponse | ImagePromptResponseError>
) {
    const { object, artist, color, prompt, openAiApiKey } = req.body as ImagePromptDTO;

    if (!openAiApiKey) {
        return res.status(403).json({ data: "Missing token" });
    }

    const openAiConfiguration = new Configuration({
        apiKey: openAiApiKey,
    });

    const openAiClient = new OpenAIApi(openAiConfiguration);

    const openAiResult = await openAiClient.createImage({
        ...imageCompletionDefaultOptions,
        prompt: prompt ?? `a ${object} in the style of ${artist} with the color ${color}`,
    });

    res.status(200).json(openAiResult.data);
}
