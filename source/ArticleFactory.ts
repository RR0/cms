import { Article } from "./Article"
import { RR0Data, TypedDataFactory } from "../data"
import { RR0EventFactory } from "../event"

export class ArticleFactory extends TypedDataFactory<Article> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "article", ["index", "article"])
  }

  createFromData(data: RR0Data): Article {
    const article: Article = {...data, type: "article", previousSourceRefs: []}
    Object.assign(article, data)
    return article
  }
}
