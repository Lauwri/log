import * as fs from "fs";
import * as path from "path";

import ensureFile from "./utils/ensureFile";

const createWriteStream = (outputFile: string) => {
  const logPath = path.join(process.cwd(), outputFile);
  ensureFile(logPath);
  const _stream = fs.createWriteStream(logPath, { flags: "w" });
  const _close = () => _stream.close();
  process.on("SIGINT", _close);
  process.on("SIGKILL", _close);
  return _stream;
};

export const write = (stream: fs.WriteStream) => (msg?: any, args?: any[]) => {
  stream.write(msg);
  if (args) {
    const chunk = args.reduce((acc, arg) => {
      return (acc += JSON.stringify(arg, null, 2)) + "\n";
    }, "");
    stream.write(chunk);
  }
};

export default createWriteStream;
