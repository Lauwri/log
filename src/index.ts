import * as fs from "fs";
import { Colors, Level } from "./constants";
import log from "./log";
import createWriteStream from "./stream";
import getCallerFile from "./utils/getCallerFile";
import tagFile from "./utils/tagFile";

// Re-export colors and levels for convenience
export { Colors, Level };

export interface Options {
  logLevels: Level[];
  enableLogging: boolean;
  enableFile: boolean;
  outputFile: string;
  tagDate?: boolean;
  tagLevel?: boolean;
  tagColor?: boolean;
  tagFileMessage: string;
  color: {
    [key in Level]?: Colors;
  };
  levelToConsole: {
    [key in Level]: "log" | "error" | "debug" | "warn";
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
  tagColor: true,
  tagFileMessage: `Logging started at ${new Date().toISOString()}\nfrom origin ${process.cwd()}\n`,
  color: {
    [Level.Debug]: Colors.FgGreen,
    [Level.Error]: Colors.FgRed,
    [Level.Warn]: Colors.FgYellow,
    [Level.Info]: Colors.FgWhite,
  },
  levelToConsole: {
    [Level.Debug]: "debug",
    [Level.Error]: "error",
    [Level.Warn]: "warn",
    [Level.Info]: "log",
  },
};

export let options: Options = defaultOptions;

/**
 * @param _options Custom parameters for logging, empty arguments reset to default options
 * @param {MLevel[]} _options.logLevels Array of levels to log, default all
 * @param {boolean} _options.enableLogging Enable logging to console, default true
 * @param {boolean} _options.enableFile Enable logging to file, default false
 * @param {string} _options.outputFile path to log output file, default ./logs/logs.txt
 * @param {string} _options.tagDate tags file with a timestamp, default true
 * @param {boolean} _options.tagLevel tags file with a log level, default true
 * @param {boolean} _options.tagColor tags file with a color, default true
 * @param {string} _options.tagFileMessage tags file with a message, default Logging started at Date.now()\nfromorigin process.cwd()
 * @param _options.color Colors for logging levels
 */
export const setup = (_options?: Partial<Options>) =>
  createOptions(_options) && (stream = createStream());

const createOptions = (_options?: Partial<Options>) =>
  !_options
    ? (options = defaultOptions)
    : (options = {
        ...options,
        ..._options,
        color: { ...options.color, ..._options?.color },
        levelToConsole: {
          ...options.levelToConsole,
          ..._options?.levelToConsole,
        },
      });

const createStream = (_stream?: fs.WriteStream) => {
  if (options.outputFile && options.enableFile) {
    _stream && _stream.close();
    return createWriteStream(
      options.tagDate ? tagFile(options.outputFile) : options.outputFile,
      options.tagFileMessage
    );
  }
};
// Expose stream for custom actions
export let stream = createStream();

type LogFn = (message?: any, ...args: any[]) => void;

const _log = () => log(options, stream, getCallerFile());

// Basic logging functions
const __log =
  (level: Level): LogFn =>
  (msg, ...args) =>
    _log()(level, msg, args);

export const debug = __log(Level.Debug);
export const warn = __log(Level.Warn);
export const error = __log(Level.Error);
export const info = __log(Level.Info);

// Logging functions with custom tag
const __logc =
  (level: Level) =>
  (customTag: string): LogFn =>
  (msg, ...args) =>
    _log()(level, msg, args, customTag);

export const debugc = __logc(Level.Debug);
export const warnc = __logc(Level.Warn);
export const errorc = __logc(Level.Error);
export const infoc = __logc(Level.Info);

export default {
  debug,
  warn,
  error,
  info,

  debugc,
  warnc,
  errorc,
  infoc,

  setup,
};
