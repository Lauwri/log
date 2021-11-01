/**
 * Tags a file with a date tag or a custom tag
 * @param filePath
 * @param customTag
 * @returns
 */

const tagFile = (filePath: string, customTag?: string) => {
  const fullPath = filePath.split(/\/|\\/);
  const fullName = fullPath[fullPath.length - 1];
  const file = fullName.split(".");
  const fileName = file[0];
  const ext = file[1];

  const tag = customTag || Date.now();
  return filePath.replace(fullName, `${fileName}_${tag}.${ext}`);
};

export default tagFile;
