export const parseJson = <T = any>(jsonStr: string): T | undefined => {
  let res: any;
  try {
    res = JSON.parse(jsonStr);
  } catch {
    res = undefined;
  }

  return res;
};
