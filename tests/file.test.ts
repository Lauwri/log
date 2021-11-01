import * as fs from "fs";
import path from "path";
import log, { options, stream } from "../src";

const TEST_FOLDER = "./log_test/";
const TEST_FILE = "test_log.txt";
const TEST_PATH = TEST_FOLDER + TEST_FILE;

const rmDir = (dir: string) => {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
  } catch (error) {}
};

describe("File log tests", () => {
  afterEach(() => rmDir(TEST_FOLDER));
  afterAll(() => rmDir(TEST_FOLDER));
  it("Should create file correctly", () => {
    log.setup({ enableFile: true, outputFile: TEST_PATH });

    const pathExists = fs.existsSync(path.join(process.cwd(), TEST_FOLDER));
    expect(pathExists).toBeTruthy();
  });

  it("Should write correctly", async () => {
    log.setup({ enableFile: true, outputFile: TEST_PATH });
    const logSpy = jest.spyOn(global.console, "log");
    const testObj = { value: "test object" };
    log.info("Test string", testObj);

    const strMatch = expect.stringMatching(" file.test.ts:29:9: %s");
    expect(logSpy).toHaveBeenCalledWith(strMatch, "Test string", testObj);

    const _path =
      stream?.path && path.join(process.cwd(), stream.path as string);

    await new Promise((r) => setTimeout(r, 2000));

    const fileExists = _path && fs.existsSync(_path);
    expect(fileExists).toBeTruthy();

    //Wait for stream to write in file, this shouldn't take long
    await new Promise((r) => setTimeout(r, 2000));
    const file =
      _path && fs.readFileSync(_path, { encoding: "utf8", flag: "r" });

    const testStr = ` file.test.ts:29:9: Test string
{
  \"value\": \"test object\"
}`;
    expect(file).toContain(testStr);
    const tag = `from origin ${process.cwd()}`;
    expect(file).toContain(tag);
  });

  it("Should not tag the file", async () => {
    log.setup({ enableFile: true, outputFile: TEST_PATH, tagDate: false });
    await new Promise((r) => setTimeout(r, 2000));
    const fileExists = fs.existsSync(
      path.join(process.cwd(), options.outputFile)
    );

    expect(fileExists).toBeTruthy();
  });
});
