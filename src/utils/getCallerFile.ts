export type FileData = { path: string; line: string; column: string };
const getCallerFile = (distance = 4): FileData | undefined => {
  const e = new Error();
  const regex = /([^\/\\]+):(\d+):(\d+)\D*$/;
  const match = e.stack && regex.exec(e.stack.split("\n")[distance]);
  return match
    ? {
        path: match[1],
        line: match[2],
        column: match[3],
      }
    : undefined;
};
export default getCallerFile;
