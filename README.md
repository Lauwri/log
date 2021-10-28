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
log.warn("This is a warning log");
log.error("This is a error log");
log.debug("This is a debug log");

```

Output is colorcoded and displays datetime and origin

```
2021-10-28T15:26:02.127Z log.ts: This is a regular log
```
