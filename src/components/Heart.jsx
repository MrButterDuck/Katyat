import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useThree  } from "@react-three/fiber";
import React, { useEffect, useRef, useState, useMemo  } from "react";
import * as THREE from "three";
export function Heart(props) {
  const { nodes, materials } = useGLTF("/models/heart.glb");
  const group = useRef();

  const params = {
    color: '#ff00000',
    sheenColor: '#ffffff'
  };

  const [scale, setScale] = useState(1);

  // Получаем размеры канваса
  const { size } = useThree();

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768; // можно менять порог
      setScale(isMobile ? 0.25 : 0.5); // уменьшаем на мобильных
    };

    handleResize(); // сразу при монтировании
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  // Создаем стеклянный материал
const glassMaterial = useMemo(() => {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color( parseInt(params.color.replace('#','0x')) ),      // белый — самый читаемый для стекла
    transparent: true,     // обязательно
    transmission: 1,       // физическая прозрачность
    ior: 1.7,              // стекло
    thickness: 0.5,        // поиграй 0.2–1.0
    roughness: 0.0,
    metalness: 0,
    clearcoat: 0.8,
    clearcoatRoughness: 0,
    envMapIntensity: 1,
    depthWrite: true,     // КЛЮЧ для множества перекрывающихся частей
    side: THREE.DoubleSide, // если есть проблемы с нормалями/тонкие стенки
    sheen: 0.0,
    sheenColor: new THREE.Color( parseInt(params.sheenColor.replace('#','0x')) ),
    emissive: new THREE.Color("#ff0000"), // лёгкий «свет»
    emissiveIntensity: 0.1
  });
}, []);

  useEffect(() => {
    const groupWorldPosition = new THREE.Vector3();
    group.current.getWorldPosition(groupWorldPosition);

    group.current.traverse((o) => {
      if (o.isMesh) o.renderOrder = 1; // рендерить после обычных
    });

    group.current.children.forEach((mesh) => {
      mesh.originalPosition = mesh.position.clone();
      const meshWorldPosition = new THREE.Vector3();
      mesh.getWorldPosition(meshWorldPosition);

      mesh.directionVector = meshWorldPosition
        .clone()
        .sub(groupWorldPosition)
        .normalize();
      mesh.targetPosition = mesh.originalPosition
        .clone()
        .add(mesh.directionVector.clone().multiplyScalar(12));
    });
  }, []);

  const scrollData = useScroll();

  useFrame(() => {
    group.current.children.forEach((mesh) => {
      if (1 - scrollData.offset < 0.0001) {
        if (mesh.name === "origin") {
          mesh.visible = true;
        } else {
          mesh.visible = false;
        }
      } else {
        if (mesh.name === "origin") {
          mesh.visible = false;
        } else {
          mesh.visible = true;
        }
      }

      mesh.position.x = THREE.MathUtils.lerp(
        mesh.originalPosition.x,
        mesh.targetPosition.x,
        1 - scrollData.offset // 0 at the beginning and 1 after scroll
      );
      mesh.position.y = THREE.MathUtils.lerp(
        mesh.originalPosition.y,
        mesh.targetPosition.y,
        1 - scrollData.offset // 0 at the beginning and 1 after scroll
      );
      mesh.position.z = THREE.MathUtils.lerp(
        mesh.originalPosition.z,
        mesh.targetPosition.z,
        1 -scrollData.offset // 0 at the beginning and 1 after scroll
      );
    });
  });

  return (
    <group {...props} dispose={null} ref={group} scale={[scale, scale, scale]}>
      <mesh
        name="Heart_Full_cell"
        geometry={nodes.Heart_Full_cell.geometry}
        material={glassMaterial}
        position={[-0.378, 1.38, -0.134]}
      />
      <mesh
        name="Heart_Full_cell001"
        geometry={nodes.Heart_Full_cell001.geometry}
        material={glassMaterial}
        position={[-0.97, 1.294, 0.048]}
      />
      <mesh
        name="Heart_Full_cell002"
        geometry={nodes.Heart_Full_cell002.geometry}
        material={glassMaterial}
        position={[0.56, -1.097, -0.527]}
      />
      <mesh
        name="Heart_Full_cell003"
        geometry={nodes.Heart_Full_cell003.geometry}
        material={glassMaterial}
        position={[-1.604, 0.187, 0.577]}
      />
      <mesh
        name="Heart_Full_cell004"
        geometry={nodes.Heart_Full_cell004.geometry}
        material={glassMaterial}
        position={[1.935, 0.809, -0.712]}
      />
      <mesh
        name="Heart_Full_cell006"
        geometry={nodes.Heart_Full_cell006.geometry}
        material={glassMaterial}
        position={[0.664, 1.292, -0.563]}
      />
      <mesh
        name="Heart_Full_cell007"
        geometry={nodes.Heart_Full_cell007.geometry}
        material={glassMaterial}
        position={[-1.994, -0.209, -0.489]}
      />
      <mesh
        name="Heart_Full_cell009"
        geometry={nodes.Heart_Full_cell009.geometry}
        material={glassMaterial}
        position={[1.025, -1.203, 0.783]}
      />
      <mesh
        name="Heart_Full_cell011"
        geometry={nodes.Heart_Full_cell011.geometry}
        material={glassMaterial}
        position={[0.755, 0.098, -1.07]}
      />
      <mesh
        name="Heart_Full_cell012"
        geometry={nodes.Heart_Full_cell012.geometry}
        material={glassMaterial}
        position={[-0.102, 0.836, -0.582]}
      />
      <mesh
        name="Heart_Full_cell013"
        geometry={nodes.Heart_Full_cell013.geometry}
        material={glassMaterial}
        position={[-1.394, 0.944, 1.096]}
      />
      <mesh
        name="Heart_Full_cell014"
        geometry={nodes.Heart_Full_cell014.geometry}
        material={glassMaterial}
        position={[1.462, 0.711, 0.559]}
      />
      <mesh
        name="Heart_Full_cell015"
        geometry={nodes.Heart_Full_cell015.geometry}
        material={glassMaterial}
        position={[1.527, 0.862, -1.101]}
      />
      <mesh
        name="Heart_Full_cell016"
        geometry={nodes.Heart_Full_cell016.geometry}
        material={glassMaterial}
        position={[2.103, 0.027, 0.291]}
      />
      <mesh
        name="Heart_Full_cell017"
        geometry={nodes.Heart_Full_cell017.geometry}
        material={glassMaterial}
        position={[0.037, -1.13, -0.555]}
      />
      <mesh
        name="Heart_Full_cell018"
        geometry={nodes.Heart_Full_cell018.geometry}
        material={glassMaterial}
        position={[-1.661, -0.684, -0.197]}
      />
      <mesh
        name="Heart_Full_cell019"
        geometry={nodes.Heart_Full_cell019.geometry}
        material={glassMaterial}
        position={[-1.37, 0.671, -0.53]}
      />
      <mesh
        name="Heart_Full_cell020"
        geometry={nodes.Heart_Full_cell020.geometry}
        material={glassMaterial}
        position={[-0.147, -1.904, -0.34]}
      />
      <mesh
        name="Heart_Full_cell021"
        geometry={nodes.Heart_Full_cell021.geometry}
        material={glassMaterial}
        position={[1.337, -0.77, 0.073]}
      />
      <mesh
        name="Heart_Full_cell022"
        geometry={nodes.Heart_Full_cell022.geometry}
        material={glassMaterial}
        position={[1.512, -0.508, -1.048]}
      />
      <mesh
        name="Heart_Full_cell023"
        geometry={nodes.Heart_Full_cell023.geometry}
        material={glassMaterial}
        position={[-1.098, 0.375, -1.212]}
      />
      <mesh
        name="Heart_Full_cell024"
        geometry={nodes.Heart_Full_cell024.geometry}
        material={glassMaterial}
        position={[0.652, -0.158, 1.307]}
      />
      <mesh
        name="Heart_Full_cell025"
        geometry={nodes.Heart_Full_cell025.geometry}
        material={glassMaterial}
        position={[-0.341, 0.181, -0.911]}
      />
      <mesh
        name="Heart_Full_cell026"
        geometry={nodes.Heart_Full_cell026.geometry}
        material={glassMaterial}
        position={[0.864, 0.276, 1.016]}
      />
      <mesh
        name="Heart_Full_cell027"
        geometry={nodes.Heart_Full_cell027.geometry}
        material={glassMaterial}
        position={[-0.297, -0.409, -0.57]}
      />
      <mesh
        name="Heart_Full_cell029"
        geometry={nodes.Heart_Full_cell029.geometry}
        material={glassMaterial}
        position={[-1.869, 0.89, -0.101]}
      />
      <mesh
        name="Heart_Full_cell030"
        geometry={nodes.Heart_Full_cell030.geometry}
        material={glassMaterial}
        position={[-1.945, 0.242, -0.776]}
      />
      <mesh
        name="Heart_Full_cell031"
        geometry={nodes.Heart_Full_cell031.geometry}
        material={glassMaterial}
        position={[-0.799, -0.56, 1.044]}
      />
      <mesh
        name="Heart_Full_cell032"
        geometry={nodes.Heart_Full_cell032.geometry}
        material={glassMaterial}
        position={[-1.182, -0.453, -0.871]}
      />
      <mesh
        name="Heart_Full_cell033"
        geometry={nodes.Heart_Full_cell033.geometry}
        material={glassMaterial}
        position={[1.35, 1.484, 0.218]}
      />
      <mesh
        name="Heart_Full_cell034"
        geometry={nodes.Heart_Full_cell034.geometry}
        material={glassMaterial}
        position={[1.458, 0.131, -0.84]}
      />
      <mesh
        name="Heart_Full_cell035"
        geometry={nodes.Heart_Full_cell035.geometry}
        material={glassMaterial}
        position={[0.271, -1.994, -0.406]}
      />
      <mesh
        name="Heart_Full_cell036"
        geometry={nodes.Heart_Full_cell036.geometry}
        material={glassMaterial}
        position={[0.397, -1.607, 0.377]}
      />
      <mesh
        name="Heart_Full_cell037"
        geometry={nodes.Heart_Full_cell037.geometry}
        material={glassMaterial}
        position={[-0.627, -1.287, -0.731]}
      />
      <mesh
        name="Heart_Full_cell038"
        geometry={nodes.Heart_Full_cell038.geometry}
        material={glassMaterial}
        position={[1.877, 0.002, -0.448]}
      />
      <mesh
        name="Heart_Full_cell039"
        geometry={nodes.Heart_Full_cell039.geometry}
        material={glassMaterial}
        position={[-1.833, -0.277, 0.162]}
      />
      <mesh
        name="Heart_Full_cell040"
        geometry={nodes.Heart_Full_cell040.geometry}
        material={glassMaterial}
        position={[-0.881, -1.311, 0.164]}
      />
      <mesh
        name="Heart_Full_cell041"
        geometry={nodes.Heart_Full_cell041.geometry}
        material={glassMaterial}
        position={[-1.738, -0.569, 0.661]}
      />
      <mesh
        name="Heart_Full_cell042"
        geometry={nodes.Heart_Full_cell042.geometry}
        material={glassMaterial}
        position={[-1.252, -0.643, 0.818]}
      />
      <mesh
        name="Heart_Full_cell043"
        geometry={nodes.Heart_Full_cell043.geometry}
        material={glassMaterial}
        position={[-0.279, -0.789, 0.812]}
      />
      <mesh
        name="Heart_Full_cell044"
        geometry={nodes.Heart_Full_cell044.geometry}
        material={glassMaterial}
        position={[-0.999, 0.647, 0.937]}
      />
      <mesh
        name="Heart_Full_cell045"
        geometry={nodes.Heart_Full_cell045.geometry}
        material={glassMaterial}
        position={[1.186, -0.645, -0.566]}
      />
      <mesh
        name="Heart_Full_cell046"
        geometry={nodes.Heart_Full_cell046.geometry}
        material={glassMaterial}
        position={[0.892, 1.389, 0.033]}
      />
      <mesh
        name="Heart_Full_cell047"
        geometry={nodes.Heart_Full_cell047.geometry}
        material={glassMaterial}
        position={[0.36, -0.465, -1.097]}
      />
      <mesh
        name="Heart_Full_cell048"
        geometry={nodes.Heart_Full_cell048.geometry}
        material={glassMaterial}
        position={[2.118, 0.791, -0.167]}
      />
      <mesh
        name="Heart_Full_cell049"
        geometry={nodes.Heart_Full_cell049.geometry}
        material={glassMaterial}
        position={[1.579, 1.102, -0.353]}
      />
      <mesh
        name="Heart_Full_cell050"
        geometry={nodes.Heart_Full_cell050.geometry}
        material={glassMaterial}
        position={[0.076, 0.456, 0.426]}
      />
      <mesh
        name="Heart_Full_cell051"
        geometry={nodes.Heart_Full_cell051.geometry}
        material={glassMaterial}
        position={[-0.802, 0.933, -0.989]}
      />
      <mesh
        name="Heart_Full_cell052"
        geometry={nodes.Heart_Full_cell052.geometry}
        material={glassMaterial}
        position={[0.86, 0.73, -0.705]}
      />
      <mesh
        name="Heart_Full_cell053"
        geometry={nodes.Heart_Full_cell053.geometry}
        material={glassMaterial}
        position={[-0.098, -1.955, 0.437]}
      />
      <mesh
        name="Heart_Full_cell054"
        geometry={nodes.Heart_Full_cell054.geometry}
        material={glassMaterial}
        position={[0.091, 1.215, 0.232]}
      />
      <mesh
        name="Heart_Full_cell055"
        geometry={nodes.Heart_Full_cell055.geometry}
        material={glassMaterial}
        position={[0.682, -0.634, 0.771]}
      />
      <mesh
        name="Heart_Full_cell056"
        geometry={nodes.Heart_Full_cell056.geometry}
        material={glassMaterial}
        position={[0.126, -0.064, 1.148]}
      />
      <mesh
        name="Heart_Full_cell057"
        geometry={nodes.Heart_Full_cell057.geometry}
        material={glassMaterial}
        position={[-1.252, -1.019, -0.68]}
      />
      <mesh
        name="Heart_Full_cell058"
        geometry={nodes.Heart_Full_cell058.geometry}
        material={glassMaterial}
        position={[0.945, 0.816, 1.139]}
      />
      <mesh
        name="Heart_Full_cell059"
        geometry={nodes.Heart_Full_cell059.geometry}
        material={glassMaterial}
        position={[1.589, -0.356, 0.773]}
      />
      <mesh
        name="Heart_Full_cell060"
        geometry={nodes.Heart_Full_cell060.geometry}
        material={glassMaterial}
        position={[1.92, 0.027, 0.91]}
      />
      <mesh
        name="Heart_Full_cell061"
        geometry={nodes.Heart_Full_cell061.geometry}
        material={glassMaterial}
        position={[-2.321, 0.315, -0.099]}
      />
      <mesh
        name="Heart_Full_cell063"
        geometry={nodes.Heart_Full_cell063.geometry}
        material={glassMaterial}
        position={[-1.908, 0.734, 0.484]}
      />
      <mesh
        name="origin"
        geometry={nodes.origin.geometry}
        material={glassMaterial}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/models/heart.glb");
