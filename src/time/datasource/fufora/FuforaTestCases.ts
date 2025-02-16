import { FuforaCaseSummary } from "./FuforaCaseSummary.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { fuforaDatasource } from "./FuforaRR0Mapping.js"

export const fuforaTestCases: FuforaCaseSummary[] = [
  {
    id: "40",
    url: new URL("ufodata.php?u=40&p=1&sid=", fuforaDatasource.baseUrl).href,
    sightingPlace: "Kotini kylänlahden VR:n talo, opiston lähellä",
    city: "Pielisjärvi",
    dateTime: new EdtfDate({year: 1970, month: 11, day: 1}),
    dateTimeRefinement: "Oli talvi, pimeä vuodenaika arvio marraskuu, mielestäni1970",
    classification: "8LIV7Y3"
  },
  {
    id: "1818",
    url: new URL("ufodata.php?u=1818&p=1&sid=", fuforaDatasource.baseUrl).href,
    sightingPlace: "Märjälahden ranta",
    city: "Pielisjärvi Lieksa",
    dateTime: new EdtfDate({year: 1970, month: 11, day: 1}),
    classification: "7VAP7Y3"
  }
]
