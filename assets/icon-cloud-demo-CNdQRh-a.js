var e=`import { IconCloud } from "@/components/ui/icon-cloud"

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "react",
  "nextdotjs",
  "flutter",
  "android",
  "html5",
  "css",
  "nodedotjs",
  "express",
  "vite",
  "prisma",
  "redis",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "vitest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "tailwindcss",
  "androidstudio",
  "graphql",
  "figma",
]

const images = slugs.map((slug) => \`https://cdn.simpleicons.org/\${slug}/\${slug}\`)

export default function IconCloudDemo() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <IconCloud images={images} />
    </div>
  )
}
`;export{e as default};