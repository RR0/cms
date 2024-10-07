import { sceauDatasource } from "./SceauRR0Mapping.js"
import { SceauCaseSummary } from "./SceauCaseSummary.js"
import path from "path"

const baseUrl = path.join(sceauDatasource.baseUrl.href, sceauDatasource.searchPath)
const gueudelotPrefx = path.join(baseUrl, "fond_gueudelot/fiches_gueudelot/jpr/gueudelot-1430-1949/page_0001/")

export const sceauTestCases: SceauCaseSummary[] = [
  {
    id: "18",
    dateCas: "1430-06-10",
    resume: "procession lumineuse",
    pdf: gueudelotPrefx + "1430-06-10_es_jaen_procession_lumineuse.pdf",
    texte: gueudelotPrefx + "1430-06-10_es_jaen_procession_lumineuse.txt",
    json: gueudelotPrefx + "1430-06-10_es_jaen_procession_lumineuse.json"
  },
  {
    id: "19",
    dateCas: "1574-08-23",
    resume: "signalz de feug",
    pdf: gueudelotPrefx + "1574-08-23_fr_besancon_signalz_de_feug.pdf",
    texte: gueudelotPrefx + "1430-06-10_es_jaen_procession_lumineuse.txt",
    json: gueudelotPrefx + "1430-06-10_es_jaen_procession_lumineuse.json"
  }
]
