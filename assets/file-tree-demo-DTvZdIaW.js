var e=`import { Tree, type TreeViewElement } from "@/components/ui/file-tree"

const ELEMENTS: TreeViewElement[] = [
  {
    id: "src",
    type: "folder",
    name: "src",
    children: [
      {
        id: "lib",
        type: "folder",
        name: "lib",
        children: [{ id: "utils", name: "utils.ts" }],
      },
      {
        id: "pages",
        type: "folder",
        name: "pages",
        children: [
          { id: "index", name: "index.tsx" },
          { id: "about", name: "about.tsx" },
        ],
      },
      {
        id: "components",
        type: "folder",
        name: "components",
        children: [
          { id: "header", name: "site-header.tsx" },
          {
            id: "ui",
            type: "folder",
            name: "ui",
            children: [{ id: "button", name: "button.tsx" }],
          },
          { id: "footer", name: "site-footer.tsx" },
        ],
      },
      { id: "app", name: "App.tsx" },
      { id: "main", name: "main.tsx" },
    ],
  },
]

export default function FileTreeDemo() {
  return (
    <div className="relative flex h-[300px] w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <Tree
        className="overflow-hidden rounded-md bg-background p-2"
        initialSelectedId="button"
        initialExpandedItems={["src", "pages", "components", "ui", "lib"]}
        elements={ELEMENTS}
      />
    </div>
  )
}
`;export{e as default};