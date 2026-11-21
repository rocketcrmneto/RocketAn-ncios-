import React, { useState, useEffect } from 'react';

interface AutoCroppedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const croppedUrlCache = new Map<string, string>();

export const AutoCroppedImage: React.FC<AutoCroppedImageProps> = ({
  src,
  className,
  alt,
  ...props
}) => {
  const [croppedUrl, setCroppedUrl] = useState<string>(() => croppedUrlCache.get(src) || src);

  useEffect(() => {
    if (!src) return;
    const cached = croppedUrlCache.get(src);
    if (cached) {
      setCroppedUrl(cached);
      return;
    }

    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, img.width, img.height);
        const data = imgData.data;

        let minX = img.width;
        let minY = img.height;
        let maxX = 0;
        let maxY = 0;
        let found = false;

        // Fast 3px stride sampling avoids blocking the main thread
        const step = 3;
        for (let y = 0; y < img.height; y += step) {
          for (let x = 0; x < img.width; x += step) {
            const index = (y * img.width + x) * 4;
            const alpha = data[index + 3];
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];

            if (alpha > 15 && (r > 10 || g > 10 || b > 10 || alpha > 200)) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
              found = true;
            }
          }
        }

        if (found && maxX > minX && maxY > minY) {
          const padX = Math.round((maxX - minX) * 0.02) + step;
          const padY = Math.round((maxY - minY) * 0.02) + step;

          const cropX = Math.max(0, minX - padX);
          const cropY = Math.max(0, minY - padY);
          const cropW = Math.min(img.width - cropX, maxX - minX + padX * 2);
          const cropH = Math.min(img.height - cropY, maxY - minY + padY * 2);

          const croppedCanvas = document.createElement('canvas');
          croppedCanvas.width = cropW;
          croppedCanvas.height = cropH;
          const croppedCtx = croppedCanvas.getContext('2d');

          if (croppedCtx) {
            croppedCtx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
            const dataUrl = croppedCanvas.toDataURL('image/png');
            croppedUrlCache.set(src, dataUrl);
            if (isMounted) setCroppedUrl(dataUrl);
          }
        }
      } catch {
        // Fallback silently to original src
      }
    };

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <img
      src={croppedUrl}
      alt={alt || 'Logo'}
      className={className}
      {...props}
    />
  );
};
