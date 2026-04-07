import { useEffect } from 'react';

const AnimatedFavicon = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/amos-hero.jpg';
    
    let angle = 0;
    let animationId;
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    const draw = () => {
      const size = 64;
      const center = size / 2;
      const imgRadius = 24;
      const ringRadius = 29;
      
      ctx.clearRect(0, 0, size, size);
      
      // Draw circular photo
      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, imgRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      
      if (img.complete && img.naturalWidth > 0) {
        // Center-crop the image
        const srcSize = Math.min(img.naturalWidth, img.naturalHeight);
        const sx = (img.naturalWidth - srcSize) / 2;
        const sy = (img.naturalHeight - srcSize) / 2;
        ctx.drawImage(img, sx, sy, srcSize, srcSize, center - imgRadius, center - imgRadius, imgRadius * 2, imgRadius * 2);
      } else {
        // Fallback: red circle with AF
        ctx.fillStyle = '#e50914';
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('AF', center, center);
      }
      ctx.restore();
      
      // Thin border around photo
      ctx.beginPath();
      ctx.arc(center, center, imgRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(229, 9, 20, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Spinning outer ring (dashed arc)
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle);
      
      // Red arc (partial ring that spins)
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius, 0, Math.PI * 1.2);
      ctx.strokeStyle = '#e50914';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      // Subtle second arc
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius, Math.PI * 1.5, Math.PI * 2.2);
      ctx.strokeStyle = 'rgba(229, 9, 20, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      ctx.restore();
      
      // Update favicon
      link.href = canvas.toDataURL('image/png');
      
      angle += 0.04;
      animationId = requestAnimationFrame(draw);
    };

    // Start when image loads or immediately if cached
    if (img.complete) {
      draw();
    } else {
      img.onload = () => draw();
      // If image fails, start with fallback
      img.onerror = () => draw();
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return null;
};

export default AnimatedFavicon;
