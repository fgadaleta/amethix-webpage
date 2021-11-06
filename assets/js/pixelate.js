import React from "react";
import ReactDOM from "react-dom";
import { useRangeKnob, useBooleanKnob, Inspector } from "retoggle";

import "./styles.css";

const PixelateImage = ({ src, size, enabled }) => (
  <>
    <svg style={{ width: "100%", height: "500px" }}>
      <filter id="pixelate" x="0" y="0">
        <feFlood x={4} y={4} height={1} width={1} />
        <feComposite width={size * 2} height={size * 2} />
        <feTile result="a" />
        <feComposite in="SourceGraphic" in2="a" operator="in" />
        <feMorphology operator="dilate" radius={size} />
      </filter>

      <image
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        filter={enabled ? "url(#pixelate)" : ""}
        href={src}
      />
    </svg>
  </>
);

function App() {
  const [size] = useRangeKnob("Pixel Size", {
    initialValue: 5,
    min: 5,
    max: 20
  });

  const [enabled] = useBooleanKnob("pixelate?", true);

  return (
    <>
      <PixelateImage
        src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
        size={size}
        enabled={enabled}
      />
      <Inspector usePortal={false} />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
