import { ImagePrompt } from "@/components/forms/ImagePrompt";
import { OpenAiApiKey } from "@/components/forms/OpenAiApiKey";
import { ImageList } from "@/components/image-list/ImageList";
import { AppShell } from "@/components/app-shell/AppShell";
import { AppTopBar } from "@/components/app-shell/AppTopBar";
import { AppBottomBar } from "@/components/app-shell/AppBottomBar";
import { AppContent } from "@/components/app-shell/AppContent";
import { useAppStore } from "@/lib/state/app";
import { Spinner } from "@chakra-ui/react";

export default function Home() {
    const isSubmitting = useAppStore((state) => state.isSubmitting);

    return (
        <AppShell>
            <AppTopBar>
                <OpenAiApiKey />
            </AppTopBar>
            <AppContent>{isSubmitting ? <Spinner color="purple.300" /> : <ImageList />}</AppContent>
            <AppBottomBar>
                <ImagePrompt />
            </AppBottomBar>
        </AppShell>
    );
}
