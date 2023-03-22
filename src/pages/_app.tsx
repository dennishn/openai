import type { AppProps } from "next/app";
import { theme } from "@/styles/theme";
import { Container } from "@chakra-ui/react";
import { ThemeProvider } from "@/styles/ThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Component {...pageProps} />
            </Container>
        </ThemeProvider>
    );
}
