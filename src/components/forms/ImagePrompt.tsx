import { useFormik } from "formik";
import { Box, FormControl, FormLabel, Input, Button, SimpleGrid, HStack } from "@chakra-ui/react";
import { imagePromptSchema } from "@/lib/schemas/image-prompt";
import { ImagePromptDTO } from "@/types/image-prompt";
import { useAppStore } from "@/lib/state/app";
import { useImagePromptStore } from "@/lib/state/image-prompt";

type ImagePromptForm = Omit<ImagePromptDTO, "openAiApiKey">;

export const ImagePrompt = () => {
    const handleSubmitPrompt = useAppStore((state) => state.submitPrompt);
    const isSubmitting = useAppStore((state) => state.isSubmitting);

    const setUserImagePrompt = useImagePromptStore((state) => state.setUserImagePrompt);

    const openAiApiKey = useImagePromptStore((state) => state.openAiApiKey);

    const { handleChange, handleSubmit, values, errors, touched } = useFormik<ImagePromptForm>({
        initialValues: {
            object: "",
            artist: "",
            color: "",
        },
        validationSchema: imagePromptSchema,
        onSubmit: async (values) => {
            setUserImagePrompt(values);
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
                                color="purple.300"
                                _hover={{ borderColor: "purple.200" }}
                                _focus={{ borderColor: "purple.200" }}
                                value={values.object}
                                isDisabled={isSubmitting}
                                onChange={handleChange}
                            />
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
                                color="purple.300"
                                _hover={{ borderColor: "purple.200" }}
                                _focus={{ borderColor: "purple.200" }}
                                value={values.artist}
                                isDisabled={isSubmitting}
                                onChange={handleChange}
                            />
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
                                color="purple.300"
                                _hover={{ borderColor: "purple.200" }}
                                _focus={{ borderColor: "purple.200" }}
                                value={values.color}
                                isDisabled={isSubmitting}
                                onChange={handleChange}
                            />
                        </Box>
                    </HStack>
                </FormControl>
                <Button
                    ml="auto"
                    type="submit"
                    isLoading={openAiApiKey.length < 1 || isSubmitting}
                    loadingText="Submitting"
                    colorScheme="purple"
                >
                    Generate
                </Button>
            </SimpleGrid>
        </form>
    );
};
