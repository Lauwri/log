import log from "../src";
import { Colors } from "../src/constants";

describe("Options tests", () => {
  const logSpy = jest.spyOn(global.console, "log");
  beforeEach(() => {
    log.setup();
  });
  it("Should not log anything", () => {
    log.setup({
      enableLogging: false,
    });
    log.info("Test string1");
    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  it("Should not tag level", () => {
    log.setup({
      tagLevel: false,
    });
    log.info("Test string no tag level");
    const str = expect.not.stringContaining("INFO");
    expect(logSpy).toHaveBeenCalledWith(
      str,
      "Test string no tag level",
      Colors.Reset
    );
  });

  it("Should not tag color", () => {
    log.setup({
      tagColor: false,
    });
    log.info("Test string no tag color");
    const str = expect.not.stringContaining("\x1b[37m");
    expect(logSpy).toHaveBeenCalledWith(str, "Test string no tag color");
  });

  it("Should not tag date", () => {
    log.setup({
      tagDate: false,
    });
    log.info("Test string no tag date");
    const str = expect.not.stringMatching(
      /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
    );
    expect(logSpy).toHaveBeenLastCalledWith(
      str,
      "Test string no tag date",
      Colors.Reset
    );
  });
});
