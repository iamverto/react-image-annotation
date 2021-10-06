import React from "react";
import {Rect} from "react-konva";

const Marker = ({x, y, width, height, setIsDrawing, onMove}) => {
    return (
        <Rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill="transparent"
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
        />

    )
}

export default Marker;