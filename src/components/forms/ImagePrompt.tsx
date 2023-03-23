import { useFormik } from "formik";
import {
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    FormErrorIcon,
    Button,
    SimpleGrid,
    HStack,
} from "@chakra-ui/react";
import { imagePromptSchema } from "@/lib/schemas/image-prompt";
import { ImagePromptDTO } from "@/types/image-prompt";
import { useAppStore } from "@/lib/state/app";
import { useImagePromptStore } from "@/lib/state/image-prompt";

type ImagePromptProps = {};

type ImagePromptForm = Omit<ImagePromptDTO, "openAiApiKey">;

export const ImagePrompt = () => {
    const handleSubmitPrompt = useAppStore((state) => state.submitPrompt);
    const isSubmitting = useAppStore((state) => state.isSubmitting);

    const openAiApiKey = useImagePromptStore((state) => state.openAiApiKey);

    const { handleChange, handleSubmit, values, errors, touched } = useFormik<ImagePromptForm>({
        initialValues: {
            object: "",
            artist: "",
            color: "",
        },
        validationSchema: imagePromptSchema,
        onSubmit: async (values) => {
            await handleSubmitPrompt({ ...values, openAiApiKey });
        },
    });

    return (
        <form onSubmit={handleSubmit}>
            <SimpleGrid columns={4} spacing={4}>
                <FormControl isInvalid={!!errors.object && touched.object}>
                    <HStack spacing={4}>
                        <FormLabel htmlFor="object" my={0} color="purple.300">
                            Object
                        </FormLabel>
                        <Box>
                            <Input
                                id="object"
                                name="object"
                                borderColor="purple.300"
                                _hover={{ borderColor: "purple.200" }}
                                _focus={{ borderColor: "purple.200" }}
                                value={values.object}
                                isDisabled={isSubmitting}
                                onChange={handleChange}
                            />
                            {errors.object && touched.object ? (
                                <FormErrorMessage>
                                    <FormErrorIcon />
                                    {errors.object}
                                </FormErrorMessage>
                            ) : null}
                        </Box>
                    </HStack>
                </FormControl>
                <FormControl isInvalid={!!errors.artist && touched.artist}>
                    <HStack spacing={4}>
                        <FormLabel htmlFor="artist" my={0} color="purple.300">
                            Artist
                        </FormLabel>
                        <Box>
                            <Input
                                id="artist"
                                name="artist"
                                borderColor="purple.300"
                                _hover={{ borderColor: "purple.200" }}
                                _focus={{ borderColor: "purple.200" }}
                                value={values.artist}
                                isDisabled={isSubmitting}
                                onChange={handleChange}
                            />
                            {errors.artist && touched.artist ? (
                                <FormErrorMessage>
                                    <FormErrorIcon />
                                    {errors.artist}
                                </FormErrorMessage>
                            ) : null}
                        </Box>
                    </HStack>
                </FormControl>
                <FormControl isInvalid={!!errors.color && touched.color}>
                    <HStack spacing={4}>
                        <FormLabel htmlFor="color" my={0} color="purple.300">
                            Color
                        </FormLabel>
                        <Box>
                            <Input
                                id="color"
                                name="color"
                                borderColor="purple.300"
                                _hover={{ borderColor: "purple.200" }}
                                _focus={{ borderColor: "purple.200" }}
                                color="purple.300"
                                value={values.color}
                                isDisabled={isSubmitting}
                                onChange={handleChange}
                            />
                            {errors.color && touched.color ? (
                                <FormErrorMessage>
                                    <FormErrorIcon />
                                    {errors.color}
                                </FormErrorMessage>
                            ) : null}
                        </Box>
                    </HStack>
                </FormControl>
                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Submitting"
                    colorScheme="purple"
                >
                    Submit
                </Button>
            </SimpleGrid>
        </form>
    );
};
