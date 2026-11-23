<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { paintDotField } from './heroDotField';
import { useTheme } from '../composables/useTheme';

const containerRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const NOISE_GLSL = `
float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float vnoise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*f*(f*(f*6.0-15.0)+10.0);
  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x), mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x), u.y); }
vec2 ambientField(vec2 uv, float t){
  vec2 q = uv*vec2(3.2,1.7);
  vec2 a = vec2(vnoise(q+vec2(t*0.11,0.0))-0.5, vnoise(q+vec2(5.2,t*0.08)+3.1)-0.5);
  vec2 q2 = uv*vec2(7.5,4.0) + vec2(-t*0.19, t*0.13);
  vec2 b = vec2(vnoise(q2+1.7)-0.5, vnoise(q2+9.3)-0.5);
  return a + b*0.45;
}
`;

const POINTER_ENERGY_GLSL = `
float energyAt(vec2 rectPx, vec2 mouse, float radius, float presence, float wakeEnergy){
  vec2 d = rectPx - mouse;
  float f = exp(-dot(d,d)/(radius*radius))*presence;
  return smoothstep(0.06, 0.5, f*1.15 + wakeEnergy*1.7);
}
`;

const QUAD_VERTEX_SHADER = `#version 300 es
layout(location=0) in vec2 aPos;
out vec2 vUv;
void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }
`;

