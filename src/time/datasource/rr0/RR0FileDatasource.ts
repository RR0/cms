import { HtmlRR0SsgContext, RR0SsgContext } from "../../../RR0SsgContext.js"
import { Datasource } from "../Datasource.js"
import { CsvMapper } from "../CsvMapper.js"
import { FileDatasource } from "../FileDatasource.js"
import { CsvFileSource } from "../CsvFileSource.js"
import { RR0CaseSummary } from "./RR0CaseSummary.js"
import { RR0Datasource } from "./RR0Datasource.js"
import { CaseMapper } from "../CaseMapper.js"

export class RR0FileDatasource extends RR0Datasource implements Datasource<RR0CaseSummary>, FileDatasource<RR0CaseSummary> {

  protected readonly file = new CsvFileSource()

  constructor(protected mapper: CaseMapper<RR0SsgContext, RR0CaseSummary, RR0CaseSummary>) {
    super()
  }

  save(context: HtmlRR0SsgContext, fetched: any[], fetchTime: Date): void {
    return this.file.write(context, fetched, fetchTime, this)
  }

  protected async readCases(context: HtmlRR0SsgContext): Promise<RR0CaseSummary[]> {
    const fileMapper = new CsvMapper<RR0CaseSummary>()
    const file = await this.file.read(context, this)
    return fileMapper.parse(file.contents).map(csvCase => this.mapper.map(context, csvCase, file.lastModified))
  }
}
