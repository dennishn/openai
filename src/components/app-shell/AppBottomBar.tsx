import { ReactElement } from "react";
import { Flex, GridItem } from "@chakra-ui/react";

type AppBottomBarProps = {
    children: ReactElement;
};

export const AppBottomBar = ({ children }: AppBottomBarProps) => (
    <GridItem area="bottom" bg="purple.900" px={4} py={2} as={Flex} alignItems="center">
        {children}
    </GridItem>
);