const FLOW_FRAGMENT_SHADER = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
out vec4 o;
uniform sampler2D uPrev;
uniform vec2 uTexel;
uniform vec2 uMouse;
uniform vec2 uVel;
uniform vec2 uSize;
uniform float uRadius;
uniform float uPresence;
uniform float uDecay;
uniform float uDt;
vec2 decV(vec4 c){ return (c.rg*255.0-128.0)/127.0; }
void main(){
  vec2 v0 = decV(texture(uPrev, vUv));
  vec2 uv = vUv - v0*uTexel*2.5*uDt;
  float diffuse = 1.0 - pow(0.52, uDt);
  vec4 c = texture(uPrev, uv)*(1.0-diffuse)
    + (0.25*diffuse)*(texture(uPrev, uv+vec2(uTexel.x,0.0)) + texture(uPrev, uv-vec2(uTexel.x,0.0))
          + texture(uPrev, uv+vec2(0.0,uTexel.y)) + texture(uPrev, uv-vec2(0.0,uTexel.y)));
  vec2 v = decV(c);
  float p = c.b;
  vec2 d = (vUv-uMouse)*uSize;
  float f = exp(-dot(d,d)/(uRadius*uRadius))*uPresence;
  float sp = clamp(length(uVel)*2.5, 0.0, 1.0);
  v += uVel*f*0.22*uDt;
  p = max(p, f*sp);
  v *= uDecay;
  p *= uDecay;
  v = sign(v)*max(abs(v)-1.2*uDt/127.0, 0.0);
  p = max(p-1.2*uDt/255.0, 0.0);
  v = clamp(v, -1.0, 1.0);
  o = vec4((v*127.0+128.0)/255.0, p, 1.0);
}
`;

const SIMULATION_FRAGMENT_SHADER = `#version 300 es
precision highp float;
precision highp sampler2D;
out vec4 o;
uniform sampler2D uState;
uniform sampler2D uHome;
uniform sampler2D uFlow;
uniform vec2 uSize;
uniform vec2 uMouse;
uniform float uRadius;
uniform float uPresence;
uniform float uStrength;
uniform float uSpread;
uniform float uTurb;
uniform float uReturn;
uniform float uTime;
uniform float uDt;
uniform float uIntro;
${NOISE_GLSL}
vec2 curl(vec2 p){
  const float e = 0.35;
  float a = vnoise(p+vec2(0.0,e)) - vnoise(p-vec2(0.0,e));
  float b = vnoise(p+vec2(e,0.0)) - vnoise(p-vec2(e,0.0));
  return vec2(a, -b)/(2.0*e);
}
void main(){
  ivec2 ij = ivec2(gl_FragCoord.xy);
  vec4 hm = texelFetch(uHome, ij, 0);
  if(hm.w <= 0.0){ o = vec4(0.0); return; }
  vec4 st = texelFetch(uState, ij, 0);
  vec2 off = st.xy;
  vec2 vel = st.zw;
  float sd = hm.z;
  float light = 0.45 + sd*1.1;

  vec2 p = hm.xy*uSize + off;
  vec4 fl = texture(uFlow, clamp(p/uSize, 0.0, 1.0));
  vec2 wake = (fl.rg*255.0-128.0)/127.0;
  float pr = fl.b;

  vec2 toM = p - uMouse;
  float r2 = dot(toM,toM);
  float f = exp(-r2/(uRadius*uRadius))*uPresence;
  vec2 n = toM*inversesqrt(r2+1.0);
  float e = clamp(pr*2.0 + f, 0.0, 1.0);
  if (e < 0.001 && uIntro == 0.0 && dot(off,off) + dot(vel,vel) < 0.0004) {
    o = vec4(0.0);
    return;
  }

  vec2 acc = vec2(0.0);
  // Blown outward and swirled around the cursor (tornado vortex)
  acc += n*f*1.25*uStrength*uSpread*light;
  acc += vec2(-n.y, n.x)*f*1.45*uStrength*uSpread*(0.4+sd);
  // Carried by the liquid fluid wake
  acc += (wake*42.0*uSpread*light - vel)*e*0.08;
  // Curl-noise turbulence where material is disturbed
  vec2 q = p*0.0095 + vec2(uTime*0.35, -uTime*0.2);
  vec2 c = curl(q) + 0.5*curl(q*2.3 + 7.1);
  acc += c*(e*1.2*uSpread + uIntro*1.5)*uTurb*light;
  // Elastic return home
  float k = (0.006 + 0.02*uReturn)*(0.65+sd*0.7)*(1.0 - uIntro*0.75);
  acc -= off*k;

  vel += acc*uDt;
  vel *= pow(mix(0.93, 0.955, e), uDt);
  off += vel*uDt;
  if(dot(off,off) < 0.0004 && dot(vel,vel) < 0.0004){ off = vec2(0.0); vel = vec2(0.0); }
  o = vec4(off, vel);
}
`;

const PARTICLE_VERTEX_SHADER = `#version 300 es
precision highp float;
precision highp sampler2D;
layout(location=0) in vec2 aCorner;
uniform sampler2D uState;
uniform sampler2D uHome;
uniform sampler2D uCol;
uniform sampler2D uFlow;
uniform int uTexW;
uniform vec4 uRect;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uRadius;
uniform float uPresence;
uniform float uDot;
uniform float uTime;
uniform float uAmbient;
uniform float uStreak;
uniform float uIntroVis;
uniform float uRest;
out vec2 vLocal;
out float vHalfLen;
out float vR;
out vec3 vCol;
out float vA;
${NOISE_GLSL}
${POINTER_ENERGY_GLSL}
void main(){
  int id = gl_InstanceID;
  ivec2 ij = ivec2(id % uTexW, id / uTexW);
  vec4 hm = texelFetch(uHome, ij, 0);
  vec4 st = texelFetch(uState, ij, 0);
  vec4 cl = texelFetch(uCol, ij, 0);

  float wakeE = texture(uFlow, hm.xy).b;
  float E = energyAt(hm.xy*uRect.zw, uMouse, uRadius, uPresence, wakeE);
  float lift = smoothstep(0.35, 2.5, length(st.xy));
  float a = max(max(E, lift), max(uRest, 1.0-uIntroVis));
  if(a < 0.01 || hm.w <= 0.0){ gl_Position = vec4(2.0,2.0,2.0,1.0); return; }

  vec2 base = uRect.xy + hm.xy*uRect.zw + st.xy;
  if (uAmbient > 0.0) base -= ambientField(hm.xy, uTime)*10.0*uAmbient;

  vec2 v = st.zw;
  float sp = length(v);
  vec2 dir = sp > 0.001 ? v/sp : vec2(1.0,0.0);
  float r = uDot*hm.w*0.5;
  float len = min(sp*1.25, 18.0)*uStreak;
  vec2 lc = aCorner*vec2(r*1.7 + len*0.5 + 1.0, r + 1.0);
  vec2 center = base - dir*len*0.5;
  vec2 world = center + dir*lc.x + vec2(-dir.y, dir.x)*lc.y;

  vec2 clip = world/uRes*2.0-1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  vLocal = lc;
  vHalfLen = len*0.5;
  vR = r;
  vec3 col = cl.rgb;
  // Liquid metal glint catching light
  float glint = smoothstep(2.0, 16.0, sp);
  col = mix(col, min(col*1.18 + vec3(0.07,0.075,0.085), vec3(1.0)), glint*0.75);
  vCol = col;
  vA = a * cl.a;
}
`;

const PARTICLE_FRAGMENT_SHADER = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vLocal;
in float vHalfLen;
in float vR;
in vec3 vCol;
in float vA;
uniform float uDpr;
out vec4 o;
void main(){
  vec2 q = vec2(max(abs(vLocal.x)-vHalfLen, 0.0), vLocal.y);
  float d = length(q) - vR;
  float a = clamp(0.5 - d*uDpr, 0.0, 1.0);
  // Comet tail trailing out
  float tail = vHalfLen > 0.0 ? clamp(0.5 - vLocal.x/(2.0*(vHalfLen+vR)), 0.0, 1.0) : 0.0;
  a *= 1.0 - tail*0.55;
  a *= vA;
  if(a < 0.004) discard;
  o = vec4(vCol*a, a);
}
`;

