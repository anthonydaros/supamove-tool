
import React from 'react';
import { cn } from "@/lib/utils";

interface SupabaseIconProps {
  isVerified?: boolean;
  size?: number;
  className?: string;
}

const SupabaseIcon = ({ isVerified = false, size = 35, className }: SupabaseIconProps) => {
  return (
    <div 
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg transition-all duration-300",
        "hover:scale-110",
        isVerified && "hover:animate-neon-pulse",
        isVerified && "border border-green-500/50",
        className
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 109 113"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "transition-all duration-300",
          isVerified && "text-green-500",
          !isVerified && "text-gray-400"
        )}
      >
        <path
          d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
          fill="currentColor"
        />
        <path
          d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.04075L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
          fill="currentColor"
          fillOpacity="0.4"
        />
      </svg>
      {isVerified && (
        <div className="absolute inset-0 rounded-lg opacity-20 bg-green-500 blur-sm" />
      )}
    </div>
  );
};

export default SupabaseIcon;
