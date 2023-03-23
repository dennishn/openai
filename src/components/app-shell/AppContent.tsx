import { ReactNode } from "react";
import { Center, GridItem } from "@chakra-ui/react";

type AppContentProps = {
    children: ReactNode;
};

export const AppContent = ({ children }: AppContentProps) => (
    <GridItem area="content">
        <Center height="100%" bg="purple.800" p={4}>
            {children}
        </Center>
    </GridItem>
);
