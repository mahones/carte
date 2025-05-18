import React from "react";
import html2canvas from 'html2canvas';
import { isColorSupportedByHtml2Canvas, convertToSupportedColor, prepareBackgroundForDownload } from "../utils/colorUtils";

interface QuoteCardProps {
  quote: string;
  author: string;
  subtitle: string;
  profileImg: string | null;
  cardBg: React.CSSProperties;
  fontFamily: string;
  fontColor: string;
  fontWeight: string;
  align: "left" | "center" | "right";
  fontSize: string;
  isItalic: boolean;
  isUnderline: boolean;
  lineHeight: string;
  letterSpacing: string;
  authorColor: string;
  subtitleColor: string;
  authorAlign: "left" | "center" | "right";
  imagePosition: { x: number; y: number };
  handleDragStart: (e: React.DragEvent<HTMLImageElement>) => void;
  handleDrag: (e: React.DragEvent<HTMLImageElement>) => void;
  handleDragEnd: () => void;
  cardRef: React.RefObject<HTMLDivElement | null>;
  downloadError: string | null;
  handleDownload: () => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  subtitle,
  profileImg,
  cardBg,
  fontFamily,
  fontColor,
  fontWeight,
  align,
  fontSize,
  isItalic,
  isUnderline,
  lineHeight,
  letterSpacing,
  authorColor,
  subtitleColor,
  authorAlign,
  imagePosition,
  handleDragStart,
  handleDrag,
  handleDragEnd,
  cardRef,
  downloadError,
  handleDownload
}) => {
  const processAndDownload = async () => {
    if (!cardRef.current) return;

    try {
      const cardElement = cardRef.current;
      
      // Sauvegarder les styles originaux
      const originalStyles = {
        background: cardElement.style.background,
        backgroundColor: cardElement.style.backgroundColor,
        backgroundImage: cardElement.style.backgroundImage,
        backgroundSize: cardElement.style.backgroundSize,
        backgroundPosition: cardElement.style.backgroundPosition,
        backgroundRepeat: cardElement.style.backgroundRepeat
      };

      // Préparer le fond pour le téléchargement
      prepareBackgroundForDownload(cardElement);
      
      // S'assurer que les polices sont chargées avant la capture
      await document.fonts.ready;

      // Générer l'image avec les options appropriées
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        removeContainer: true,
        foreignObjectRendering: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-card]');
          if (clonedElement) {
            // Préparer le fond du clone
            prepareBackgroundForDownload(clonedElement as HTMLElement);
            
            // Forcer le chargement des polices et appliquer les styles dans le clone
            const textElements = clonedElement.querySelectorAll('*');
            textElements.forEach(element => {
              const computedStyle = window.getComputedStyle(element);
              const fontFamily = computedStyle.fontFamily;
              if (fontFamily && fontFamily !== 'inherit') {
                (element as HTMLElement).style.fontFamily = fontFamily;
              }
              
              // Appliquer les styles de texte
              if (element.classList.contains('quote-text')) {
                (element as HTMLElement).style.fontStyle = isItalic ? 'italic' : 'normal';
                (element as HTMLElement).style.textDecoration = isUnderline ? 'underline' : 'none';
              }
            });
          }
        }
      });

      // Restaurer les styles originaux
      Object.assign(cardElement.style, originalStyles);

      // Créer le lien de téléchargement
      const link = document.createElement("a");
      link.download = "quote-card.png";
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
    }
  };

  return (
    <div className="flex flex-col items-center flex-1">
      <div
        ref={cardRef}
        data-card="true"
        className="sticky top-8 relative w-[540px] h-[540px] rounded-2xl shadow-2xl flex flex-col justify-center items-center p-8"
        style={{
          ...cardBg,
          fontFamily: fontFamily
        }}
      >
        <div
          className="flex-1 flex flex-col justify-center w-full"
        >
          <span
            className="quote-text"
            style={{
              fontFamily: fontFamily,
              color: fontColor,
              fontWeight,
              textAlign: align as 'left' | 'center' | 'right',
              fontSize: `${fontSize}px`,
              fontStyle: isItalic ? 'italic' : 'normal',
              textDecoration: isUnderline ? 'underline' : 'none',
              lineHeight: lineHeight,
              letterSpacing: `${letterSpacing}px`
            }}
          >{quote}</span>
        </div>
        {/* Auteur toujours affiché */}
        <div
          className="flex items-center gap-3 mt-6 w-full"
          style={{ 
            justifyContent: authorAlign === 'left' ? 'flex-start' : authorAlign === 'center' ? 'center' : 'flex-end',
            fontFamily: fontFamily
          }}
        >
          {profileImg && (
            <img
              src={profileImg}
              alt="profile"
              className="w-12 h-12 rounded-full border-2 border-white object-cover cursor-move"
              draggable
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              style={{
                position: 'relative',
                left: `${imagePosition.x}px`,
                top: `${imagePosition.y}px`
              }}
            />
          )}
          <div className="flex flex-col">
            <span 
              className="font-semibold" 
              style={{ 
                fontFamily: fontFamily, 
                color: authorColor 
              }}
            >{author}</span>
            <span 
              className="text-xs opacity-80" 
              style={{ 
                fontFamily: fontFamily, 
                color: subtitleColor 
              }}
            >{subtitle}</span>
          </div>
        </div>
      </div>
      {/* Bouton de téléchargement */}
      <button
        onClick={handleDownload}
        className="btn btn-primary btn-lg mt-5 mb-3 px-8 py-3 bg-primary text-white rounded-[15px] shadow-sm fw-bold fs-5 transition-all duration-200 hover:bg-blue-700 hover:scale-105 hover:shadow-lg"
      >
        Télécharger l&apos;image
      </button>
      {downloadError && (
        <div className="text-danger text-center mt-2">{downloadError}</div>
      )}
    </div>
  );
};

export default QuoteCard; 