import { Inter } from "next/font/google";
import { extendBaseTheme } from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";

// TODO - slim down
const { ...allComponents } = chakraTheme.components;

const inter = Inter({ subsets: ["latin"] });

const theme = extendBaseTheme({
    components: allComponents,
    fonts: {
        body: inter.style.fontFamily,
        heading: inter.style.fontFamily,
    },
});

export { theme };
