import {FC} from "react";
import NextImage, {ImageProps as NextImageProps, ImageLoader} from "next/image";

const loader: ImageLoader = ({src}) => {
  return src;
};

export type ImageProps = Omit<NextImageProps, "loader">;

export const Image: FC<ImageProps> = ({layout = "fill", ...props}) => {
  return <NextImage loader={loader} unoptimized layout={layout} {...props} />;
};

export default Image;