const WAVE_FRAGMENT_SHADER = `#version 300 es
precision highp float;
precision highp sampler2D;
out vec4 o;
uniform sampler2D uImg;
uniform sampler2D uFlow;
uniform vec2 uRes;
uniform float uDpr;
uniform vec4 uRect;
uniform vec2 uMouse;
uniform float uPresence;
uniform float uRadius;
uniform float uStrength;
uniform float uTime;
uniform float uAmbient;
uniform float uIntroVis;
uniform float uRest;
${NOISE_GLSL}
${POINTER_ENERGY_GLSL}
void main(){
  vec2 px = vec2(gl_FragCoord.x, uRes.y*uDpr - gl_FragCoord.y)/uDpr;
  vec2 size = uRect.zw;
  vec2 uv = (px-uRect.xy)/size;
  if(uv.x < -0.05 || uv.x > 1.05 || uv.y < -0.12 || uv.y > 1.12){ o = vec4(0.0); return; }
  vec4 fl = texture(uFlow, clamp(uv,0.0,1.0));
  vec2 vel = (fl.rg*255.0-128.0)/127.0;
  vec2 rp = uv*size;
  vec2 toM = rp - uMouse;
  float fall = exp(-dot(toM,toM)/(uRadius*uRadius))*uPresence;
  vec2 disp = -toM*0.22*uStrength*fall - vel*10.0*uStrength;
  if (uAmbient > 0.0) disp += ambientField(uv, uTime)*10.0*uAmbient;
  vec2 suv = uv + disp/size;
  vec4 tx = texture(uImg, suv);
  vec2 e = smoothstep(vec2(0.0), vec2(0.004,0.01), suv)
    * (1.0 - smoothstep(vec2(0.996,0.99), vec2(1.0), suv));
  float E = energyAt(rp, uMouse, uRadius, uPresence, fl.b);
  float show = (1.0 - max(E, uRest))*uIntroVis;
  o = tx * (e.x * e.y * show);
}
`;

function createProgram(gl: WebGL2RenderingContext, vsSrc: string, fsSrc: string) {
  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      const err = gl.getShaderInfoLog(s);
      gl.deleteShader(s);
      throw Error('Shader compile failed: ' + err);
    }
    return s;
  };

  const vs = compile(gl.VERTEX_SHADER, vsSrc);
  let fs: WebGLShader | null = null;
  const p = gl.createProgram()!;
  try {
    fs = compile(gl.FRAGMENT_SHADER, fsSrc);
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      throw Error('Program link failed: ' + gl.getProgramInfoLog(p));
    }
  } catch (error) {
    gl.deleteProgram(p);
    throw error;
  } finally {
    gl.deleteShader(vs);
    if (fs) gl.deleteShader(fs);
  }

  const uniforms: Record<string, WebGLUniformLocation> = {};
  const count = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(p, i);
    if (info) {
      const loc = gl.getUniformLocation(p, info.name);
      if (loc !== null) uniforms[info.name] = loc;
    }
  }

  return { p, u: uniforms };
}

type WaveSource = HTMLCanvasElement | HTMLImageElement;
type ShaderProgram = ReturnType<typeof createProgram>;

class SculptureSimulation {
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  opts: any;
  onFail: () => void;
  onFirstFrame: (() => void) | null = null;
  lowPower = false;
  stateFormat = { internal: 0, type: 0 };
  pFlow!: ShaderProgram;
  pSim!: ShaderProgram;
  pPart!: ShaderProgram;
  pImg!: ShaderProgram;
  vao: WebGLVertexArrayObject | null = null;
  quad: WebGLBuffer | null = null;
  imgTex: WebGLTexture | null = null;
  flowTex: WebGLTexture[] = [];
  flowFb: WebGLFramebuffer[] = [];
  flowW = 256;
  flowH = 104;
  flowIdx = 0;
  flowDirty = false;
  homeTex: WebGLTexture | null = null;
  colTex: WebGLTexture | null = null;
  stateTex: WebGLTexture[] = [];
  stateFb: WebGLFramebuffer[] = [];
  stateIdx = 0;
  texH = 1;
  n = 0;
  gridW = 1;
  stateDirty = false;
  flowing = 0;
  aspect = 2.5;
  rect = { x: 0, y: 0, w: 1, h: 1 };
  cssW = 1;
  cssH = 1;
  target = { x: -9999, y: -9999 };
  mouse = { x: -9999, y: -9999 };
  prevMouse = { x: -9999, y: -9999 };
  mvel = { x: 0, y: 0 };
  presence = 0;
  presenceTarget = 0;
  burst = 0;
  settle = 1e9;
  touchRelease = 0;
  time = 0;
  introT = 1;
  raf = 0;
  running = false;
  last = 0;
  skip = 0;
  visible = true;
  ready = false;
  destroyed = false;
  lost = false;
  lastImage: WaveSource | null = null;
  homeData: Float32Array | null = null;

