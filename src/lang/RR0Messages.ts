import { CountryMessagesList } from "../org/CountryMessagesList.js"
import { CaseConclusion } from "../science/crypto/ufo/enquete/dossier/RR0Case.js"
import { PeopleMessages } from "../people/PeopleMessages.js"
import { OrgRR0Messages } from "../org/OrgRR0Messages.js"
import { PlaceMessages } from "@rr0/place"
import { RR0TimeMessages } from "../time/RR0TimeMessages.js"

export class MessageUtils {

  static plural(n: number, word: string): string {
    return n ? `${n} ${MessageUtils.pluralWord(n, word)}` : ""
  }

  static pluralWord(n: number, word: string): string {
    return n ? `${word}${n > 1 ? "s" : ""}` : ""
  }
}

export type CaseConclusionMessages = { [key in CaseConclusion]: string }

export type CaseClassificationMessages = {
  hynek: {
    NL: {
      short: string
      long: string
    }
    DD: {
      short: string
      long: string
    }
    RV: {
      short: string
      long: string
    }
    CE1: {
      short: string
      long: string
    }
    CE2: {
      short: string
      long: string
    }
    CE3: {
      short: string
      long: string
    }
    CE4: {
      short: string
      long: string
    }
    CE5: {
      short: string
      long: string
    }
  }
}
export type CaseMessages = {
  classification: CaseClassificationMessages,
  conclusion: CaseConclusionMessages
}

export interface RR0PlaceMessages extends PlaceMessages {
}

export interface RR0Messages {
  nonSignificantWords: string[]
  context: {
    time: RR0TimeMessages
    place: RR0PlaceMessages
  }
  case: CaseMessages
  org: OrgRR0Messages,
  people: PeopleMessages,
  place: PlaceMessages;
  country: CountryMessagesList
  nav: {
    start: string
    contents: string
    prev: string
    next: string
  }
  unit: {
    smi: (miles: number) => string
    fot: (feet: number) => string
    hm: (milesPerHour: number) => string
    inh: (inches: number) => string
  }
}
