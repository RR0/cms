import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { GeipanCaseToSummaryMapper } from "./GeipanCaseToSummaryMapper"
import { geipanHttpDatasource } from "./GeipanRR0Mapping"
import { GeipanDatasource } from "./GeipanDatasource"
import { GeipanSummaryToCaseMapper } from "./GeipanSummaryToCaseMapper"
import { GeipanCase } from "./GeipanCase"
import { CsvFileSource, Datasource, FileDatasource } from "../../../../../../time"
import { HtmlRR0SsgContext } from "../../../../../../RR0SsgContext"

export class GeipanFileDatasource extends GeipanDatasource implements Datasource<GeipanCaseSummary>, FileDatasource<GeipanCaseSummary> {

  protected readonly file = new CsvFileSource<GeipanCase>("latin1", ";")

  protected writeMapper = new GeipanSummaryToCaseMapper(geipanHttpDatasource.baseUrl,
    geipanHttpDatasource.searchPath,
    geipanHttpDatasource.authors)

  constructor(readonly defaultFileName: string, protected encoding: BufferEncoding) {
    super()
  }

  save(context: HtmlRR0SsgContext, fetched: GeipanCaseSummary[], fetchTime: Date): void {
    const nativeCases = fetched.map(summary => this.writeMapper.map(context, summary, fetchTime))
    return this.file.write(context, nativeCases, fetchTime, this)
  }

  protected async readCases(context: HtmlRR0SsgContext): Promise<GeipanCaseSummary[]> {
    const file = await this.file.read(context, this)
    const csvMapper = new GeipanCaseToSummaryMapper(geipanHttpDatasource.baseUrl, geipanHttpDatasource.searchPath,
      geipanHttpDatasource.authors)
    return this.file.mapper.parse(file.contents).map(csvCase => csvMapper.map(context, csvCase, file.lastModified))
  }
}