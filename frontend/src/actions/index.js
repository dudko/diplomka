export const CELL_CHANGED = 'CELL_CHANGED';
export const CRYSTAL_SYSTEM_CHANGED = 'CRYSTAL_SYSTEM';
export const MATERIAL_KEYWORD_CHANGED = 'MATERIAL_KEYWORD_CHANGED';
export const UPDATE_TO_SEARCH_RESULT = 'UPDATE_TO_SEARCH_RESULT';

export const cellChanged = (value, index) => ({
  type: CELL_CHANGED,
  value,
  index
});

export const crystalSystemChanged = (crystalSystem) => ({
  type: CRYSTAL_SYSTEM_CHANGED,
  crystalSystem
});

export const materialKeywordChanged = (keyword) => ({
  type: MATERIAL_KEYWORD_CHANGED,
  keyword
});

export const updateToSearchResult = (elasticity, crystalSystem) => ({
  type: UPDATE_TO_SEARCH_RESULT,
  elasticity,
  crystalSystem
});
