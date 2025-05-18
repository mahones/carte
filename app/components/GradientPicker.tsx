import React, { useEffect, useCallback } from "react";
import { isValidGradient } from "../utils/colorUtils";

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
  const updateGradient = useCallback((newColor1: string, newColor2: string, newAngle: number) => {
    const gradient = `linear-gradient(${newAngle}deg, ${newColor1} 0%, ${newColor2} 100%)`;
    if (isValidGradient(gradient)) {
      onGradientChange(gradient);
    }
  }, [onGradientChange]);

  const handleColor1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor1(newColor);
    updateGradient(newColor, color2, angle);
  };

  const handleColor2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor2(newColor);
    updateGradient(color1, newColor, angle);
  };

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAngle = Number(e.target.value);
    setAngle(newAngle);
    updateGradient(color1, color2, newAngle);
  };

  useEffect(() => {
    updateGradient(color1, color2, angle);
  }, [angle, color1, color2, updateGradient]);

  return (
    <div>
      <div className="mb-2">
        <label className="form-label">Couleur de début</label>
        <input type="color" value={color1} onChange={handleColor1Change} className="form-control form-control-color w-25" />
      </div>
      <div className="mb-2">
        <label className="form-label">Couleur de fin</label>
        <input type="color" value={color2} onChange={handleColor2Change} className="form-control form-control-color w-25" />
      </div>
      <div className="mb-2">
        <label className="form-label">Angle du dégradé ({angle}°)</label>
        <input type="range" min="0" max="360" value={angle} onChange={handleAngleChange} className="form-range" />
      </div>
      <div className="h-8 w-full rounded mb-2" style={{ background: `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)` }} />
    </div>
  );
};

export default GradientPicker; 