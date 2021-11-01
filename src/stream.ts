import * as fs from "fs";
import ensureDir from "./utils/ensureDir";

const createWriteStream = (logPath: string, startTag?: string) => {
  ensureDir(logPath);
  const _stream = fs.createWriteStream(logPath, { flags: "a" });
  startTag && _stream.write(startTag);
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
