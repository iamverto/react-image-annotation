import React, {useState} from "react";
import {Arrow, Group, Layer, Rect, Stage, Text} from "react-konva";

const DrawAnnotations = () => {
        const [annotations, setAnnotations] = useState([]);
        const [newAnnotation, setNewAnnotation] = useState([]);
        const [arrows, setArrows] = useState([]);
        const [isDrawing, setIsDrawing] = useState(true)

        const handleMouseDown = event => {
            if (isDrawing && newAnnotation.length === 0) {
                const {x, y} = event.target.getStage().getPointerPosition();
                setNewAnnotation([{x, y, width: 0, height: 0, key: "0"}]);
            }
        };

        const handleMouseUp = event => {
            if (newAnnotation.length === 1) {
                const sx = newAnnotation[0].x;
                const sy = newAnnotation[0].y;
                const {x, y} = event.target.getStage().getPointerPosition();
                const annotationToAdd = {
                    x: sx,
                    y: sy,
                    width: x - sx,
                    height: y - sy,
                    key: annotations.length + 1
                };
                annotations.push(annotationToAdd);
                setNewAnnotation([]);
                setAnnotations(annotations);

                if (isDrawing && annotations.length > 1) {
                    setArrows([1])
                }
            }
        };

        const handleMouseMove = event => {
            if (newAnnotation.length === 1) {
                const sx = newAnnotation[0].x;
                const sy = newAnnotation[0].y;
                const {x, y} = event.target.getStage().getPointerPosition();
                setNewAnnotation([
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

        const annotationsToDraw = [...annotations, ...newAnnotation];


        const degrees_to_radians = degrees => degrees * (Math.PI / 180);

        const Edge = ({node1, node2}) => {
            const dx = node1.x - node2.x;
            const dy = node1.y - node2.y;
            let angle = Math.atan2(-dy, dx);

            const radius = annotations[0].width/2;

            const arrowStart = {
                x: node2.x ,
                y: node2.y +(node1.width/2)
            };

            const arrowEnd = {
                x: node1.x+node1.width+4 ,
                y: node1.y+(node1.width/2)
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

            const text = "Some text";

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
                    {annotations.length > 1 && <Edge node1={annotations[0]} node2={annotations[1]}/>}


                    {annotationsToDraw.map((value, index) => {
                        return (
                            <Rect
                                x={value.x}
                                y={value.y}
                                width={value.width}
                                height={value.height}
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
                                        if (i === index) return {...item, ...e.target.position()};
                                        return item
                                    })
                                    setAnnotations(ants)
                                }}


                            />
                        );
                    })}
                </Layer>
            </Stage>
        );
    }
;

export default DrawAnnotations;