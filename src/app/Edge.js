import React from "react";
import {Arrow} from "react-konva";

const Edge = ({node1, node2}) => {
    const arrowStart = {
        x: node2.x,
        y: node2.y + (node2.height / 2)
    };

    const arrowEnd = {
        x: node1.x + node1.width + 4,
        y: node1.y + (node2.height / 2)
    };
    const arrowMiddle = {
        x: (arrowStart.x + arrowEnd.x) / 2,
        y: (arrowStart.y + arrowEnd.y) / 2
    };
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
            stroke="black"
            fill="black"
            strokeWidth={2}
            pointerWidth={6}
        />
    );
};

export default Edge
