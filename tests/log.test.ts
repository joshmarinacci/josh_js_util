import {describe, expect, it} from "vitest";
import {LoggerEvent, LoggerOutput, StdLogger} from "../src";
import fs from "fs"

describe("Logger", () => {
    it("should create a logger with no output", async () =>{
        class TestLoggerOutput implements LoggerOutput {
            public _output: LoggerEvent[]
            constructor() {
                this._output = [];
            }
            log(evt: LoggerEvent): void {
                this._output.push(evt);
            }
        }

        const log = new StdLogger("TEST")
        const tl = new TestLoggerOutput()
        log.add(tl)
        log.info("test message","and another thing")
        expect(tl._output[0].prefix).toEqual("TEST")
        expect(tl._output[0].priority).toEqual("INFO")
        expect(tl._output[0].message).toEqual("test message")
        expect(tl._output[0].args).toEqual(['and another thing'])
    })
    it('should log to a file', async () =>{
        class TestFSLoggerOutput implements LoggerOutput {
            private file: string;
            constructor(file: string) {
                this.file = file
                fs.appendFileSync(this.file, "starting log")
            }

            log(evt: LoggerEvent): void {
                try {
                    fs.appendFileSync(this.file, `${evt.prefix}:${evt.priority} ${evt.message} ${evt.args}`);
                } catch (e) {
                    fs.appendFileSync(this.file, `crash ${e}`)
                }
            }
        }
        const logfile = 'temp.out.log'
        try {
            await fs.promises.rm(logfile)
        } catch (e) {
            console.error(e)
        }
        const log = new StdLogger("TEST")
        log.add(new TestFSLoggerOutput(logfile))
        log.info("test message","and another thing")
        const content = await fs.promises.readFile(logfile)
        expect(content.toString()).toBe("starting logTEST:INFO test message and another thing")
    })
})