// Fonction pour vérifier si une couleur est dans un format supporté
export const isColorSupportedByHtml2Canvas = (color: string): boolean => {
  // Ajout : support des images de fond
  if (/^url\(.+\)$/.test(color)) return true;
  
  // Vérifie si c'est une couleur hex
  if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) return true;
  
  // Vérifie si c'est une couleur rgb/rgba
  if (/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/.test(color)) return true;
  
  // Vérifie si c'est une couleur hsl/hsla
  if (/^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(,\s*[\d.]+\s*)?\)$/.test(color)) return true;
  
  // Vérifie si c'est un dégradé linéaire classique
  if (/^linear-gradient\(\s*\d+deg\s*,\s*[^)]+\)$/.test(color)) {
    // Vérifie que les couleurs dans le dégradé sont supportées
    const colors = color.match(/(#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3}|rgba?\([^)]+\)|hsla?\([^)]+\))/g);
    if (!colors) return false;
    return colors.every(c => isColorSupportedByHtml2Canvas(c));
  }
  
  return false;
};

// Fonction pour convertir une couleur en format supporté
export const convertToSupportedColor = (color: string): string => {
  // Si la couleur est déjà dans un format supporté, la retourner telle quelle
  if (isColorSupportedByHtml2Canvas(color)) return color;
  
  // Si c'est un dégradé, convertir les couleurs à l'intérieur
  if (color.includes('linear-gradient')) {
    return color.replace(/(#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3}|rgba?\([^)]+\)|hsla?\([^)]+\))/g, (match) => {
      return convertToSupportedColor(match);
    });
  }
  
  // Par défaut, retourner une couleur hex blanche
  return '#ffffff';
};

// Fonction pour valider un dégradé
export const isValidGradient = (gradient: string): boolean => {
  if (!gradient.startsWith('linear-gradient')) return false;
  
  // Vérifie que l'angle est valide
  const angleMatch = gradient.match(/linear-gradient\((\d+)deg/);
  if (!angleMatch) return false;
  const angle = parseInt(angleMatch[1]);
  if (isNaN(angle) || angle < 0 || angle > 360) return false;
  
  // Vérifie que les couleurs sont valides
  const colors = gradient.match(/(#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3}|rgba?\([^)]+\)|hsla?\([^)]+\))/g);
  if (!colors || colors.length < 2) return false;
  
  return colors.every(color => isColorSupportedByHtml2Canvas(color));
};

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