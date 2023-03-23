import { Image as $Image } from "@chakra-ui/react";

type ImageProps = {
    src: string;
};

export const Image = ({ src, ...props }: ImageProps) => (
    <$Image
        {...props}
        sx={{ aspectRatio: 1 }}
        src={`data:image/png;base64, ${src}`}
        objectFit="cover"
        borderRadius="md"
        overflow="hidden"
        alt=""
    />
);
