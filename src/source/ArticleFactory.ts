import { Article } from "./Article.js"
import { RR0Data, TypedDataFactory } from "../data/index.js"
import { RR0EventFactory } from "../event/index.js"

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
