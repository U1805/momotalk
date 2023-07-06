interface myStudent {
  'avatar': string,
  'name': string,
  'bio': string
}

interface Talk {
  'id': number,
  'name': string,
  'avatar': string | null,
  'talks': string[]
}

export { myStudent, Talk }