import log, { Colors, info, debug } from "./src/index";

// Enables logging to file, use outputFile to change output
log.setup({
  enableFile: true,
  color: {
    // Possible to combine background and foreground colors
    Error: (Colors.BgCyan + Colors.FgRed) as any,
  },
});

log.info("This is a regular log");
// INFO: 2022-10-06T23:16:42.622Z example.ts:11:5: This is a regular log
log.warn("This is a warning log");
// WARN: 2022-10-06T23:16:42.625Z example.ts:13:5: This is a warning log
log.error("This is a error log");
// ERROR: 2022-10-06T23:16:42.626Z example.ts:15:5: This is a error log
log.debug("This is a debug log");
// DEBUG: 2022-10-06T23:16:42.627Z example.ts:17:5: This is a debug log

info("Access directly");
// INFO: 2022-10-06T23:27:34.760Z example.ts:20:5: Access directly
debug("Access directly");
// DEBUG: 2022-10-06T23:27:34.761Z example.ts:22:6: Access directly

log.infoc("With a custom tag:")("This is a regular log");
// With a custom tag: This is a regular log
log.warnc("With a custom tag:")("This is a warning log");
// With a custom tag: This is a warning log
log.errorc("With a custom tag:")("This is a error log");
// With a custom tag: This is a error log
log.debugc("With a custom tag:")("This is a debug log");
// With a custom tag: This is a debug log
