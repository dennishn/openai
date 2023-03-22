import {
    ChakraProvider as BaseChakraProvider,
    ChakraProviderProps as BaseChakraProviderProps,
} from "@chakra-ui/provider";

export interface ChakraProviderProps extends BaseChakraProviderProps {}

export function ThemeProvider({ children, theme, ...restProps }: ChakraProviderProps) {
    return (
        <BaseChakraProvider theme={theme} {...restProps}>
            {children}
        </BaseChakraProvider>
    );
}
