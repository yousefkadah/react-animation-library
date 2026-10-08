"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type ComponentPropsWithoutRef,
  type Dispatch,
  type ReactNode,
  type Ref,
  type SetStateAction,
} from "react"
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type TreeViewElement = {
  id: string
  name: string
  /** Explicit node type. Use `"folder"` for empty folders; otherwise nodes with `children` are folders. */
  type?: "file" | "folder"
  isSelectable?: boolean
  children?: TreeViewElement[]
}

type TreeSortMode = "default" | "none" | ((a: TreeViewElement, b: TreeViewElement) => number)

type TreeContextProps = {
  selectedId: string | undefined
  expandedItems: string[] | undefined
  indicator: boolean
  handleExpand: (id: string) => void
  selectItem: (id: string) => void
  setExpandedItems: Dispatch<SetStateAction<string[] | undefined>>
  openIcon?: ReactNode
  closeIcon?: ReactNode
  direction: "rtl" | "ltr"
}

const TreeContext = createContext<TreeContextProps | null>(null)

const useTree = () => {
  const context = useContext(TreeContext)
  if (!context) {
    throw new Error("Folder, File and CollapseButton must be used inside a <Tree>.")
  }
  return context
}

const isFolderElement = (element: TreeViewElement) => {
  if (element.type) return element.type === "folder"
  return Array.isArray(element.children)
}

const mergeExpandedItems = (currentItems: string[] | undefined, nextItems: string[]) => [
  ...new Set([...(currentItems ?? []), ...nextItems]),
]

const treeCollator = new Intl.Collator("en", { numeric: true, sensitivity: "base" })

/** Folders first, then natural alphabetical order. */
const defaultTreeComparator = (a: TreeViewElement, b: TreeViewElement) => {
  const aIsFolder = isFolderElement(a)
  const bIsFolder = isFolderElement(b)
  if (aIsFolder !== bIsFolder) return aIsFolder ? -1 : 1
  return treeCollator.compare(a.name, b.name)
}

const sortTreeElements = (elements: TreeViewElement[], sort: TreeSortMode): TreeViewElement[] => {
  const comparator = sort === "none" ? undefined : sort === "default" ? defaultTreeComparator : sort
  const nextElements = elements.map((element) =>
    Array.isArray(element.children) ? { ...element, children: sortTreeElements(element.children, sort) } : element
  )
  return comparator ? [...nextElements].sort(comparator) : nextElements
}

const renderTreeElements = (elements: TreeViewElement[]): ReactNode =>
  elements.map((element) =>
    isFolderElement(element) ? (
      <Folder key={element.id} value={element.id} element={element.name} isSelectable={element.isSelectable}>
        {Array.isArray(element.children) ? renderTreeElements(element.children) : null}
      </Folder>
    ) : (
      <File key={element.id} value={element.id} isSelectable={element.isSelectable}>
        <span>{element.name}</span>
      </File>
    )
  )

type TreeViewProps = {
  ref?: Ref<HTMLDivElement>
  /** Id of the item selected at first. Its parent folders are expanded automatically. */
  initialSelectedId?: string
  /** Show the vertical guide line inside expanded folders. */
  indicator?: boolean
  /** Data to render when `children` are omitted. */
  elements?: TreeViewElement[]
  /** Ids of the folders expanded at first. */
  initialExpandedItems?: string[]
  /** Icon for expanded folders. */
  openIcon?: ReactNode
  /** Icon for collapsed folders. */
  closeIcon?: ReactNode
  /** Sorting used when rendering from `elements`: folders first and alphabetical, input order, or a comparator. */
  sort?: TreeSortMode
  /** Called when a folder or file is selected. */
  onSelect?: (id: string) => void
  dir?: "rtl" | "ltr"
} & Omit<ComponentPropsWithoutRef<"div">, "dir" | "onSelect">

const Tree = ({
  ref,
  className,
  elements,
  initialSelectedId,
  initialExpandedItems,
  children,
  indicator = true,
  openIcon,
  closeIcon,
  sort = "default",
  onSelect,
  dir,
  ...props
}: TreeViewProps) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(initialSelectedId)
  const [expandedItems, setExpandedItems] = useState<string[] | undefined>(initialExpandedItems)

  const selectItem = useCallback(
    (id: string) => {
      setSelectedId(id)
      onSelect?.(id)
    },
    [onSelect]
  )

  const handleExpand = useCallback((id: string) => {
    setExpandedItems((previous) =>
      previous?.includes(id) ? previous.filter((item) => item !== id) : [...(previous ?? []), id]
    )
  }, [])

  /** Expands every folder on the path to `selectId` (and the item itself when it is a selectable folder). */
  const expandSpecificTargetedElements = useCallback((elements?: TreeViewElement[], selectId?: string) => {
    if (!elements || !selectId) return
    const findParent = (currentElement: TreeViewElement, currentPath: string[] = []) => {
      const isSelectable = currentElement.isSelectable ?? true
      const newPath = [...currentPath, currentElement.id]
      if (currentElement.id === selectId) {
        if (!isSelectable) newPath.pop()
        setExpandedItems((previous) => mergeExpandedItems(previous, newPath))
        return
      }
      currentElement.children?.forEach((child) => findParent(child, newPath))
    }
    elements.forEach((element) => findParent(element))
  }, [])

  useEffect(() => {
    if (initialSelectedId) expandSpecificTargetedElements(elements, initialSelectedId)
  }, [initialSelectedId, elements, expandSpecificTargetedElements])

  const direction = dir === "rtl" ? "rtl" : "ltr"
  const treeChildren = children ?? (elements ? renderTreeElements(sortTreeElements(elements, sort)) : null)

  return (
    <TreeContext.Provider
      value={{
        selectedId,
        expandedItems,
        handleExpand,
        selectItem,
        setExpandedItems,
        indicator,
        openIcon,
        closeIcon,
        direction,
      }}
    >
      <div className={cn("size-full", className)} {...props}>
        <div ref={ref} className="relative h-full overflow-auto px-2" dir={direction}>
          <div className="flex flex-col gap-1" dir={direction}>
            {treeChildren}
          </div>
        </div>
      </div>
    </TreeContext.Provider>
  )
}

