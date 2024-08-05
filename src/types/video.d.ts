declare module "*.mp4" {
  const src: string
  export default src
}

declare module "*/assets/*.mp4" {
  const src: string
  export default src
}
