import { describe, expect, test } from "vitest"
import fs from "fs"
import os from "os"
import path from "path"
import { SsgContext, SsgContextImpl } from "ssg-api"
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

  test("rebuilds the index from every HTML page in the output directory", async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "rr0-search-index-"))
    try {
      const outDir = path.join(root, "out")
      const searchDir = path.join(root, "search")
      fs.mkdirSync(path.join(outDir, "science"), {recursive: true})
      fs.mkdirSync(searchDir)
      fs.mkdirSync(path.join(root, "science"))
      fs.writeFileSync(path.join(outDir, "science", "UfoAtHome.html"),
        "<html><head><title>UFO@home</title></head><body></body></html>")
      fs.writeFileSync(path.join(outDir, "other.html"),
        "<html><head><title>Other page</title></head><body></body></html>")
      fs.writeFileSync(path.join(root, "science", "UfoAtHome.html"), "")
      fs.writeFileSync(path.join(root, "other.html"), "")
      fs.writeFileSync(path.join(outDir, "stale.html"),
        "<html><head><title>Stale page</title></head><body></body></html>")
      const fileName = path.join(searchDir, "index.json")
      const newIndex: SearchIndex = {pages: [], words: {}}
      const visitor = {
        index: newIndex,
        pageInfoFrom(title: string, url: string) {
          return {
            title,
            url,
            time: ""
          }
        }
      } as unknown as SearchVisitor
      const context = new SsgContextImpl("fr")

      await new SearchIndexStep(fileName, visitor, outDir).execute(context)

      const savedIndex: SearchIndex = JSON.parse(fs.readFileSync(fileName, "utf8"))
      expect(savedIndex.pages).toEqual([
        {title: "Other page", url: "other.html", time: ""},
        {title: "UFO@home", url: "science/UfoAtHome.html", time: ""}
      ])
    } finally {
      fs.rmSync(root, {recursive: true, force: true})
    }
  })

  test("rejects the same title at two different URLs", async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "rr0-search-index-"))
    try {
      const outDir = path.join(root, "out")
      const searchDir = path.join(root, "search")
      fs.mkdirSync(outDir)
      fs.mkdirSync(searchDir)
      fs.writeFileSync(path.join(outDir, "first.html"),
        "<html><head><title>Same title</title></head><body></body></html>")
      fs.writeFileSync(path.join(outDir, "second.html"),
        "<html><head><title>Same title</title></head><body></body></html>")
      fs.writeFileSync(path.join(root, "first.html"), "")
      fs.writeFileSync(path.join(root, "second.html"), "")
      const visitor = {
        index: {pages: [], words: {}},
        pageInfoFrom(title: string, url: string) {
          return {
            title,
            url,
            time: ""
          }
        }
      } as unknown as SearchVisitor
      const context = new SsgContextImpl("fr")

      let error: Error | undefined
      try {
        await new SearchIndexStep(path.join(searchDir, "index.json"), visitor, outDir).execute(context)
      } catch (e) {
        error = e as Error
      }
      expect(error?.message.includes("Search result \"Same title\"")).toEqual(true)
    } finally {
      fs.rmSync(root, {recursive: true, force: true})
    }
  })

  test("allows identical document titles when their search result dates differ", async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "rr0-search-index-"))
    try {
      const outDir = path.join(root, "out")
      const searchDir = path.join(root, "search")
      fs.mkdirSync(outDir)
      fs.mkdirSync(searchDir)
      for (const fileName of ["first.html", "second.html"]) {
        fs.writeFileSync(path.join(outDir, fileName),
          "<html><head><title>Same title</title></head><body></body></html>")
        fs.writeFileSync(path.join(root, fileName), "")
      }
      const visitor = {
        index: {pages: [], words: {}},
        pageInfoFrom(title: string, url: string) {
          return {title, url, time: url === "first.html" ? "1900" : "1901"}
        }
      } as unknown as SearchVisitor
      const context = new SsgContextImpl("fr")
      const fileName = path.join(searchDir, "index.json")

      await new SearchIndexStep(fileName, visitor, outDir).execute(context)

      const savedIndex: SearchIndex = JSON.parse(fs.readFileSync(fileName, "utf8"))
      expect(savedIndex.pages.length).toEqual(2)
    } finally {
      fs.rmSync(root, {recursive: true, force: true})
    }
  })

  test("prefers an explicit source title over a generated chronological title", async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "rr0-search-index-"))
    try {
      const outDir = path.join(root, "out")
      const searchDir = path.join(root, "search")
      fs.mkdirSync(outDir)
      fs.mkdirSync(searchDir)
      fs.writeFileSync(path.join(outDir, "article.html"),
        "<html><head><title>Mai 1954</title></head><body></body></html>")
      fs.writeFileSync(path.join(root, "article.html"),
        "<!--#set var=\"title\" value=\"Canada Hunts for Saucers\" --><!--#include virtual=\"/header.html\" -->")
      const visitor = {
        index: {pages: [], words: {}},
        pageInfoFrom(title: string, url: string) {
          return {title, url, time: "mai 1954"}
        }
      } as unknown as SearchVisitor
      const context = new SsgContextImpl("fr")
      const fileName = path.join(searchDir, "index.json")

      await new SearchIndexStep(fileName, visitor, outDir).execute(context)

      const savedIndex: SearchIndex = JSON.parse(fs.readFileSync(fileName, "utf8"))
      expect(savedIndex.pages).toEqual([
        {title: "Canada Hunts for Saucers", url: "article.html", time: "mai 1954"}
      ])
    } finally {
      fs.rmSync(root, {recursive: true, force: true})
    }
  })
})
