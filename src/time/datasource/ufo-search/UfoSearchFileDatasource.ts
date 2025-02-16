import { HtmlRR0Context } from "../../../RR0Context.js"
import { UfoSearchDatasource } from "./UfoSearchDatasource.js"
import { JsonMapper } from "../JsonMapper.js"
import { UfoSearchCase } from "./UfoSearchCase.js"
import { UfoSearchCaseRR0Mapper } from "./UfoSearchCaseRR0Mapper.js"
import { FileContents } from "@javarome/fileutil"
import { FileDatasource } from "../FileDatasource"

class FileMapper extends JsonMapper<UfoSearchCase> {

  constructor(protected mapper: UfoSearchCaseRR0Mapper) {
    super()
  }

  parse(context: HtmlRR0Context, data: string): UfoSearchCase[] {
    const allData = super.parse(context, data)
    return allData["Majestic Timeline"].map(
      (line: UfoSearchCase) => this.mapper.map(context, line, context.file.lastModified))
  }
}

export class UfoSearchFileDatasource extends UfoSearchDatasource implements FileDatasource<UfoSearchCase> {

  readonly fileMapper: FileMapper

  constructor(readonly fileName: string, mapper: UfoSearchCaseRR0Mapper) {
    super()
    this.fileMapper = new FileMapper(mapper)
  }

  protected async readCases(context: HtmlRR0Context): Promise<UfoSearchCase[]> {
    const file = FileContents.read(this.fileName, "utf-8")
    return this.fileMapper.parse(context, file.contents)
  }

  save(context: HtmlRR0Context, fetched: any[], fetchTime: Date): void {
    throw new Error("Not implemented")
  }
}
