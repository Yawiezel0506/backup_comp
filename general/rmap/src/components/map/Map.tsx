import React from "react";
import * as rlayers from "rlayers";
import DrawLayer from "./Layers/DrawLayer";
import { fromLonLat } from "ol/proj";
import BaseEvent from "ol/events/Event";
import MonumentLayer from "./Layers/MonumentLayer";

interface MapProps {
  className: string;
  handleLayerChange: (e: BaseEvent) => void;
  selected: boolean;
}

const Map: React.FC<MapProps> = ({
  className,
  handleLayerChange,
//   selected,
}) => {
//   console.log(selected);

  return (
    <rlayers.RMap
      className={className}
      initial={{ center: fromLonLat([2.364, 48.82]), zoom: 11 }}
      noDefaultControls
    >
      <rlayers.ROSM />
      <MonumentLayer />
      <DrawLayer handleLayerChange={handleLayerChange} />
    </rlayers.RMap>
  );
};

export default Map;
