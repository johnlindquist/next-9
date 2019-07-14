import { NounInflector } from "natural"

const nounInflector = new NounInflector()

export default function handle(req, res) {
  console.log("posting", req.body.word)
  res.end(nounInflector.pluralize(req.body.word))
}
