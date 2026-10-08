"use client"

import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

/** Seconds for the grid to scroll one loop (shared by the WebGL renderer and the CSS fallback). */
const ANIMATION_DURATION_SECONDS = 15
const PERSPECTIVE_PX = 200
const MIN_ANGLE = 1
const MAX_ANGLE = 89
const MAX_DEVICE_PIXEL_RATIO = 2
const GRID_HEIGHT_RATIO = 3
const GRID_LINE_ALIGNMENT_OFFSET_PX = 0.5
const GRID_LINE_ANTIALIAS_MULTIPLIER = 0.9
const GRID_LINE_WIDTH_PX = 0.92
const GRID_START_OFFSET_RATIO = -0.5
const GRID_WIDTH_RATIO = 6
const GRID_X_OFFSET_RATIO = -2

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

/**
 * Ray-casts every pixel onto a tilted plane and draws anti-aliased grid lines on it, fading
 * lines into coarser levels of detail near the horizon so the grid never shimmers or moirés.
 */
const FRAGMENT_SHADER_SOURCE = `
#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform vec2 u_container_size;
uniform vec2 u_viewport_size;
uniform vec4 u_line_color;
uniform float u_angle;
uniform float u_cell_size;
uniform float u_device_pixel_ratio;
uniform float u_time;

const float animationDurationSeconds = ${ANIMATION_DURATION_SECONDS.toFixed(1)};
const float gridHeightRatio = ${GRID_HEIGHT_RATIO.toFixed(1)};
const float gridStartOffsetRatio = ${GRID_START_OFFSET_RATIO.toFixed(1)};
const float gridWidthRatio = ${GRID_WIDTH_RATIO.toFixed(1)};
const float gridXOffsetRatio = ${GRID_X_OFFSET_RATIO.toFixed(1)};
const float gridLineAlignmentOffsetPx = ${GRID_LINE_ALIGNMENT_OFFSET_PX.toFixed(1)};
const float gridLineAntialiasMultiplier = ${GRID_LINE_ANTIALIAS_MULTIPLIER.toFixed(1)};
const float horizontalLodLevelOneEndPx = 5.6;
const float horizontalLodLevelOneStartPx = 2.8;
const float horizontalLodLevelTwoEndPx = 3.0;
const float horizontalLodLevelTwoStartPx = 1.4;
const float horizontalCompressionEndPx = 2.8;
const float horizontalCompressionStartPx = 1.2;
const float lineWidthPx = ${GRID_LINE_WIDTH_PX.toFixed(2)};
const float perspectivePx = ${PERSPECTIVE_PX.toFixed(1)};
const float gridTravelRatio = 0.5;
const float verticalCompressionEndPx = 2.6;
const float verticalCompressionStartPx = 1.0;
const float verticalEdgeCompressionEnd = 0.95;
const float verticalEdgeCompressionStart = 0.45;
const float verticalLodLevelEnd = 0.64;
const float verticalLodLevelStart = 0.22;
const float verticalTopCompressionEndCells = 6.0;
const float verticalTopCompressionStartCells = 2.0;

float renderGridLine(float wrappedCoord, float antiAliasWidth, float softnessBoost) {
  return 1.0 - smoothstep(lineWidthPx, lineWidthPx + (antiAliasWidth * (1.5 + softnessBoost)), wrappedCoord);
}

void main() {
  float angle = radians(clamp(u_angle, 1.0, 89.0));
  float sinAngle = sin(angle);
  float cosAngle = cos(angle);
  vec2 screen = vec2(
    (gl_FragCoord.x / u_device_pixel_ratio) - (u_container_size.x * 0.5),
    (u_container_size.y * 0.5) - (gl_FragCoord.y / u_device_pixel_ratio)
  );

  vec3 rayOrigin = vec3(0.0, 0.0, perspectivePx);
  vec3 rayDirection = normalize(vec3(screen, -perspectivePx));
  vec3 planeXAxis = vec3(1.0, 0.0, 0.0);
  vec3 planeYAxis = vec3(0.0, cosAngle, sinAngle);
  vec3 planeNormal = normalize(cross(planeXAxis, planeYAxis));
  float denominator = dot(rayDirection, planeNormal);

  if (abs(denominator) < 0.0001) {
    discard;
  }

  float distanceToPlane = dot(-rayOrigin, planeNormal) / denominator;

  if (distanceToPlane <= 0.0) {
    discard;
  }

  vec3 hitPoint = rayOrigin + (rayDirection * distanceToPlane);
  float localX = hitPoint.x;
  float localY = dot(hitPoint, planeYAxis);
  float gridWidth = u_viewport_size.x * gridWidthRatio;
  float gridHeight = u_viewport_size.y * gridHeightRatio;
  float gridScrollSpeed = (gridHeight * gridTravelRatio) / animationDurationSeconds;
  float patternOffsetY = u_time * gridScrollSpeed;
  float gridLeft = (-0.5 * u_container_size.x) + (gridXOffsetRatio * u_container_size.x);
  float gridTop = (-0.5 * u_container_size.y) + (gridStartOffsetRatio * gridHeight);
  vec2 planePosition = vec2(localX - gridLeft, localY - gridTop);

  if (planePosition.x < 0.0 || planePosition.y < 0.0 || planePosition.x > gridWidth || planePosition.y > gridHeight) {
    discard;
  }

  vec2 patternPosition = vec2(planePosition.x, planePosition.y - patternOffsetY);
  vec2 wrapped = mod(patternPosition + vec2(gridLineAlignmentOffsetPx), u_cell_size);
  vec2 patternDerivative = max(fwidth(patternPosition), vec2(0.0001));
  vec2 antiAliasWidth = patternDerivative * gridLineAntialiasMultiplier;
  float horizontalCellSpanPx = u_cell_size / patternDerivative.y;
  float horizontalCompression = 1.0 - smoothstep(horizontalCompressionStartPx, horizontalCompressionEndPx, horizontalCellSpanPx);
  float verticalCellSpanPx = u_cell_size / patternDerivative.x;
  float sideDistance = abs((planePosition.x / gridWidth) * 2.0 - 1.0);
  float verticalEdgeCompression = smoothstep(verticalEdgeCompressionStart, verticalEdgeCompressionEnd, sideDistance);
  float verticalTopCompression = 1.0 - smoothstep(
    u_cell_size * verticalTopCompressionStartCells,
    u_cell_size * verticalTopCompressionEndCells,
    planePosition.y
  );
  float verticalCompression =
    (1.0 - smoothstep(verticalCompressionStartPx, verticalCompressionEndPx, verticalCellSpanPx))
    * verticalEdgeCompression * verticalTopCompression;
  float horizontalSoftnessBoost = 1.0 + (horizontalCompression * 3.0);
  float verticalSoftnessBoost = 1.0 + (verticalCompression * 3.5);
  float verticalLod = smoothstep(verticalLodLevelStart, verticalLodLevelEnd, verticalCompression);
  float verticalLineFine = renderGridLine(wrapped.x, antiAliasWidth.x, verticalSoftnessBoost);
  float verticalWrappedLod = mod(patternPosition.x + gridLineAlignmentOffsetPx, u_cell_size * 2.0);
  float verticalLineCoarse = renderGridLine(verticalWrappedLod, antiAliasWidth.x, verticalSoftnessBoost + verticalLod);
  float verticalLine = max(verticalLineFine * (1.0 - verticalLod), verticalLineCoarse * verticalLod);
  float horizontalLodLevelOne = 1.0 - smoothstep(horizontalLodLevelOneStartPx, horizontalLodLevelOneEndPx, horizontalCellSpanPx);
  float horizontalLodLevelTwo = 1.0 - smoothstep(horizontalLodLevelTwoStartPx, horizontalLodLevelTwoEndPx, horizontalCellSpanPx);
  float horizontalLineFine = renderGridLine(wrapped.y, antiAliasWidth.y, horizontalSoftnessBoost);
  float horizontalWrappedLodOne = mod(patternPosition.y + gridLineAlignmentOffsetPx, u_cell_size * 2.0);
  float horizontalWrappedLodTwo = mod(patternPosition.y + gridLineAlignmentOffsetPx, u_cell_size * 4.0);
  float horizontalLineCoarse = renderGridLine(
    horizontalWrappedLodOne,
    antiAliasWidth.y,
    horizontalSoftnessBoost + horizontalLodLevelOne
  );
  float horizontalLineExtraCoarse = renderGridLine(
    horizontalWrappedLodTwo,
    antiAliasWidth.y,
    horizontalSoftnessBoost + horizontalLodLevelOne + horizontalLodLevelTwo
  );
  float horizontalLineReduced = max(
    horizontalLineFine * (1.0 - horizontalLodLevelOne),
    horizontalLineCoarse * horizontalLodLevelOne
  );
  float horizontalLine = max(
    horizontalLineReduced * (1.0 - horizontalLodLevelTwo),
    horizontalLineExtraCoarse * horizontalLodLevelTwo
  );
  float line = max(verticalLine, horizontalLine);

  if (line <= 0.001) {
    discard;
  }

  float alpha = u_line_color.a * line;
  gl_FragColor = vec4(u_line_color.rgb * alpha, alpha);
}
`

