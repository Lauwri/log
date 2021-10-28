import * as fs from "fs";
import path from "path";
import log, { options } from "../src";

describe("File log tests", () => {
  it("Should create file correctly", () => {
    log.setup({ enableFile: true });
    const fileExists = fs.existsSync(
      path.join(process.cwd(), options.outputFile)
    );
    expect(fileExists).toBeTruthy();
  });
  it("Should write correctly", async () => {
    log.setup({ enableFile: true });
    const logSpy = jest.spyOn(global.console, "log");
    const testObj = { value: "test object" };
    log.info("Test string", testObj);

    const strMatch = expect.stringMatching(" file.test.ts:17:9: %s");
    expect(logSpy).toHaveBeenCalledWith(strMatch, "Test string", testObj);

    const _path = path.join(process.cwd(), options.outputFile);
    const fileExists = fs.existsSync(_path);
    expect(fileExists).toBeTruthy();

    //Wait for stream to write in file, this shouldn't take long
    await new Promise((r) => setTimeout(r, 2000));
    const file = fs.readFileSync(_path, { encoding: "utf8", flag: "r" });

    const testStr = ` file.test.ts:17:9: Test string
{
  \"value\": \"test object\"
}`;
    expect(file).toContain(testStr);
  });
});
