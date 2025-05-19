"use client";
import React, { useRef, useState } from "react";
import SidebarMenu from "./components/SidebarMenu";
import QuoteCard from "./components/QuoteCard";
import { useImageHandling } from "./hooks/useImageHandling";
import { useCardStyle } from "./hooks/useCardStyle";
import { Alignment, BackgroundType } from "./types";
import ClientOnly from "./components/ClientOnly";

// Composant principal du générateur de carte de citation
export default function QuoteCardGenerator() {
  // États pour les champs de la carte
  const [quote, setQuote] = useState("En tant que développeur web spécialisé dans WordPress, je crée des sites web sur mesure et des solutions en ligne adaptées aux besoins spécifiques de mes clients.");
  const [author, setAuthor] = useState("Mahones SITTI");
  const [subtitle, setSubtitle] = useState("Développeur web");
  const [bgType, setBgType] = useState<BackgroundType>("solid");
  const [bgColor, setBgColor] = useState("#1e3a8a");
  const [bgGradient, setBgGradient] = useState("");
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [fontFamily, setFontFamily] = useState("Roboto");
  const [fontColor, setFontColor] = useState("#ffffff");
  const [fontWeight, setFontWeight] = useState("bold");
  const [align, setAlign] = useState<Alignment>("center");
  const cardRef = useRef<HTMLDivElement>(null);
  const [authorColor, setAuthorColor] = useState("#ffffff");
  const [subtitleColor, setSubtitleColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState("24");
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [lineHeight, setLineHeight] = useState("1.5");
  const [letterSpacing, setLetterSpacing] = useState("0");
  const [authorAlign, setAuthorAlign] = useState<Alignment>("left");
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [gradientColor1, setGradientColor1] = useState("#1e3a8a");
  const [gradientColor2, setGradientColor2] = useState("#06b6d4");
  const [gradientAngle, setGradientAngle] = useState(135);

  // Utilisation des hooks personnalisés
  const {
    profileImg,
    bgImageState,
    downloadError,
    handleProfileImg,
    handleBgImg,
    handleDownload
  } = useImageHandling({
    cardRef: cardRef as React.RefObject<HTMLDivElement>,
    bgType,
    bgColor,
    bgGradient,
    bgImage
  });

  const { cardBg } = useCardStyle({
    bgType,
    bgColor,
    bgGradient,
    bgImage: bgImageState
  });

  // Gestion du drag and drop pour l'image de profil
  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    e.dataTransfer.setData("text/plain", "");
    setIsDragging(true);
    setDragStart({
      x: e.clientX - e.currentTarget.getBoundingClientRect().left,
      y: e.clientY - e.currentTarget.getBoundingClientRect().top
    });
  };

  const handleDrag = (e: React.DragEvent<HTMLImageElement>) => {
    if (e.clientX === 0 && e.clientY === 0) return;
    setImagePosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4" role="main">
      {/* Panneau de configuration à gauche */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        <SidebarMenu
          quote={quote}
          setQuote={setQuote}
          author={author}
          setAuthor={setAuthor}
          subtitle={subtitle}
          setSubtitle={setSubtitle}
          profileImg={profileImg}
          handleProfileImg={handleProfileImg}
          bgType={bgType}
          setBgType={setBgType}
          bgColor={bgColor}
          setBgColor={setBgColor}
          bgGradient={bgGradient}
          setBgGradient={setBgGradient}
          bgImage={bgImageState}
          setBgImage={setBgImage}
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
          authorColor={authorColor}
          setAuthorColor={setAuthorColor}
          subtitleColor={subtitleColor}
          setSubtitleColor={setSubtitleColor}
          authorAlign={authorAlign}
          setAuthorAlign={setAuthorAlign}
          gradientColor1={gradientColor1}
          setGradientColor1={setGradientColor1}
          gradientColor2={gradientColor2}
          setGradientColor2={setGradientColor2}
          gradientAngle={gradientAngle}
          setGradientAngle={setGradientAngle}
          handleBgImg={handleBgImg}
        />
        <ClientOnly>
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
            downloadError={downloadError}
            handleDownload={handleDownload}
          />
        </ClientOnly>
      </div>
    </div>
  );
}
