import React, {useState} from "react";
import {Arrow, Group, Layer, Rect, Stage, Text} from "react-konva";

const DrawAnnotations = () => {
        const [annotations, setAnnotations] = useState([]);
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
                annotations.push({rect: rectToAdd});
                setNewRect([]);
                setAnnotations(annotations);

                if (isDrawing) {
                    setAnnotations(annotations.map((item) => {
                        if (!item.text) {
                            return {...item, text: {x: x + (x - sx) / 2, y:y - (y - sy) / 4, width: 250}}
                        }
                        return item
                    }))
                }

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

        const degrees_to_radians = degrees => degrees * (Math.PI / 180);

        const Edge = ({node1, node2}) => {
            const dx = node1.x - node2.x;
            const dy = node1.y - node2.y;
            let angle = Math.atan2(-dy, dx);

            const radius = annotations[0].width / 2;

            const arrowStart = {
                x: node2.x,
                y: node2.y + (node1.width / 2)
            };

            const arrowEnd = {
                x: node1.x + node1.width + 4,
                y: node1.y + (node1.width / 2)
            };
            // const arrowStart = {
            //     x: radius + node2.x + -radius * Math.cos(angle + Math.PI),
            //     y: radius + node2.y + radius * Math.sin(angle + Math.PI)
            // };
            //
            // const arrowEnd = {
            //     x: radius + node1.x + -radius * Math.cos(angle),
            //     y: radius + node1.y + radius * Math.sin(angle)
            // };

            const arrowMiddle = {
                x: (arrowStart.x + arrowEnd.x) / 2,
                y: (arrowStart.y + arrowEnd.y) / 2
            };

            // const text = "Some text";

            return (
                <Arrow
                    points={[
                        arrowStart.x,
                        arrowStart.y,
                        arrowMiddle.x,
                        arrowMiddle.y,
                        arrowEnd.x,
                        arrowEnd.y
                    ]}
                    stroke="#07c"
                    fill="#07c"
                    strokeWidth={2}
                    pointerWidth={6}
                />
            );
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
                    {/*{annotations.length > 1 && <Edge node1={annotations[0]} node2={annotations[1]}/>}*/}


                    {annotations.map((annotation, index) => {
                        // if(!annotation.rect) {
                        //     return
                        // }
                        return (
                            <>
                                {annotation.text && (
                                    <Text
                                        text="Hello there!"
                                        x={annotation.text.x}
                                        y={annotation.text.y}
                                        width={annotation.text.width}
                                        fill="red"
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
                                        draggable
                                    />
                                )}

                                <Rect
                                    x={annotation.rect.x}
                                    y={annotation.rect.y}
                                    width={annotation.rect.width}
                                    height={annotation.rect.height}
                                    fill="transparent"
                                    stroke="#ff9955"
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
                                            if (i === index) return {...item, rect: {...item.rect, ...e.target.position()}};
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