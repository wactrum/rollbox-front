import type {
  Coordinates,
  ImageTransforms,
  CropperResult,
  Transform,
  Point,
} from 'vue-advanced-cropper'

export interface CroppedFile {
  coordinates: Coordinates | null
  image: {
    width: number
    height: number
    transforms: ImageTransforms
    src: string | null
  } | null
  result: string | null
}

export interface CropperRef {
  getResult: () => CropperResult
  setCoordinates: (transform: Transform | Transform[]) => void
  refresh: () => void
  zoom: (factor: number, center?: Point) => void
  move: (left: number, top?: number) => void
  rotate: (angle: number) => void
  flip: (horizontal: boolean, vertical?: boolean) => void
  reset: () => void
}
