var e=`"use client"

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
} from "react"
import confetti from "canvas-confetti"
import type { CreateTypes, GlobalOptions as ConfettiGlobalOptions, Options as ConfettiOptions } from "canvas-confetti"

import { cn } from "@/lib/utils"

/** What \`<Confetti>\` exposes through its ref and to its children. */
export interface ConfettiRef {
  /** Fires a burst on the component's canvas. Per-call options override the \`options\` prop. */
  fire: (options?: ConfettiOptions) => Promise<void>
}

export interface ConfettiProps extends ComponentPropsWithoutRef<"canvas"> {
  /** Default options for every burst. */
  options?: ConfettiOptions
  /** Options for \`confetti.create()\`: \`resize\`, \`useWorker\`, \`disableForReducedMotion\`. */
  globalOptions?: ConfettiGlobalOptions
  /** Don't fire a burst on mount; call \`fire()\` yourself. */
  manualstart?: boolean
  /** Rendered after the canvas; can call \`useConfetti()\` to get \`{ fire }\`. */
  children?: ReactNode
}

const ConfettiContext = createContext<ConfettiRef | null>(null)

/** Access the nearest \`<Confetti>\` from one of its children. Returns \`null\` outside one. */
export function useConfetti(): ConfettiRef | null {
  return useContext(ConfettiContext)
}

const DEFAULT_GLOBAL_OPTIONS: ConfettiGlobalOptions = { resize: true, useWorker: true }

export const Confetti = forwardRef<ConfettiRef, ConfettiProps>(function Confetti(
  { options, globalOptions = DEFAULT_GLOBAL_OPTIONS, manualstart = false, children, className, ...props },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const instanceRef = useRef<CreateTypes | null>(null)
  const optionsRef = useRef(options)
  const globalOptionsRef = useRef(globalOptions)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useEffect(() => {
    globalOptionsRef.current = globalOptions
  }, [globalOptions])

  useEffect(() => {
    if (canvasRef.current && !instanceRef.current) {
      instanceRef.current = confetti.create(canvasRef.current, { resize: true, useWorker: true, ...globalOptionsRef.current })
    }
    return () => {
      instanceRef.current?.reset()
      instanceRef.current = null
    }
  }, [])

  const fire = useCallback(async (opts: ConfettiOptions = {}) => {
    try {
      await instanceRef.current?.({ ...optionsRef.current, ...opts })
    } catch (error) {
      console.error("Confetti error:", error)
    }
  }, [])

  const api = useMemo<ConfettiRef>(() => ({ fire }), [fire])
  useImperativeHandle(ref, () => api, [api])

  useEffect(() => {
    if (!manualstart) void fire()
  }, [manualstart, fire])

  return (
    <ConfettiContext.Provider value={api}>
      <canvas ref={canvasRef} className={className} {...props} />
      {children}
    </ConfettiContext.Provider>
  )
})

export interface ConfettiButtonProps extends ComponentPropsWithoutRef<"button"> {
  /** Burst options. The origin is always the centre of the button. */
  options?: ConfettiOptions & ConfettiGlobalOptions & { canvas?: HTMLCanvasElement }
}

export const ConfettiButton = forwardRef<HTMLButtonElement, ConfettiButtonProps>(function ConfettiButton(
  { options, children, className, onClick, ...props },
  ref
) {
  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      onClick?.(event)
      if (event.defaultPrevented) return
      const rect = event.currentTarget.getBoundingClientRect()
      await confetti({
        zIndex: 9999,
        ...options,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
      })
    } catch (error) {
      console.error("Confetti button error:", error)
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-xs transition-colors outline-none hover:bg-primary/90 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
})
`;export{e as default};