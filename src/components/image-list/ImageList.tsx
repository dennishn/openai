import { SimpleGrid } from "@chakra-ui/react";
import { Image } from "@/components/image-list/Image";
import { useAppStore } from "@/lib/state/app";

export const ImageList = () => {
    const images = useAppStore((state) => state.images);

    return (
        <SimpleGrid columns={3} spacing={12}>
            {images.map((image, i) => (
                <Image key={i} src={image} />
            ))}
        </SimpleGrid>
    );
};
