import fs from "fs"
import os from "os"
import path from "path"
import { afterEach, beforeEach, describe, expect, test } from "vitest"
import { ContentStepConfig, SsgContext } from "ssg-api"
import { RR0ContentStep, RR0ContentStepConfig } from "./RR0ContentStep.js"
import { TimeService } from "./time/TimeService.js"
import { HtmlRR0Context } from "./RR0Context.js"

/**
 * The incremental rule, and the second input it used not to know about.
 *
 * Reaches `shouldProcessFile` directly rather than running a whole generation: what is under test
 * is one decision — "is this output stale?" — and the file dates that answer it.
 */
describe("RR0ContentStep incremental rule", () => {

  let dir: string
  let source: string
  let preamble: string
  let output: string

  const at = (file: string, minutesAgo: number): void => {
    const when = new Date(Date.now() - minutesAgo * 60_000)
    fs.utimesSync(file, when, when)
  }

  const contextFor = (file: string): HtmlRR0Context => ({
    file: { name: file, lastModified: fs.statSync(file).mtime }
  } as unknown as HtmlRR0Context)

  const stepFor = (config: ContentStepConfig): RR0ContentStep => {
    const step = new RR0ContentStep(
      {
        contentConfigs: [config], outputFunc: async () => undefined, force: false,
        name: "test", toProcess: new Set<string>()
      },
      { setContextFromFile: () => undefined } as unknown as TimeService
    )
    return step
  }

  const shouldProcess = (step: RR0ContentStep, config: ContentStepConfig): Promise<boolean> =>
    (step as unknown as {
      shouldProcessFile(context: HtmlRR0Context, config: ContentStepConfig): Promise<boolean>
    }).shouldProcessFile(contextFor(source), config)

  const configWith = (alsoDerivedFrom: string[]): RR0ContentStepConfig => ({
    roots: [source], replacements: [], alsoDerivedFrom, getOutputPath: (_context: SsgContext) => output
  } as unknown as RR0ContentStepConfig)

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "rr0-content-step-"))
    source = path.join(dir, ".htaccess")
    preamble = path.join(dir, "_redirects.head")
    output = path.join(dir, "_redirects")
    fs.writeFileSync(source, "Redirect /a /b\n")
    fs.writeFileSync(preamble, "# trunk\n")
    fs.writeFileSync(output, "# trunk\n/a /b\n")
    // An output built after both its inputs: nothing to do.
    at(source, 10)
    at(preamble, 10)
    at(output, 5)
  })

  afterEach(() => fs.rmSync(dir, { recursive: true, force: true }))

  test("leaves an output alone while neither of its inputs has moved", async () => {
    const config = configWith([preamble])
    expect(await shouldProcess(stepFor(config), config)).toBe(false)
  })

  test("rebuilds when the walked file changes, as it always did", async () => {
    at(source, 0)
    const config = configWith([preamble])
    expect(await shouldProcess(stepFor(config), config)).toBe(true)
  })

  test("rebuilds when only the PREAMBLE changes — the bug this exists for", async () => {
    at(preamble, 0)
    const config = configWith([preamble])
    expect(await shouldProcess(stepFor(config), config)).toBe(true)
  })

  test("without the declaration, a preamble change goes on being missed", async () => {
    at(preamble, 0)
    const config = configWith([])
    expect(await shouldProcess(stepFor(config), config)).toBe(false)
  })

  test("a dependency that has gone missing counts as changed, not as unchanged", async () => {
    fs.rmSync(preamble)
    const config = configWith([preamble])
    expect(await shouldProcess(stepFor(config), config)).toBe(true)
  })

  test("no output yet means build it, whatever the dates say", async () => {
    fs.rmSync(output)
    const config = configWith([preamble])
    expect(await shouldProcess(stepFor(config), config)).toBe(true)
  })
})
