import { useFormik } from "formik";
import { imagePromptSchema, ImagePromptSchema } from "@/image-prompt/schema";
import { submitImagePrompt } from "@/image-prompt/fetch";
import {
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    HStack,
    Input,
    FormErrorIcon,
    Button,
} from "@chakra-ui/react";

type ImagePromptProps = {};

export const ImagePrompt = () => {
    const { handleChange, handleSubmit, values, errors, touched, isSubmitting } =
        useFormik<ImagePromptSchema>({
            initialValues: {
                object: "",
                artist: "",
                color: "",
            },
            validationSchema: imagePromptSchema,
            onSubmit: async (values) => {
                const result = await submitImagePrompt(values);
                console.log(result);
            },
        });

    return (
        <Box bg="white" p={8}>
            <form onSubmit={handleSubmit}>
                <HStack spacing={4}>
                    <FormControl isInvalid={!!errors.object && touched.object}>
                        <FormLabel htmlFor="object">Object</FormLabel>
                        <Input
                            id="object"
                            name="object"
                            variant="filled"
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
                    </FormControl>
                    <FormControl isInvalid={!!errors.artist && touched.artist}>
                        <FormLabel htmlFor="artist">artist</FormLabel>
                        <Input
                            id="artist"
                            name="artist"
                            variant="filled"
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
                    </FormControl>
                    <FormControl isInvalid={!!errors.color && touched.color}>
                        <FormLabel htmlFor="color">color</FormLabel>
                        <Input
                            id="color"
                            name="color"
                            variant="filled"
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
                    </FormControl>
                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        loadingText="Submitting"
                        colorScheme="purple"
                    >
                        Submit
                    </Button>
                </HStack>
            </form>
        </Box>
    );
};
