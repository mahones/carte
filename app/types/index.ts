export type BackgroundType = "solid" | "gradient" | "image";
export type Alignment = "left" | "center" | "right";

export interface ImagePosition {
  x: number;
  y: number;
}

export interface QuoteCardProps {
  quote: string;
  author: string;
  subtitle: string;
  profileImg: string | null;
  cardBg: React.CSSProperties;
  fontFamily: string;
  fontColor: string;
  fontWeight: string;
  align: Alignment;
  fontSize: string;
  isItalic: boolean;
  isUnderline: boolean;
  lineHeight: string;
  letterSpacing: string;
  authorColor: string;
  subtitleColor: string;
  authorAlign: Alignment;
  imagePosition: ImagePosition;
  handleDragStart: (e: React.DragEvent<HTMLImageElement>) => void;
  handleDrag: (e: React.DragEvent<HTMLImageElement>) => void;
  handleDragEnd: () => void;
  cardRef: React.RefObject<HTMLDivElement>;
  downloadError: string | null;
  handleDownload: () => void;
}

export interface SidebarMenuProps {
  quote: string;
  setQuote: (value: string) => void;
  author: string;
  setAuthor: (value: string) => void;
  subtitle: string;
  setSubtitle: (value: string) => void;
  profileImg: string | null;
  handleProfileImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bgType: BackgroundType;
  setBgType: (type: BackgroundType) => void;
  bgColor: string;
  setBgColor: (value: string) => void;
  bgGradient: string;
  setBgGradient: (value: string) => void;
  bgImage: string | null;
  setBgImage: (value: string | null) => void;
  fontFamily: string;
  setFontFamily: (value: string) => void;
  fontColor: string;
  setFontColor: (value: string) => void;
  fontWeight: string;
  setFontWeight: (value: string) => void;
  align: Alignment;
  setAlign: (value: Alignment) => void;
  fontSize: string;
  setFontSize: (value: string) => void;
  isItalic: boolean;
  setIsItalic: (value: boolean) => void;
  isUnderline: boolean;
  setIsUnderline: (value: boolean) => void;
  lineHeight: string;
  setLineHeight: (value: string) => void;
  letterSpacing: string;
  setLetterSpacing: (value: string) => void;
  authorColor: string;
  setAuthorColor: (value: string) => void;
  subtitleColor: string;
  setSubtitleColor: (value: string) => void;
  authorAlign: Alignment;
  setAuthorAlign: (value: Alignment) => void;
  gradientColor1: string;
  setGradientColor1: (value: string) => void;
  gradientColor2: string;
  setGradientColor2: (value: string) => void;
  gradientAngle: number;
  setGradientAngle: (value: number) => void;
  handleBgImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
} 