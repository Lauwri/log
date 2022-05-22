# log

[![Sponsored](https://img.shields.io/badge/chilicorn-sponsored-brightgreen.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAMAAADjyg5GAAABqlBMVEUAAAAzmTM3pEn%2FSTGhVSY4ZD43STdOXk5lSGAyhz41iz8xkz2HUCWFFhTFFRUzZDvbIB00Zzoyfj9zlHY0ZzmMfY0ydT0zjj92l3qjeR3dNSkoZp4ykEAzjT8ylUBlgj0yiT0ymECkwKjWqAyjuqcghpUykD%2BUQCKoQyAHb%2BgylkAyl0EynkEzmkA0mUA3mj86oUg7oUo8n0k%2FS%2Bw%2Fo0xBnE5BpU9Br0ZKo1ZLmFZOjEhesGljuzllqW50tH14aS14qm17mX9%2Bx4GAgUCEx02JySqOvpSXvI%2BYvp2orqmpzeGrQh%2Bsr6yssa2ttK6v0bKxMBy01bm4zLu5yry7yb29x77BzMPCxsLEzMXFxsXGx8fI3PLJ08vKysrKy8rL2s3MzczOH8LR0dHW19bX19fZ2dna2trc3Nzd3d3d3t3f39%2FgtZTg4ODi4uLj4%2BPlGxLl5eXm5ubnRzPn5%2Bfo6Ojp6enqfmzq6urr6%2Bvt7e3t7u3uDwvugwbu7u7v6Obv8fDz8%2FP09PT2igP29vb4%2BPj6y376%2Bu%2F7%2Bfv9%2Ff39%2Fv3%2BkAH%2FAwf%2FtwD%2F9wCyh1KfAAAAKXRSTlMABQ4VGykqLjVCTVNgdXuHj5Kaq62vt77ExNPX2%2Bju8vX6%2Bvr7%2FP7%2B%2FiiUMfUAAADTSURBVAjXBcFRTsIwHAfgX%2FtvOyjdYDUsRkFjTIwkPvjiOTyX9%2FAIJt7BF570BopEdHOOstHS%2BX0s439RGwnfuB5gSFOZAgDqjQOBivtGkCc7j%2B2e8XNzefWSu%2BsZUD1QfoTq0y6mZsUSvIkRoGYnHu6Yc63pDCjiSNE2kYLdCUAWVmK4zsxzO%2BQQFxNs5b479NHXopkbWX9U3PAwWAVSY%2FpZf1udQ7rfUpQ1CzurDPpwo16Ff2cMWjuFHX9qCV0Y0Ok4Jvh63IABUNnktl%2B6sgP%2BARIxSrT%2FMhLlAAAAAElFTkSuQmCC)](http://spiceprogram.org/oss-sponsorship)

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
//WARN: 2022-05-16T22:53:47.692Z example.ts:9:5: This is a warning log

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
| logLevels      | Array of levels to log     | `Info`,`Debug`,`Warn`,`Error`      |
| enableLogging  | Enable logging to console  | `true`                             |
| enableFile     | Enable logging to file     | `false`                            |
| outputFile     | Path to log output file    | ./logs/logs.txt                    |
| tagDate        | Tags file with a timestamp | `true`                             |
| tagLevel       | Tags file with a log level | `true`                             |
| tagColor       | Tags file with a color     | `true`                             |
| tagFileMessage | Tags file with a message   | Logging started at n from origin x |
| color          | Colors for logging levels  |                                    |

`Colors`:  
ANSI colorcodes. If any color is present, log adds `Reset` as last argument to console.

| Name       | Value      |
| ---------- | ---------- |
| Reset      | "\x1b[0m"  |
| Bright     | "\x1b[1m"  |
| Dim        | "\x1b[2m"  |
| Underscore | "\x1b[4m"  |
| Blink      | "\x1b[5m"  |
| Reverse    | "\x1b[7m"  |
| Hidden     | "\x1b[8m"  |
| FgBlack    | "\x1b[30m" |
| FgRed      | "\x1b[31m" |
| FgGreen    | "\x1b[32m" |
| FgYellow   | "\x1b[33m" |
| FgBlue     | "\x1b[34m" |
| FgMagenta  | "\x1b[35m" |
| FgCyan     | "\x1b[36m" |
| FgWhite    | "\x1b[37m" |
| BgBlack    | "\x1b[40m" |
| BgRed      | "\x1b[41m" |
| BgGreen    | "\x1b[42m" |
| BgYellow   | "\x1b[43m" |
| BgBlue     | "\x1b[44m" |
| BgMagenta  | "\x1b[45m" |
| BgCyan     | "\x1b[46m" |
| BgWhite    | "\x1b[47m" |
