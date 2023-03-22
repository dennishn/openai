import type { NextApiRequest, NextApiResponse } from "next";
import {
    Configuration,
    CreateImageRequestResponseFormatEnum,
    CreateImageRequestSizeEnum,
    OpenAIApi,
} from "openai";
import type { ImagesResponse, CreateImageRequest } from "openai";

const openAiConfiguration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
});

export type ImagePromptRequestBody = {
    openAiApiKey?: string;
    object: string;
    artist: string;
    color: string;
    prompt?: string;
};

export type ImagePromptResponse = ImagesResponse;

export type ImagePromptResponseError = {
    data: string;
};

const openAiClient = new OpenAIApi(openAiConfiguration);

const imageCompletionDefaultOptions: Partial<CreateImageRequest> = {
    n: 10,
    size: CreateImageRequestSizeEnum._1024x1024,
    response_format: CreateImageRequestResponseFormatEnum.B64Json,
};

export default async function imageApiHandler(
    req: NextApiRequest,
    res: NextApiResponse<ImagePromptResponse | ImagePromptResponseError>
) {
    const { object, artist, color, prompt, openAiApiKey } = req.body as ImagePromptRequestBody;

    // if (!openAiApiKey) {
    //     return res.status(403).json({ data: "Missing token" });
    // }

    const openAiResult = await openAiClient.createImage({
        ...imageCompletionDefaultOptions,
        prompt: prompt ?? `a ${object} in the style of ${artist} with the color ${color}`,
    });

    res.status(200).json(openAiResult.data);
}
