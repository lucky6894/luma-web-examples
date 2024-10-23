import { AdaptiveDpr, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Camera, CineonToneMapping, Scene, WebGLRenderer } from 'three';
import { OrbitControls as OrbitControlsStdLib } from 'three-stdlib';
import { DemoTransmission } from './DemoTransmission';

export type DemoProps = {
	renderer: WebGLRenderer,
	scene: Scene,
	camera: Camera,
	controls: OrbitControlsStdLib,
}

function DemoScene() {
	let { scene, gl: renderer, camera } = useThree();

	let [autoRotate, setAutoRotate] = useState(true);
	let controlsRef = useRef<OrbitControlsStdLib | null>(null);

	useEffect(() => {
		let demoProps = {
			renderer,
			scene,
			camera,
			controls: controlsRef.current!,
		}

		DemoTransmission(demoProps);
	}, []);

	return (
		<Fragment>
			<PerspectiveCamera />
			<OrbitControls
				ref={controlsRef}
				autoRotate={autoRotate}
				autoRotateSpeed={0.5}
				enableDamping={true}
				// disable auto rotation when user interacts
				onStart={() => {
					setAutoRotate(false);
				}}
				makeDefault
			/>
		</Fragment>
	);
}

function App() {
	return (
		<Canvas
			gl={{
				antialias: false,
				toneMapping: CineonToneMapping,
			}}
			style={{
				minWidth: '10px',
			}}
			onPointerDown={(e) => {
				// prevent text selection
				e.preventDefault();
			}}
		>
			<AdaptiveDpr pixelated />
			<DemoScene />
		</Canvas>
	);
}

const reactRoot = document.getElementById('react-root');
createRoot(reactRoot!).render(<App />);