import { beforeEach, describe, expect, test } from "@javarome/testscript"
import fs from "fs"
import { RR0Context } from "../../RR0Context.js"
import { CsvMapper } from "./CsvMapper.js"
import { rr0TestUtil } from "../../test/index.js"
import path from "path"
import * as process from "node:process"
import { GeipanCaseSummary } from "../../org/eu/fr/cnes/geipan/geipan/GeipanCaseSummary.js"
import { geipanTestCaseSummaries } from "../../org/eu/fr/cnes/geipan/geipan/GeipanTestCases.js"
import { GeipanCase } from "../../org/eu/fr/cnes/geipan/geipan/GeipanCase.js"
import { geipanFileDatasource, geipanHttpDatasource } from "../../org/eu/fr/cnes/geipan/geipan/GeipanRR0Mapping.js"
import { GeipanCaseToSummaryMapper } from "../../org/eu/fr/cnes/geipan/geipan/GeipanCaseToSummaryMapper.js"
import { RR0CaseSummary } from "./rr0/RR0CaseSummary.js"

describe("CsvMapper", () => {

  const dataDate = new Date("2024-08-12 00:00:00 GMT+1")

  let context: RR0Context
  let mapper: CsvMapper<GeipanCaseSummary>

  beforeEach(() => {
    context = rr0TestUtil.newContext(path.join(rr0TestUtil.rootDir, "time/1/9/7/0/03/index.html"))
    mapper = new CsvMapper()
  })

  test("columns for a case", () => {
    mapper.map(context, geipanTestCaseSummaries[0], dataDate)
    expect(Array.from(mapper.fields).sort()).toEqual(
      ["city", "classification", "id", "postTime", "time", "url", "zoneCode", "zoneType"])
  })

  test("values of a case", () => {
    const obj = geipanTestCaseSummaries[0]
    const csvRow = mapper.map(context, obj, dataDate)
    expect(csvRow).toBe(
      `${obj.id},${obj.url},${obj.city},${obj.zoneType},${obj.zoneCode},${obj.time},${obj.postTime},${obj.classification}`)
  })

  test("write", () => {
    const csvContents = mapper.mapAll(context, geipanTestCaseSummaries, dataDate)
    const expectedCsv = "id,url,city,zoneType,zoneCode,dateTime,postTime,classification\n"
      + geipanTestCaseSummaries
        .map(
          c => `${c.id},${c.url},${c.city},${c.zoneType},${c.zoneCode},${c.time},${c.postTime},${c.classification}`)
        .join("\n")
    expect(csvContents).toBe(expectedCsv)
  })

  describe("mapper", () => {

    const date = new Date("2025-01-01")
    const context = rr0TestUtil.newHtmlContext("time/1/9/7/0/03/index.html")

    test("string", () => {
      const mapper = new CsvMapper<RR0CaseSummary>(";")
      expect(mapper.fieldMapper(context, "key1", "val1", date)).toBe("val1")
      expect(Array.from(mapper.fields)).toEqual(["key1"])
    })

    describe("object", () => {

      test("level 0", () => {
        const mapper = new CsvMapper<RR0CaseSummary>(";")
        const csvLine = mapper.fieldMapper(context, "obj1", {prop1: "propVal1", prop2: 12}, date)
        expect(Array.from(mapper.fields)).toEqual(["obj1.prop1", "obj1.prop2"])
        expect(csvLine).toBe("propVal1;12")
      })

      test("level 1", () => {
        const mapper = new CsvMapper<RR0CaseSummary>(";")
        const csvLine = mapper.fieldMapper(context, "obj1",
          {prop1: "propVal1", prop2: 12, prop3: {prop31: "prop31Val"}}, date)
        expect(Array.from(mapper.fields)).toEqual(["obj1.prop1", "obj1.prop2", "obj1.prop3.prop31"])
        expect(csvLine).toBe("propVal1;12;prop31Val")
      })

      test("level 2", () => {
        const mapper = new CsvMapper<RR0CaseSummary>(";")
        const csvLine = mapper.fieldMapper(context, "obj1",
          {prop1: "propVal1", prop2: 12, prop3: {prop31: "prop31Val", prop4: {key4: "value4"}}}, date)
        expect(Array.from(mapper.fields)).toEqual(["obj1.prop1", "obj1.prop2", "obj1.prop3.prop31"])
        expect(csvLine).toBe("propVal1;12;prop31Val")
      })
    })
  })

  test("read", () => {
    const fileMapper = new CsvMapper<GeipanCase>(";")
    const fileName = path.join(process.cwd(), geipanFileDatasource.defaultFileName)
    const data = fs.readFileSync(fileName, {encoding: "latin1"})
    const csvMapper = new GeipanCaseToSummaryMapper(geipanHttpDatasource.baseUrl, geipanHttpDatasource.searchPath,
      geipanHttpDatasource.authors)
    const parsed = fileMapper.parse(data)
    const cases = parsed.map(csvCase => csvMapper.map(context, csvCase, dataDate))
    expect(cases.length).toEqual(2768)
    const expected1 = geipanTestCaseSummaries[0]
    const case1 = cases.find(c => c.id === expected1.id)
    expect(case1).toEqual(expected1)
    const expected2 = geipanTestCaseSummaries[1]
    const case2 = cases.find(c => c.id === expected2.id)
    expect(case2).toEqual(expected2)
  })
})
