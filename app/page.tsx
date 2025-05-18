"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import SidebarMenu from "./components/SidebarMenu";
import QuoteCard from "./components/QuoteCard";
import { isColorSupportedByHtml2Canvas } from "./utils/colorUtils";

// Composant principal du générateur de carte de citation
export default function QuoteCardGenerator() {
  // États pour les champs de la carte
  const [quote, setQuote] = useState("Education is the most powerful weapon which you can use to change the world.");
  const [author, setAuthor] = useState("Nelson Mandela");
  const [subtitle, setSubtitle] = useState("World-renowned Peace Icon");
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [bgType, setBgType] = useState("gradient"); // 'solid', 'gradient', 'image'
  const [bgColor, setBgColor] = useState("#1e3a8a");
  const [bgGradient, setBgGradient] = useState("linear-gradient(135deg, #1e3a8a 0%, #06b6d4 100%)");
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [fontFamily, setFontFamily] = useState("Roboto, sans-serif");
  const [fontColor, setFontColor] = useState("#fff");
  const [fontWeight, setFontWeight] = useState("bold");
  const [align, setAlign] = useState("center");
  const [showAuthor, setShowAuthor] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const [gradientError, setGradientError] = useState("");
  const [authorColor, setAuthorColor] = useState("#fff");
  const [subtitleColor, setSubtitleColor] = useState("#e0e0e0");
  const [fontSize, setFontSize] = useState("24");
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [lineHeight, setLineHeight] = useState("1.5");
  const [letterSpacing, setLetterSpacing] = useState("0");
  const [authorAlign, setAuthorAlign] = useState("left");
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [gradientColor1, setGradientColor1] = useState("#1e3a8a");
  const [gradientColor2, setGradientColor2] = useState("#06b6d4");
  const [gradientAngle, setGradientAngle] = useState(135);
  // Accordéon states
  const [openCitation, setOpenCitation] = useState(true);
  const [openAuteur, setOpenAuteur] = useState(false);
  const [openFond, setOpenFond] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  // Gestion de l'upload d'image de profil
  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImg(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Gestion de l'upload d'image de fond
  const handleBgImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setBgImage(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Validation du dégradé
  const handleGradientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/oklab|lch|lab/i.test(value)) {
      setGradientError("Ce type de couleur CSS n'est pas supporté pour le téléchargement d'image. Utilisez uniquement des couleurs hex, rgb ou rgba.");
    } else {
      setGradientError("");
      setBgGradient(value);
    }
  };

  // Fonction pour télécharger la carte en image
  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    // Sauvegarder l'état actuel
    const currentBgType = bgType;
    const currentBgColor = bgColor;
    const currentBgGradient = bgGradient;
    const currentBgImage = bgImage;

    // Vérification des couleurs CSS supportées
    let bgToTest = "";
    if (currentBgType === "solid") {
      bgToTest = currentBgColor;
    } else if (currentBgType === "gradient") {
      bgToTest = currentBgGradient;
    } else if (currentBgType === "image" && currentBgImage) {
      bgToTest = currentBgImage;
    }

    if (!isColorSupportedByHtml2Canvas(bgToTest)) {
      setDownloadError("Erreur : Le téléchargement ne supporte pas ce format de couleur ou de dégradé. Utilisez uniquement des couleurs hex, rgb, rgba, hsl ou un linear-gradient classique.");
      return;
    } else {
      setDownloadError("");
    }

    try {
      // Import dynamique pour éviter les erreurs SSR
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
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      setDownloadError("Une erreur est survenue lors du téléchargement.");
    }
  };

  // Style dynamique du fond de la carte
  let cardBg = {};
  if (bgType === "solid") {
    cardBg = { background: bgColor || "#fff" };
  } else if (bgType === "gradient") {
    cardBg = { background: bgGradient };
  } else if (bgType === "image" && bgImage) {
    cardBg = { background: `url(${bgImage}) center/cover` };
  } else {
    cardBg = { background: "#fff" };
  }

  // Gestion du drag and drop pour l'image de profil
  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y
    });
  };

  const handleDrag = (e: React.DragEvent<HTMLImageElement>) => {
    if (isDragging) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Panneau de configuration à gauche */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        <SidebarMenu
          quote={quote}
          setQuote={setQuote}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          fontColor={fontColor}
          setFontColor={setFontColor}
          fontWeight={fontWeight}
          setFontWeight={setFontWeight}
          align={align}
          setAlign={setAlign}
          fontSize={fontSize}
          setFontSize={setFontSize}
          isItalic={isItalic}
          setIsItalic={setIsItalic}
          isUnderline={isUnderline}
          setIsUnderline={setIsUnderline}
          lineHeight={lineHeight}
          setLineHeight={setLineHeight}
          letterSpacing={letterSpacing}
          setLetterSpacing={setLetterSpacing}
          author={author}
          setAuthor={setAuthor}
          authorColor={authorColor}
          setAuthorColor={setAuthorColor}
          subtitle={subtitle}
          setSubtitle={setSubtitle}
          subtitleColor={subtitleColor}
          setSubtitleColor={setSubtitleColor}
          profileImg={profileImg}
          handleProfileImg={handleProfileImg}
          authorAlign={authorAlign}
          setAuthorAlign={setAuthorAlign}
          bgType={bgType}
          setBgType={setBgType}
          bgColor={bgColor}
          setBgColor={setBgColor}
          bgGradient={bgGradient}
          setBgGradient={setBgGradient}
          gradientColor1={gradientColor1}
          setGradientColor1={setGradientColor1}
          gradientColor2={gradientColor2}
          setGradientColor2={setGradientColor2}
          gradientAngle={gradientAngle}
          setGradientAngle={setGradientAngle}
          bgImage={bgImage}
          setBgImage={setBgImage}
          handleBgImg={handleBgImg}
        />

        {/* Aperçu de la carte de citation sticky */}
        <QuoteCard
          quote={quote}
          author={author}
          subtitle={subtitle}
          profileImg={profileImg}
          cardBg={cardBg}
          fontFamily={fontFamily}
          fontColor={fontColor}
          fontWeight={fontWeight}
          align={align}
          fontSize={fontSize}
          isItalic={isItalic}
          isUnderline={isUnderline}
          lineHeight={lineHeight}
          letterSpacing={letterSpacing}
          authorColor={authorColor}
          subtitleColor={subtitleColor}
          authorAlign={authorAlign}
          imagePosition={imagePosition}
          handleDragStart={handleDragStart}
          handleDrag={handleDrag}
          handleDragEnd={handleDragEnd}
          cardRef={cardRef}
          handleDownload={handleDownload}
          downloadError={downloadError}
        />
      </div>
    </div>
  );
}
