import path from "path"
import { HtmlRR0Context } from "../RR0Context.js"
import { Gender } from "@rr0/common"
import { CountryCode, Occupation, People } from "@rr0/data"

export class PeopleHtmlRenderer {

  constructor(protected defaultPreviewFileNames = ["portrait.jpg", "portrait.gif", "portrait.png", "portrait.webp"]) {
  }

  renderLink(
    context: HtmlRR0Context, people: People, pseudoPeopleList: People[], allCountries: Set<CountryCode>,
    occupations: Set<Occupation>, filterOccupations: Occupation[] = [], content?: string
  ): HTMLElement {
    const dirName = people.dirName
    const events = people.events
    const titles = []
    const classList = ["data-resolved", "people-resolved"]
    if (pseudoPeopleList.indexOf(people) >= 0 || people.pseudonyms.includes(content)) {
      classList.push("pseudonym")
      titles.push(`(pseudonyme de ${people.firstAndLastName})`)
    }
    if (people.hoax) {
      classList.push("canular")
    }
    const birthTimeStr = people.birthTime?.year.toString()
    const deathTimeStr = people.deathTime?.year.toString()
    if (people.isDeceased()) {
      classList.push("deceased")
    }
    if (birthTimeStr || deathTimeStr) {
      const timeStr = birthTimeStr ? deathTimeStr ? `${birthTimeStr}-${deathTimeStr}` : `${birthTimeStr}-` : `-${deathTimeStr}`
      titles.push(timeStr)
    }
    const age = people.getAge()
    if (age) {
      titles.push(`${age} ans`)
    }
    const countries = people.countries
    if (countries) {
      for (const country of countries) {
        allCountries.add(country)
        const countryLabel = context.messages.country[country]?.title
        if (!countryLabel) {
          throw new Error(`No title for country "${country}"`)
        }
        titles.push(countryLabel)
        classList.push(`country-${country}`)
      }
    }
    const gender = people.gender || Gender.male
    for (const occupation of people.occupations) {
      if (filterOccupations.length > 1 || !filterOccupations.includes(occupation)) {
        occupations.add(occupation)
        const occupationMsg = context.messages.people.occupation[occupation]
        if (!occupationMsg) {
          throw Error(
            `No message to translate occupation "${occupation}" in ${context.locale}, as specified in ${people.dirName}/people*.json`)
        }
        classList.push(`occupation-${occupation}`)
        titles.push(occupationMsg(gender))
      }
    }
    const text = content || people.lastAndFirstName || people.title
    const doc = context.file.document
    const link = doc.createElement("a")
    link.innerHTML = text
    link.href = `/${dirName}/`
    if (people.discredited) {
      link.append(" 🤥")
      titles.push("discrédité")
    }
    const elem = doc.createElement("span")
    if (titles.length > 0) {
      elem.title = titles.join(", ")
    }
    if (classList.length > 0) {
      elem.classList.add(...classList)
    }
    let portraitUrl = people.image
    const imageEvents = events.filter(event => event.eventType === "image")
    if (!portraitUrl) {
      const portraitEvent = imageEvents.find(event => this.defaultPreviewFileNames.includes(event.url))
      if (portraitEvent) {
        portraitUrl = path.join("/", people.dirName, portraitEvent.url)
      }
    }
    if (portraitUrl) {
      const portraitElem = doc.createElement("img")
      portraitElem.src = path.join("/", portraitUrl)
      portraitElem.alt = text
      portraitElem.className = "portrait"
      portraitElem.loading = "lazy"
      portraitElem.width = 75
      link.append(portraitElem)
    }
    elem.append(link)
    return elem
  }
}
