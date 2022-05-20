# log

A lightweight node logger with zero dependencies.

## Installation

Install through npm

```
npm i @lauwri/log
yarn add @lauwri/log
```

## Usage

```
import log from "@lauwri/log";

// Enables logging to file, use outputFile to change output
log.setup({
  enableFile: true,
});

log.info("This is a regular log");
//INFO: 2022-05-16T22:53:47.688Z example.ts:8:5: This is a regular log

log.warn("This is a warning log");
//WARNING: 2022-05-16T22:53:47.692Z example.ts:9:5: This is a warning log

log.error("This is a error log");
//ERROR: 2022-05-16T22:53:47.693Z example.ts:10:5: This is a error log

log.debug("This is a debug log");
//DEBUG: 2022-05-16T22:53:47.694Z example.ts:11:5: This is a debug log
```

## API

```
import log from "@lauwri/log";
```

`info` `warn` `error` `debug` `(message?: any, ...args: any[])`:  
Log by level

`setup(options)`:  
Set global options for logger

`options`:

| command        | description                | default                            |
| -------------- | -------------------------- | ---------------------------------- |
| logLevels      | Array of levels to log     | Debug,Info,Warning,Error           |
| enableLogging  | Enable logging to console  | true                               |
| enableFile     | Enable logging to file     | false                              |
| outputFile     | Path to log output file    | ./logs/logs.txt                    |
| tagDate        | Tags file with a timestamp | true                               |
| tagLevel       | Tags file with a log level | true                               |
| tagColor       | Tags file with a color     | true                               |
| tagFileMessage | Tags file with a message   | Logging started at n from origin x |
| color          | Colors for logging levels  |                                    |
