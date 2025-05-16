import React from "react";

interface GradientPickerProps {
  color1: string;
  setColor1: (v: string) => void;
  color2: string;
  setColor2: (v: string) => void;
  angle: number;
  setAngle: (v: number) => void;
  onGradientChange: (css: string) => void;
}

const GradientPicker: React.FC<GradientPickerProps> = ({ color1, setColor1, color2, setColor2, angle, setAngle, onGradientChange }) => {
  React.useEffect(() => {
    onGradientChange(`linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`);
  }, [color1, color2, angle, onGradientChange]);

  return (
    <div>
      <div className="mb-2">
        <label className="form-label">Couleur de début</label>
        <input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="form-control form-control-color w-25" />
      </div>
      <div className="mb-2">
        <label className="form-label">Couleur de fin</label>
        <input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="form-control form-control-color w-25" />
      </div>
      <div className="mb-2">
        <label className="form-label">Angle du dégradé ({angle}°)</label>
        <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(Number(e.target.value))} className="form-range" />
      </div>
      <div className="h-8 w-full rounded mb-2" style={{ background: `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)` }} />
    </div>
  );
};

export default GradientPicker; 