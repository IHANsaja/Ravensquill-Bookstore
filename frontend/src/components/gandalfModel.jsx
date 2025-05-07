import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function GandalfModel(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/gandalf.glb')

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="c42bc35d31284e0caed961e3361258cbfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.aiStandardSurface5}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials.aiStandardSurface2}
                    skeleton={nodes.Object_8.skeleton}
                  />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.aiStandardSurface4}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <skinnedMesh
                    name="Object_10"
                    geometry={nodes.Object_10.geometry}
                    material={materials.aiStandardSurface3}
                    skeleton={nodes.Object_10.skeleton}
                  />
                  <skinnedMesh
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={materials.aiStandardSurface1}
                    skeleton={nodes.Object_11.skeleton}
                  />
                  <group name="Object_6" />
                  <group name="pCylinder2" />
                  <group name="nurbsCircle1" position={[-1, 4, 0]} scale={1.83} />
                  <group name="aiSkyDomeLight1" />
                  <group
                    name="pCylinder3"
                    position={[-1, -0.18, 0]}
                    scale={[3.654, 0.213, 3.654]}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/gandalf.glb')

