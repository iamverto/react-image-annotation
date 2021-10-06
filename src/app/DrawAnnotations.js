import React, {useRef, useState} from "react";
import {Arrow, Group, Layer, Rect, Stage, Text} from "react-konva";
import {StickyNote} from "./StickyNote";
import Edge from "./Edge";

const DrawAnnotations = () => {
        const [annotations, setAnnotations] = useState([]); // marker, label
        const [newRect, setNewRect] = useState([]);
        const [isDrawing, setIsDrawing] = useState(true)

        const handleMouseDown = event => {
            if (isDrawing && newRect.length === 0) {
                const {x, y} = event.target.getStage().getPointerPosition();
                setNewRect([{x, y, width: 0, height: 0, key: "0"}]);
            }
        };

        const handleMouseUp = event => {
            if (newRect.length === 1) {
                const sx = newRect[0].x;
                const sy = newRect[0].y;
                const {x, y} = event.target.getStage().getPointerPosition();
                const rectToAdd = {
                    x: sx,
                    y: sy,
                    width: x - sx,
                    height: y - sy,
                    key: annotations.length + 1
                };
                annotations.push({marker: rectToAdd});
                setNewRect([]);
                setAnnotations(annotations);

                setAnnotations(annotations.map((item) => {
                    if (!item.label)
                        return {
                            ...item,
                            label: {
                                x: x + (x - sx) / 2,
                                y: y - (y - sy) / 4,
                                width: 250,
                                height: 20,
                                text: '',
                                selected: true
                            }
                        }
                    return item
                }))

            }
        };

        const handleMouseMove = event => {
            if (newRect.length === 1) {
                const sx = newRect[0].x;
                const sy = newRect[0].y;
                const {x, y} = event.target.getStage().getPointerPosition();
                setNewRect([
                    {
                        x: sx,
                        y: sy,
                        width: x - sx,
                        height: y - sy,
                        key: "0"
                    }
                ]);
            }
        };

        return (
            <Stage
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                width={900}
                height={700}
            >
                <Layer>
                    {annotations.map((annotation, index) => {
                        return (
                            <>
                                {annotation.marker && annotation.label &&
                                <Edge node1={annotation.marker} node2={annotation.label}/>}

                                {annotation.label && (
                                    <StickyNote
                                        x={annotation.label.x}
                                        y={annotation.label.y}
                                        height={annotation.label.height}
                                        width={annotation.label.width}
                                        text={annotation.label.text}
                                        colour="#FFDAE1"
                                        onTextChange={(text) => {
                                            setAnnotations(annotations.map((item, i) => {
                                                if (index===i)
                                                    return {...item, label: {...item.label, text}}
                                                return item
                                            }))
                                        }}
                                        selected={annotation.label.selected}
                                        onTextResize={(newWidth, newHeight) => {
                                            setAnnotations(annotations.map((item) => {
                                                if (!item.text)
                                                    return {
                                                        ...item,
                                                        label: {
                                                            ...item.label,
                                                            width: newWidth,
                                                            height: newHeight,
                                                        }
                                                    }
                                                return item
                                            }))
                                        }}
                                        onClick={() => {
                                            setAnnotations(annotations.map((item) => {
                                                if (!item.text)
                                                    return {
                                                        ...item,
                                                        label: {...item.label, selected: !annotation.label.selected,}
                                                    }
                                                return item
                                            }))
                                        }}
                                        onTextClick={(newSelected) => {
                                            setAnnotations(annotations.map((item) => {
                                                if (!item.text)
                                                    return {
                                                        ...item,
                                                        label: {...item.label, selected: newSelected,}
                                                    }
                                                return item
                                            }))
                                        }}
                                        setIsDrawing={setIsDrawing}
                                        onMove={e => {
                                            const ants = annotations.map((item, i) => {
                                                if (i === index) return {
                                                    ...item,
                                                    label: {...item.label, ...e.target.position()}
                                                };
                                                return item
                                            })
                                            setAnnotations(ants)
                                        }}
                                        index={index}
                                    />

                                )}


                                <Rect
                                    x={annotation.marker.x}
                                    y={annotation.marker.y}
                                    width={annotation.marker.width}
                                    height={annotation.marker.height}
                                    fill="transparent"
                                    stroke="red"
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
                                    onDragMove={e => {
                                        const ants = annotations.map((item, i) => {
                                            if (i === index) return {
                                                ...item,
                                                marker: {...item.marker, ...e.target.position()}
                                            };
                                            return item
                                        })
                                        setAnnotations(ants)
                                    }}


                                />

                            </>
                        );
                    })}

                    {newRect.length > 0 && (
                        <Rect
                            x={newRect[0].x}
                            y={newRect[0].y}
                            width={newRect[0].width}
                            height={newRect[0].height}
                            fill="transparent"
                            stroke="#ff6655"
                            strokeWidth={2}
                        />

                    )}

                </Layer>
            </Stage>
        );
    }
;

export default DrawAnnotations;