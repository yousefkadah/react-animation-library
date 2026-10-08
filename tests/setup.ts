/**
 * happy-dom lacks a few browser APIs the components rely on. These stubs only need to
 * let components mount; visual behaviour is checked in the browser.
 */
class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

const globals = globalThis as Record<string, unknown>
globals.IntersectionObserver ??= ObserverStub
globals.ResizeObserver ??= ObserverStub
globals.matchMedia ??= (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent: () => false,
})

if (typeof HTMLCanvasElement !== 'undefined') {
  const context2d = new Proxy(
    {},
    {
      get: (_target, key) => {
        if (key === 'measureText') return () => ({ width: 10 })
        if (key === 'getImageData' || key === 'createImageData') return () => ({ data: new Uint8ClampedArray(4) })
        if (key === 'createLinearGradient' || key === 'createRadialGradient' || key === 'createPattern') return () => ({ addColorStop() {} })
        return typeof key === 'string' && /^[a-z]/.test(key) ? () => {} : undefined
      },
      set: () => true,
    },
  )
  HTMLCanvasElement.prototype.getContext = function getContext(type: string) {
    return type === '2d' ? (context2d as unknown as CanvasRenderingContext2D) : null
  } as typeof HTMLCanvasElement.prototype.getContext
}

if (typeof HTMLMediaElement !== 'undefined') {
  HTMLMediaElement.prototype.play = () => Promise.resolve()
  HTMLMediaElement.prototype.pause = () => {}
}
