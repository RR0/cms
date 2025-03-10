import { HtmlRR0Context } from "../../RR0Context.js"
import { Datasource } from "./Datasource.js"
import { CsvMapper } from "./CsvMapper.js"
import { FileSource } from "./FileSource.js"
import { HtmlSsgContext } from "ssg-api"

export class CsvFileSource<S> extends FileSource {

  protected static readonly specialChars = /[ \-?!&*#().:\/\\;=°',]/g

  readonly mapper: CsvMapper<S>

  constructor(encoding: BufferEncoding = "utf-8", separator = ",") {
    super(encoding)
    this.mapper = new CsvMapper<S>(separator)
  }

  /**
   * Get the file name to read/write data from an external datasource.
   *
   * @param context
   * @param datasource
   * @protected
   */
  fileName(context: HtmlSsgContext, datasource: Datasource<S>): string {
    return super.fileName(context, datasource) + ".csv"
  }

  write(context: HtmlRR0Context, datasourceCases: S[], fetchTime: Date, datasource: Datasource<any>): string {
    const csvContents = this.mapper.mapAll(context, datasourceCases, fetchTime)
    return super.writeContents(context, csvContents, datasource)
  }
}
