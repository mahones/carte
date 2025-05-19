import { useState, useCallback, RefObject } from 'react';
import { isColorSupportedByHtml2Canvas } from '../utils/colorUtils';

interface UseImageHandlingProps {
  cardRef: RefObject<HTMLDivElement>;
  bgType: "solid" | "gradient" | "image";
  bgColor: string;
  bgGradient: string;
  bgImage: string | null;
}

export const useImageHandling = ({ cardRef, bgType, bgColor, bgGradient, bgImage }: UseImageHandlingProps) => {
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [bgImageState, setBgImageState] = useState<string | null>(bgImage);

  const handleProfileImg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validation du type de fichier
      if (!file.type.startsWith('image/')) {
        setDownloadError("Le fichier doit être une image");
        return;
      }

      // Validation de la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setDownloadError("L'image ne doit pas dépasser 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => setProfileImg(ev.target?.result as string);
      reader.onerror = () => setDownloadError("Erreur lors de la lecture du fichier");
      reader.readAsDataURL(file);
    }
  }, []);

  const handleBgImg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validation du type de fichier
      if (!file.type.startsWith('image/')) {
        setDownloadError("Le fichier doit être une image");
        return;
      }

      // Validation de la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setDownloadError("L'image ne doit pas dépasser 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => setBgImageState(ev.target?.result as string);
      reader.onerror = () => setDownloadError("Erreur lors de la lecture du fichier");
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;

    // Vérification des couleurs CSS supportées
    let bgToTest = "";
    if (bgType === "solid") {
      bgToTest = bgColor;
    } else if (bgType === "gradient") {
      bgToTest = bgGradient;
    } else if (bgType === "image" && bgImageState) {
      bgToTest = `url(${bgImageState})`;
    }

    if (!isColorSupportedByHtml2Canvas(bgToTest)) {
      setDownloadError("Erreur : Le téléchargement ne supporte pas ce format de couleur ou de dégradé. Utilisez uniquement des couleurs hex, rgb, rgba, hsl ou un linear-gradient classique.");
      return;
    }

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        removeContainer: true,
        foreignObjectRendering: false
      });

      const link = document.createElement("a");
      link.download = "quote-card.png";
      link.href = canvas.toDataURL();
      link.click();
      setDownloadError(null);
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      setDownloadError("Une erreur est survenue lors du téléchargement.");
    }
  }, [cardRef, bgType, bgColor, bgGradient, bgImageState]);

  return {
    profileImg,
    setProfileImg,
    bgImageState,
    setBgImageState,
    downloadError,
    setDownloadError,
    handleProfileImg,
    handleBgImg,
    handleDownload
  };
}; 