import { Chapter } from "./Chapters.js"
import { Source } from "@rr0/data"

export class Book extends Source<"book"> {

  type: "book"

  /**
   * Variants roots (language-specific, typically)
   */
  variants: Chapter[]
}
