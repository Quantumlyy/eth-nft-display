import React from "react";
import 'tailwindcss/tailwind.css'

export const parameters = {
    controls: { expanded: true }
};

export const decorators = [
    (storyFn) => <div style={{ padding: "16px" }}>{storyFn()}</div>,
];
