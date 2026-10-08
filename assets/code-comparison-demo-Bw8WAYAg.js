import{o as e}from"./index-BfC-87tD.js";import{t}from"./code-comparison-C8n22qe8.js";var n=e(),r=`import { Component } from "react"

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
}`,i=`import { useEffect, useState } from "react" // [!code ++]
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
}`;function a(){return(0,n.jsx)(t,{beforeCode:r,afterCode:i,language:`tsx`,filename:`counter.tsx`,lightTheme:`github-light`,darkTheme:`github-dark`,highlightColor:`rgba(101, 117, 133, 0.16)`})}export{a as default};