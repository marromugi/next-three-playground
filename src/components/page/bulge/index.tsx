import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three'
import frag from 'src/shaders/bulge/main.frag'
import vert from 'src/shaders/bulge/main.vert'
import { useEffect, useMemo, useRef, useState } from 'react'

export const BulgePage = () => {
  const ref = useRef<HTMLDivElement>(null)

  const [renderer, setRenderer] = useState<WebGLRenderer | null>(null)
  const [camera, setCamera] = useState<OrthographicCamera | null>(null)
  const [scene, setScene] = useState<Scene | null>(null)

  const render = () => {
    requestAnimationFrame(render)
    console.log

    const sec = performance.now() / 1000

    if (renderer && scene && camera) {
      console.log('rendering')
      renderer.render(scene, camera)
    }
  }

  useEffect(() => {
    if (ref.current === null) return

    const r = new WebGLRenderer()
    const c = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const s = new Scene()

    setRenderer(r)
    setCamera(c)
    setScene(s)

    r.setSize(800, 400)
    r.setPixelRatio(window.devicePixelRatio)
    ref.current.appendChild(r.domElement)

    const geo = new PlaneGeometry(2, 2, 10, 10)

    const mat = new ShaderMaterial({
      vertexShader: `void main() {
        vec3 pos = position;// position: ShaderMaterialで補完される vec3 型(xyz)の変数。ジオメトリの頂点のこと。
      
        gl_Position = vec4( pos, 1.0 );
      }`,
      fragmentShader: `void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }`,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: [0.0, 0.0, 0.0] },
      },
    })

    const mesh = new Mesh(geo, mat)

    s.add(mesh)

    render()
  }, [])

  return (
    <main>
      <div ref={ref}></div>
    </main>
  )
}
