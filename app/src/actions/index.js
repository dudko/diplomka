export const CONSTANT_CHANGED = 'CONSTANT_CHANGED';
export const CRYSTAL_FAMILY_CHANGED = 'CRYSTAL_FAMILY';
export const MATERIAL_KEYWORD_CHANGED = 'MATERIAL_KEYWORD_CHANGED';

export const constantChanged = (value, index) => ({
  type: CONSTANT_CHANGED,
  value,
  index
});

export const crystalFamilyChanged = (name) => ({
  type: CRYSTAL_FAMILY_CHANGED,
  name
});

export const materialKeywordChanged = (keyword) => ({
  type: MATERIAL_KEYWORD_CHANGED,
  keyword
});