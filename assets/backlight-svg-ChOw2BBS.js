var e=`import { Backlight } from "@/components/ui/backlight"

export default function BacklightSvg() {
  return (
    <Backlight blur={5} className="flex items-center justify-center py-8">
      <div className="flex items-center gap-8">
        {/* React logo */}
        <svg viewBox="-11.5 -10.23 23 20.46" className="size-20" role="img" aria-label="React">
          <circle r="2.05" fill="#61dafb" />
          <g fill="none" stroke="#61dafb" strokeWidth="1">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
        {/* Spark */}
        <svg viewBox="0 0 24 24" className="size-20" role="img" aria-label="Spark">
          <path d="M12 2l2.6 6.4L21 11l-6.4 2.6L12 20l-2.6-6.4L3 11l6.4-2.6z" fill="#f59e0b" />
        </svg>
        {/* Rings */}
        <svg viewBox="0 0 48 48" className="size-20" role="img" aria-label="Rings">
          <circle cx="18" cy="24" r="12" fill="none" stroke="#ec4899" strokeWidth="5" />
          <circle cx="30" cy="24" r="12" fill="none" stroke="#3b82f6" strokeWidth="5" />
        </svg>
      </div>
    </Backlight>
  )
}
`;export{e as default};