import { useEffect } from 'react';

// TypeScript declaration for FinisherHeader
declare global {
  interface Window {
    FinisherHeader: any;
  }
}

function Bg() {
  useEffect(() => {
    // Load the FinisherHeader script dynamically
    const script = document.createElement('script');
    script.src = '/src/assets/finisher-header.es5.min.js';
    script.type = 'text/javascript';
    script.onload = () => {
      // Initialize FinisherHeader after script loads
      if (window.FinisherHeader) {
        new window.FinisherHeader({
            "count": 100,
            "size": {
              "min": 2,
              "max": 8,
              "pulse": 0
            },
            "speed": {
              "x": {
                "min": 0,
                "max": 0.4
              },
              "y": {
                "min": 0,
                "max": 0.6
              }
            },
            "colors": {
              "background": "#000000",
              "particles": [
                "#fbfcca",
                "#d7f3fe",
                "#ffd0a7"
              ]
            },
            "blending": "overlay",
            "opacity": {
              "center": 1,
              "edge": 0
            },
            "skew": 0,
            "shapes": [
              "c",
              "s",
              "t"
            ]
          });
      }
    };
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src="/src/assets/finisher-header.es5.min.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div
      className="header finisher-header"
      style={{ width: "100%", height: "500vh" }}
    />
  );
}

export default Bg;
