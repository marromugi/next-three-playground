import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  RawShaderMaterial,
  Scene,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from 'three'
import frag from 'src/shaders/bulge/main.frag'
import vert from 'src/shaders/bulge/main.vert'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useEventListener } from 'usehooks-ts'

export const Page = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [uMouse, setMouse] = useState(new Vector2(0.5, 0.5))

  const render = (
    renderer: WebGLRenderer,
    camera: OrthographicCamera,
    scene: Scene,
    mat: RawShaderMaterial
  ) => {
    mat.uniforms.uTime.value += 0.01
    mat.uniforms.uMouse.value = uMouse

    requestAnimationFrame(() => render(renderer, camera, scene, mat))

    const sec = performance.now() / 1000
    console.log(uMouse)
    renderer.render(scene, camera)
  }

  const prepare = async () => {
    if (ref.current === null) return

    const r = new WebGLRenderer()
    const c = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const s = new Scene()

    const size = {
      width: 1600,
      height: 800,
    }

    r.setSize(size.width, size.height)
    r.setPixelRatio(window.devicePixelRatio)
    ref.current.appendChild(r.domElement)

    const geo = new PlaneGeometry(1, 1, 10, 10)
    const loader = new TextureLoader()
    loader.load('/sample.jpg', (tex) => {
      const mat = new RawShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms: {
          uTime: { value: 0.0 },
          uColor: { value: [0.3, 0.2, 0.5] },
          uTexture: { value: tex },
          uTextureResolution: {
            value: new Vector2(tex.image.width, tex.image.height),
          },
          uResolution: { value: new Vector2(size.width, size.height) },
          uMouse: { value: uMouse },
        },
        wireframe: false,
      })

      const mesh = new Mesh(geo, mat)

      s.add(mesh)

      render(r, c, s, mat)
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    const x = e.clientX / window.innerWidth
    const y = 1 - e.clientY / window.innerHeight
    setMouse(new Vector2(x, y))
  }

  useEffect(() => {
    prepare()
  }, [])

  useEventListener('mousemove', handleMouseMove)

  return (
    <main>
      <div ref={ref}></div>
    </main>
  )
}

export default Page
