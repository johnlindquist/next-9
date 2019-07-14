import { NounInflector } from "natural"

const nounInflector = new NounInflector()

export default function handle(req, res) {
  res.end(nounInflector.pluralize(req.body.word))
}
