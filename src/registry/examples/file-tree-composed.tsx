import { ChevronsDownUp } from "lucide-react"

import { CollapseButton, File, Folder, Tree, type TreeViewElement } from "@/components/ui/file-tree"

// Only used by CollapseButton to know which folders exist.
const ELEMENTS: TreeViewElement[] = [
  {
    id: "1",
    name: "my-app",
    children: [
      { id: "2", name: ".github", children: [{ id: "3", name: "workflows", children: [{ id: "4", name: "ci.yml" }] }] },
      {
        id: "5",
        name: "src",
        children: [
          { id: "6", name: "components", children: [{ id: "7", name: "Dock.tsx" }, { id: "8", name: "Marquee.tsx" }] },
          { id: "9", name: "App.tsx" },
        ],
      },
      { id: "10", name: "package.json" },
    ],
  },
]

export default function FileTreeComposed() {
  return (
    <div className="relative flex h-[300px] w-full max-w-sm flex-col overflow-hidden rounded-lg border bg-background">
      <Tree className="p-2" initialSelectedId="7" initialExpandedItems={["1", "5", "6"]} elements={ELEMENTS}>
        <Folder element="my-app" value="1">
          <Folder element=".github" value="2">
            <Folder element="workflows" value="3">
              <File value="4">
                <span>ci.yml</span>
              </File>
            </Folder>
          </Folder>
          <Folder element="src" value="5">
            <Folder element="components" value="6">
              <File value="7">
                <span>Dock.tsx</span>
              </File>
              <File value="8">
                <span>Marquee.tsx</span>
              </File>
              <File value="locked" isSelectable={false}>
                <span>Secret.tsx</span>
              </File>
            </Folder>
            <File value="9">
              <span>App.tsx</span>
            </File>
          </Folder>
          <File value="10">
            <span>package.json</span>
          </File>
        </Folder>
        <CollapseButton elements={ELEMENTS}>
          <ChevronsDownUp className="size-4" />
        </CollapseButton>
      </Tree>
    </div>
  )
}
