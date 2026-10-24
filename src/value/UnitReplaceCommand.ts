import { DomReplaceCommand, DomReplacer } from "ssg-api"
import { HtmlRR0Context } from "../RR0Context.js"
import { RR0Messages } from "../lang/RR0Messages.js"

type UnitConverter = (messages: RR0Messages["unit"], value: number) => string

/**
 * Converts schema.org quantitative values (`<span itemscope itemtype="https://schema.org/QuantitativeValue">`)
 * expressed in Anglo-Saxon units into metric ones.
 */
export class UnitReplaceCommand extends DomReplaceCommand {

  /**
   * Converters by UN/CEFACT unit code.
   */
  static readonly converters: Record<string, UnitConverter> = {
    SMI: (unit, value) => unit.smi(value),
    FOT: (unit, value) => unit.fot(value),
    HM: (unit, value) => unit.hm(value),
    INH: (unit, value) => unit.inh(value),
    NMI: (unit, value) => unit.nmi(value),
    KTS: (unit, value) => unit.kts(value),
    KNT: (unit, value) => unit.kts(value),
    LBR: (unit, value) => unit.lbr(value)
  }

  constructor() {
    super("*[itemscope]", undefined)
  }

  /**
   * @param text The value as written, with a dot or a comma as decimal mark.
   */
  static parseValue(text: string): number {
    return parseFloat(text.trim().replace(",", "."))
  }

  protected async createReplacer(context: HtmlRR0Context): Promise<DomReplacer> {
    return {
      replace: async (itemEl: HTMLElement) => {
        if (itemEl.getAttribute("itemtype") === "https://schema.org/QuantitativeValue") {
          const propEls = Array.from(itemEl.querySelectorAll("*[itemprop]"))
          const unitPropEl = propEls.find(propEl => propEl.getAttribute("itemprop") === "unitCode")
          const unit = unitPropEl?.getAttribute("content")
          const valuePropEl = propEls.find(propEl => propEl.getAttribute("itemprop") === "value")
          const value = UnitReplaceCommand.parseValue(valuePropEl?.textContent ?? "")
          const converter = UnitReplaceCommand.converters[unit]
          if (converter && Number.isFinite(value)) {  // Otherwise keep the original text rather than nothing
            const resultEl = context.file.document.createElement("span")
            resultEl.title = value + " " + unit
            resultEl.textContent = converter(context.messages.unit, value)
            itemEl = resultEl
          }
        }
        return itemEl
      }
    }
  }
}
