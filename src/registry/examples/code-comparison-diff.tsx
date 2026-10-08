import { CodeComparison } from "@/components/ui/code-comparison"

const beforeCode = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
  }
}`

const afterCode = `@tailwind base; /* [!code --] */
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
}`

export default function CodeComparisonDiff() {
  return <CodeComparison beforeCode={beforeCode} afterCode={afterCode} language="css" filename="globals.css" />
}
