// Vérifie si une couleur ou un dégradé CSS est supporté par html2canvas
export function isColorSupportedByHtml2Canvas(css: string): boolean {
  // Si c'est une URL d'image, on accepte
  if (css.startsWith('url(')) return true;

  // Vérification des couleurs non supportées
  if (/(oklab|lab|lch|color-mix|color-contrast|color-mix)/i.test(css)) {
    return false;
  }

  // Validation des formats de couleur supportés
  const validFormats = {
    hex: /^#([0-9a-f]{3}|[0-9a-f]{6})$/i,
    rgb: /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i,
    rgba: /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\)$/i,
    hsl: /^hsl\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/i,
    hsla: /^hsla\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*,\s*(0|1|0?\.\d+)\s*\)$/i,
    linearGradient: /^linear-gradient\(\s*\d+deg\s*,\s*(#[0-9a-f]{3}|#[0-9a-f]{6}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\))\s*,\s*(#[0-9a-f]{3}|#[0-9a-f]{6}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\))\s*\)$/i
  };

  // Vérifie si la couleur correspond à l'un des formats supportés
  return Object.values(validFormats).some(format => format.test(css));
}

// Convertit une couleur non supportée en une couleur supportée
export function convertToSupportedColor(color: string): string {
  // Si la couleur est déjà supportée, la retourne telle quelle
  if (isColorSupportedByHtml2Canvas(color)) {
    return color;
  }

  // Si c'est une URL d'image, la retourne telle quelle
  if (color.startsWith('url(')) {
    return color;
  }

  // Par défaut, retourne une couleur de secours
  return '#1e3a8a';
}

// Vérifie si un dégradé est valide
export function isValidGradient(gradient: string): boolean {
  return /^linear-gradient\(\s*\d+deg\s*,\s*(#[0-9a-f]{3}|#[0-9a-f]{6}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\))\s*,\s*(#[0-9a-f]{3}|#[0-9a-f]{6}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\))\s*\)$/i.test(gradient);
} 