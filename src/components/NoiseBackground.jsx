import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";

export function NoiseBackground() {
  const pointsRef = useRef();
  const Noise = useMemo(() => new ImprovedNoise(), []);
  const gridSize = 32;
  const gap = 0.15;
  const nScale = 0.4;
  const zPosScale = 0.5;

  // Инициализация позиций и цветов
  const { positions, colors } = useMemo(() => {
    const coords = [];
    const cols = [];
    for (let i = -gridSize; i < gridSize; i++) {
      for (let j = -gridSize; j < gridSize; j++) {
        coords.push(i * gap, j * gap, 0);
        cols.push(Math.random(), Math.random(), Math.random());
      }
    }
    return {
      positions: new Float32Array(coords),
      colors: new Float32Array(cols),
    };
  }, []);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);

  const lowColor = new THREE.Color(0.2, 0.0, 0.0);
  const highColor = new THREE.Color(0, 0, 0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.7;
    const pos = geom.getAttribute("position");
    const col = geom.getAttribute("color");

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const ns = Noise.noise(x * nScale, y * nScale, t);
      pos.setZ(i, ns * zPosScale);

      const tempColor = new THREE.Color();
      tempColor.lerpColors(lowColor, highColor, (ns + 1) / 2);
      col.setXYZ(i, tempColor.r, tempColor.g, tempColor.b);
    }
    pos.needsUpdate = true;
    col.needsUpdate = true;
  });

  return (
    <group position={[0, 0, -10]} scale={[2, 2, 1]}>
        <points ref={pointsRef} geometry={geom}>
            <pointsMaterial size={10} vertexColors />
        </points>
    </group>
  );
}
