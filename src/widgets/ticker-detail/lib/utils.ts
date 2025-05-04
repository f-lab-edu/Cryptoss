export const calcPrice = (
  price: number,
  krwRate: number | null,
  isKrw: boolean
) => {
  const rate = isKrw ? (krwRate ?? 1) : 1;

  return price * rate;
};
