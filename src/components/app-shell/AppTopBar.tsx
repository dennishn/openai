import { ReactElement } from "react";
import { Flex, GridItem } from "@chakra-ui/react";

type AppTopBarProps = {
    children: ReactElement;
};

export const AppTopBar = ({ children }: AppTopBarProps) => (
    <GridItem area="top" px={4} py={2} bg="purple.900" as={Flex}>
        {children}
    </GridItem>
);
