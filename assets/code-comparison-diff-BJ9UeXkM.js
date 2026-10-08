import{o as e}from"./index-BfC-87tD.js";import{t}from"./code-comparison-C8n22qe8.js";var n=e(),r=`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
  }
}`,i=`@tailwind base; /* [!code --] */
@tailwind components; /* [!code --] */
@tailwind utilities; /* [!code --] */
@import "tailwindcss"; /* [!code ++] */

@theme inline { /* [!code ++] */
  --color-background: var(--background); /* [!code ++] */
  --color-foreground: var(--foreground); /* [!code ++] */
} /* [!code ++] */

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
}`;function a(){return(0,n.jsx)(t,{beforeCode:r,afterCode:i,language:`css`,filename:`globals.css`})}export{a as default};