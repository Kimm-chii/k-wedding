import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export function Image({ src, alt, className = '', containerClassName = '', ...props }: ImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-stone-100 text-stone-300 w-full h-full ${containerClassName} ${className}`}>
        <ImageIcon className="w-8 h-8 md:w-12 md:h-12 opacity-40 mb-2" />
        <span className="text-xs uppercase tracking-widest opacity-40">Image Placeholder</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden w-full h-full ${containerClassName}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-stone-100 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
}
