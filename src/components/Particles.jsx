import { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh, Texture } from "ogl";

import "../styles/Particles.css";
import { u } from "motion/react-client";
const defaultColors = [
  "#ffffff",
  "#045",
  "#0ff",
  "#0af",
  "#09f",
  "#06f",
  "#03f",
  "#f0f",
  "#a0f",
  "#60f",
  "#f06",
  "#f30",
  "#f60",
  "#fa0",
  "#fc0",
  "#ff0",
  "#5f5   ",
];

const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  const int = parseInt(hex, 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  return [r, g, b];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  attribute float iconIndex;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;

  varying vec4 vRandom;
  varying vec3 vColor;
  varying float vIconIndex;

  void main() {
    vRandom = random;
    vColor = color;
    vIconIndex = iconIndex;

    vec3 pos = position * uSpread;
    pos.z *= 10.0;

    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

    vec4 mvPos = viewMatrix * mPos;

    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.3))) / length(mvPos.xyz);
    }

    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
 precision highp float;

uniform sampler2D uReact;
uniform sampler2D uAngular;
uniform sampler2D uDotnet;
uniform sampler2D uPlaywright;
uniform sampler2D uBootstrap;
uniform sampler2D uJavascript;
uniform sampler2D uHtml;
uniform sampler2D uCss;

varying float vIconIndex;

void main() {
  vec2 uv = gl_PointCoord;
  uv.y = 1.0 - uv.y; // ikonları dikeyde düzelt
  // uv.x = 1.0 - uv.x; // gerekirse yatayda da çevir

  vec4 texColor;

  if (int(vIconIndex) == 0) {
    texColor = texture2D(uReact, uv);
  } else if (int(vIconIndex) == 1) {
    texColor = texture2D(uAngular, uv);
  } else if (int(vIconIndex) == 2) {
    texColor = texture2D(uDotnet, uv);
  } else if(int(vIconIndex) == 3) {
    texColor = texture2D(uPlaywright, uv);
  } else if(int(vIconIndex) == 4) {
    texColor = texture2D(uBootstrap, uv);
  }else if(int(vIconIndex) == 5) {
    texColor = texture2D(uJavascript, uv);
  }
    else if(int(vIconIndex) == 6) {
    texColor = texture2D(uHtml, uv);
  }
    else if(int(vIconIndex) == 7) {
    texColor = texture2D(uCss, uv);
  }

  if (texColor.a < 0.1) discard;
  gl_FragColor = texColor;
}

`;

const loadTexture = (gl, src) => {
  const tex = new Texture(gl);
  const img = new Image();
  img.onload = () => (tex.image = img);
  img.src = src;
  return tex;
};

const Particles = ({
  particleCount = 50,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 800,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  className = "",
}) => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ depth: false, alpha: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener("resize", resize, false);
    resize();

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };
    };

    if (moveParticlesOnHover) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const iconIndices = new Float32Array(count);

    const palette =
      particleColors && particleColors.length > 0
        ? particleColors
        : defaultColors;

    for (let i = 0; i < count; i++) {
      let x, y, z, len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set(
        [Math.random(), Math.random(), Math.random(), Math.random()],
        i * 4
      );
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
      colors.set(col, i * 3);
      iconIndices[i] = Math.floor(Math.random() * 8); // 0=React, 1=Angular, 2=.NET, 3=Playwright, 4=Bootstrap, 5=Javascript, 6=HTML, 7=CSS
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
      iconIndex: { size: 1, data: iconIndices },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness },
        uReact: { value: loadTexture(gl, "/icons/react.png") },
        uAngular: { value: loadTexture(gl, "/icons/angular.png") },
        uDotnet: { value: loadTexture(gl, "/icons/dotnet.png") },
        uPlaywright: { value: loadTexture(gl, "/icons/playwright.png") },
        uBootstrap: { value: loadTexture(gl, "/icons/bootstrap.png") },
        uJavascript: { value: loadTexture(gl, "/icons/Javascript.png") },
        uHtml : { value: loadTexture(gl, "/icons/html.png") },
        uCss : { value: loadTexture(gl, "/icons/css.png") },
      },
      transparent: true,
      depthTest: false,
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let animationFrameId;
    let lastTime = performance.now();
    let elapsed = 0;

    const update = (t) => {
      animationFrameId = requestAnimationFrame(update);
      const delta = t - lastTime;
      lastTime = t;
      elapsed += delta * speed;

      program.uniforms.uTime.value = elapsed * 0.001;

      if (moveParticlesOnHover) {
        particles.position.x = -mouseRef.current.x * particleHoverFactor;
        particles.position.y = -mouseRef.current.y * particleHoverFactor;
      } else {
        particles.position.x = 0;
        particles.position.y = 0;
      }

      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z += 0.01 * speed;
      }

      renderer.render({ scene: particles, camera });
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      if (moveParticlesOnHover)
        container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
  ]);

  return (
    <div ref={containerRef} className={`particles-container ${className}`} />
  );
};

export default Particles;
