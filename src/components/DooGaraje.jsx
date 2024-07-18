import React, { useRef, useEffect } from "react";
import { Base, Geometry, Subtraction } from "@react-three/csg";
import { BoxGeometry } from "three";

function DoorGareje({ open, ...props }) {
  const doorRef = useRef();

  useEffect(() => {
    if (doorRef.current) {
      // La rotación debe ser de 90 grados en radianes (PI/2)
      doorRef.current.rotation.y = open ? Math.PI / 2 : 0;
    }
  }, [open]);

  const frameWidth = 2;
  const frameDepth = 0.3;
  const frameHeight = 3;

  const doorDepth = frameDepth - 0.1;
  const doorWidth = frameWidth - 0.1;
  const doorHeight = frameHeight - 0.2;

  const frameBox = new BoxGeometry(frameWidth, frameHeight, frameDepth);
  const doorBox = new BoxGeometry(doorWidth, doorHeight, doorDepth);

  const warmColor = "#ffcc88";

  return (
    <mesh ref={doorRef} {...props}>
      <Subtraction>
        <Geometry>
          <Base geometry={frameBox} scale={[1, 2, 1]} />
        </Geometry>
        <meshStandardMaterial attach="material" color={warmColor} />
      </Subtraction>
      <mesh position={[0, 0, -doorDepth / 2]}>
        <Geometry>
          <Base geometry={doorBox} scale={[1, 1, 1]} />
        </Geometry>
        <meshStandardMaterial attach="material" color={warmColor} />
      </mesh>
    </mesh>
  );
}

export default DoorGareje;
