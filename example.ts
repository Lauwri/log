import log from "./src/index";

// Enables logging to file, use outputFile to change output
log.setup({
  enableFile: true,
});

log.info("This is a regular log");
log.warn("This is a warning log");
log.error("This is a error log");
log.debug("This is a debug log");
