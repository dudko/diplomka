export const isValidFractionSum = materials => {
  const fractionSum = materials.reduce(
    (sum, material) => sum + material.get("fraction"),
    0
  );

  if (fractionSum >= 0.999 && fractionSum <= 1.001) {
    return true;
  }
  return false;
};
