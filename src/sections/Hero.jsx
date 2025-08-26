import { Canvas } from "@react-three/fiber";
import GenericModel from "../components/GenericModel";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `솔이의 27번째 생일을 축하하며`;
  return (
    <section id="home" className="flex flex-col justify-end min-h-[100dvh]">
      <AnimatedHeaderSection
        subTitle={"2025.08.30"}
        title={"Happy Birthday"}
        text={text}
        textColor={"text-black"}
      />
      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "100dvh" }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.5} />
          <Float speed={0.5}>
            <GenericModel
              url="/models/Cake.glb"
              scale={isMobile ? 1.5 : 2}
              rotationSpeed={0.18}
              freeMotionEnabled
              freeBounds={[1.0, 0.7, 1.0]}
              freeDurationMin={3.5}
              freeDurationMax={6.5}
              stayInView
              viewMargin={0.12}
              orbitEnabled={false}
              tilt={[-0.28, 0, 0]}
              wobbleAmplitude={0.06}
              wobbleFrequency={0.35}
            />
          </Float>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
