import * as fs from "fs";
import { Colors, Level } from "./constants";
import { Options } from "./index";
import { write } from "./stream";
import { FileData } from "./utils/getCallerFile";

const NO_PARSE = ["string", "boolean", "number", "undefined"];
type Template = (
  fileData?: FileData,
  str?: any,
  color?: Colors,
  stripped?: boolean
) => string;
const template: Template = (
  fileData?,
  msg = "%s",
  color = Colors.FgWhite,
  stripped = false
) => {
  const date = new Date().toISOString();
  const origin = `${fileData?.path}:${fileData?.line}:${fileData?.column}`;

  const parsed = NO_PARSE.includes(typeof msg)
    ? msg
    : JSON.stringify(msg, null, 2);
  if (stripped) return `${date}${origin ? " " + origin : ""}: ${parsed}`;
  return `${color}${date}${origin ? " " + origin : ""}: ${parsed}\x1b[0m`;
};

const log =
  (options: Options, stream?: fs.WriteStream, fileData?: FileData) =>
  (level: Level, msg?: any, args?: any[]) => {
    if (options.enableLogging && options.logLevels.includes(level))
      console.log(
        template(fileData, undefined, options.color[level]),
        msg,
        ...(args || [])
      );
    if (stream) {
      write(stream)(template(fileData, msg, undefined, true) + "\n", args);
    }
  };

export default log;