  constructor(canvas: HTMLCanvasElement, opts: any, onFail: () => void) {
    this.canvas = canvas;
    this.opts = opts;
    this.onFail = onFail;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
    });

    if (!gl) throw Error('WebGL2 unavailable');
    this.gl = gl;

    this.lowPower = (navigator.hardwareConcurrency || 8) <= 4 || window.matchMedia('(pointer: coarse)').matches;
    try {
      this.initGL();
    } catch (error) {
      this.destroy();
      throw error;
    }
    canvas.addEventListener('webglcontextlost', this.onLost, false);
  }

  onLost = (e: Event) => {
    e.preventDefault();
    this.lost = true;
    this.stop();
    this.onFail();
  };

  initGL() {
    const gl = this.gl;
    const extFloat = gl.getExtension('EXT_color_buffer_float');
    const extHalf = extFloat ? null : gl.getExtension('EXT_color_buffer_half_float');
    if (!extFloat && !extHalf) throw Error('No float render targets');

    this.stateFormat = { internal: gl.RGBA16F, type: gl.HALF_FLOAT };
    this.pFlow = createProgram(gl, QUAD_VERTEX_SHADER, FLOW_FRAGMENT_SHADER);
    this.pSim = createProgram(gl, QUAD_VERTEX_SHADER, SIMULATION_FRAGMENT_SHADER);
    this.pPart = createProgram(gl, PARTICLE_VERTEX_SHADER, PARTICLE_FRAGMENT_SHADER);
    this.pImg = createProgram(gl, QUAD_VERTEX_SHADER, WAVE_FRAGMENT_SHADER);

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);
    this.quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    for (let t = 0; t < 2; t++) {
      const tex = this.makeTex(gl.RGBA8, this.flowW, this.flowH, gl.RGBA, gl.UNSIGNED_BYTE, null, gl.LINEAR);
      const fb = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      this.flowTex.push(tex);
      this.flowFb.push(fb);
    }
    this.clearFlow();
  }

  makeTex(internal: number, w: number, h: number, format: number, type: number, data: ArrayBufferView | null, filter: number) {
    const gl = this.gl;
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, type, data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return tex;
  }

  clearFlow() {
    const gl = this.gl;
    for (const fb of this.flowFb) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.viewport(0, 0, this.flowW, this.flowH);
      gl.clearColor(128 / 255, 128 / 255, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.flowDirty = false;
  }

  clearState() {
    const gl = this.gl;
    for (const fb of this.stateFb) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.viewport(0, 0, 1024, this.texH);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.stateDirty = false;
  }

  setImage(img: WaveSource) {
    if (this.destroyed || this.lost) return;
    const gl = this.gl;
    this.lastImage = img;
    this.aspect = img instanceof HTMLCanvasElement
      ? img.width / img.height
      : img.naturalWidth / img.naturalHeight;
    this.flowH = Math.max(32, Math.round(this.flowW / this.aspect));

    for (const tex of this.flowTex) {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, this.flowW, this.flowH, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }
    this.clearFlow();

    if (this.imgTex) gl.deleteTexture(this.imgTex);
    this.imgTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.imgTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    this.buildParticles(img);
    this.ready = true;
    if (this.opts.intro && !this.opts.reducedMotion) this.startIntro();
    this.wake();
  }

  buildParticles(img: WaveSource) {
    let data: Uint8ClampedArray;
    const gl = this.gl;
    // Calibrated sampling: keeps particle count silky smooth without GPU drops
    const sampleWidth = Math.round((this.lowPower ? 460 : 620) * Math.sqrt(clamp(this.opts.density, 0.15, 2)));
    const sampleHeight = Math.max(1, Math.round(sampleWidth / this.aspect));
    this.gridW = sampleWidth;

    try {
      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = sampleWidth;
      sampleCanvas.height = sampleHeight;
      const ctx = sampleCanvas.getContext('2d', { willReadFrequently: true })!;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
      data = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;
    } catch {
      throw Error('Image is not CORS-readable');
    }

    const homePoints: number[] = [];
    const colorPoints: number[] = [];

    for (let y = 0; y < sampleHeight; y++) {
      for (let x = 0; x < sampleWidth; x++) {
        const pos = (y * sampleWidth + x) * 4;
        const alpha = data[pos + 3];
        if (alpha < 8) continue;

        const jitterX = (Math.random() - 0.5) * 0.6;
        const jitterY = (Math.random() - 0.5) * 0.6;
        homePoints.push((x + 0.5 + jitterX) / sampleWidth, (y + 0.5 + jitterY) / sampleHeight, Math.random(), 0.85 + 0.3 * Math.random());
        colorPoints.push(data[pos], data[pos + 1], data[pos + 2], alpha);
      }
    }

    const count = homePoints.length / 4;
    this.n = count;
    this.texH = Math.max(1, Math.ceil(count / 1024));
    const totalTex = 1024 * this.texH;

    const homeBuf = new Float32Array(4 * totalTex);
    homeBuf.set(homePoints);
    const colBuf = new Uint8Array(4 * totalTex);
    colBuf.set(colorPoints);

    if (this.homeTex) gl.deleteTexture(this.homeTex);
    if (this.colTex) gl.deleteTexture(this.colTex);
    for (const t of this.stateTex) gl.deleteTexture(t);
    for (const f of this.stateFb) gl.deleteFramebuffer(f);

    this.stateTex = [];
    this.stateFb = [];
    this.homeTex = this.makeTex(gl.RGBA32F, 1024, this.texH, gl.RGBA, gl.FLOAT, homeBuf, gl.NEAREST);
    this.colTex = this.makeTex(gl.RGBA8, 1024, this.texH, gl.RGBA, gl.UNSIGNED_BYTE, colBuf, gl.NEAREST);

    for (let t = 0; t < 2; t++) {
      const tex = this.makeTex(this.stateFormat.internal, 1024, this.texH, gl.RGBA, this.stateFormat.type, null, gl.NEAREST);
      const fb = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      this.stateTex.push(tex);
      this.stateFb.push(fb);
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
        throw Error('Float FBO incomplete');
      }
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.homeData = this.opts.intro ? homeBuf : null;
    this.clearState();
  }

  startIntro() {
    const gl = this.gl;
    const t = this.homeData;
    if (!t) return;
    const r = this.rect.w > 10 ? this.rect.w : 1300;
    const a = new Float32Array(4 * (1024 * this.texH));

    for (let i = 0; i < this.n; i++) {
      const xH = t[4 * i] - 0.5;
      const yH = t[4 * i + 1] - 0.5;
      const zH = t[4 * i + 2];
      const angle = (Math.random() - 0.5) * 0.9 + (xH > 0 ? 0 : Math.PI);
      const len = r * (0.04 + 0.14 * Math.random()) * (0.5 + 1.4 * Math.abs(xH));
      a[4 * i] = Math.cos(angle) * len + xH * r * 0.25 * zH;
      a[4 * i + 1] = Math.sin(angle) * len * 0.55 + 120 * yH * (Math.random() - 0.5);
    }

    gl.bindTexture(gl.TEXTURE_2D, this.stateTex[this.stateIdx]);
    gl.texImage2D(gl.TEXTURE_2D, 0, this.stateFormat.internal, 1024, this.texH, 0, gl.RGBA, gl.FLOAT, a);
    this.introT = 0;
    this.stateDirty = true;
  }

  setOptions(opts: any) {
    const densityChanged = opts.density !== undefined && opts.density !== this.opts.density;
    this.opts = { ...this.opts, ...opts };
    if (densityChanged && this.ready && this.lastImage) {
      try {
        this.buildParticles(this.lastImage);
      } catch {
        this.onFail();
      }
    }
    this.wake();
  }

  resize(w: number, h: number, rect: { x: number; y: number; w: number; h: number }) {
    this.cssW = Math.max(1, w);
    this.cssH = Math.max(1, h);
    this.rect = rect;

    // Cap DPR to 1.25 and total pixels to 2.2M to prevent GPU fill choke on high-DPI
    let dpr = Math.min(window.devicePixelRatio || 1, this.lowPower ? 1.0 : 1.25);
    if (this.cssW * this.cssH * dpr * dpr > 2200000) {
      dpr = Math.sqrt(2200000 / (this.cssW * this.cssH));
    }
    const canvasW = Math.max(1, Math.round(this.cssW * dpr));
    const canvasH = Math.max(1, Math.round(this.cssH * dpr));

    if (this.canvas.width !== canvasW || this.canvas.height !== canvasH) {
      this.canvas.width = canvasW;
      this.canvas.height = canvasH;
    }
    this.draw();
  }

  setVisible(v: boolean) {
    this.visible = v;
    if (v) this.wake();
    else this.stop();
  }

  pointer(action: string, x: number, y: number, isTouch: boolean) {
    if (!this.opts.interactive || this.lost) return;
    const now = performance.now();

    if (action === 'leave' || action === 'up') {
      if (isTouch) this.touchRelease = now + 260;
      else this.presenceTarget = 0;
      this.wake();
      return;
    }

    if (this.mouse.x < -9000 || action === 'down') {
      this.mouse.x = this.prevMouse.x = x;
      this.mouse.y = this.prevMouse.y = y;
    }

    this.target.x = x;
    this.target.y = y;
    this.presenceTarget = 1;
    this.settle = 0;

    if (action === 'down') {
      this.burst = 1;
      this.touchRelease = 0;
    }

    this.wake();
  }

  wake() {
    if (!this.ready || this.running || !this.visible || this.destroyed || this.lost) {
      return;
    }
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  radiusPx() {
    return this.opts.radius * clamp(this.rect.w / 1400, 0.6, 1.25);
  }

  strength() {
    return this.opts.strength * (this.opts.reducedMotion ? 0.5 : 1);
  }

  frame = (now: number) => {
    if (!this.running) return;
    const delta = now - this.last;
    const dt = clamp(delta / 16.6667, 0.25, 3);
    this.last = now;

    const opts = this.opts;
    const ambientActive = opts.ambient && !opts.reducedMotion;

    if (this.touchRelease && now > this.touchRelease) {
      this.presenceTarget = 0;
      this.touchRelease = 0;
    }

    const mouseSmoothing = 1 - Math.pow(0.78, dt);
    this.mouse.x += (this.target.x - this.mouse.x) * mouseSmoothing;
    this.mouse.y += (this.target.y - this.mouse.y) * mouseSmoothing;

    const vX = (this.mouse.x - this.prevMouse.x) / dt;
    const vY = (this.mouse.y - this.prevMouse.y) / dt;
    this.prevMouse.x = this.mouse.x;
    this.prevMouse.y = this.mouse.y;

    const velocitySmoothing = 1 - Math.pow(0.5, dt);
    this.mvel.x += (clamp(vX, -60, 60) - this.mvel.x) * velocitySmoothing;
    this.mvel.y += (clamp(vY, -60, 60) - this.mvel.y) * velocitySmoothing;

    const pRate = this.presenceTarget > this.presence ? 0.1 : 0.035;
    this.presence += (this.presenceTarget - this.presence) * (1 - Math.pow(1 - pRate, dt));
    if (this.presence < 0.001 && this.presenceTarget === 0) this.presence = 0;

    const flowRate = this.presenceTarget > this.flowing ? 0.05 : 0.018;
    this.flowing += (this.presenceTarget - this.flowing) * (1 - Math.pow(1 - flowRate, dt));
    if (this.flowing < 0.002 && this.presenceTarget === 0) this.flowing = 0;

    if (this.introT < 1) {
      this.introT = Math.min(1, this.introT + Math.min(delta, 100) / 3200);
    }

    const hasInput = this.presence > 0.001 || this.burst > 0;
    this.settle = hasInput ? 0 : this.settle + dt;

    if (!hasInput && this.settle >= 270 && this.introT >= 1) {
      if (this.flowDirty) this.clearFlow();
      if (this.stateDirty) this.clearState();
      if (!ambientActive) {
        this.draw();
        this.firstFrame();
        this.stop();
        return;
      }
      this.raf = requestAnimationFrame(this.frame);
      if (this.skip++ % 2) return;
      this.time += 2 * dt * opts.speed / 60;
      this.draw();
      this.firstFrame();
      return;
    }

    this.raf = requestAnimationFrame(this.frame);
    this.time += dt * opts.speed * (1 + 1.6 * this.flowing) / 60;
    this.stepFlow(dt);
    this.stepSim(dt);
    this.burst = Math.max(0, this.burst - 0.1 * dt);
    this.draw();
    this.firstFrame();
  };

  firstFrame() {
    if (this.onFirstFrame) {
      const cb = this.onFirstFrame;
      this.onFirstFrame = null;
      requestAnimationFrame(() => cb());
    }
  }

  stepFlow(dt: number) {
    const gl = this.gl;
    const prog = this.pFlow;
    const targetIdx = 1 - this.flowIdx;

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.flowFb[targetIdx]);
    gl.viewport(0, 0, this.flowW, this.flowH);
    gl.disable(gl.BLEND);
    gl.useProgram(prog.p);
    gl.bindVertexArray(this.vao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.flowTex[this.flowIdx]);
    gl.uniform1i(prog.u.uPrev, 0);
    gl.uniform2f(prog.u.uTexel, 1 / this.flowW, 1 / this.flowH);

    const r = this.rect;
    gl.uniform2f(prog.u.uMouse, (this.mouse.x - r.x) / r.w, (this.mouse.y - r.y) / r.h);
    gl.uniform2f(prog.u.uVel, clamp(this.mvel.x / 40, -1, 1), clamp(this.mvel.y / 40, -1, 1));
    gl.uniform2f(prog.u.uSize, r.w, r.h);
    gl.uniform1f(prog.u.uRadius, this.radiusPx());
    gl.uniform1f(prog.u.uPresence, Math.max(this.presence, this.burst));
    gl.uniform1f(prog.u.uDecay, Math.pow(0.968, dt));
    gl.uniform1f(prog.u.uDt, dt);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    this.flowIdx = targetIdx;
    this.flowDirty = true;
  }

  stepSim(dt: number) {
    if (!this.n) return;
    const gl = this.gl;
    const prog = this.pSim;
    const opts = this.opts;
    const r = this.rect;
    const targetIdx = 1 - this.stateIdx;
    const introVal = opts.reducedMotion || !opts.intro ? 0 : Math.pow(1 - this.introT, 2);

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.stateFb[targetIdx]);
    gl.viewport(0, 0, 1024, this.texH);
    gl.disable(gl.BLEND);
    gl.useProgram(prog.p);
    gl.bindVertexArray(this.vao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.stateTex[this.stateIdx]);
    gl.uniform1i(prog.u.uState, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.homeTex);
    gl.uniform1i(prog.u.uHome, 1);

    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, this.flowTex[this.flowIdx]);
    gl.uniform1i(prog.u.uFlow, 2);

    gl.uniform2f(prog.u.uSize, r.w, r.h);
    gl.uniform2f(prog.u.uMouse, this.mouse.x - r.x, this.mouse.y - r.y);
    gl.uniform1f(prog.u.uRadius, this.radiusPx());
    gl.uniform1f(prog.u.uPresence, Math.max(this.presence, this.burst));
    gl.uniform1f(prog.u.uStrength, this.strength() * (1 + 1.5 * this.burst));
    gl.uniform1f(prog.u.uSpread, clamp(opts.spread, 0, 2));
    gl.uniform1f(prog.u.uTurb, clamp(opts.turbulence, 0, 2) * (opts.reducedMotion ? 0.3 : 1));
    gl.uniform1f(prog.u.uReturn, clamp(opts.returnSpeed, 0, 2));
    gl.uniform1f(prog.u.uTime, this.time);
    gl.uniform1f(prog.u.uDt, dt);
    gl.uniform1f(prog.u.uIntro, introVal);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    this.stateIdx = targetIdx;
    this.stateDirty = true;
  }

  draw() {
    if (!this.ready || this.lost || this.destroyed) return;
    const gl = this.gl;
    const opts = this.opts;
    const r = this.rect;
    const isReduced = opts.reducedMotion;
    const introVis = isReduced || !opts.intro ? 1 : Math.pow(this.introT, 2.2);
    const ambientVal = (opts.ambient && !isReduced ? clamp(opts.ambientIntensity, 0, 2) : 0) +
      0.85 * this.flowing * clamp(opts.liquid, 0, 2) * (isReduced ? 0.3 : 1);
    const restMode = opts.restStyle === 'particles' ? 1 : 0;
    const dprVal = this.canvas.width / this.cssW;
    const presenceVal = Math.max(this.presence, this.burst);
    const mX = this.mouse.x - r.x;
    const mY = this.mouse.y - r.y;

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.bindVertexArray(this.vao);
    gl.disable(gl.BLEND);

    // 1. Draw reconstructed background image layer
    const progImg = this.pImg;
    gl.useProgram(progImg.p);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.imgTex);
    gl.uniform1i(progImg.u.uImg, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.flowTex[this.flowIdx]);
    gl.uniform1i(progImg.u.uFlow, 1);

    gl.uniform2f(progImg.u.uRes, this.cssW, this.cssH);
    gl.uniform1f(progImg.u.uDpr, dprVal);
    gl.uniform4f(progImg.u.uRect, r.x, r.y, r.w, r.h);
    gl.uniform2f(progImg.u.uMouse, mX, mY);
    gl.uniform1f(progImg.u.uPresence, presenceVal);
    gl.uniform1f(progImg.u.uRadius, this.radiusPx());
    gl.uniform1f(progImg.u.uStrength, this.strength());
    gl.uniform1f(progImg.u.uTime, this.time);
    gl.uniform1f(progImg.u.uAmbient, ambientVal);
    gl.uniform1f(progImg.u.uIntroVis, introVis);
    gl.uniform1f(progImg.u.uRest, restMode);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (!this.n || (!this.stateDirty && restMode === 0 && introVis >= 1)) return;

    // 2. Draw swirling liquid-metal comet particles (GPU instanced)
    const progPart = this.pPart;
    gl.useProgram(progPart.p);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.stateTex[this.stateIdx]);
    gl.uniform1i(progPart.u.uState, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.homeTex);
    gl.uniform1i(progPart.u.uHome, 1);

    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, this.colTex);
    gl.uniform1i(progPart.u.uCol, 2);

    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, this.flowTex[this.flowIdx]);
    gl.uniform1i(progPart.u.uFlow, 3);

    gl.uniform1i(progPart.u.uTexW, 1024);
    gl.uniform4f(progPart.u.uRect, r.x, r.y, r.w, r.h);
    gl.uniform2f(progPart.u.uRes, this.cssW, this.cssH);
    gl.uniform2f(progPart.u.uMouse, mX, mY);
    gl.uniform1f(progPart.u.uRadius, this.radiusPx());
    gl.uniform1f(progPart.u.uPresence, presenceVal);

    const scaleFactor = r.w / this.gridW;
    gl.uniform1f(progPart.u.uDot, 1.45 * scaleFactor * clamp(opts.dotSize, 0.2, 3));
    gl.uniform1f(progPart.u.uTime, this.time);
    gl.uniform1f(progPart.u.uAmbient, ambientVal);
    gl.uniform1f(progPart.u.uStreak, opts.streaks ? (0.45 + 0.55 * introVis) : 0);
    gl.uniform1f(progPart.u.uIntroVis, introVis);
    gl.uniform1f(progPart.u.uRest, restMode);
    gl.uniform1f(progPart.u.uDpr, dprVal);

    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, this.n);
    gl.disable(gl.BLEND);
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.stop();
    this.canvas.removeEventListener('webglcontextlost', this.onLost);
    const gl = this.gl;
    for (const fb of [...this.flowFb, ...this.stateFb]) gl.deleteFramebuffer(fb);
    for (const tex of [...this.flowTex, ...this.stateTex, this.imgTex, this.homeTex, this.colTex]) gl.deleteTexture(tex);
    gl.deleteBuffer(this.quad);
    gl.deleteVertexArray(this.vao);
    for (const program of [this.pFlow, this.pSim, this.pPart, this.pImg]) {
      if (program) gl.deleteProgram(program.p);
    }
    this.homeData = null;
    this.lastImage = null;
  }
}

