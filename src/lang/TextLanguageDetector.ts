/**
 * Guesses whether a page is written in English or French from its function words.
 *
 * Used for pages that have no language variant and declare none: most are French, but several hundred are English
 * documents not translated yet, which would otherwise be marked as French (French dates, French chrome).
 *
 * Deliberately conservative: a French page quoting long English excerpts must stay French, so English is only
 * concluded when French function words are almost absent (as measured on the whole site, French pages quoting
 * English never fall below 4 %, English pages sit below 3 %).
 */
export class TextLanguageDetector {

  static readonly english = new Set(
    "the of and to is was were that which with this from by have has had they their it be are on at as an been would there what when who not".split(
      " "))

  static readonly french = new Set(
    "le la les des du et est une un que qui dans pour sur pas par au aux ce cette sont été avec il elle ils nous vous se ne en".split(
      " "))

  /**
   * Elements whose text does not tell the page's language: site chrome, code, and passages in another language.
   */
  static readonly ignored = "script, style, header, nav, footer, blockquote, q, code, pre, [lang]"

  constructor(readonly minEnglishWords = 20, readonly maxFrenchRatio = 0.03) {
  }

  detect(root: Element): "en" | "fr" | undefined {
    const clone = root.cloneNode(true) as Element
    clone.querySelectorAll(TextLanguageDetector.ignored).forEach(e => e.remove())
    const words = (clone.textContent || "").toLowerCase().split(/[^a-zà-ÿ']+/)
    let en = 0
    let fr = 0
    for (const word of words) {
      if (TextLanguageDetector.english.has(word)) {
        en++
      } else if (TextLanguageDetector.french.has(word)) {
        fr++
      }
    }
    if (en >= this.minEnglishWords && fr < en * this.maxFrenchRatio) {
      return "en"
    }
    return fr > 0 ? "fr" : undefined
  }
}
