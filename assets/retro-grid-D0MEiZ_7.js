import{r as e}from"./rolldown-runtime-hePW80VL.js";import{t}from"./react-Cvdyeg_0.js";import{_ as n,o as r}from"./index-BfC-87tD.js";var i=e(t(),1),a=r(),o=15,s=200,c=1,l=89,u=2,d=3,f=.5,p=.9,m=.92,h=-.5,g=6,_=-2,v=`
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`,y=`
#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform vec2 u_container_size;
uniform vec2 u_viewport_size;
uniform vec4 u_line_color;
uniform float u_angle;
uniform float u_cell_size;
uniform float u_device_pixel_ratio;
uniform float u_time;

const float animationDurationSeconds = ${o.toFixed(1)};
const float gridHeightRatio = ${d.toFixed(1)};
const float gridStartOffsetRatio = ${h.toFixed(1)};
const float gridWidthRatio = ${g.toFixed(1)};
const float gridXOffsetRatio = ${_.toFixed(1)};
const float gridLineAlignmentOffsetPx = ${f.toFixed(1)};
const float gridLineAntialiasMultiplier = ${p.toFixed(1)};
const float horizontalLodLevelOneEndPx = 5.6;
const float horizontalLodLevelOneStartPx = 2.8;
const float horizontalLodLevelTwoEndPx = 3.0;
const float horizontalLodLevelTwoStartPx = 1.4;
const float horizontalCompressionEndPx = 2.8;
const float horizontalCompressionStartPx = 1.2;
const float lineWidthPx = ${m.toFixed(2)};
const float perspectivePx = ${s.toFixed(1)};
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
`;function b(e,t,n){return Math.min(Math.max(e,t),n)}function x(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(e.deleteShader(r),null)):null}function S(e){let t=x(e,e.VERTEX_SHADER,v),n=x(e,e.FRAGMENT_SHADER,y);if(!t||!n)return t&&e.deleteShader(t),n&&e.deleteShader(n),null;let r=e.createProgram();return r?(e.attachShader(r,t),e.attachShader(r,n),e.linkProgram(r),e.deleteShader(t),e.deleteShader(n),e.getProgramParameter(r,e.LINK_STATUS)?r:(e.deleteProgram(r),null)):(e.deleteShader(t),e.deleteShader(n),null)}function C(e){let t=e.getContext(`webgl`,{alpha:!0,antialias:!0,premultipliedAlpha:!0});if(!t||!t.getExtension(`OES_standard_derivatives`))return null;let n=S(t);if(!n)return null;let r=t.getAttribLocation(n,`a_position`),i=e=>t.getUniformLocation(n,e),a={angle:i(`u_angle`),cellSize:i(`u_cell_size`),containerSize:i(`u_container_size`),devicePixelRatio:i(`u_device_pixel_ratio`),lineColor:i(`u_line_color`),time:i(`u_time`),viewportSize:i(`u_viewport_size`)},s=t.createBuffer();if(r<0||!s||Object.values(a).some(e=>!e))return s&&t.deleteBuffer(s),t.deleteProgram(n),null;t.bindBuffer(t.ARRAY_BUFFER,s),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW);let f=1;return{resize(n,r){f=Math.min(window.devicePixelRatio||1,u),e.width=Math.floor(n*f),e.height=Math.floor(r*f),t.viewport(0,0,e.width,e.height)},draw({width:e,height:i,time:u,angle:p,cellSize:m,color:h}){t.useProgram(n),t.bindBuffer(t.ARRAY_BUFFER,s),t.enableVertexAttribArray(r),t.vertexAttribPointer(r,2,t.FLOAT,!1,0,0),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.uniform1f(a.angle,b(p,c,l)),t.uniform1f(a.cellSize,Math.max(m,1)),t.uniform2f(a.containerSize,e,i),t.uniform1f(a.devicePixelRatio,f),t.uniform4fv(a.lineColor,h);let g=window.innerHeight*d*.5/o,_=g>0?4*Math.max(m,1)/g:1/0;t.uniform1f(a.time,u%_),t.uniform2f(a.viewportSize,window.innerWidth,window.innerHeight),t.drawArrays(t.TRIANGLES,0,3)},dispose(){t.isContextLost()||(t.deleteBuffer(s),t.deleteProgram(n))}}}var w;function T(e){if(w===void 0){let e=document.createElement(`canvas`);e.width=e.height=1,w=e.getContext(`2d`,{willReadFrequently:!0})}if(!w)return new Float32Array([.5,.5,.5,1]);w.clearRect(0,0,1,1),w.fillStyle=e,w.fillRect(0,0,1,1);let[t,n,r,i]=w.getImageData(0,0,1,1).data;return new Float32Array([t/255,n/255,r/255,i/255])}function E({className:e,angle:t=65,cellSize:r=60,opacity:o=.5,lightLineColor:u=`gray`,darkLineColor:d=`gray`,style:f,...p}){let m=(0,i.useRef)(null),h=(0,i.useRef)(null),g=(0,i.useRef)(null),[_,v]=(0,i.useState)(!1),y=(0,i.useRef)({angle:t,cellSize:r}),x=(0,i.useRef)(null),S=b(t,c,l),w=Math.max(r,1);return(0,i.useEffect)(()=>{y.current={angle:S,cellSize:w},x.current?.()},[S,w,u,d]),(0,i.useEffect)(()=>{let e=h.current,t=m.current;if(!e||!t)return;let n=window.matchMedia?.(`(prefers-reduced-motion: reduce)`)??null,r=window.matchMedia?.(`(prefers-color-scheme: dark)`)??null,i=null,a=0,o=0,s=new Float32Array([.5,.5,.5,1]),c=!0,l=!1,u=null,d=e=>{i&&a&&o&&!l&&i.draw({width:a,height:o,time:n?.matches?0:e/1e3,angle:y.current.angle,cellSize:y.current.cellSize,color:s})},f=()=>{u!==null&&cancelAnimationFrame(u),u=null},p=e=>{d(e),u=!n?.matches&&c?requestAnimationFrame(p):null},_=()=>{!l&&!i&&(i=C(e)),l||!i?(f(),v(!1)):(a=Math.floor(t.clientWidth),o=Math.floor(t.clientHeight),!a||!o?f():(i.resize(a,o),g.current&&(s=T(getComputedStyle(g.current).color)),d(performance.now()),v(!0),n?.matches||!c?f():u===null&&(u=requestAnimationFrame(p))))};x.current=_;let b=e=>{e.preventDefault(),l=!0,i=null,f(),v(!1)},S=()=>{l=!1,_()};n?.addEventListener?.(`change`,_),r?.addEventListener?.(`change`,_),window.addEventListener(`resize`,_),e.addEventListener(`webglcontextlost`,b),e.addEventListener(`webglcontextrestored`,S);let w=new ResizeObserver(_);w.observe(t);let E=new IntersectionObserver(([e])=>{c=e?.isIntersecting??!1,c?_():f()});E.observe(t);let D=new MutationObserver(_);return D.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`style`,`data-theme`]}),_(),()=>{f(),w.disconnect(),E.disconnect(),D.disconnect(),n?.removeEventListener?.(`change`,_),r?.removeEventListener?.(`change`,_),window.removeEventListener(`resize`,_),e.removeEventListener(`webglcontextlost`,b),e.removeEventListener(`webglcontextrestored`,S),x.current=null,i?.dispose()}},[]),(0,a.jsxs)(`div`,{ref:m,"aria-hidden":`true`,...p,className:n(`pointer-events-none absolute size-full overflow-hidden [--retro-grid-line:var(--retro-grid-light-line)] dark:[--retro-grid-line:var(--retro-grid-dark-line)]`,e),style:{opacity:o,"--retro-grid-light-line":u,"--retro-grid-dark-line":d,...f},children:[(0,a.jsx)(`span`,{ref:g,className:`hidden text-(--retro-grid-line)`}),!_&&(0,a.jsx)(`div`,{className:`absolute inset-0`,style:{perspective:`${s}px`},children:(0,a.jsx)(`div`,{className:`absolute inset-0`,style:{transform:`rotateX(${S}deg)`},children:(0,a.jsx)(`div`,{className:`animate-retro-grid absolute inset-[0%_0px] ml-[-200%] h-[300vh] w-[600vw] origin-[100%_0_0] [background-image:linear-gradient(to_right,var(--retro-grid-line)_1px,transparent_0),linear-gradient(to_bottom,var(--retro-grid-line)_1px,transparent_0)] bg-repeat motion-reduce:animate-none`,style:{backgroundSize:`${w}px ${w}px`,transform:`translateY(-50%)`}})})}),(0,a.jsx)(`canvas`,{ref:h,className:n(`absolute inset-0 size-full`,_?`opacity-100`:`opacity-0`)}),(0,a.jsx)(`div`,{className:`absolute inset-0 bg-linear-to-t from-background to-transparent to-90%`})]})}export{E as t};