import { useMemo } from 'react';
import { BackgroundType } from '../types';

interface UseCardStyleProps {
  bgType: BackgroundType;
  bgColor: string;
  bgGradient: string;
  bgImage: string | null;
}

export const useCardStyle = ({ bgType, bgColor, bgGradient, bgImage }: UseCardStyleProps) => {
  const cardBg = useMemo(() => ({
    backgroundColor: bgType === "solid" ? bgColor : "#fff",
    backgroundImage: bgType === "gradient" ? bgGradient : bgType === "image" && bgImage ? `url(${bgImage})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }), [bgType, bgColor, bgGradient, bgImage]);

  return { cardBg };
}; 