import { useFormik } from "formik";
import { ImagePromptDTO } from "@/types/image-prompt";
import { openAiApiKeySchema } from "@/lib/schemas/open-ai-api-key";
import { useDisclosure } from "@chakra-ui/hooks";
import {
    Button,
    ButtonGroup,
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    HStack,
} from "@chakra-ui/react";
import { useImagePromptStore } from "@/lib/state/image-prompt";
import { useRef } from "react";

type OpenAiApiKeyProps = {};

type OpenAiApiKeyForm = Pick<ImagePromptDTO, "openAiApiKey">;

export const OpenAiApiKey = () => {
    const handleSetOpenAiApiKey = useImagePromptStore((state) => state.setOpenAiApiKey);
    const openApiKey = useImagePromptStore((state) => state.openAiApiKey);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { handleChange, handleSubmit, values, errors, touched } = useFormik<OpenAiApiKeyForm>({
        initialValues: {
            openAiApiKey: openApiKey ?? "",
        },
        validationSchema: openAiApiKeySchema,
        onSubmit: (values) => {
            handleSetOpenAiApiKey(values.openAiApiKey);
            onClose();
        },
    });

    const focusRef = useRef(null);

    return (
        <>
            <HStack justify="end">
                <Button onClick={onOpen} colorScheme="purple" variant="outline">
                    {openApiKey.length > 0 ? "Edit" : "Add"} OpenAI API Key
                </Button>
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={focusRef}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>Add your OpenAI API Key</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl isInvalid={!!errors.openAiApiKey && touched.openAiApiKey}>
                                <FormLabel htmlFor="openAiApiKey">OpenAI API Key</FormLabel>
                                <Input
                                    ref={focusRef}
                                    id="openAiApiKey"
                                    name="openAiApiKey"
                                    variant="filled"
                                    value={values.openAiApiKey}
                                    onChange={handleChange}
                                />
                                {errors.openAiApiKey && touched.openAiApiKey ? (
                                    <FormErrorMessage>
                                        <FormErrorIcon />
                                        {errors.openAiApiKey}
                                    </FormErrorMessage>
                                ) : null}
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <ButtonGroup spacing={8}>
                                <Button type="submit" colorScheme="purple">
                                    Ok
                                </Button>
                                <Button onClick={onClose} colorScheme="purple" variant="ghost">
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};
