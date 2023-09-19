import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  RawShaderMaterial,
  Scene,
  Texture,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from 'three'
import frag from 'src/shaders/bulge/main.frag'
import vert from 'src/shaders/bulge/main.vert'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useEventListener } from 'usehooks-ts'
import {
  ShaderBaseCanvas,
  ShaderBaseCanvasProps,
} from '@/src/components/canvas/shader'

type Uniform = {
  uTexture: { value: Texture }
  uMouse: { value: Vector2 }
  uMouseDirection: { value: Vector2 }
}

class ShaderCanvas extends ShaderBaseCanvas<Uniform> {
  constructor({ ...props }: ShaderBaseCanvasProps<Uniform>) {
    super({ ...props })

    window.addEventListener('mousemove', (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = 1 - e.clientY / window.innerHeight
      if (this.m.uniforms) {
        this.m.uniforms.uMouseDirection.value = new Vector2(
          x - this.m.uniforms.uMouse.value.x,
          y - this.m.uniforms.uMouse.value.y
        )
        this.m.uniforms.uMouse.value = new Vector2(x, y)
      }
    })
  }

  render() {
    requestAnimationFrame(() => this.render())
    const sec = performance.now() / 1000
    this.r.render(this.s, this.c)
  }
}

export const Page = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [texture, setTexture] = useState<Texture | null>(null)

  useEffect(() => {
    const loader = new TextureLoader()
    loader.load('/sample.jpg', (tex) => {
      setTexture(tex)
    })
  }, [])

  return <main>{texture && <CanvasElement texture={texture} />}</main>
}

const CanvasElement = ({ texture }: { texture: Texture }) => {
  const ref = useRef<HTMLDivElement>(null)
  const canvas = useMemo(
    () =>
      new ShaderCanvas({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms: {
          uTexture: { value: texture },
          uMouse: { value: new Vector2(0.5, 0.5) },
          uMouseDirection: { value: new Vector2(0.0, 0.0) },
        },
        wireframe: false,
      }),
    [texture]
  )

  useEffect(() => {
    if (ref.current) {
      ref.current.appendChild(canvas.r.domElement)
      canvas.render()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={ref}></div>
}

export default Page