let dispose = () => {};
const fieldRef = ref<HTMLCanvasElement | null>(null);
const animated = ref(false);
const { theme } = useTheme();

onMounted(() => {
  const stage = containerRef.value!;
  const field = fieldRef.value!;
  const canvas = canvasRef.value!;
  const hero = stage.parentElement!;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = new AbortController();
  const passive = { passive: true, signal: listeners.signal };
  let sim: SculptureSimulation | null = null;
  let inView = true;
  let useFallback = false;
  let stageBounds = stage.getBoundingClientRect();

  function updateBounds() {
    stageBounds = stage.getBoundingClientRect();
  }

  function layout() {
    updateBounds();
    const sheet = field.getBoundingClientRect();
    sim?.resize(stageBounds.width, stageBounds.height, {
      x: sheet.left - stageBounds.left,
      y: sheet.top - stageBounds.top,
      w: sheet.width,
      h: sheet.height,
    });
  }

  function showFallback() {
    animated.value = false;
    useFallback = true;
    sim?.destroy();
    sim = null;
  }

  function updateField() {
    paintDotField(field, theme.value);
    if (!sim) return;
    try {
      sim.setImage(field);
      layout();
    } catch {
      showFallback();
    }
  }

  function updateVisibility() {
    sim?.setVisible(inView && !document.hidden && !motion.matches);
  }

  function initialize() {
    if (sim || useFallback || motion.matches) return;
    try {
      sim = new SculptureSimulation(canvas, {
        interactive: true, strength: 1, radius: 220, density: 0.65, dotSize: 1,
        spread: 1, turbulence: 1, liquid: 1, streaks: true, restStyle: 'image',
        returnSpeed: 1, ambient: false, ambientIntensity: 0, speed: 1, intro: false,
        reducedMotion: false, bg: [1, 1, 1],
      }, showFallback);
      sim.setImage(field);
      layout();
      animated.value = true;
    } catch {
      showFallback();
    }
  }

  function handlePointer(event: PointerEvent) {
    if (!event.isPrimary || motion.matches || !inView || document.hidden) return;
    const action = event.type.slice('pointer'.length);
    if (action === 'move' || action === 'down') initialize();
    if (!sim) return;
    // Uses cached bounds: ZERO synchronous DOM layout thrashing!
    sim.pointer(action === 'cancel' ? 'leave' : action,
      event.clientX - stageBounds.left, event.clientY - stageBounds.top, event.pointerType === 'touch');
  }

  function updateMotion() {
    if (motion.matches) {
      sim?.destroy();
      sim = null;
      animated.value = false;
    }
  }

  updateField();
  // Eager pre-initialization on mount: zero interaction delay!
  requestAnimationFrame(() => initialize());

  const stopThemeWatch = watch(theme, updateField);
  const resize = new ResizeObserver(layout);
  resize.observe(stage);
  const visibility = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    updateVisibility();
  });
  visibility.observe(stage);

  window.addEventListener('scroll', updateBounds, passive);
  window.addEventListener('resize', updateBounds, passive);

  for (const event of ['pointermove', 'pointerdown', 'pointerup', 'pointercancel', 'pointerleave'] as const) {
    hero.addEventListener(event, handlePointer, passive);
  }
  motion.addEventListener('change', updateMotion, { signal: listeners.signal });
  document.addEventListener('visibilitychange', updateVisibility, { signal: listeners.signal });

  dispose = () => {
    listeners.abort();
    stopThemeWatch();
    resize.disconnect();
    visibility.disconnect();
    window.removeEventListener('scroll', updateBounds);
    window.removeEventListener('resize', updateBounds);
    sim?.destroy();
  };
});

onUnmounted(() => dispose());
</script>

<template>
  <div ref="containerRef" class="particle-stage" aria-hidden="true">
    <canvas ref="fieldRef" class="particle-sheet" width="1983" height="566" :class="{ 'using-animation': animated }"></canvas>
    <canvas ref="canvasRef" class="particle-animation" :class="{ active: animated }"></canvas>
  </div>
</template>

<style scoped>
.particle-stage {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

.particle-sheet {
  position: absolute;
  left: 50%;
  top: 65%;
  width: min(82%, 1580px);
  max-width: none;
  height: auto;
  transform: translate(-50%, -50%);
}

.particle-sheet.using-animation {
  /* Keep the layout box available to the simulation when it takes over. */
  visibility: hidden;
}

.particle-animation {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
}

.particle-animation.active {
  visibility: visible;
}

@media (min-width: 768px) {
  .particle-stage {
    /* Soften the dots beneath the copy while keeping their edges crisp around it. */
    mask-image: radial-gradient(ellipse 42% 34% at 25% 49%, #0002 35%, #0005 67%, black);
  }
}

@media (max-width: 1023px) {
  .particle-sheet { width: 104%; }
}

@media (max-width: 639px) {
  .particle-sheet { width: 152%; top: 52%; }
}
</style>
