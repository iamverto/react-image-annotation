import React from "react";
import { Html } from "react-konva-utils";

function getStyle(width, height) {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    const baseStyle = {
        width: `${width}px`,
        height: `${height+10}px`,
        border: "none",
        padding: "0px",
        margin: "0px",
        background: "none",
        outline: "none",
        resize: "none",
        colour: "black",
        fontSize: "24px",
        fontFamily: "sans-serif"
    };
    if (isFirefox) {
        return baseStyle;
    }
    return {
        ...baseStyle,
        // marginTop: "2px"
    };
}

export function EditableTextInput({
                                      x,
                                      y,
                                      width,
                                      height,
                                      value,
                                      onChange,
                                      onKeyDown
                                  }) {
    const style = getStyle(width, height);
    return (
        <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <textarea
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          style={style}
          autoFocus
          placeholder='Comment Here...'

      />
        </Html>
    );
}
