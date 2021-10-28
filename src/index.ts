import { Colors, Level } from "./constants";
import log from "./log";
import createWriteStream from "./stream";
import getCallerFile, { FileData } from "./utils/getCallerFile";

export interface Options {
  logLevels: Level[];
  enableLogging: boolean;
  enableFile: boolean;
  outputFile: string;
  color: {
    [Level.Debug]: Colors;
    [Level.Critical]: Colors;
    [Level.Warning]: Colors;
    [Level.Info]: Colors;
  };
}

const defaultOptions: Options = {
  logLevels: Object.values(Level).filter(
    (l) => typeof l === "number"
  ) as Level[],
  enableLogging: true,
  enableFile: false,
  outputFile: "./logs/logs.txt",
  color: {
    [Level.Debug]: Colors.FgGreen,
    [Level.Critical]: Colors.FgRed,
    [Level.Warning]: Colors.FgYellow,
    [Level.Info]: Colors.FgWhite,
  },
};

export let options: Options = defaultOptions;

/**
 * @param _options Custom parameters for logging, use {} for resetting defaults
 * @param {MLevel[]} _options.logLevels Array of levels to log
 * @param {boolean} _options.enableLogging Enable logging to console
 * @param {boolean} _options.enableFile Enable logging to file
 * @param {string} _options.outputFile path to log output file
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

const createStream = () =>
  options.outputFile && options.enableFile
    ? createWriteStream(options.outputFile)
    : undefined;

// Expose stream for custom actions
export let stream = createStream();

const _log = () => log(options, stream, getCallerFile());
type LogFn = (msg: any, ...args: any[]) => void;

export const debug: LogFn = (msg, ...args) => _log()(Level.Debug, msg, args);
export const warn: LogFn = (msg, ...args) => _log()(Level.Warning, msg, args);
export const error: LogFn = (msg, ...args) => _log()(Level.Critical, msg, args);
export const info: LogFn = (msg, ...args) => _log()(Level.Info, msg, args);

export default { debug, warn, error, info, setup };
