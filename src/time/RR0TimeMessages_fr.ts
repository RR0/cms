import { MessageUtils } from "../lang/RR0Messages.js"
import { RR0TimeMessages } from "./RR0TimeMessages.js"

export class RR0TimeMessages_fr implements RR0TimeMessages {
  duration = {
    days: (d: number): string => MessageUtils.plural(d, "jour"),
    hours: (d: number): string => MessageUtils.plural(d, "heure"),
    minutes: (mn: number): string => MessageUtils.plural(mn, "minute"),
    seconds: (s: number): string => MessageUtils.plural(s, "seconde"),
    lastSeparator: " et ",
    approximate: (txt: string): string => `environ ${txt}`
  }
  relative = {
    year: {
      before: "l'année d'avant",
      after: "l'année suivante"
    },
    month: {
      before: "le mois précédent",
      after: "le mois suivant",
      later: "un mois plus tard"
    },
    day: {
      before: "la veille",
      after: "le lendemain"
    },
    hour: {
      before: "une heure auparavant",
      after: "une heure plus tard"
    }
  }
  on = (approximate: boolean): string => {
    return (approximate ? "vers " : "") + "le "
  }
  in = (approximate: boolean): string => (approximate ? "vers " : "en ")
  fromTo = (startReplacement: string, endReplacement: string): string => `${startReplacement} à ${endReplacement}`
  between = /\bentre\s*$/i
  preposition = /(?:^|[^\p{L}])(?:(?:en|de|du|des|à|au|aux|jusque|dès|depuis|vers|avant|après|pour|par|fin|début|entre|le|la|les|ce|cet|cette)\s*|(?:d|l|jusqu|qu)['’]\s*|mi-\s*)$/iu
  betweenAnd = (startReplacement: string, endReplacement: string): string => `${startReplacement} et ${endReplacement}`
  starting = (approximate: boolean): string => "à partir " + (approximate ? "de " : "du ")
}
