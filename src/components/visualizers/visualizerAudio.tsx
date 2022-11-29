import { useControls } from "leva";
import React, { Suspense, useEffect } from "react";
import { CoordinateMapper_Data } from "../coordinateMapper";
import { useAppState } from "../appState";

interface AudioVisualProps {
  visual: string;
}

const AudioVisual = ({ visual }: AudioVisualProps): JSX.Element => {
  const data = useAppState((state) => state.data);

  const { amplitude } = useControls({
    amplitude: {
      value: 1.0,
      min: 0.0,
      max: 5.0,
      step: 0.01,
    },
  });

  const coordinateMapper = new CoordinateMapper_Data(amplitude, data);
  const VisualComponent = React.lazy(() => import(`./${visual}/reactive.tsx`));

  return (
    <Suspense fallback={null}>
      <VisualComponent coordinateMapper={coordinateMapper} />
    </Suspense>
  );
};

export default AudioVisual;