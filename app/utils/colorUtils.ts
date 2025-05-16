// Vérifie si une couleur ou un dégradé CSS est supporté par html2canvas
export function isColorSupportedByHtml2Canvas(css: string): boolean {
  // html2canvas ne supporte pas oklab, lch, lab, etc.
 if (/oklab|lch|lab/i.test(css)) return false;
  // On accepte hex, rgb, rgba, hsl, linear-gradient classique
  if (
    /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(css) ||
    /^rgb(a)?\(/i.test(css) ||
    /^hsl(a)?\(/i.test(css) ||
    /^linear-gradient\(/i.test(css)
  ) {
    return true;
  }
  // Par défaut, on refuse
  return false; 
 
 /* const validLinearGradient = /^linear-gradient\(([^)]+)\)$/i;
  const validColorFormats = /^(#([0-9a-f]{3}){1,2}|rgb\(([^)]+)\)|rgba\(([^)]+)\)|hsl\(([^)]+)\))$/i;

  if (validColorFormats.test(css)) return true;
  if (validLinearGradient.test(css)) return true;

  return false; 

  const isHex = /^#(?:[0-9a-fA-F]{3}){1,2}$/i;
  const isRGB = /^rgb\((\s*\d+\s*,){2}\s*\d+\s*\)$/i;
  const isRGBA = /^rgba\((\s*\d+\s*,){3}\s*(0|1|0?\.\d+)\s*\)$/i;
  const isHSL = /^hsl\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/i;
  const isGradient = /^linear-gradient\(.+\)$/i;

  return isHex.test(css) || isRGB.test(css) || isRGBA.test(css) || isHSL.test(css) || isGradient.test(css);
  */
} 