import React from "react";
import { isColorSupportedByHtml2Canvas, convertToSupportedColor, prepareBackgroundForDownload } from '../utils/colorUtils';
import html2canvas from 'html2canvas';

interface QuoteCardProps {
  quote: string;
  author: string;
  subtitle: string;
  profileImg: string | null;
  cardBg: React.CSSProperties;
  fontFamily: string;
  fontColor: string;
  fontWeight: string;
  align: string;
  fontSize: string;
  isItalic: boolean;
  isUnderline: boolean;
  lineHeight: string;
  letterSpacing: string;
  authorColor: string;
  subtitleColor: string;
  authorAlign: string;
  imagePosition: { x: number; y: number };
  handleDragStart: (e: React.DragEvent<HTMLImageElement>) => void;
  handleDrag: (e: React.DragEvent<HTMLImageElement>) => void;
  handleDragEnd: () => void;
  cardRef: React.RefObject<HTMLDivElement | null>;
  handleDownload: () => void;
  downloadError: string | null;
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
  handleDownload,
  downloadError
}) => {
  const processAndDownload = async () => {
    if (!cardRef.current) return;

    try {
      // Vérifier et convertir les couleurs non supportées
      const cardElement = cardRef.current;
      
      // Sauvegarder le style actuel
      const originalBackground = cardElement.style.background;
      const originalBackgroundColor = cardElement.style.backgroundColor;
      
      // Préparer le fond (image ou dégradé)
      prepareBackgroundForDownload(cardElement);

      // S'assurer que les polices sont chargées avant la capture
      await document.fonts.ready;

      // Générer l'image avec les options appropriées
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: originalBackgroundColor || null,
        logging: false,
        removeContainer: true,
        foreignObjectRendering: false,
        onclone: (clonedDoc) => {
          // Appliquer les styles au clone pour s'assurer qu'ils sont bien pris en compte
          const clonedElement = clonedDoc.querySelector('[data-card]');
          if (clonedElement) {
            // Appliquer le style de fond original au clone
            (clonedElement as HTMLElement).style.background = originalBackground;
            (clonedElement as HTMLElement).style.backgroundColor = originalBackgroundColor;
            
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

      // Restaurer le style original
      cardElement.style.background = originalBackground;
      cardElement.style.backgroundColor = originalBackgroundColor;

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
          fontFamily: `var(--font-${fontFamily.toLowerCase().split(',')[0].trim()}), sans-serif`
        }}
      >
        {/* Guillemets décoratifs */}
        <div 
          className="absolute left-6 top-6 text-5xl text-white/80 select-none" 
          style={{ 
            fontFamily: `var(--font-${fontFamily.toLowerCase().split(',')[0].trim()}), sans-serif` 
          }}
        >"</div>
        <div
          className="flex-1 flex flex-col justify-center w-full"
        >
          <span
            className="quote-text"
            style={{
              fontFamily: `var(--font-${fontFamily.toLowerCase().split(',')[0].trim()}), sans-serif`,
              color: fontColor,
              fontWeight,
              textAlign: align as any,
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
            fontFamily: `var(--font-${fontFamily.toLowerCase().split(',')[0].trim()}), sans-serif`
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
                fontFamily: `var(--font-${fontFamily.toLowerCase().split(',')[0].trim()}), sans-serif`, 
                color: authorColor 
              }}
            >{author}</span>
            <span 
              className="text-xs opacity-80" 
              style={{ 
                fontFamily: `var(--font-${fontFamily.toLowerCase().split(',')[0].trim()}), sans-serif`, 
                color: subtitleColor 
              }}
            >{subtitle}</span>
          </div>
        </div>
        {/* Guillemets décoratifs bas */}
        <div 
          className="absolute right-6 bottom-6 text-5xl text-white/80 select-none" 
          style={{ 
            fontFamily: `var(--font-${fontFamily.toLowerCase().split(',')[0].trim()}), sans-serif` 
          }}
        >"</div>
      </div>
      {/* Bouton de téléchargement */}
      <button
        onClick={processAndDownload}
        className="btn btn-primary btn-lg mt-5 mb-3 px-8 py-3 bg-primary text-white rounded-[15px] shadow-sm fw-bold fs-5 transition-all duration-200 hover:bg-blue-700 hover:scale-105 hover:shadow-lg"
      >
        Télécharger l'image
      </button>
      {downloadError && (
        <div className="text-danger text-center mt-2">{downloadError}</div>
      )}
    </div>
  );
};

export default QuoteCard; 