import { Chapter } from "./Chapters.js"
import { SourceJson } from "@rr0/data"

export interface BookJson extends SourceJson {

  type: "book"

  /**
   * Variants roots (language-specific, typically)
   */
  variants: Chapter[]
}
