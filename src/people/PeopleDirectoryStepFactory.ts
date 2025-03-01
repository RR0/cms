import { FileWriteConfig, OutputFunc } from "ssg-api"
import { RR0FileUtil } from "../util/file/RR0FileUtil.js"
import { PeopleDirectoryStep, peopleOccupationFilter } from "./PeopleDirectoryStep.js"
import { glob } from "glob"
import path from "path"
import { PeopleHtmlRenderer } from "./PeopleHtmlRenderer.js"
import { Occupation, People, PeopleService } from "@rr0/data"

export type PeopleDirectoryStepOptions = {
  root: string
  scientists?: string,
  ufologists?: string,
  ufoWitnesses?: string,
  astronomers?: string,
  contactees?: string,
  pilots?: string,
  military?: string,
  softwareEngineers?: string,
  politicians?: string,
  rulers?: string,
}

/**
 * Create directory steps for different types of people.
 */
export class PeopleDirectoryStepFactory {

  constructor(
    protected outputFunc: OutputFunc, protected config: FileWriteConfig,
    protected service: PeopleService, protected renderer: PeopleHtmlRenderer, protected excludedDirs: string[]
  ) {
  }

  async create(options: PeopleDirectoryStepOptions): Promise<PeopleDirectoryStep[]> {
    const dirs = RR0FileUtil.findDirectoriesContaining("people*.json", "out")
    const allPeopleDirectoryStep = this.createAll(dirs, options.root)
    const letterDirectorySteps = await this.createLetters()
    const steps: PeopleDirectoryStep[] = [
      allPeopleDirectoryStep,
      ...letterDirectorySteps
    ]
    const scientists = options.scientists
    if (scientists) {
      steps.push(this.createScientists(dirs, scientists))
    }
    const ufologists = options.ufologists
    if (ufologists) {
      steps.push(this.createUfologists(dirs, ufologists))
    }
    const ufoWitnesses = options.ufoWitnesses
    if (ufoWitnesses) {
      steps.push(this.createUfoWitnesses(dirs, ufoWitnesses))
    }
    const astronomers = options.astronomers
    if (astronomers) {
      steps.push(this.createAstronomers(dirs, astronomers))
    }
    const contactees = options.contactees
    if (contactees) {
      steps.push(this.createContactees(dirs, contactees))
    }
    const pilots = options.pilots
    if (pilots) {
      steps.push(this.createPilots(dirs, pilots))
    }
    const military = options.military
    if (military) {
      steps.push(this.createMilitary(dirs, military))
    }
    const softwareEngineers = options.softwareEngineers
    if (softwareEngineers) {
      steps.push(this.createSoftwareEngineers(dirs, softwareEngineers))
    }
    const politicians = options.politicians
    if (politicians) {
      steps.push(...this.createPoliticians(dirs, politicians, options.rulers))
    }
    return steps
  }

  /**
   * Create steps to generate directory pages for people with name starting with every first letter.
   */
  async createLetters() {
    const letterDirs = await glob("people/*/")
    const peopleLetterFiles = letterDirs.filter(l => /(.+)\/[a-z]$/.test(l))
    const letterDirectorySteps: PeopleDirectoryStep[] = []
    for (const peopleLetterFile of peopleLetterFiles) {
      const c = peopleLetterFile.charAt(peopleLetterFile.length - 1)
      const peopleDir = `people/${c}/`
      const peopleDirectoryStep = new PeopleDirectoryStep(`directory of people with name starting with "${c}"`,
        [peopleDir], [], path.join(peopleDir, "index.html"), this.outputFunc, this.config, this.service, this.renderer,
        (p: People) => p.dirName.startsWith(peopleDir))
      letterDirectorySteps.push(peopleDirectoryStep)
    }
    return letterDirectorySteps
  }

  createAll(dirs: string[], templateFileName: string) {
    return new PeopleDirectoryStep("all people directories", dirs, this.excludedDirs, templateFileName,
      this.outputFunc, this.config, this.service, this.renderer)
  }

