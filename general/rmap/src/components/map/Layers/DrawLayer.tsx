import React, { useCallback } from 'react';
import * as rlayers from 'rlayers';
import { platformModifierKeyOnly, doubleClick, mouseActionButton, shiftKeyOnly  } from 'ol/events/condition';
import { MapBrowserEvent } from 'rlayers';
import BaseEvent from 'ol/events/Event';

interface DrawLayerProps {
    handleLayerChange: (e: BaseEvent) => void;
}

const DrawLayer: React.FC<DrawLayerProps> = ({ handleLayerChange }) => {
    return (
        <rlayers.RLayerVector onChange={handleLayerChange}>
            <rlayers.RStyle.RStyle>
                <rlayers.RStyle.RStroke color='#0000ff' width={3} />
                <rlayers.RStyle.RFill color='rgba(0, 0, 0, 0.75)' />
            </rlayers.RStyle.RStyle>

            <rlayers.RInteraction.RDraw type={'Polygon'} condition={mouseActionButton} freehandCondition={shiftKeyOnly}  />
            {/* <rlayers.RInteraction.RDraw type={'Circle'} condition={altKeyOnly} freehandCondition={never} /> */}
            <rlayers.RInteraction.RModify
                condition={platformModifierKeyOnly}
                deleteCondition={useCallback((e: MapBrowserEvent<UIEvent>) => platformModifierKeyOnly(e) && doubleClick(e), [])}
            />
        </rlayers.RLayerVector>
    );
};

export default DrawLayer;
