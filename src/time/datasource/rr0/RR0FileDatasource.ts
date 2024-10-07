import { HtmlRR0SsgContext, RR0SsgContext } from "../../../RR0SsgContext"
import { Datasource } from "../Datasource"
import { CsvMapper } from "../CsvMapper"
import { FileDatasource } from "../FileDatasource"
import { CsvFileSource } from "../CsvFileSource"
import { RR0CaseSummary } from "./RR0CaseSummary"
import { RR0Datasource } from "./RR0Datasource"
import { CaseMapper } from "../CaseMapper"

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