  createMilitary(dirs: string[], templateFileName: string): PeopleDirectoryStep {
    return new PeopleDirectoryStep("military people directories", dirs, this.excludedDirs, templateFileName,
      this.outputFunc, this.config, this.service, this.renderer, peopleOccupationFilter([Occupation.military]))
  }

  createPoliticians(dirs: string[], templateFileName: string, rulersTemplateFileName?: string): PeopleDirectoryStep[] {
    const steps = [
      new PeopleDirectoryStep("politicians directories", dirs, this.excludedDirs, templateFileName,
        this.outputFunc, this.config, this.service, this.renderer, peopleOccupationFilter([Occupation.politician]))
    ]
    if (rulersTemplateFileName) {
      steps.push(
        new PeopleDirectoryStep("politician leaders directories", dirs, this.excludedDirs, rulersTemplateFileName,
          this.outputFunc, this.config, this.service, this.renderer, peopleOccupationFilter([Occupation.leader]))
      )
    }
    return steps
  }

  createSoftwareEngineers(dirs: string[], templateFileName: string): PeopleDirectoryStep {
    return new PeopleDirectoryStep("software engineers directories", dirs, this.excludedDirs,
      templateFileName, this.outputFunc, this.config, this.service, this.renderer,
      peopleOccupationFilter([Occupation.softwareEngineer]))
  }

  createPilots(dirs: string[], templateFileName: string) {
    return new PeopleDirectoryStep("pilots directories", dirs, this.excludedDirs, templateFileName,
      this.outputFunc, this.config, this.service, this.renderer,
      peopleOccupationFilter([Occupation.astronaut, Occupation.pilot]))
  }

  createContactees(dirs: string[], templateFileName: string) {
    return new PeopleDirectoryStep("contactees directories", dirs, this.excludedDirs, templateFileName,
      this.outputFunc, this.config, this.service, this.renderer, peopleOccupationFilter([Occupation.contactee]))
  }

  createAstronomers(dirs: string[], templateFileName: string) {
    return new PeopleDirectoryStep("astronomers directories", dirs, this.excludedDirs, templateFileName,
      this.outputFunc, this.config, this.service, this.renderer, peopleOccupationFilter([Occupation.astronomer]))
  }

  createUfoWitnesses(dirs: string[], templateFileName: string) {
    return new PeopleDirectoryStep(`UFO witnesses directories`, dirs, this.excludedDirs, templateFileName,
      this.outputFunc, this.config, this.service, this.renderer,
      peopleOccupationFilter(
        [Occupation.ufoWitness, Occupation.ufoWitness2, Occupation.abductee, Occupation.contactee]))
  }

  createUfologists(dirs: string[], templateFileName: string) {
    return new PeopleDirectoryStep("ufologists directories", dirs, this.excludedDirs, templateFileName,
      this.outputFunc, this.config, this.service, this.renderer, peopleOccupationFilter([Occupation.ufologist]))
  }

  createScientists(dirs: string[], templateFileName: string) {
    return new PeopleDirectoryStep("scientists directories", dirs, this.excludedDirs, templateFileName,
      this.outputFunc, this.config, this.service, this.renderer, peopleOccupationFilter([
        Occupation.anthropologist, Occupation.astronomer, Occupation.astrophysicist, Occupation.archeologist,
        Occupation.biochemist, Occupation.biologist, Occupation.biophysicist, Occupation.botanist,
        Occupation.chemist,
        Occupation.engineer, Occupation.exobiologist, Occupation.ethnologist,
        Occupation.geophysicist, Occupation.geologist, Occupation.geographer,
        Occupation.historian,
        Occupation.mathematician, Occupation.meteorologist,
        Occupation.neuroscientist, Occupation.neurologist, Occupation.neuropsychiatrist,
        Occupation.oceanographer,
        Occupation.philosopher, Occupation.psychologist, Occupation.physicist, Occupation.psychiatrist,
        Occupation.radioastronomer,
        Occupation.sociologist
      ]))
  }
}
