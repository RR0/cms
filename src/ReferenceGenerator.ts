import { HtmlSsgContext } from "ssg-api"

export interface ReferenceGenerator<C extends HtmlSsgContext> {

  readonly value: string

  next(context: C): string
}
