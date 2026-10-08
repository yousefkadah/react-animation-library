import { CodeComparison } from "@/components/ui/code-comparison"

const beforeCode = `import { Component } from "react"

export class Counter extends Component {
  state = { count: 0 } // [!code highlight]

  get double() { // [!code highlight]
    return this.state.count * 2 // [!code highlight]
  } // [!code highlight]

  increment = () => {
    this.setState(({ count }) => ({ count: count + 1 }))
  }

  componentDidMount() {
    console.log(\`count is \${this.state.count}\`)
  }

  render() {
    return (
      <button onClick={this.increment}>
        {this.state.count} × 2 = {this.double}
      </button>
    )
  }
}`

const afterCode = `import { useEffect, useState } from "react" // [!code ++]
import { Component } from "react" // [!code --]

export function Counter() {
  const [count, setCount] = useState(0) // [!code focus]
  const double = count * 2 // [!code focus]
  const increment = () => setCount((value) => value + 1)

  useEffect(() => {
    console.log(\`count is \${count}\`)
  }, [])

  return (
    <button onClick={increment}>
      {count} × 2 = {double}
    </button>
  )
}`

export default function CodeComparisonDemo() {
  return (
    <CodeComparison
      beforeCode={beforeCode}
      afterCode={afterCode}
      language="tsx"
      filename="counter.tsx"
      lightTheme="github-light"
      darkTheme="github-dark"
      highlightColor="rgba(101, 117, 133, 0.16)"
    />
  )
}
