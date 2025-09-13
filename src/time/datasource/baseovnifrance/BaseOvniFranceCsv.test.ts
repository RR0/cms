import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0Context } from "../../../RR0Context.js"
import { CsvMapper } from "../CsvMapper.js"
import { cmsTestUtil } from "../../../test/index.js"
import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary.js"
import { baseOvniFranceTestCases } from "./BaseOvniFranceTestCases.js"
import fs from "fs"
import { baseOvniFranceDatasource, baseOvniFranceSortComparator } from "./BaseOvniFranceRR0Mapping.js"
import { BaseOvniFranceCaseSummaryCsvMapper } from "./BaseOvniFranceCaseSummaryCsvMapper.js"
import { BaseOvniFranceCase } from "./BaseOvniFranceCase.js"

describe("Base OVNI France CSV mapping", () => {

  const dataDate = new Date("2024-08-12 00:00:00 GMT+1")

  let context: RR0Context
  let mapper: CsvMapper<BaseOvniFranceCaseSummary>

  beforeEach(() => {
    context = cmsTestUtil.newContext(cmsTestUtil.filePath("time/1/9/7/0/03/index.html"))
    mapper = new CsvMapper()
  })

  test("columns for a case", {skip: true}, () => {
    mapper.map(context, baseOvniFranceTestCases[0], dataDate)
    expect(Array.from(mapper.fields)).toEqual(
      ["caseNumber", "url", "city", "depCode", "dateTime", "physicalEffect", "witnessEffect", "entities", "landing"])
  })

  test("values of a case", {skip: true}, () => {
    const obj = baseOvniFranceTestCases[0]
    const csvRow = mapper.map(context, obj, dataDate)
    expect(csvRow).toBe(
      `${obj.id},${obj.url},${obj.city},${obj.depCode},${obj.time.toString()},${obj.landing},${obj.entities},${obj.witnessEffect},${obj.physicalEffect}`)
  })

  test("write", {skip: true}, () => {
    const csvContents = mapper.mapAll(context, baseOvniFranceTestCases, dataDate)
    const case1 = baseOvniFranceTestCases[0]
    expect(csvContents).toBe(`caseNumber,url,city,depCode,dateTime,physicalEffect,witnessEffect,entities,landing
${case1.id},http://baseovnifrance.free.fr/listgen.php?typlist=20&page=0&numobs=2760,Le Mans,72,1970-03 16:00,false,false,false,false
1650,http://baseovnifrance.free.fr/listgen.php?typlist=20&page=0&numobs=1650,Lyon,69,1970-03-12 07:40,false,false,false,false
3088,http://baseovnifrance.free.fr/listgen.php?typlist=20&page=0&numobs=3088,Briançon,05,1970-03-16 20:00,false,false,false,false
1655,http://baseovnifrance.free.fr/listgen.php?typlist=20&page=0&numobs=1655,Chambon sur Voueize,23,1970-03-17 19:15,false,false,false,false`)
  })

  test("read", () => {
    const fileMapper = new CsvMapper<BaseOvniFranceCase>("&")
    const data = fs.readFileSync(cmsTestUtil.filePath("time/1/9/7/7/03/05_03_24_1709676761.txt"), {encoding: "latin1"})
    const csvMapper = new BaseOvniFranceCaseSummaryCsvMapper(baseOvniFranceDatasource.baseUrl,
      baseOvniFranceDatasource.searchPath,
      baseOvniFranceDatasource.authors)
    const cases = fileMapper.parse(data)
      .map(csvCase => csvMapper.map(context, csvCase, dataDate))
      .sort(baseOvniFranceSortComparator)
    const expected = baseOvniFranceTestCases.sort(baseOvniFranceSortComparator)
    expect(cases).toEqual(expected)
  })
})
