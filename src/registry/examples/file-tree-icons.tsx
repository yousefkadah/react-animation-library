"use client"

import { useState } from "react"
import { FileCode2, FileJson, FolderClosed, FolderGit2 } from "lucide-react"

import { File, Folder, Tree } from "@/components/ui/file-tree"

const codeIcon = <FileCode2 className="size-4" aria-hidden="true" />
const jsonIcon = <FileJson className="size-4" aria-hidden="true" />

export default function FileTreeIcons() {
  const [selected, setSelected] = useState("app")

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <div className="h-[260px] overflow-hidden rounded-lg border bg-background">
        <Tree
          className="p-2"
          initialSelectedId="app"
          initialExpandedItems={["root", "src"]}
          openIcon={<FolderGit2 className="size-4" aria-hidden="true" />}
          closeIcon={<FolderClosed className="size-4" aria-hidden="true" />}
          indicator={false}
          onSelect={setSelected}
        >
          <Folder element="react-magic-ui" value="root">
            <Folder element="src" value="src">
              <File value="app" fileIcon={codeIcon}>
                <span>App.tsx</span>
              </File>
              <File value="main" fileIcon={codeIcon}>
                <span>main.tsx</span>
              </File>
            </Folder>
            <Folder element="public" value="public">
              <File value="favicon">
                <span>favicon.svg</span>
              </File>
            </Folder>
            <File value="package" fileIcon={jsonIcon}>
              <span>package.json</span>
            </File>
            <File value="tsconfig" fileIcon={jsonIcon}>
              <span>tsconfig.json</span>
            </File>
          </Folder>
        </Tree>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Selected: <code className="rounded bg-muted px-1 py-0.5 font-mono">{selected}</code>
      </p>
    </div>
  )
}
