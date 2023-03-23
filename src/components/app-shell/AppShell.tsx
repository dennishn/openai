import { ReactNode } from "react";
import { Grid } from "@chakra-ui/react";

type AppShellProps = {
    children: ReactNode;
};

const gridLayout = `
"top"
"content"
"bottom"
`;

export const AppShell = ({ children }: AppShellProps) => (
    <Grid height="100vh" templateRows="64px 1fr 128px" templateAreas={gridLayout}>
        {children}
    </Grid>
);
