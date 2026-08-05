import { describe, expect, test } from "@javarome/testscript"
import fs from "fs"
import os from "os"
import path from "path"
import { SsgContext } from "ssg-api"
import { SearchIndexStep } from "./SearchIndexStep.js"
import { SearchIndex, SearchVisitor } from "./SearchVisitor.js"

describe("SearchIndexStep", () => {
  test("removes missing and duplicate pages while updating the current pages", async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "rr0-search-index-"))
    try {
      const searchDir = path.join(root, "search")
      fs.mkdirSync(searchDir)
      fs.writeFileSync(path.join(root, "current.html"), "")
      const fileName = path.join(searchDir, "index.json")
      const existingIndex: SearchIndex = {
        pages: [
          {title: "Old current title", url: "current.html", time: ""},
          {title: "Duplicate current title", url: "current.html", time: ""},
          {title: "Moved page", url: "old/path.html", time: ""}
        ],
        words: {}
      }
      fs.writeFileSync(fileName, JSON.stringify(existingIndex))
      const newIndex: SearchIndex = {
        pages: [
          {title: "Current title", url: "current.html", time: ""},
          {title: "New page", url: "new.html", time: ""}
        ],
        words: {}
      }
      const visitor = {index: newIndex} as SearchVisitor
      const context = {
        setVar() {
        },
        log() {
        },
        warn() {
        }
      } as unknown as SsgContext

      await new SearchIndexStep(fileName, visitor).execute(context)

      const savedIndex: SearchIndex = JSON.parse(fs.readFileSync(fileName, "utf8"))
      expect(savedIndex.pages).toEqual([
        {title: "Current title", url: "current.html", time: ""},
        {title: "New page", url: "new.html", time: ""}
      ])
    } finally {
      fs.rmSync(root, {recursive: true, force: true})
    }
  })
})
