import * as fs from "fs";
import { Colors, Level } from "./constants";
import { Options } from "./index";
import { write } from "./stream";
import { FileData } from "./utils/getCallerFile";

const NO_PARSE = ["string", "boolean", "number", "undefined", "null", "NaN"];

type Template = (
  fileData?: FileData,
  msg?: any,
  color?: Colors,
  level?: Level
) => string;
const template: Template = (fileData?, msg = "%s", color?, level?) => {
  const date = new Date().toISOString();
  const levelStr = level ? `${level.toUpperCase()}: ` : "";
  const origin = fileData?.string;
  const parsed = NO_PARSE.includes(typeof msg)
    ? msg
    : JSON.stringify(msg, null, 2);

  if (!color)
    return `${levelStr}${date}${origin ? " " + origin : ""}: ${parsed}`;
  return `${color}${levelStr}${date}${origin ? " " + origin : ""}: ${parsed}`;
};

const log =
  (options: Options, stream?: fs.WriteStream, fileData?: FileData) =>
  (level: Level, msg?: any, args?: any[]) => {
    if (options.enableLogging && options.logLevels.includes(level)) {
      const temp = template(
        fileData,
        undefined,
        options.color[level],
        options.tagLevel ? level : undefined
      );
      console.log(temp, msg, ...(args || []), Colors.Reset);
    }
    if (stream) {
      write(stream)(
        template(
          fileData,
          msg,
          undefined,
          options.tagLevel ? level : undefined
        ) + "\n",
        args
      );
    }
  };

export default log;
