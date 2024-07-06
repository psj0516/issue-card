import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

interface CardProps {
  width: number;
  height: number;
  radius: number;
  color: string;
  texturePath?: string;
  text?: string;
}

class ThreeCard {
  mesh: THREE.Group;

  constructor({ width, height, radius, color, texturePath, text }: CardProps) {
    const x = width / 2 - radius;
    const y = height / 2 - radius;

    // 카드 형태 만들기
    const shape = new THREE.Shape();
    shape
      .moveTo(x, y)
      .absarc(x, y, radius, Math.PI / 2, 0, true)
      .lineTo(x + radius, -y)
      .absarc(x, -y, radius, 0, -Math.PI / 2, true)
      .lineTo(-x, -(y + radius))
      .absarc(-x, -y, radius, -Math.PI / 2, Math.PI, true)
      .lineTo(-(x + radius), y)
      .absarc(-x, y, radius, Math.PI, Math.PI / 2, true);

    // 기본 카드 geometry
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.01,
      bevelThickness: 0.1,
    });

    // 기본 색
    const baseMaterial = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.5,
    });

    // Mesh
    const baseMesh = new THREE.Mesh(geometry, baseMaterial);

    this.mesh = new THREE.Group();
    this.mesh.add(baseMesh);

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
      return `#${rs}${gs}${bs}`;
    }

    if (texturePath) {
      const loader = new THREE.TextureLoader();
      loader.load(texturePath, (texture) => {
        // const aspectRatio = texture.image.width / texture.image.height;
        const imageWidth = width;
        const imageHeight = height;

        const imageGeometry = new THREE.PlaneGeometry(imageWidth, imageHeight);
        const imageMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
        });

        const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
        imageMesh.position.z = 0.15; // Slightly in front of the base mesh

        this.mesh.add(imageMesh);
      });
    }

    if (text) {
      const fontLoader = new FontLoader();
      const textColor = lightenColor(color);
      fontLoader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
        const textGeometry = new TextGeometry(text, {
          font: font,
          size: 0.8,
          height: 0.1,
        });

        const textMaterial = new THREE.MeshStandardMaterial({
          color: textColor,
        });

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(-4.5, -height / 2 + radius, -0.015);
        textMesh.rotation.set(Math.PI, 0, -Math.PI / 2);

        this.mesh.add(textMesh);
      });

      const stripeGeometry = new THREE.PlaneGeometry(width * 0.15, height);
      const stripeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const stripeMesh = new THREE.Mesh(stripeGeometry, stripeMaterial);
      stripeMesh.position.set(width / 2 - width * 0.15, 0, -0.11);
      stripeMesh.rotation.y = Math.PI;

      this.mesh.add(stripeMesh);
    }
  }
}

export default ThreeCard;