interface RetroGridScene {
  /** Draws one frame. `time` is in seconds; pass 0 to freeze the grid. */
  draw(options: { width: number; height: number; time: number; angle: number; cellSize: number; color: Float32Array }): void
  /** Resizes the drawing buffer to the container (in CSS pixels). */
  resize(width: number, height: number): void
  dispose(): void
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader
  gl.deleteShader(shader)
  return null
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE)
  if (!vertexShader || !fragmentShader) {
    if (vertexShader) gl.deleteShader(vertexShader)
    if (fragmentShader) gl.deleteShader(fragmentShader)
    return null
  }
  const program = gl.createProgram()
  if (!program) {
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    return null
  }
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program
  gl.deleteProgram(program)
  return null
}

/**
 * Compiles the grid shader on `canvas`. Returns `null` when WebGL (or the derivatives
 * extension) is unavailable, so the caller can fall back to the CSS grid.
 */
function createRetroGridScene(canvas: HTMLCanvasElement): RetroGridScene | null {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true })
  if (!gl || !gl.getExtension("OES_standard_derivatives")) return null

  const program = createProgram(gl)
  if (!program) return null

  const position = gl.getAttribLocation(program, "a_position")
  const uniform = (name: string) => gl.getUniformLocation(program, name)
  const uniforms = {
    angle: uniform("u_angle"),
    cellSize: uniform("u_cell_size"),
    containerSize: uniform("u_container_size"),
    devicePixelRatio: uniform("u_device_pixel_ratio"),
    lineColor: uniform("u_line_color"),
    time: uniform("u_time"),
    viewportSize: uniform("u_viewport_size"),
  }
  const buffer = gl.createBuffer()
  if (position < 0 || !buffer || Object.values(uniforms).some((location) => !location)) {
    if (buffer) gl.deleteBuffer(buffer)
    gl.deleteProgram(program)
    return null
  }

  // One oversized triangle that covers the whole viewport.
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)

  let dpr = 1

  return {
    resize(width, height) {
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    },
    draw({ width, height, time, angle, cellSize, color }) {
      gl.useProgram(program)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uniforms.angle, clamp(angle, MIN_ANGLE, MAX_ANGLE))
      gl.uniform1f(uniforms.cellSize, Math.max(cellSize, 1))
      gl.uniform2f(uniforms.containerSize, width, height)
      gl.uniform1f(uniforms.devicePixelRatio, dpr)
      gl.uniform4fv(uniforms.lineColor, color)
      // Only the scroll offset modulo four cells is visible, so wrap time to keep float precision.
      const scrollSpeed = (window.innerHeight * GRID_HEIGHT_RATIO * 0.5) / ANIMATION_DURATION_SECONDS
      const loopSeconds = scrollSpeed > 0 ? (4 * Math.max(cellSize, 1)) / scrollSpeed : Infinity
      gl.uniform1f(uniforms.time, time % loopSeconds)
      gl.uniform2f(uniforms.viewportSize, window.innerWidth, window.innerHeight)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
    dispose() {
      if (gl.isContextLost()) return
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    },
  }
}

