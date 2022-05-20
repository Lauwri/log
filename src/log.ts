import * as fs from "fs";
import { Colors, Level } from "./constants";
import { Options } from "./index";
import { write } from "./stream";
import { FileData } from "./utils/getCallerFile";

const NO_PARSE = ["string", "boolean", "number", "undefined", "null"];

type Template = (
  fileData?: FileData,
  msg?: any,
  color?: Colors,
  level?: Level,
  timestamp?: boolean
) => string;
const template: Template = (
  fileData?,
  msg = "%s",
  color?,
  level?,
  timestamp = true
) => {
  const date = timestamp ? `${new Date().toISOString()} ` : "";
  const levelStr = level ? `${level.toUpperCase()}: ` : "";
  const origin = fileData?.string;
  const message = NO_PARSE.includes(typeof msg)
    ? msg
    : JSON.stringify(msg, null, 2);

  if (!color) return `${levelStr}${date}${origin}: ${message}`;
  return `${color}${levelStr}${date}${origin}: ${message}`;
};

const log =
  (options: Options, stream?: fs.WriteStream, fileData?: FileData) =>
  (level: Level, msg?: any, args?: any[]) => {
    const tagLevel = options.tagLevel ? level : undefined;
    const tagDate = options.tagDate;

    if (options.enableLogging && options.logLevels.includes(level)) {
      const temp = template(
        fileData,
        undefined,
        options.tagColor ? options.color[level] : undefined,
        tagLevel,
        tagDate
      );
      options.tagColor
        ? console.log(temp, msg, ...(args || []), Colors.Reset)
        : console.log(temp, msg, ...(args || []));
    }
    if (stream) {
      write(stream)(
        template(fileData, msg, undefined, tagLevel, tagDate) + "\n",
        args
      );
    }
  };

export default log;
