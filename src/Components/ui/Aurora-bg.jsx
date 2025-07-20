import React from 'react';
import PropTypes from 'prop-types';

export function DotBackgroundDemo({ children }) {
  return (
    <div
      className="relative flex z-10 w-full items-center justify-center "
      style={{
        backgroundImage: `radial-gradient(125% 125% at 50% 10%, rgba(255, 255, 255, 0.05) 25%, rgba(102, 51, 238, 0.4) 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark dot pattern overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(0,0,0,0.18)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />


      {/* Optional white overlay to soften everything */}
      <div className="absolute inset-0 bg-white/20 pointer-events-none z-10" />

      {/* Optional radial mask for subtle focus effect */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-10" />

      {/* Content */}
      <div className="relative z-20 w-full flex items-center justify-center lg:pl-28">
  {children}
</div>

    </div>
  );
}

DotBackgroundDemo.propTypes = {
  children: PropTypes.node.isRequired,
};
