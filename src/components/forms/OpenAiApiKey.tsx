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
    HStack,
    IconButton,
    Heading,
} from "@chakra-ui/react";
import { useImagePromptStore } from "@/lib/state/image-prompt";
import { useRef } from "react";
import { SettingsIcon } from "@chakra-ui/icons";

type OpenAiApiKeyProps = {
    initialOpen: boolean;
};

type OpenAiApiKeyForm = Pick<ImagePromptDTO, "openAiApiKey">;

export const OpenAiApiKey = ({ initialOpen = false }: OpenAiApiKeyProps) => {
    const handleSetOpenAiApiKey = useImagePromptStore((state) => state.setOpenAiApiKey);
    const openApiKey = useImagePromptStore((state) => state.openAiApiKey);

    const { isOpen, onOpen, onClose } = useDisclosure({
        defaultIsOpen: initialOpen,
    });

    const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
        useFormik<OpenAiApiKeyForm>({
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
            <HStack align="center" justifyContent="space-between" width="100%">
                <Heading size="md" fontWeight="300" color="purple.300">
                    Dall-D
                </Heading>
                {openApiKey.length > 0 && (
                    <IconButton
                        onClick={onOpen}
                        colorScheme="purple"
                        variant="outline"
                        aria-label="Edit OpenAI API Key"
                        icon={<SettingsIcon />}
                    />
                )}
            </HStack>
            <Modal
                isCentered
                closeOnOverlayClick={false}
                closeOnEsc={false}
                isOpen={isOpen}
                onClose={onClose}
                initialFocusRef={focusRef}
            >
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>Add your OpenAI API Key</ModalHeader>
                        {openApiKey.length > 0 && <ModalCloseButton />}
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
                                    onBlur={handleBlur}
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
                                <Button
                                    type="submit"
                                    colorScheme="purple"
                                    isDisabled={!!errors.openAiApiKey && touched.openAiApiKey}
                                >
                                    Ok
                                </Button>
                                {openApiKey.length > 0 && (
                                    <Button onClick={onClose} colorScheme="purple" variant="ghost">
                                        Cancel
                                    </Button>
                                )}
                            </ButtonGroup>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};
