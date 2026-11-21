import React from 'react';

export const BackgroundCanvas: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundColor: '#D6E0EC',
        backgroundImage: `
          radial-gradient(circle at 12% 10%, rgba(167, 139, 250, 0.26) 0%, transparent 45%),
          radial-gradient(circle at 88% 24%, rgba(125, 211, 252, 0.3) 0%, transparent 48%),
          radial-gradient(circle at 38% 92%, rgba(253, 186, 116, 0.22) 0%, transparent 46%),
          linear-gradient(135deg, #DCE5F1 0%, #CFDCEB 52%, #E2DBF2 100%)
        `,
      }}
    />
  );
};
