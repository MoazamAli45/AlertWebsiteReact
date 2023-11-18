export const convertPremsToNumber = (prems: string): number => {
  const lowercasePrems = prems.toLowerCase(); // Convert to lowercase for case-insensitive comparison

  if (lowercasePrems.endsWith('k')) {
    return parseFloat(prems.replace(/k$/i, '')) * 1000;
  } else if (lowercasePrems.endsWith('m')) {
    return parseFloat(prems.replace(/m$/i, '')) * 1000000;
  } else {
    return parseFloat(prems);
  }
};
