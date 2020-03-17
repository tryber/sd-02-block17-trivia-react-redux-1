export const CHANGE_INPUT = 'CHANGE_INPUT';
export const GET_CATEGORIE = 'GET_CATEGORIE';
export const CHANGE_SELECTORS = 'CHANGE_SELECTORS'

export const handlingInputChanges = (value, name) => ({
  type: CHANGE_INPUT,
  value,
  name,
});

export const getAllCategories = (categories) => ({
  type: GET_CATEGORIE,
  categories,
});

export const handleSelectorsChanges = (value, name) => ({
  type: CHANGE_SELECTORS,
  value,
  name,
});
