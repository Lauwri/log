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
  timestamp?: boolean,
  customTag?: string
) => string;
const template: Template = (
  fileData,
  msg = "%s",
  color,
  level,
  timestamp = true,
  customTag
) => {
  const date = timestamp ? `${new Date().toISOString()} ` : "";
  const levelStr = level ? `${level.toUpperCase()}: ` : "";
  const origin = fileData?.string;
  const message = NO_PARSE.includes(typeof msg)
    ? msg
    : JSON.stringify(msg, null, 2);

  return `${color || ""}${
    customTag || `${levelStr}${date}${origin || ""}:`
  } ${message}`;
};

const log =
  (options: Options, stream?: fs.WriteStream, fileData?: FileData) =>
  (level: Level, msg?: any, args?: any[], customTag?: string) => {
    const tagLevel = options.tagLevel ? level : undefined;
    const tagDate = options.tagDate;

    if (options.enableLogging && options.logLevels.includes(level)) {
      const color = options.tagColor ? options.color[level] : undefined;
      const temp = template(
        fileData,
        undefined,
        color,
        tagLevel,
        tagDate,
        customTag
      );
      const consoleFn = console[options.levelToConsole[level]];
      color
        ? consoleFn(temp, msg, ...(args || []), Colors.Reset)
        : consoleFn(temp, msg, ...(args || []));
    }
    if (stream) {
      write(stream)(
        template(fileData, msg, undefined, tagLevel, tagDate, customTag) + "\n",
        args
      );
    }
  };

export default log;
