import * as fs from "fs";
import { Colors, Level } from "./constants";
import log from "./log";
import createWriteStream from "./stream";
import getCallerFile from "./utils/getCallerFile";
import tagFile from "./utils/tagFile";

export interface Options {
  logLevels: Level[];
  enableLogging: boolean;
  enableFile: boolean;
  outputFile: string;
  tagDate?: boolean;
  tagLevel?: boolean;
  tagFileMessage: string;
  color: {
    [Level.Debug]: Colors;
    [Level.Error]: Colors;
    [Level.Warning]: Colors;
    [Level.Info]: Colors;
  };
}

const defaultOptions: Options = {
  logLevels: Object.values(Level).filter(
    (l) => typeof l === "string"
  ) as Level[],
  enableLogging: true,
  enableFile: false,
  outputFile: "./logs/logs.txt",
  tagDate: true,
  tagLevel: true,
  tagFileMessage: `Logging started at ${new Date().toISOString()}\nfrom origin ${process.cwd()}\n`,
  color: {
    [Level.Debug]: Colors.FgGreen,
    [Level.Error]: Colors.FgRed,
    [Level.Warning]: Colors.FgYellow,
    [Level.Info]: Colors.FgWhite,
  },
};

export let options: Options = defaultOptions;

/**
 * @param _options Custom parameters for logging, use {} for resetting defaults
 * @param {MLevel[]} _options.logLevels Array of levels to log, default all
 * @param {boolean} _options.enableLogging Enable logging to console, default true
 * @param {boolean} _options.enableFile Enable logging to file, default false
 * @param {string} _options.outputFile path to log output file, default ./logs/logs.txt
 * @param {string} _options.tagDate tags file with a timestamp, default true
 * @param {boolean} _options.tagLevel tags file with a log level, default true
 * @param {string} _options.tagFileMessage tags file with a message, default Logging started at Date.now()\nfromorigin process.cwd()
 * @param _options.color Colors for logging levels
 */
export const setup = (_options: Partial<Options>) =>
  createOptions(_options) && (stream = createStream());

const createOptions = (_options: Partial<Options>) =>
  (options = {
    ...options,
    ..._options,
    color: { ...options.color, ..._options.color },
  });

const createStream = (_stream?: fs.WriteStream) => {
  if (options.outputFile && options.enableFile) {
    _stream && _stream.close();
    return createWriteStream(
      options.tagDate ? tagFile(options.outputFile) : options.outputFile,
      options.tagFileMessage
    ); // Should tagging be an option?
  }
};
// Expose stream for custom actions
export let stream = createStream();

const _log = () => log(options, stream, getCallerFile());
type LogFn = (message?: any, ...args: any[]) => void;
export const debug: LogFn = (msg, ...args) => _log()(Level.Debug, msg, args);
export const warn: LogFn = (msg, ...args) => _log()(Level.Warning, msg, args);
export const error: LogFn = (msg, ...args) => _log()(Level.Error, msg, args);
export const info: LogFn = (msg, ...args) => _log()(Level.Info, msg, args);

export default { debug, warn, error, info, setup };