let colorContext: CanvasRenderingContext2D | null | undefined

/** Converts any CSS colour (including `oklch()` and named colours) to premultiplied-ready RGBA floats. */
function colorToRgba(color: string): Float32Array {
  if (colorContext === undefined) {
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = 1
    colorContext = canvas.getContext("2d", { willReadFrequently: true })
  }
  if (!colorContext) return new Float32Array([0.5, 0.5, 0.5, 1])
  colorContext.clearRect(0, 0, 1, 1)
  colorContext.fillStyle = color
  colorContext.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = colorContext.getImageData(0, 0, 1, 1).data
  return new Float32Array([r / 255, g / 255, b / 255, a / 255])
}

export interface RetroGridProps extends ComponentPropsWithoutRef<"div"> {
  /** Tilt of the grid in degrees (1–89). */
  angle?: number
  /** Size of one grid cell in pixels. */
  cellSize?: number
  /** Opacity of the whole grid. */
  opacity?: number
  /** Line colour in light mode (any CSS colour). */
  lightLineColor?: string
  /** Line colour in dark mode (any CSS colour). */
  darkLineColor?: string
}

export function RetroGrid({
  className,
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
  style,
  ...props
}: RetroGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  /** Its computed colour is the active line colour, whichever way the app implements dark mode. */
  const colorProbeRef = useRef<HTMLSpanElement>(null)
  const [isWebGlReady, setIsWebGlReady] = useState(false)
  const settingsRef = useRef({ angle, cellSize })
  const syncSceneRef = useRef<(() => void) | null>(null)

  const normalizedAngle = clamp(angle, MIN_ANGLE, MAX_ANGLE)
  const normalizedCellSize = Math.max(cellSize, 1)

  useEffect(() => {
    settingsRef.current = { angle: normalizedAngle, cellSize: normalizedCellSize }
    syncSceneRef.current?.()
  }, [normalizedAngle, normalizedCellSize, lightLineColor, darkLineColor])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)") ?? null
    const colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)") ?? null
    let scene: RetroGridScene | null = null
    let width = 0
    let height = 0
    let lineColor: Float32Array = new Float32Array([0.5, 0.5, 0.5, 1])
    let isVisible = true
    let isContextLost = false
    let animationFrame: number | null = null

    const draw = (timestamp: number) => {
      if (!scene || !width || !height || isContextLost) return
      scene.draw({
        width,
        height,
        time: reducedMotion?.matches ? 0 : timestamp / 1000,
        angle: settingsRef.current.angle,
        cellSize: settingsRef.current.cellSize,
        color: lineColor,
      })
    }

    const stop = () => {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame)
      animationFrame = null
    }

    const frame = (timestamp: number) => {
      draw(timestamp)
      animationFrame = !reducedMotion?.matches && isVisible ? requestAnimationFrame(frame) : null
    }

    /** (Re)builds the WebGL scene when needed, resizes it, redraws, and starts or stops the loop. */
    const syncScene = () => {
      if (!isContextLost && !scene) scene = createRetroGridScene(canvas)
      if (isContextLost || !scene) {
        stop()
        setIsWebGlReady(false)
        return
      }

      width = Math.floor(container.clientWidth)
      height = Math.floor(container.clientHeight)
      if (!width || !height) {
        stop()
        return
      }

      scene.resize(width, height)
      if (colorProbeRef.current) lineColor = colorToRgba(getComputedStyle(colorProbeRef.current).color)
      draw(performance.now())
      setIsWebGlReady(true)

      if (reducedMotion?.matches || !isVisible) stop()
      else if (animationFrame === null) animationFrame = requestAnimationFrame(frame)
    }
    syncSceneRef.current = syncScene

    const onContextLost = (event: Event) => {
      event.preventDefault()
      isContextLost = true
      scene = null
      stop()
      setIsWebGlReady(false)
    }
    const onContextRestored = () => {
      isContextLost = false
      syncScene()
    }

    reducedMotion?.addEventListener?.("change", syncScene)
    colorScheme?.addEventListener?.("change", syncScene)
    window.addEventListener("resize", syncScene)
    canvas.addEventListener("webglcontextlost", onContextLost)
    canvas.addEventListener("webglcontextrestored", onContextRestored)

    const resizeObserver = new ResizeObserver(syncScene)
    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? false
      if (isVisible) syncScene()
      else stop()
    })
    intersectionObserver.observe(container)

    // Theme toggles usually flip a class or attribute on <html>.
    const themeObserver = new MutationObserver(syncScene)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] })

    syncScene()

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      reducedMotion?.removeEventListener?.("change", syncScene)
      colorScheme?.removeEventListener?.("change", syncScene)
      window.removeEventListener("resize", syncScene)
      canvas.removeEventListener("webglcontextlost", onContextLost)
      canvas.removeEventListener("webglcontextrestored", onContextRestored)
      syncSceneRef.current = null
      scene?.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      {...props}
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [--retro-grid-line:var(--retro-grid-light-line)] dark:[--retro-grid-line:var(--retro-grid-dark-line)]",
        className
      )}
      style={
        {
          opacity,
          "--retro-grid-light-line": lightLineColor,
          "--retro-grid-dark-line": darkLineColor,
          ...style,
        } as CSSProperties
      }
    >
      <span ref={colorProbeRef} className="hidden text-(--retro-grid-line)" />

      {/* CSS fallback while WebGL starts up, or when it isn't available */}
      {!isWebGlReady && (
        <div className="absolute inset-0" style={{ perspective: `${PERSPECTIVE_PX}px` }}>
          <div className="absolute inset-0" style={{ transform: `rotateX(${normalizedAngle}deg)` }}>
            <div
              className="animate-retro-grid absolute inset-[0%_0px] ml-[-200%] h-[300vh] w-[600vw] origin-[100%_0_0] [background-image:linear-gradient(to_right,var(--retro-grid-line)_1px,transparent_0),linear-gradient(to_bottom,var(--retro-grid-line)_1px,transparent_0)] bg-repeat motion-reduce:animate-none"
              style={{ backgroundSize: `${normalizedCellSize}px ${normalizedCellSize}px`, transform: "translateY(-50%)" }}
            />
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className={cn("absolute inset-0 size-full", isWebGlReady ? "opacity-100" : "opacity-0")} />

      <div className="absolute inset-0 bg-linear-to-t from-background to-transparent to-90%" />
    </div>
  )
}
