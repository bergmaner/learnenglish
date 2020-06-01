import React,{ useState, useEffect } from 'react';

function useChartSize() {
    const [width, setWidth] = useState(window.innerWidth);
    
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });
    if( width <= 359 ) return 200;
    else if( width > 359 && width <= 559 ) return 250;
    else if( width > 559 && width <= 759 ) return 300;
    else if( width > 759 ) return 350;
  }
  export default useChartSize;