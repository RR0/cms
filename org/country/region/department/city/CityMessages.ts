import { OrganizationMessages } from "../../../../OrganizationMessages"

export class CityMessages extends OrganizationMessages {
  /**
   *
   * @param titles
   */
  constructor(titles: string[]) {
    super(titles)
  }

  static create(title: string) {
    return CityMessages.create(title)
  }
}
