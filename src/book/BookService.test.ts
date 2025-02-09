import { ConsoleLogger, FileWriteConfig, SsgContext } from "ssg-api"
import { CLI } from "../util/cli/CLI.js"
import path from "path"
import { PeopleService } from "../people"
import { AllDataService, RR0EventFactory, TypedDataFactory } from "@rr0/data"
import { Book } from "./Book"
import { BookService } from "./BookService"
import { TimeServiceOptions, TimeUrlBuilder } from "../time"
import { rr0TestUtil, testFilePath } from "../test"

interface BookImportArgs {
  import: string
  dry?: "true" | "false"
}

const logger = new ConsoleLogger("rr0-books")
const args = new CLI().getArgs<BookImportArgs>()
const fileName = args.import
const dry = args.dry === "true"
const peopleFactory = rr0TestUtil.peopleFactory
const eventFactory = new RR0EventFactory()
const bookFactory = new TypedDataFactory<Book>(eventFactory, "book")
const dataService = new AllDataService([bookFactory, peopleFactory])

const outDir = "out"
const config: FileWriteConfig = {
  getOutputPath(context: SsgContext): string {
    return path.join(outDir, context.file.name)
  }
}
const timeOptions: TimeServiceOptions = {
  root: testFilePath("time"),
  files: []
}
const timeUrlBuilder = new TimeUrlBuilder({rootDir: timeOptions.root})
let files = []
const peopleService = new PeopleService(dataService, peopleFactory, files, rr0TestUtil.time.getService())
const books = new BookService(logger, dry, peopleService, timeUrlBuilder, config)
books.import(fileName).then((result: Book[]) => {
    logger.log("Wrote", result.length, "books")
  }
)
