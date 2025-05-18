import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import UploadImage from "./UploadImage";
import GradientPicker from "./GradientPicker";

interface SidebarMenuProps {
  // Citation
  quote: string;
  setQuote: (v: string) => void;
  fontFamily: string;
  setFontFamily: (v: string) => void;
  fontColor: string;
  setFontColor: (v: string) => void;
  fontWeight: string;
  setFontWeight: (v: string) => void;
  align: string;
  setAlign: (v: string) => void;
  fontSize: string;
  setFontSize: (v: string) => void;
  isItalic: boolean;
  setIsItalic: (v: boolean) => void;
  isUnderline: boolean;
  setIsUnderline: (v: boolean) => void;
  lineHeight: string;
  setLineHeight: (v: string) => void;
  letterSpacing: string;
  setLetterSpacing: (v: string) => void;
  // Auteur
  author: string;
  setAuthor: (v: string) => void;
  authorColor: string;
  setAuthorColor: (v: string) => void;
  subtitle: string;
  setSubtitle: (v: string) => void;
  subtitleColor: string;
  setSubtitleColor: (v: string) => void;
  profileImg: string | null;
  handleProfileImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  authorAlign: string;
  setAuthorAlign: (v: string) => void;
  // Fond
  bgType: string;
  setBgType: (v: string) => void;
  bgColor: string;
  setBgColor: (v: string) => void;
  bgGradient: string;
  setBgGradient: (v: string) => void;
  gradientColor1: string;
  setGradientColor1: (v: string) => void;
  gradientColor2: string;
  setGradientColor2: (v: string) => void;
  gradientAngle: number;
  setGradientAngle: (v: number) => void;
  bgImage: string | null;
  setBgImage: (v: string | null) => void;
  handleBgImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = (props) => {
  const [openCitation, setOpenCitation] = React.useState(true);
  const [openAuteur, setOpenAuteur] = React.useState(false);
  const [openFond, setOpenFond] = React.useState(false);

  return (
    <aside className="fixed left-0 top-0 h-full w-full md:w-[320px] bg-white rounded-l-3xl shadow-2xl p-0 flex flex-col text-gray-900 overflow-y-auto max-h-[100vh] z-20 border-r border-gray-200">
      <nav className="flex flex-col divide-y divide-gray-200">
        {/* Accordéon Citation */}
        <div>
          <button type="button" className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 focus:outline-none" onClick={() => setOpenCitation(!openCitation)}>
            <span className="font-bold">Citation</span>
            {openCitation ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openCitation && (
            <div className="px-6 pb-4">
              <textarea value={props.quote} onChange={e => props.setQuote(e.target.value)} rows={3} className="form-control mt-2" />
              {/* Style du texte */}
              <div className="border rounded p-3 mt-2">
                <label className="form-label fw-bold">Style du texte</label>
                {/* Police */}
                <div className="mb-2">
                  <label className="form-label">Police</label>
                  <select value={props.fontFamily} onChange={e => props.setFontFamily(e.target.value)} className="form-select">
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
                </div>
                {/* Couleur du texte */}
                <div className="mb-2">
                  <label className="form-label">Couleur du texte</label>
                  <input type="color" value={props.fontColor} onChange={e => props.setFontColor(e.target.value)} className="form-control form-control-color w-25" />
                </div>
                {/* Graisse */}
                <div className="mb-2">
                  <label className="form-label">Graisse</label>
                  <select value={props.fontWeight} onChange={e => props.setFontWeight(e.target.value)} className="form-select">
                    <option value="normal">Normal</option>
                    <option value="bold">Gras</option>
                  </select>
                </div>
                {/* Alignement */}
                <div className="mb-2">
                  <label className="form-label">Alignement</label>
                  <select value={props.align} onChange={e => props.setAlign(e.target.value)} className="form-select">
                    <option value="left">Gauche</option>
                    <option value="center">Centre</option>
                    <option value="right">Droite</option>
                  </select>
                </div>
                {/* Taille de police */}
                <div className="mb-2">
                  <label className="form-label">Taille de police (px)</label>
                  <input type="number" min="12" max="48" value={props.fontSize} onChange={e => props.setFontSize(e.target.value)} className="form-control" />
                </div>
                {/* Style du texte */}
                <div className="mb-2">
                  <div className="form-check form-check-inline">
                    <input type="checkbox" className="form-check-input" id="italicCheck" checked={props.isItalic} onChange={e => props.setIsItalic(e.target.checked)} />
                    <label className="form-check-label" htmlFor="italicCheck">Italique</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="checkbox" className="form-check-input" id="underlineCheck" checked={props.isUnderline} onChange={e => props.setIsUnderline(e.target.checked)} />
                    <label className="form-check-label" htmlFor="underlineCheck">Souligné</label>
                  </div>
                </div>
                {/* Espacement des lignes */}
                <div className="mb-2">
                  <label className="form-label">Espacement des lignes</label>
                  <input type="number" min="1" max="3" step="0.1" value={props.lineHeight} onChange={e => props.setLineHeight(e.target.value)} className="form-control" />
                </div>
                {/* Espacement des lettres */}
                <div className="mb-2">
                  <label className="form-label">Espacement des lettres (px)</label>
                  <input type="number" min="-2" max="10" step="0.5" value={props.letterSpacing} onChange={e => props.setLetterSpacing(e.target.value)} className="form-control" />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Accordéon Auteur */}
        <div>
          <button type="button" className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 focus:outline-none" onClick={() => setOpenAuteur(!openAuteur)}>
            <span className="font-bold">Nom de l'auteur</span>
            {openAuteur ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openAuteur && (
            <div className="px-6 pb-4">
              <input value={props.author} onChange={e => props.setAuthor(e.target.value)} className="form-control mt-2" />
              <label className="form-label">Couleur du texte de l'auteur</label>
              <input type="color" value={props.authorColor} onChange={e => props.setAuthorColor(e.target.value)} className="form-control form-control-color w-25" />
              <label className="form-label">Sous-titre</label>
              <input value={props.subtitle} onChange={e => props.setSubtitle(e.target.value)} className="form-control" />
              <label className="form-label">Couleur du texte du sous-titre</label>
              <input type="color" value={props.subtitleColor} onChange={e => props.setSubtitleColor(e.target.value)} className="form-control form-control-color w-25" />
              <div className="mb-3">
                <UploadImage label="IMAGE" image={props.profileImg} onChange={props.handleProfileImg} shape="circle" inputId="profile-upload" />
              </div>
              <label className="form-label">Alignement du bloc auteur</label>
              <select value={props.authorAlign} onChange={e => props.setAuthorAlign(e.target.value)} className="form-select">
                <option value="left">Gauche</option>
                <option value="center">Centre</option>
                <option value="right">Droite</option>
              </select>
            </div>
          )}
        </div>
        {/* Accordéon Fond */}
        <div>
          <button type="button" className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 focus:outline-none" onClick={() => setOpenFond(!openFond)}>
            <span className="font-bold">Fond</span>
            {openFond ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openFond && (
            <div className="px-6 pb-4">
              <div className="btn-group mb-2" role="group">
                <button type="button" className={`btn btn-outline-primary ${props.bgType === "solid" ? "active" : ""}`} onClick={() => {
                  props.setBgType("solid");
                  props.setBgGradient("");
                  props.setBgImage(null);
                }}>Uni</button>
                <button type="button" className={`btn btn-outline-primary ${props.bgType === "gradient" ? "active" : ""}`} onClick={() => {
                  props.setBgType("gradient");
                  props.setBgGradient(`linear-gradient(${props.gradientAngle}deg, ${props.gradientColor1} 0%, ${props.gradientColor2} 100%)`);
                  props.setBgImage(null);
                }}>Dégradé</button>
                <button type="button" className={`btn btn-outline-primary ${props.bgType === "image" ? "active" : ""}`} onClick={() => props.setBgType("image")}>Image</button>
              </div>
              {props.bgType === "solid" && (
                <div className="mb-2">
                  <label className="form-label">Couleur unique</label>
                  <input type="color" value={props.bgColor} onChange={e => {
                    props.setBgType("solid");
                    props.setBgColor(e.target.value);
                    props.setBgGradient("");
                    props.setBgImage(null);
                  }} className="form-control form-control-color w-25" />
                </div>
              )}
              {props.bgType === "gradient" && (
                <GradientPicker
                  color1={props.gradientColor1}
                  setColor1={(color) => {
                    props.setGradientColor1(color);
                    props.setBgGradient(`linear-gradient(${props.gradientAngle}deg, ${color} 0%, ${props.gradientColor2} 100%)`);
                  }}
                  color2={props.gradientColor2}
                  setColor2={(color) => {
                    props.setGradientColor2(color);
                    props.setBgGradient(`linear-gradient(${props.gradientAngle}deg, ${props.gradientColor1} 0%, ${color} 100%)`);
                  }}
                  angle={props.gradientAngle}
                  setAngle={(angle) => {
                    props.setGradientAngle(angle);
                    props.setBgGradient(`linear-gradient(${angle}deg, ${props.gradientColor1} 0%, ${props.gradientColor2} 100%)`);
                  }}
                  onGradientChange={props.setBgGradient}
                />
              )}
              {props.bgType === "image" && (
                <div className="mb-3">
                  <span className="block text-xs text-gray-600 mb-1">IMAGE</span>
                  <label htmlFor="bg-upload" className="block w-full h-36 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer relative">
                    {props.bgImage ? (
                      <img src={props.bgImage} alt="background" className="w-full h-32 object-cover rounded-xl" />
                    ) : (
                      <span className="flex flex-col items-center justify-center w-full h-full">
                        <span className="flex items-center justify-center w-14 h-14 bg-gray-300 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                          </svg>
                        </span>
                      </span>
                    )}
                    <input id="bg-upload" type="file" accept="image/*" onChange={props.handleBgImg} className="hidden" />
                  </label>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default SidebarMenu; 