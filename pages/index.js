import axios from "axios"

import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"

export default () => {
  const [sentence, setSentence] = useState("")
  const [debouncedSentence] = useDebounce(sentence, 500)
  const [tags, setTags] = useState([])

  useEffect(() => {
    if (!debouncedSentence) return
    ;(async () => {
      const response = await axios.post(`/api/parts`, {
        sentence: debouncedSentence
      })

      console.log(response.data)
      setTags(response.data)
    })()
  }, [debouncedSentence])

  return (
    <main>
      <h2>Type a sentence</h2>
      <input
        type="text"
        value={sentence}
        onChange={event => setSentence(event.target.value)}
        style={{ fontSize: "2rem" }}
      />

      <div style={{ fontSize: "2rem", fontFamily: "monospace" }}>
        {tags.map((tag, i) => (
          <div key={i}>
            {tag.token}: {tagMap[tag.tag]}
          </div>
        ))}
      </div>
    </main>
  )
}

const tagMap = {
  CC: "Coordinating conjunction",
  CD: "Cardinal number",
  DT: "Determiner",
  EX: "Existential there",
  FW: "Foreign word",
  IN: "Preposition or subordinating conjunction",
  JJ: "Adjective",
  JJR: "Adjective, comparative",
  JJS: "Adjective, superlative",
  LS: "List item marker",
  MD: "Modal",
  NN: "Noun, singular or mass",
  NNS: "Noun, plural",
  NNP: "Proper noun, singular",
  NNPS: "Proper noun, plural",
  PDT: "Predeterminer",
  POS: "Possessive ending",
  PRP: "Personal pronoun",
  PRP$: "Possessive pronoun",
  RB: "Adverb",
  RBR: "Adverb, comparative",
  RBS: "Adverb, superlative",
  RP: "Particle",
  SYM: "Symbol",
  TO: "to",
  UH: "Interjection",
  VB: "Verb, base form",
  VBD: "Verb, past tense",
  VBG: "Verb, gerund or present participle",
  VBN: "Verb, past participle",
  VBP: "Verb, non-3rd person singular present",
  VBZ: "Verb, 3rd person singular present",
  WDT: "Wh-determiner",
  WP: "Wh-pronoun",
  WP$: "Possessive wh-pronoun",
  WRB: "Wh-adverb"
}
