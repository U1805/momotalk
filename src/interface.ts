interface myStudent {
  'Id': number,
  'Avatar': string,
  'Birthday': string,
  'Bio': string,
  'Name': string,
}

interface Talk {
  'id': number,
  'name': string,
  'avatar': string | null,
  'talks': string[]
}

export { myStudent, Talk }