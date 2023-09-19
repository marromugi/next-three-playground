import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  RawShaderMaterial,
  Scene,
  ShaderMaterialParameters,
  WebGLRenderer,
} from 'three'

export type ShaderBaseCanvasProps<
  T extends ShaderMaterialParameters['uniforms']
> = Omit<ShaderMaterialParameters, 'uniforms'> & {
  uniforms: T
}

type TypeGuardRawShaderMaterial<
  T extends ShaderMaterialParameters['uniforms']
> = Omit<RawShaderMaterial, 'uniforms'> & {
  uniforms?: T
}

const TypeGuardRawShaderMaterialWrapper = <
  T extends ShaderMaterialParameters['uniforms']
>(
  props: Omit<ShaderMaterialParameters, 'uniforms'> & {
    uniforms: T
  }
) => {
  // Note: uniformがアタッチされるまでにラグがあるため、オプショナルで型安全にする
  return new RawShaderMaterial({ ...props }) as TypeGuardRawShaderMaterial<T>
}

export class ShaderBaseCanvas<T extends ShaderMaterialParameters['uniforms']> {
  uniforms: T
  r: WebGLRenderer
  s: Scene
  c: OrthographicCamera
  m: TypeGuardRawShaderMaterial<T>

  constructor({ ...props }: ShaderBaseCanvasProps<T>) {
    this.uniforms = props.uniforms
    this.r = new WebGLRenderer()
    this.s = new Scene()
    this.c = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    this.m = TypeGuardRawShaderMaterialWrapper({ ...props })

    this.r.setSize(window.innerWidth, window.innerHeight)
    this.r.setPixelRatio(window.devicePixelRatio)

    const geo = new PlaneGeometry(1, 1, 10, 10)
    const mesh = new Mesh(geo, this.m)
    this.s.add(mesh)
  }
}
