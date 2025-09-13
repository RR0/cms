import path from "path"
import { ConsoleLogger, FileWriteConfig, SsgContext } from "ssg-api"
import { CLI } from "../util/cli/CLI.js"
import { AllDataService, PeopleService, RR0EventFactory, TypedDataFactory } from "@rr0/data"
import { Book } from "./Book.js"
import { BookService } from "./BookService.js"
import { TimeUrlBuilder } from "../time/TimeUrlBuilder.js"
import { cmsTestUtil } from "../test/index.js"
import { BookJson } from "./BookJson.js"

interface BookImportArgs {
  import: string
  dry?: "true" | "false"
}

const logger = new ConsoleLogger("rr0-books")
const args = new CLI().getArgs<BookImportArgs>()
const fileName = args.import
if (fileName) {
  const dry = args.dry === "true"
  const peopleFactory = cmsTestUtil.peopleFactory
  const eventFactory = new RR0EventFactory()
  const bookFactory = new TypedDataFactory<Book, BookJson>(eventFactory, "book")
  const dataService = new AllDataService([bookFactory, peopleFactory])

  const outDir = "out"
  const config: FileWriteConfig = {
    getOutputPath(context: SsgContext): string {
      return path.join(outDir, context.file.name)
    }
  }
  const timeUrlBuilder = new TimeUrlBuilder(cmsTestUtil.time.timeOptions)
  let files = []
  const peopleService = new PeopleService(dataService, peopleFactory, {files, rootDir: cmsTestUtil.filePath("people")})
  const books = new BookService(logger, dry, peopleService, timeUrlBuilder, config)
  books.import(fileName).then((result: Book[]) => {
      logger.log("Wrote", result.length, "books")
    }
  )
} else {
  console.warn("No file specified")
}
