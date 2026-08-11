import { useState } from "react";

type Props = {
  src?: string | null;
  alt?: string;
  width: number;
  height: number;
  className?: string;
};

const SafeImage = ({ src, alt = "image", width, height, className }: Props) => {
  const [error, setError] = useState(false);

  // 🔥 fallback global
  const getValidSrc = () => {
    if (!src || src.trim() === "") return "/placeholder.jpg";

    if (src.startsWith("http")) return src;

    return `https://api-acedh.onrender.com${src}`;
  };
  return (
    <img
      src={error ? "/placeholder.jpg" : getValidSrc()}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default SafeImage;
