export const CHANGE_INPUT = 'CHANGE_INPUT'

export const handlingInputChanges = (value, name) => ({
  type: CHANGE_INPUT,
  value,
  name
})