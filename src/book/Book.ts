import { Chapter } from "./Chapters.js"
import { Source } from "@rr0/data/dist/source"

export interface Book extends Source {

  type: "book"

  /**
   * Variants roots (language-specific, typically)
   */
  variants: Chapter[]
}
