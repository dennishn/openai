import Head from "next/head";
import { ImagePrompt } from "@/components/forms/ImagePrompt";
import { OpenAiApiKey } from "@/components/forms/OpenAiApiKey";
import { ImageList } from "@/components/image-list/ImageList";
import { AppShell } from "@/components/app-shell/AppShell";
import { AppTopBar } from "@/components/app-shell/AppTopBar";
import { AppBottomBar } from "@/components/app-shell/AppBottomBar";
import { AppContent } from "@/components/app-shell/AppContent";
import { useAppStore } from "@/lib/state/app";
import { Box, Center, Flex, Heading, Spinner, VStack, chakra } from "@chakra-ui/react";
import { useImagePromptStore } from "@/lib/state/image-prompt";
import { ReactNode } from "react";

const HighlightedSpan = ({ children }: { children: ReactNode }) => (
    <chakra.span color="purple.200">{children}</chakra.span>
);

export default function Home() {
    const isSubmitting = useAppStore((state) => state.isSubmitting);
    const openApiKey = useImagePromptStore((state) => state.openAiApiKey);
    const { object, artist, color } = useImagePromptStore((state) => state.prompt);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Dall-D</title>
            </Head>
            <AppShell>
                <AppTopBar>
                    <OpenAiApiKey initialOpen={openApiKey.length < 1} />
                </AppTopBar>
                <AppContent>
                    {isSubmitting ? (
                        <Center>
                            <VStack spacing={16}>
                                <Heading size="md" color="purple.500">
                                    a <HighlightedSpan>{object}</HighlightedSpan> in the style of{" "}
                                    <HighlightedSpan>{artist}</HighlightedSpan> with the color{" "}
                                    <HighlightedSpan>{color}</HighlightedSpan> ...
                                </Heading>
                                <Spinner color="purple.300" />
                            </VStack>
                        </Center>
                    ) : (
                        <ImageList />
                    )}
                </AppContent>
                <AppBottomBar>
                    <Flex
                        alignItems="center"
                        height="100%"
                        sx={{
                            transition: "transform 0.3s ease-in-out",
                            transform: `translateY(${openApiKey.length > 0 ? "0" : "120%"})`,
                        }}
                    >
                        <ImagePrompt />
                    </Flex>
                </AppBottomBar>
            </AppShell>
        </>
    );
}
