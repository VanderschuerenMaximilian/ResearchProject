import {
  BoxGeometry,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

const scene = new Scene();
const width = Math.round(window.innerWidth)
const height = Math.round(window.innerHeight)
const camera = new PerspectiveCamera(75, width / height, 0.1	, 1000);
camera.position.z = 5;

const geometry = new BoxGeometry();

const material = new MeshStandardMaterial({
	color: 0x00ff00,
	metalness: 0.13
});

const cube = new Mesh(geometry, material);
scene.add(cube);

const directionalLight = new DirectionalLight(0x9090aa);
directionalLight.position.set(-10, 10, -10).normalize();
scene.add(directionalLight);

const hemisphereLight = new HemisphereLight(0xffffff, 0x444444);
hemisphereLight.position.set(1, 1, 1);
scene.add(hemisphereLight);

let renderer:WebGLRenderer;

const animate = () => {
	requestAnimationFrame(animate);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render(scene, camera);
};

const resize = () => {
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
};

export const createScene = (el:HTMLCanvasElement) => {
	renderer = new WebGLRenderer({ antialias: true, canvas: el });
	resize();
	animate();
};

window.addEventListener('resize', resize);