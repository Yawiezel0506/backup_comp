import "./index.css";

import React, { useCallback, useState } from "react";
import Map from "./Map";
import BaseEvent from "ol/events/Event";
import { fromLonLat } from "ol/proj";
import Instructions from "./other/Instructions";

const TourEiffel = fromLonLat([2.294, 48.858]);

const MapComponent: React.FC = () => {
  const [selected, setSelected] = useState(false);

  const handleLayerChange = useCallback((e: BaseEvent) => {
    const source = e.target;
    for (const key in source) {
      
        console.log(key, source[key]);
      
    }
    
    if (source?.forEachFeatureAtCoordinateDirect) {
      setSelected(
        source.forEachFeatureAtCoordinateDirect(TourEiffel, () => true)
      );
    }
  }, []);

  return (
    <React.Fragment>
      <Map
        className="example-map"
        handleLayerChange={handleLayerChange}
        selected={selected}
      />
      <Instructions selected={selected} />
    </React.Fragment>
  );
};

export default MapComponent;
