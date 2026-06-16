import { useState } from "react";

interface ProfileImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Renders the profile photo. If the image file is missing (e.g. the user
 * hasn't added it yet), it silently hides instead of showing a broken image.
 */
export default function ProfileImage({ src, alt, className }: ProfileImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
