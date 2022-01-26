import { Image } from "@animus-ui/components";

export const Avatar = ({ imageSource, imageName }) => {
  return (
    <Image
      width="150px"
      borderRadius="50%"
      border="3px solid var(--color-midnight)"
      src={imageSource}
      alt={imageName}
    />
  )
}