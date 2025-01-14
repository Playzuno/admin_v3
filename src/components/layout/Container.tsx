import React, { useEffect, useRef, useState } from 'react';
// import containersvg from ''
const Container = ({ children }) => {
  const lrW = 400;
  const r = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });

    if (r.current) {
      resizeObserver.observe(r.current);
    }

    return () => {
      if (r.current) {
        resizeObserver.unobserve(r.current);
      }
    };
  }, [r]);

  useEffect(() => {
    console.log('Dimensions changed:', dimensions); // Log dimensions on change
  }, [dimensions]);

  return (
    <div className="bg-white rounded-2xl zuno-border-dark overflow-hidden p-6 relative pt-16">
      <div className="flex justify-center absolute top-0 left-1/2 -translate-x-1/2 z-20">
        <div>
          <img
            ref={r}
            className=""
            src="/assets/images/left-c.svg"
            alt="Zuno Logo"
            width={lrW}
            height={50}
            style={{ zIndex: '0' }}
          />
        </div>
        <div
          style={{
            width: '50px',
            height: dimensions.height + 'px',
            borderBottom: '1px solid orange',
          }}
        >
          Dashboard
        </div>
        <div>
          <img
            className=""
            src="/assets/images/right-c.svg"
            alt="Zuno Logo"
            width={lrW}
            style={{ zIndex: '0' }}
          />
        </div>
      </div>

      {children}
    </div>
  );
};

export default Container;
