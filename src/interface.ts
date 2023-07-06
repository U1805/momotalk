export interface myStudent {
  'avatar': string,
  'name': string,
  'bio': string
}

export interface Talk {
  'id': number,
  'name': string,
  'avatar': string | null,
  'talks': string[]
}