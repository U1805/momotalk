export interface LazyOptions {
  error?: string
  loading?: string
  observerOptions?: IntersectionObserverInit
  delay?: number
}

export interface ValueFormatterObject {
  src: string
  error?: string
  loading?: string
  delay?: number
}

export enum LifecycleEnum {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}