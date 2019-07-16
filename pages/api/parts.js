import natural from "natural"

const baseFolder = "./node_modules/natural/lib/natural/brill_pos_tagger"
const rulesFile = baseFolder + "/data/English/tr_from_posjs.txt"
const lexiconFile = baseFolder + "/data/English/lexicon_from_posjs.json"
const defaultCategory = "ZZZ"

const lexicon = new natural.Lexicon(lexiconFile, defaultCategory)
const rules = new natural.RuleSet(rulesFile)
const tagger = new natural.BrillPOSTagger(lexicon, rules)
const tokenizer = new natural.WordTokenizer()

export default function handle(req, res) {
  const sentence = req.body.sentence
    .split(" ")
    .reduce((acc, word) => [...acc, ...natural.normalize(word)], [])
    .join(" ") //flatmap

  const tokens = tokenizer.tokenize(sentence)
  console.log(tokens)
  const result = tagger.tag(tokens).taggedWords
  console.log(result)
  res.json(result)
}