function TreeIndicator({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  const { direction } = useTree()

  return (
    <div
      dir={direction}
      className={cn(
        "absolute start-1.5 h-full w-px rounded-md bg-border py-3 duration-300 ease-in-out hover:bg-slate-300 dark:hover:bg-slate-600",
        className
      )}
      {...props}
    />
  )
}

type FolderProps = {
  ref?: Ref<HTMLDivElement>
  /** Folder name. */
  element: string
  /** Unique id, used for selection and expansion. */
  value: string
  isSelectable?: boolean
  /** Force the selected state. Defaults to whether this folder is the tree's selected item. */
  isSelect?: boolean
  /** Classes for the folder's button. */
  className?: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "className">

const Folder = ({ ref, className, element, value, isSelectable = true, isSelect, children, ...props }: FolderProps) => {
  const { direction, handleExpand, expandedItems, indicator, selectedId, selectItem, openIcon, closeIcon } = useTree()
  const contentId = useId()
  const isSelected = isSelect ?? selectedId === value
  const isOpen = expandedItems?.includes(value) ?? false

  return (
    <div ref={ref} {...props} className="relative h-full overflow-hidden" data-state={isOpen ? "open" : "closed"}>
      <button
        type="button"
        disabled={!isSelectable}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className={cn(
          "flex items-center gap-1 rounded-md text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset",
          className,
          {
            "rounded-md bg-muted": isSelected && isSelectable,
            "cursor-pointer": isSelectable,
            "cursor-not-allowed opacity-50": !isSelectable,
          }
        )}
        onClick={() => {
          selectItem(value)
          handleExpand(value)
        }}
      >
        {isOpen
          ? (openIcon ?? <FolderOpenIcon className="size-4" aria-hidden="true" />)
          : (closeIcon ?? <FolderIcon className="size-4" aria-hidden="true" />)}
        <span>{element}</span>
      </button>
      <div
        id={contentId}
        inert={!isOpen}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="relative min-h-0 overflow-hidden text-sm">
          {element && indicator && <TreeIndicator aria-hidden="true" />}
          <div className="ms-5 flex flex-col gap-1 py-1" dir={direction}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

type FileProps = {
  ref?: Ref<HTMLButtonElement>
  /** Unique id, used for selection. */
  value: string
  /** Called with `value` when the file is clicked. */
  handleSelect?: (id: string) => void
  isSelectable?: boolean
  /** Force the selected state. Defaults to whether this file is the tree's selected item. */
  isSelect?: boolean
  /** Custom icon. */
  fileIcon?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const File = ({
  ref,
  value,
  className,
  handleSelect,
  onClick,
  isSelectable = true,
  isSelect,
  fileIcon,
  children,
  ...props
}: FileProps) => {
  const { selectedId, selectItem } = useTree()
  const isSelected = isSelect ?? selectedId === value

  return (
    <button
      ref={ref}
      type="button"
      disabled={!isSelectable}
      className={cn(
        "flex w-fit items-center gap-1 rounded-md pe-1 text-sm outline-none duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset",
        { "bg-muted": isSelected && isSelectable },
        isSelectable ? "cursor-pointer" : "cursor-not-allowed opacity-50",
        className
      )}
      onClick={(event) => {
        selectItem(value)
        handleSelect?.(value)
        onClick?.(event)
      }}
      {...props}
    >
      {fileIcon ?? <FileIcon className="size-4" aria-hidden="true" />}
      {children}
    </button>
  )
}

type CollapseButtonProps = {
  ref?: Ref<HTMLButtonElement>
  /** The tree's data, used to find every folder to expand. */
  elements: TreeViewElement[]
  /** Expand every folder straight away. */
  expandAll?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

/** Ids of every selectable folder that has children. */
const expandAllTree = (elements: TreeViewElement[]) => {
  const expandedElementIds: string[] = []
  const expandTree = (element: TreeViewElement) => {
    const isSelectable = element.isSelectable ?? true
    if (isSelectable && element.children && element.children.length > 0) {
      expandedElementIds.push(element.id)
      element.children.forEach(expandTree)
    }
  }
  elements.forEach(expandTree)
  return [...new Set(expandedElementIds)]
}

const CollapseButton = ({ ref, className, elements, expandAll = false, children, onClick, ...props }: CollapseButtonProps) => {
  const { expandedItems, setExpandedItems } = useTree()

  useEffect(() => {
    if (expandAll) setExpandedItems(expandAllTree(elements))
  }, [expandAll, elements, setExpandedItems])

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "absolute end-2 bottom-1 inline-flex h-8 w-fit cursor-pointer items-center justify-center gap-2 rounded-md p-1 text-sm font-medium whitespace-nowrap outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50",
        className
      )}
      onClick={(event) => {
        setExpandedItems(expandedItems && expandedItems.length > 0 ? [] : expandAllTree(elements))
        onClick?.(event)
      }}
      {...props}
    >
      {children}
      <span className="sr-only">Toggle</span>
    </button>
  )
}

export { CollapseButton, File, Folder, Tree, type TreeViewElement, type TreeSortMode }
export type { TreeViewProps as TreeProps, FolderProps, FileProps, CollapseButtonProps }
