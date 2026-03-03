// src/components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  icon, 
  children, 
  className, 
  ...props 
}) => {
  // Base style untuk semua button (bentuk rounded-full dan padding)
  const baseStyles = "w-full py-3 px-6 rounded-full font-semibold flex items-center justify-center gap-2 transition-all active:scale-95";
  
  // Variasi style berdasarkan desain 
  const variants = {
    primary: "bg-[#B20710] text-white hover:bg-red-700",
    secondary: "bg-black/40 text-white border border-white/20 backdrop-blur-sm hover:bg-white/10",
    tertiary: "flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      <span>{children}</span>
      {icon && <span className="flex items-center">{icon}</span>}
    </button>
  );
};

export default Button;