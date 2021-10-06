import React, {useState, useEffect} from "react";
import {Group, Rect} from "react-konva";
import {EditableText} from "./EditableText";

export function StickyNote({
                               colour,
                               text,
                               x,
                               y,
                               width,
                               height,
                               onClick,
                               onTextResize,
                               onTextChange,
                               selected,
                               onTextClick,
                               setIsDrawing,
                               onMove,
                           }) {
    const [isEditing, setIsEditing] = useState(true);
    const [isTransforming, setIsTransforming] = useState(false);

    // useEffect(() => {
    //     if (!selected && isEditing) {
    //         setIsEditing(false);
    //     } else if (!selected && isTransforming) {
    //         setIsTransforming(false);
    //     }
    // }, [selected, isEditing, isTransforming]);

    function toggleEdit() {
        setIsEditing(!isEditing);
        onTextClick(!isEditing);
    }

    function toggleTransforming() {
        setIsTransforming(!isTransforming);
        onTextClick(!isTransforming);
    }

    return (
        <Group x={x} y={y}
               draggable
               strokeWidth={4}
               onMouseEnter={(e) => {
                   const container = e.target.getStage().container();
                   container.style.cursor = "pointer";
                   setIsDrawing(false)
               }}
               onMouseLeave={(e) => {
                   const container = e.target.getStage().container();
                   container.style.cursor = "crosshair";
                   setIsDrawing(true)
               }}
               onDragMove={onMove}
        >
            <Rect
                x={10}
                y={10}
                width={width}
                height={height}
                // fill='yellow'
                // strokeWidth={4}
                // stroke='black'
                perfectDrawEnabled={false}
            />
            <Rect
                x={0}
                y={0}
                width={width + 10}
                height={height + 10}
                fill='yellow'
                strokeWidth={2}
                stroke='black'
                perfectDrawEnabled={false}
                onClick={onClick}
                onTap={onClick}
            />
            <EditableText
                x={5}
                y={3}
                text={text}
                width={width}
                height={height}
                onResize={onTextResize}
                isEditing={isEditing}
                isTransforming={isTransforming}
                onToggleEdit={toggleEdit}
                onToggleTransform={toggleTransforming}
                onChange={onTextChange}

                // onMouseEnter={()=>setIsEditing(true)}
                // onMouseLeave={()=>setIsEditing(false)}

            />
        </Group>
    );
}
