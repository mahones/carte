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
} 