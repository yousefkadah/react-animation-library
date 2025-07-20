import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { clsx } from 'clsx'

interface TabConfig {
  name: string
  code: string
  language?: string
  highlightLines?: number[]
}

type EnhancedCodeBlockProps = {
  language: string
  filename?: string
  highlightLines?: number[]
  className?: string
  showCopyButton?: boolean
  showLineNumbers?: boolean
} & (
  | {
      code: string
      tabs?: never
    }
  | {
      code?: never
      tabs: TabConfig[]
    }
)

const EnhancedCodeBlock: React.FC<EnhancedCodeBlockProps> = ({
  language,
  filename,
  code,
  tabs = [],
  highlightLines = [],
  className,
  showCopyButton = true,
  showLineNumbers = true
}) => {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const tabsExist = tabs.length > 0

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const activeCode = tabsExist ? tabs[activeTab].code : code
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines

  // Copy and Check icons as SVG components
  const CopyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 5.00005C7.01165 5.00005 6.49359 5.01782 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5.01782 6.49359 5 7.01165 5 8.00005V16C5 16.9884 5.01782 17.5065 5.21799 17.908C5.40973 18.2843 5.71569 18.5903 6.09202 18.782C6.49359 18.9822 7.01165 19 8 19H16C16.9884 19 17.5065 18.9822 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C18.9822 17.5065 19 16.9884 19 16V8.00005C19 7.01165 18.9822 6.49359 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5065 5.01782 16.9884 5.00005 16 5.00005H8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 3C9.9319 3 10.3983 3.00275 11.5277 3.048C12.6439 3.09263 13.2609 3.27677 13.7236 3.52786C14.2454 3.80611 14.6973 4.18982 14.9871 4.73056C15.2668 5.2387 15.4612 5.95139 15.4612 7V17H8C7.00319 17 6.90085 16.9927 6.5277 16.952C5.95139 16.8388 5.2387 16.6332 4.73056 16.2764C4.18982 15.9027 3.80611 15.4546 3.52786 14.9264C3.27677 14.4391 3.09263 13.7561 3.048 12.5277C3.00275 11.3017 3 9.9319 3 8V7C3 5.95139 3.1388 5.2387 3.52786 4.73056C3.80611 4.18982 4.24546 3.80611 4.73056 3.52786C5.2387 3.27677 5.95139 3.09263 7.4723 3.048C8.1098 3.00275 8.7927 3 8 3Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )

  const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 12.75L11.25 15L15 9.75M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <div className={clsx('relative w-full rounded-lg bg-slate-900 p-4 font-mono text-sm shadow-xl', className)}>
      <div className="flex flex-col gap-2">
        {/* Tabs */}
        {tabsExist && (
          <div className="flex overflow-x-auto border-b border-slate-700 pb-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={clsx(
                  'px-3 py-2 text-xs transition-colors font-sans whitespace-nowrap',
                  activeTab === index
                    ? 'text-white border-b-2 border-blue-500'
                    : 'text-zinc-400 hover:text-zinc-200'
                )}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}

        {/* Header with filename and copy button */}
        {(filename || showCopyButton) && (
          <div className="flex justify-between items-center py-2">
            {filename && (
              <div className="text-xs text-zinc-400 font-sans">{filename}</div>
            )}
            {showCopyButton && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans px-2 py-1 rounded hover:bg-slate-800"
                title={copied ? 'Copied!' : 'Copy code'}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Code Block */}
      <div className="relative">
        <SyntaxHighlighter
          language={activeLanguage}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            fontSize: '0.875rem',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
          }}
          wrapLines={true}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={{
            color: '#6b7280',
            fontSize: '0.75rem',
            paddingRight: '1rem',
            userSelect: 'none'
          }}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: activeHighlightLines.includes(lineNumber)
                ? 'rgba(59, 130, 246, 0.1)'
                : 'transparent',
              display: 'block',
              width: '100%',
              borderLeft: activeHighlightLines.includes(lineNumber) 
                ? '3px solid #3b82f6'
                : '3px solid transparent',
              paddingLeft: '0.5rem'
            },
          })}
          PreTag="div"
        >
          {String(activeCode)}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default EnhancedCodeBlock
