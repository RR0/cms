import { placeMessages_en } from "@rr0/place"
import { CaseClassificationMessages, CaseConclusionMessages, RR0Messages } from "./RR0Messages.js"
import { countryMessageList_en } from "../org/CountryMessageList_en.js"
import { peopleMessages_en } from "../people/PeopleMessages_en.js"
import { orgMessages_en } from "../org/OrgRR0Messages_en.js"
import { RR0TimeMessages_en } from "../time/RR0TimeMessages_en.js"

const caseClassification_en: CaseClassificationMessages = {
  hynek: {
    NL: {
      short: "NL",
      long: "Noctunal Light"
    },
    DD: {
      short: "DD",
      long: "Daylight Disc"
    },
    RV: {
      short: "RV",
      long: "Radar Visual"
    },
    CE1: {
      short: "CE1",
      long: "Close Encounter of the 1st kind"
    },
    CE2: {
      short: "CE2",
      long: "Close Encounter of the 2d kind"
    },
    CE3: {
      short: "CE3",
      long: "Close Encounter of the 3rd kind"
    },
    CE4: {
      short: "CE4",
      long: "Close Encounter of the 4th kind"
    },
    CE5: {
      short: "CE5",
      long: "Close Encounter of the 5th kind"
    }
  }
}

const caseConclusion_en: CaseConclusionMessages = {
  unknown: "unexplained",
  misinterpretation: "misinterpretation",
  hoax: "hoax"
}

export class RR0Messages_en implements RR0Messages {
  nonSignificantWords = ["my", "the", "we", "they", "want", "she", "them"]
  context = {
    time: new RR0TimeMessages_en(),
    place: placeMessages_en
  }
  case = {
    classification: caseClassification_en,
    conclusion: caseConclusion_en
  }
  org = orgMessages_en
  people = peopleMessages_en
  place = placeMessages_en
  country = countryMessageList_en
  nav = {
    start: "Start",
    contents: "Contents",
    prev: "Previous",
    next: "Next"
  }
  unit = {
    smi: (miles: number): string => (miles * 1.60934).toFixed(0) + " km",
    fot: (feet: number): string => (feet * 0.3048).toFixed(0) + " m",
    hm: (milesPerHour: number): string => this.unit.smi(milesPerHour) + "/h",
    inh: (inches: number): string => (inches / 2.54).toFixed(0) + " cm"
  }
}
