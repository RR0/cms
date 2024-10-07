import { RR0SsgContext } from "../../../RR0SsgContext"
import { Datasource } from "../Datasource"
import { FileContents } from "ssg-api"
import { UfoSearchDatasource } from "./UfoSearchDatasource"
import { JsonMapper } from "../JsonMapper"
import { UfoSearchCase } from "./UfoSearchCase"
import { UfoSearchCaseRR0Mapper } from "./UfoSearchCaseRR0Mapper"

class FileMapper extends JsonMapper<UfoSearchCase> {

  constructor(protected mapper: UfoSearchCaseRR0Mapper) {
    super()
  }

  parse(context: RR0SsgContext, data: string): UfoSearchCase[] {
    const allData = super.parse(context, data)
    return allData["Majestic Timeline"].map(this.mapper.map)
  }
}

export class UfoSearchFileDatasource extends UfoSearchDatasource implements Datasource<UfoSearchCase> {

  readonly fileMapper: FileMapper

  constructor(readonly fileName: string, mapper: UfoSearchCaseRR0Mapper) {
    super()
    this.fileMapper = new FileMapper(mapper)
  }

  protected async readCases(context: RR0SsgContext): Promise<UfoSearchCase[]> {
    const file = FileContents.read(this.fileName, "utf-8")
    return this.fileMapper.parse(context, file.contents)
  }
}
