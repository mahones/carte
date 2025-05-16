import React from "react";

interface UploadImageProps {
  label: string;
  image: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  shape?: "circle" | "rect";
  previewClassName?: string;
  inputId: string;
}

const UploadImage: React.FC<UploadImageProps> = ({ label, image, onChange, shape = "rect", previewClassName = "", inputId }) => (
  <div className="mb-3">
    <span className="block text-xs text-gray-600 mb-1">{label}</span>
    <label htmlFor={inputId} className="block w-full h-36 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer relative">
      {image ? (
        <img
          src={image}
          alt={label}
          className={
            shape === "circle"
              ? `w-20 h-20 rounded-full object-cover border-2 border-white ${previewClassName}`
              : `w-full h-32 object-cover rounded-xl ${previewClassName}`
          }
        />
      ) : (
        <span className="flex flex-col items-center justify-center w-full h-full">
          <span className="flex items-center justify-center w-14 h-14 bg-gray-300 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
            </svg>
          </span>
        </span>
      )}
      <input id={inputId} type="file" accept="image/*" onChange={onChange} className="hidden" />
    </label>
  </div>
);

export default UploadImage; 