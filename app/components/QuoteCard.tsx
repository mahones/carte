import React from "react";
import { isColorSupportedByHtml2Canvas, convertToSupportedColor } from '../utils/colorUtils';
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
      const computedStyle = window.getComputedStyle(cardElement);
      
      // Vérifier le background
      const bgColor = computedStyle.background;
      if (!isColorSupportedByHtml2Canvas(bgColor)) {
        (cardElement as HTMLElement).style.background = convertToSupportedColor(bgColor);
      }

      // Vérifier la couleur du texte
      const textColor = computedStyle.color;
      if (!isColorSupportedByHtml2Canvas(textColor)) {
        (cardElement as HTMLElement).style.color = convertToSupportedColor(textColor);
      }

      // Vérifier les couleurs des éléments enfants
      const elements = cardElement.getElementsByTagName('*');
      for (const element of elements) {
        const elementStyle = window.getComputedStyle(element);
        const elementColor = elementStyle.color;
        const elementBg = elementStyle.background;

        if (!isColorSupportedByHtml2Canvas(elementColor)) {
          (element as HTMLElement).style.color = convertToSupportedColor(elementColor);
        }
        if (!isColorSupportedByHtml2Canvas(elementBg)) {
          (element as HTMLElement).style.background = convertToSupportedColor(elementBg);
        }
      }

      // Générer l'image
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });

      // Convertir en blob et télécharger
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'quote-card.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');

    } catch (error) {
      console.error('Error generating image:', error);
      alert('Une erreur est survenue lors de la génération de l\'image. Veuillez réessayer.');
    }
  };

  return (
    <div className="flex flex-col items-center flex-1">
      <div
        ref={cardRef}
        className="sticky top-8 relative w-[540px] h-[540px] rounded-2xl shadow-2xl flex flex-col justify-center items-center p-8"
        style={cardBg}
      >
        {/* Guillemets décoratifs */}
        <div className="absolute left-6 top-6 text-5xl text-white/80 select-none">"</div>
        <div
          className="flex-1 flex flex-col justify-center w-full"
          style={{
            fontFamily,
            color: fontColor,
            fontWeight,
            textAlign: align as any,
            fontSize: `${fontSize}px`,
            fontStyle: isItalic ? 'italic' : 'normal',
            textDecoration: isUnderline ? 'underline' : 'none',
            lineHeight: lineHeight,
            letterSpacing: `${letterSpacing}px`
          }}
        >
          <span>{quote}</span>
        </div>
        {/* Auteur toujours affiché */}
        <div
          className="flex items-center gap-3 mt-6 w-full"
          style={{ justifyContent: authorAlign === 'left' ? 'flex-start' : authorAlign === 'center' ? 'center' : 'flex-end' }}
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
            <span className="font-semibold" style={{ fontFamily, color: authorColor }}>{author}</span>
            <span className="text-xs opacity-80" style={{ fontFamily, color: subtitleColor }}>{subtitle}</span>
          </div>
        </div>
        {/* Guillemets décoratifs bas */}
        <div className="absolute right-6 bottom-6 text-5xl text-white/80 select-none">"</div>
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