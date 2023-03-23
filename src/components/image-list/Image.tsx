import { Image as $Image, AspectRatio } from "@chakra-ui/react";

type ImageProps = {
    src: string;
};

export const Image = ({ src, ...props }: ImageProps) => (
    // <AspectRatio ratio={1} {...props}>
    <$Image
        {...props}
        sx={{ aspectRatio: 1 }}
        src={`data:image/png;base64, ${src}`}
        objectFit="cover"
    />
    // </AspectRatio>
);
