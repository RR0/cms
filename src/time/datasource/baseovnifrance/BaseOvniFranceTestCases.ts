import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary.js"
import { Level2Date as EdtfDate, Level2Timeshift } from "@rr0/time"
import { baseOvniFranceDatasource } from "./BaseOvniFranceRR0Mapping.js"

export const baseOvniFranceTestCases: BaseOvniFranceCaseSummary[] = [
  {
    id: "2760",
    url: new URL("listgen.php?typlist=20&page=0&numobs=2760", baseOvniFranceDatasource.baseUrl).href,
    city: "Le Mans",
    depCode: "72",
    time: new EdtfDate({year: 1970, month: 3, hour: 16, minute: 0, timeshift: Level2Timeshift.fromString("GMT+1")}),
    physicalEffect: false,
    witnessEffect: false,
    entities: false,
    landing: false
  },
  {
    id: "1650",
    url: new URL("listgen.php?typlist=20&page=0&numobs=1650", baseOvniFranceDatasource.baseUrl).href,
    city: "Lyon",
    depCode: "69",
    time: new EdtfDate(
      {year: 1970, month: 3, day: 12, hour: 7, minute: 40, timeshift: Level2Timeshift.fromString("GMT+1")}),
    physicalEffect: false,
    witnessEffect: false,
    entities: false,
    landing: false
  },
  {
    id: "3088",
    url: new URL("listgen.php?typlist=20&page=0&numobs=3088", baseOvniFranceDatasource.baseUrl).href,
    city: "Briançon",
    depCode: "05",
    time: new EdtfDate(
      {year: 1970, month: 3, day: 16, hour: 20, minute: 0, timeshift: Level2Timeshift.fromString("GMT+1")}),
    physicalEffect: false,
    witnessEffect: false,
    entities: false,
    landing: false
  },
  {
    id: "1655",
    url: new URL("listgen.php?typlist=20&page=0&numobs=1655", baseOvniFranceDatasource.baseUrl).href,
    city: "Chambon sur Voueize",
    depCode: "23",
    time: new EdtfDate(
      {year: 1970, month: 3, day: 17, hour: 19, minute: 15, timeshift: Level2Timeshift.fromString("GMT+1")}),
    physicalEffect: false,
    witnessEffect: false,
    entities: false,
    landing: false
  }
]
