import{o as e}from"./index-Bg9Yv0sK.js";import{t}from"./code-comparison-CFYvxDb1.js";var n=e(),r=`function greet(name) {
  // Say hello
  return 'Hello, ' + name + '!'
}`,i=`const greet = (name: string) => {
  // Say hello
  return \`Hello, \${name}!\`
}`,a=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`),o=e=>`<pre><code>${a(e).replace(/(\/\/.*$)|('[^']*'|`[^`]*`)|\b(const|function|return|string)\b/gm,(e,t,n)=>`<span class="${t?`text-muted-foreground italic`:n?`text-emerald-600 dark:text-emerald-400`:`text-rose-600 dark:text-rose-400`}">${e}</span>`).split(`
`).map(e=>`<span class="line">${e}</span>`).join(`
`)}</code></pre>`;function s(){return(0,n.jsx)(t,{beforeCode:r,afterCode:i,language:`typescript`,filename:`greet.ts`,highlighter:o})}export{s as default};