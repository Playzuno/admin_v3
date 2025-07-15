import React, { useEffect, useRef, useState } from 'react';
interface ContainerProps {
  title: string;
  children: React.ReactNode;
}

const Container = ({ title = 'Dashboard', children }: ContainerProps) => {
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
    <div className="bg-white rounded-t-3xl rounded-b-2xl border-[0.5px] border-[#909090] border-t-0 overflow-hidden p-0 relative mt-[1%]">
      
      <div className="flex mb-14 bg-[#F7F7F7]">
        <div className="relative bg-white h-10 w-full border-r-[2px] border-t border-[#ff6e01]/50 rounded-t-3xl">
          <div className="h-5 bg-white w-full absolute -bottom-5"></div>
        </div>
        <div className="w-[32rem] h-0 bg-white relative">
          {/* <h1 className="text-base font-medium">{title}</h1> */}
          <div className="absolute h-10 w-[11.5rem] md:w-[12.1rem] lg:w-[207px] xl:w-[13.5rem] 2xl:w-[13.7rem] 3xl:w-[13.7rem] border-r-[2px] border-l-[2px] border-b-[2px] border-[#ff6e01]/50 rounded-b-3xl text-center bg-[#F7F7F7] -left-[2px] top-5 z-10"><h1 className="text-base font-medium">{title}</h1></div>
        </div>
        <div className="relative bg-white h-10 w-full border-r border-l-[2px] border-t border-[#ff6e01]/50 rounded-t-3xl">
          <div className="h-5 bg-white w-full absolute -bottom-5"></div>
        </div>
      </div>

      {/* <div className="flex justify-center absolute top-0 left-1/2 -translate-x-1/2 z-20">
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
      </div> */}
      <div className="px-6">{children}</div>
    </div>
  );
};

export default Container;
