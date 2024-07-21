import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import Card from "./ThreeCard";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { cx, css } from "@emotion/css";

interface ThreeSceneProps {
  color?: string[];
  image?: string;
}

const ThreeScene = ({ color, image }: ThreeSceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ColorArray;
    let ImagePath;

    if (color) {
      ColorArray = color;
    } else {
      ColorArray = ["#ff6e6e", "#31e0c1", "#006fff", "#ffd732"];
    }

    if (image) {
      ImagePath = image;
    } else {
      ImagePath = "/texture/texture1.png";
    }
    const COLORS = ColorArray;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, 1, 1, 500); // Aspect ratio will be updated in updateRendererSize()
    camera.position.z = 18;

    const updateRendererSize = () => {
      if (mountRef.current) {
        const { clientWidth, clientHeight } = mountRef.current;
        renderer.setSize(clientWidth, clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
      }
    };

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
      updateRendererSize();
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.5;
    controls.rotateSpeed = 0.75;
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 2 - Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 2 + Math.PI / 3;

    const card = new Card({
      width: 11,
      height: 16,
      radius: 0.5,
      color: COLORS[0],
      texturePath: ImagePath,
      text: "1234 5678 9999",
    });

    card.mesh.rotation.z = Math.PI * 0.1;
    scene.add(card.mesh);

    gsap.to(card.mesh.rotation, {
      y: -Math.PI * 4,
      duration: 2.5,
      ease: "back.out(2.5)",
    });

    const baseMaterial = (card.mesh.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    ambientLight.position.set(-5, -5, -5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
    const directionalLight2 = directionalLight1.clone();
    directionalLight1.position.set(1, 1, 3);
    directionalLight2.position.set(-1, 1, -3);
    scene.add(directionalLight1, directionalLight2);

    const render = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      updateRendererSize();
    };

    window.addEventListener("resize", handleResize);

    // 컬러코드 변환
    function lightenColor(color: string) {
      color = color.replace(/^#/, "");

      let r = parseInt(color.substring(0, 2), 16);
      let g = parseInt(color.substring(2, 4), 16);
      let b = parseInt(color.substring(4, 6), 16);

      r = Math.min(255, r + Math.round((255 * 50) / 100));
      g = Math.min(255, g + Math.round((255 * 50) / 100));
      b = Math.min(255, b + Math.round((255 * 50) / 100));

      const rs = r.toString(16).padStart(2, "0");
      const gs = g.toString(16).padStart(2, "0");
      const bs = b.toString(16).padStart(2, "0");

      // 새로운 컬러 코드를 반환합니다.
      return new THREE.Color(`#${rs}${gs}${bs}`);
    }

    // 버튼 생성 및 이벤트 리스너 설정을 한 번만 실행
    if (buttonsRef.current) {
      buttonsRef.current.innerHTML = "";
      COLORS.forEach((color) => {
        const button = document.createElement("button");
        button.style.backgroundColor = color;
        button.className = cx(ButtonStyle);
        button.addEventListener("click", () => {
          const newColor = new THREE.Color(color);
          const newTextColor = lightenColor(color);
          baseMaterial.color = newColor;

          // 텍스트 메쉬 색상 변경
          card.mesh.children.forEach((child) => {
            if (child instanceof THREE.Mesh && child.geometry instanceof TextGeometry) {
              (child.material as THREE.MeshStandardMaterial).color = newTextColor;
              (child.material as THREE.MeshStandardMaterial).needsUpdate = true;
            }
          });
        });
        buttonsRef.current?.appendChild(button);
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);

      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "start", maxWidth: "500px" }}>
        <div style={{ maxWidth: "300px", minHeight: "300px" }}>
          <div ref={mountRef} style={{ width: "100%", height: "100%", maxWidth: "300px", minHeight: "300px" }} />
        </div>
        <div ref={buttonsRef} style={{ padding: "8px 24px" }} className="container" />
      </div>
    </>
  );
};

const ButtonStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;

  &:not(:first-of-type) {
    margin-left: 16px;
  }
`;

export default ThreeScene;
