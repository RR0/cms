import { MessageUtils, RR0TimeMessages } from "../lang/index.js"

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
  starting = (approximate: boolean): string => "à partir " + (approximate ? "de " : "du ")
}
