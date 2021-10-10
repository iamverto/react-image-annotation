import React, {useRef, useState} from "react";
import {Rect, Transformer} from "react-konva";

const Marker = ({x, y, width, height, setIsDrawing, onMove,selected, setSelected}) => {
    const markerRef = useRef(null);
    const transformerRef = useRef(null);

    const transformer = true ? (
        <Transformer
            ref={transformerRef}
            rotateEnabled={false}
            flipEnabled={false}
            enabledAnchors={["middle-left", "middle-right"]}
            boundBoxFunc={(oldBox, newBox) => {
                newBox.width = Math.max(30, newBox.width);
                return newBox;
            }}
        />
    ) : null;


    return (
        <>
            <Rect
                ref={markerRef}
                x={x}
                y={y}
                width={width}
                height={height}
                fill={selected?"#ebcc3430":"transparent"}
                stroke="#ebcc34"
                draggable
                strokeWidth={2}
                onMouseEnter={(e) => {
                    const container = e.target.getStage().container();
                    container.style.cursor = "pointer";
                    setIsDrawing?.(false)
                }}
                onMouseLeave={(e) => {
                    const container = e.target.getStage().container();
                    container.style.cursor = "crosshair";
                    setIsDrawing?.(true)
                }}
                onDragMove={onMove}
                onClick={setSelected}
            />
            {transformer}
        </>

    )
}

export default Marker;