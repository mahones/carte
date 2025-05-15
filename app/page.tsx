"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

// Composant principal du générateur de carte de citation
export default function QuoteCardGenerator() {
  // États pour les champs de la carte
  const [quote, setQuote] = useState("Education is the most powerful weapon which you can use to change the world.");
  const [author, setAuthor] = useState("Nelson Mandela");
  const [subtitle, setSubtitle] = useState("World-renowned Peace Icon");
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [bgType, setBgType] = useState("gradient"); // 'solid', 'gradient', 'image'
  const [bgColor, setBgColor] = useState("#1e3a8a");
  const [bgGradient, setBgGradient] = useState("linear-gradient(135deg, #1e3a8a 0%, #06b6d4 100%)");
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [fontFamily, setFontFamily] = useState("Roboto, sans-serif");
  const [fontColor, setFontColor] = useState("#fff");
  const [fontWeight, setFontWeight] = useState("bold");
  const [align, setAlign] = useState("center");
  const [showAuthor, setShowAuthor] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const [gradientError, setGradientError] = useState("");
  const [authorColor, setAuthorColor] = useState("#fff");
  const [subtitleColor, setSubtitleColor] = useState("#e0e0e0");

  // Gestion de l'upload d'image de profil
  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImg(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Gestion de l'upload d'image de fond
  const handleBgImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setBgImage(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Validation du dégradé
  const handleGradientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/oklab|lch|lab/i.test(value)) {
      setGradientError("Ce type de couleur CSS n'est pas supporté pour le téléchargement d'image. Utilisez uniquement des couleurs hex, rgb ou rgba.");
    } else {
      setGradientError("");
      setBgGradient(value);
    }
  };

  // Fonction pour télécharger la carte en image
  const handleDownload = async () => {
    if (!cardRef.current) return;
    // Import dynamique pour éviter les erreurs SSR
    const html2canvas = (await import("html2canvas")).default;
    html2canvas(cardRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "quote-card.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // Style dynamique du fond de la carte
  let cardBg = {};
  if (bgType === "solid") cardBg = { background: bgColor };
  else if (bgType === "gradient") cardBg = { background: bgGradient };
  else if (bgType === "image" && bgImage) cardBg = { background: `url(${bgImage}) center/cover` };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Panneau de configuration à gauche */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        <form className="bg-white rounded-xl shadow-2xl p-4 flex flex-col gap-3 w-full md:w-1/3 text-gray-900">
          {/* Saisie de la citation */}
          <label className="form-label fw-bold">Citation</label>
          <textarea value={quote} onChange={e => setQuote(e.target.value)} rows={3} className="form-control" />

          {/* Champs de l'auteur toujours affichés */}
          <>
            <label className="form-label fw-bold">Nom de l'auteur</label>
            <input value={author} onChange={e => setAuthor(e.target.value)} className="form-control" />
            <label className="form-label">Couleur du texte de l'auteur</label>
            <input type="color" value={authorColor} onChange={e => setAuthorColor(e.target.value)} className="form-control form-control-color w-25" />
            <label className="form-label">Sous-titre</label>
            <input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="form-control" />
            <label className="form-label">Couleur du texte du sous-titre</label>
            <input type="color" value={subtitleColor} onChange={e => setSubtitleColor(e.target.value)} className="form-control form-control-color w-25" />
            <label className="form-label">Image de profil</label>
            <input type="file" accept="image/*" onChange={handleProfileImg} className="form-control" />
          </>

          {/* Choix du fond */}
          <label className="form-label fw-bold mt-2">Fond</label>
          <div className="btn-group mb-2" role="group">
            <button type="button" className={`btn btn-outline-primary ${bgType === "solid" ? "active" : ""}`} onClick={() => setBgType("solid")}>Uni</button>
            <button type="button" className={`btn btn-outline-primary ${bgType === "gradient" ? "active" : ""}`} onClick={() => setBgType("gradient")}>Dégradé</button>
            <button type="button" className={`btn btn-outline-primary ${bgType === "image" ? "active" : ""}`} onClick={() => setBgType("image")}>Image</button>
          </div>
          {bgType === "solid" && (
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="form-control form-control-color w-25" />
          )}
          {bgType === "gradient" && (
            <>
              <input type="text" value={bgGradient} onChange={handleGradientChange} className="form-control" placeholder="CSS gradient" />
              {gradientError && <span className="text-danger small">{gradientError}</span>}
            </>
          )}
          {bgType === "image" && (
            <input type="file" accept="image/*" onChange={handleBgImg} className="form-control" />
          )}

          {/* Choix de la police */}
          <label className="form-label fw-bold mt-2">Police</label>
          <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="form-select">
            <option value="Roboto, sans-serif">Roboto</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="Times New Roman, serif">Times New Roman</option>
            <option value="Montserrat, sans-serif">Montserrat</option>
            <option value="Lato, sans-serif">Lato</option>
            <option value="Oswald, sans-serif">Oswald</option>
            <option value="Raleway, sans-serif">Raleway</option>
            <option value="Merriweather, serif">Merriweather</option>
            <option value="Playfair Display, serif">Playfair Display</option>
            <option value="Poppins, sans-serif">Poppins</option>
            <option value="Nunito, sans-serif">Nunito</option>
            <option value="Quicksand, sans-serif">Quicksand</option>
            <option value="Ubuntu, sans-serif">Ubuntu</option>
            <option value="Fira Sans, sans-serif">Fira Sans</option>
            <option value="Source Sans Pro, sans-serif">Source Sans Pro</option>
          </select>
          <label className="form-label">Couleur du texte</label>
          <input type="color" value={fontColor} onChange={e => setFontColor(e.target.value)} className="form-control form-control-color w-25" />
          <label className="form-label">Graisse</label>
          <select value={fontWeight} onChange={e => setFontWeight(e.target.value)} className="form-select">
            <option value="normal">Normal</option>
            <option value="bold">Gras</option>
          </select>
          <label className="form-label">Alignement</label>
          <select value={align} onChange={e => setAlign(e.target.value)} className="form-select">
            <option value="left">Gauche</option>
            <option value="center">Centre</option>
            <option value="right">Droite</option>
          </select>
        </form>

        {/* Aperçu de la carte de citation */}
        <div className="flex flex-col items-center w-full md:w-2/3">
          <div
            ref={cardRef}
            className="relative w-[400px] h-[400px] rounded-2xl shadow-2xl flex flex-col justify-center items-center p-8"
            style={{ ...cardBg }}
          >
            {/* Guillemets décoratifs */}
            <div className="absolute left-6 top-6 text-5xl text-white/80 select-none">“</div>
            <div
              className="flex-1 flex flex-col justify-center w-full"
              style={{ fontFamily, color: fontColor, fontWeight, textAlign: align as any }}
            >
              <span className="text-xl md:text-2xl leading-snug">{quote}</span>
            </div>
            {/* Auteur toujours affiché */}
            <div className="flex items-center gap-3 mt-6 w-full">
              {profileImg && (
                <img src={profileImg} alt="profile" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
              )}
              <div className="flex flex-col">
                <span className="font-semibold" style={{ fontFamily, color: authorColor }}>{author}</span>
                <span className="text-xs opacity-80" style={{ fontFamily, color: subtitleColor }}>{subtitle}</span>
              </div>
            </div>
            {/* Guillemets décoratifs bas */}
            <div className="absolute right-6 bottom-6 text-5xl text-white/80 select-none">”</div>
          </div>
          {/* Bouton de téléchargement */}
          <button
            onClick={handleDownload}
            className="mt-5 mb-3 px-6 py-2 bg-primary text-white rounded-lg shadow-sm fw-bold fs-5"
          >
            Télécharger l'image
          </button>
        </div>
      </div>
    </div>
  );
}
