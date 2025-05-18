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

// Prépare le style de fond pour le téléchargement
export function prepareBackgroundForDownload(element: HTMLElement): void {
  const computedStyle = window.getComputedStyle(element);
  const backgroundImage = computedStyle.backgroundImage;
  const background = computedStyle.background;

  // Si c'est une image de fond
  if (backgroundImage && backgroundImage !== 'none') {
    // Garde uniquement l'image de fond avec ses propriétés
    element.style.background = 'none';
    element.style.backgroundColor = 'transparent';
    element.style.backgroundImage = backgroundImage;
    element.style.backgroundSize = computedStyle.backgroundSize;
    element.style.backgroundPosition = computedStyle.backgroundPosition;
    element.style.backgroundRepeat = computedStyle.backgroundRepeat;
  }
  // Si c'est un dégradé
  else if (background.includes('linear-gradient')) {
    // Conserve le dégradé tel quel s'il est valide
    if (isValidGradient(background)) {
      element.style.background = background;
    } else {
      // Si le dégradé n'est pas valide, on le convertit
      const gradientMatch = background.match(/linear-gradient\(([^)]+)\)/i);
      if (gradientMatch) {
        const parts = gradientMatch[1].split(',');
        const angle = parts[0].trim();
        const colors = parts.slice(1).map(color => {
          if (color.includes('oklab')) {
            return convertToSupportedColor(color.trim());
          }
          return color.trim();
        });
        element.style.background = `linear-gradient(${angle}, ${colors.join(', ')})`;
      }
    }
  }
  // Si c'est une couleur simple
  else {
    element.style.background = convertToSupportedColor(background);
  }

  // Ne pas appliquer de fond aux éléments enfants
  const children = element.getElementsByTagName('*');
  for (const child of children) {
    const childStyle = window.getComputedStyle(child);
    // Ne conserver que la couleur du texte si nécessaire
    if (!isColorSupportedByHtml2Canvas(childStyle.color)) {
      (child as HTMLElement).style.color = convertToSupportedColor(childStyle.color);
    }
    // Supprimer tout fond des éléments enfants
    (child as HTMLElement).style.background = 'transparent';
    (child as HTMLElement).style.backgroundColor = 'transparent';
  }
} 