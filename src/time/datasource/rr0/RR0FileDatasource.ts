import { HtmlRR0Context, RR0Context } from "../../../RR0Context.js"
import { Datasource } from "../Datasource.js"
import { CsvMapper } from "../CsvMapper.js"
import { FileDatasource } from "../FileDatasource.js"
import { CsvFileSource } from "../CsvFileSource.js"
import { RR0CaseSummary } from "./RR0CaseSummary.js"
import { RR0Datasource } from "./RR0Datasource.js"
import { CaseMapper } from "../CaseMapper.js"

export class RR0FileDatasource extends RR0Datasource implements Datasource<RR0CaseSummary>, FileDatasource<RR0CaseSummary> {

  protected readonly file = new CsvFileSource()

  constructor(protected mapper: CaseMapper<RR0Context, RR0CaseSummary, RR0CaseSummary>) {
    super()
  }

  save(context: HtmlRR0Context, fetched: any[], fetchTime: Date): string {
    return this.file.write(context, fetched, fetchTime, this)
  }

  protected async readCases(context: HtmlRR0Context): Promise<RR0CaseSummary[]> {
    const fileMapper = new CsvMapper<RR0CaseSummary>()
    const file = await this.file.read(context, this)
    return fileMapper.parse(file.contents).map(csvCase => this.mapper.map(context, csvCase, file.lastModified))
  }
}
