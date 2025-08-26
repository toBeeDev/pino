import React, { useRef } from "react";
import { useGLTF, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const GenericModel = ({
  url,
  rotationSpeed = 0.5,
  orbitEnabled = false,
  orbitRadius = 1.2,
  orbitRadiusX,
  orbitRadiusY,
  orbitSpeed = 0.6,
  orbitAxis = "xy",
  orbitCenter = [0, 0, 0],
  easeAmplitude = 0, // 0~1, 속도 가감속 강도
  easeFrequency = 0.5, // 초당 진동수
  tilt = [-0.2, 0, 0], // 상단이 보이도록 기본 기울임 [rx, ry, rz]
  wobbleAmplitude = 0.08, // 라디안, 미세 각도 변화 강도
  wobbleFrequency = 0.5, // 초당 진동수
  freeMotionEnabled = false,
  freeBounds = [1.0, 0.6, 1.0], // [x,y,z] 최대 편차
  freeDurationMin = 3.5,
  freeDurationMax = 6.0,
  ...props
}) => {
  const rotationRef = useRef(null);
  const orbitRef = useRef(null);
  const angleRef = useRef(0);
  const legStartPosRef = useRef(new Vector3());
  const legTargetPosRef = useRef(new Vector3());
  const legStartTimeRef = useRef(null);
  const legDurationRef = useRef(null);
  const initializedRef = useRef(false);
  const { scene } = useGLTF(url);
  useFrame((state, delta) => {
    // 회전 (자동 회전 + 기울임 + 워블)
    if (rotationRef.current) {
      if (rotationSpeed) {
        rotationRef.current.rotation.y += delta * rotationSpeed;
      }
      const t = state.clock.getElapsedTime();
      const wobbleX =
        wobbleAmplitude * Math.sin(t * wobbleFrequency * Math.PI * 2);
      const wobbleZ =
        wobbleAmplitude * Math.cos(t * wobbleFrequency * Math.PI * 2);
      rotationRef.current.rotation.x = (tilt?.[0] ?? 0) + wobbleX;
      rotationRef.current.rotation.z = (tilt?.[2] ?? 0) + wobbleZ;
      // tilt[1]는 기본 yaw 오프셋으로 적용 (자동 회전과 합산되므로 여기서 직접 세팅은 생략)
    }

    // 자유 모션 (랜덤 타겟으로 부드럽게 이징 이동)
    if (freeMotionEnabled && orbitRef.current) {
      const [cx, cy, cz] = orbitCenter;
      const now = state.clock.getElapsedTime();
      if (!initializedRef.current) {
        orbitRef.current.position.set(cx, cy, cz);
        legStartPosRef.current.copy(orbitRef.current.position);
        legTargetPosRef.current.set(
          cx + (Math.random() * 2 - 1) * freeBounds[0],
          cy + (Math.random() * 2 - 1) * freeBounds[1],
          cz + (Math.random() * 2 - 1) * freeBounds[2]
        );
        legStartTimeRef.current = now;
        legDurationRef.current =
          freeDurationMin + Math.random() * (freeDurationMax - freeDurationMin);
        initializedRef.current = true;
      }
      let progress = (now - legStartTimeRef.current) / legDurationRef.current;
      if (progress >= 1) {
        orbitRef.current.position.copy(legTargetPosRef.current);
        legStartPosRef.current.copy(legTargetPosRef.current);
        legTargetPosRef.current.set(
          cx + (Math.random() * 2 - 1) * freeBounds[0],
          cy + (Math.random() * 2 - 1) * freeBounds[1],
          cz + (Math.random() * 2 - 1) * freeBounds[2]
        );
        legStartTimeRef.current = now;
        legDurationRef.current =
          freeDurationMin + Math.random() * (freeDurationMax - freeDurationMin);
        progress = 0;
      }
      const eased =
        0.5 - 0.5 * Math.cos(Math.min(1, Math.max(0, progress)) * Math.PI);
      const currentPos = new Vector3()
        .copy(legStartPosRef.current)
        .lerp(legTargetPosRef.current, eased);
      orbitRef.current.position.copy(currentPos);
    }

    // 궤도 (타원 + 이징)
    if (!freeMotionEnabled && orbitEnabled && orbitRef.current) {
      const [cx, cy, cz] = orbitCenter;
      const rx = orbitRadiusX ?? orbitRadius;
      const ry = orbitRadiusY ?? orbitRadius;
      const speedFactor =
        1 +
        easeAmplitude *
          Math.sin(state.clock.getElapsedTime() * easeFrequency * Math.PI * 2);
      angleRef.current += delta * orbitSpeed * Math.max(0, speedFactor);
      const a = angleRef.current;
      if (orbitAxis === "xy") {
        orbitRef.current.position.set(
          cx + rx * Math.cos(a),
          cy + ry * Math.sin(a),
          cz
        );
      } else if (orbitAxis === "xz") {
        orbitRef.current.position.set(
          cx + rx * Math.cos(a),
          cy,
          cz + ry * Math.sin(a)
        );
      } else if (orbitAxis === "yz") {
        orbitRef.current.position.set(
          cx,
          cy + rx * Math.cos(a),
          cz + ry * Math.sin(a)
        );
      }
    }
  });
  return (
    <group ref={orbitRef}>
      <group ref={rotationRef}>
        <Center>
          <primitive object={scene} {...props} />
        </Center>
      </group>
    </group>
  );
};

export default GenericModel;
