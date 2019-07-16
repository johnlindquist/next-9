import axios from "axios"

import { useState, useEffect } from "react"

const fetchTags = (setter, sentence) => async () => {
  if (!sentence) return
  const response = await axios.post(`/api/parts`, {
    sentence
  })

  setter(response.data)
}

export default () => {
  const [sentence, setSentence] = useState("")
  const [tags, setTags] = useState([])
  const [id, setId] = useState(null)

  useEffect(() => {
    id && clearTimeout(id)
    setId(setTimeout(fetchTags(setTags, sentence), 500))
  }, [sentence])

  return (
    <main style={{ fontSize: "2rem", fontFamily: "monospace" }}>
      <h2>Type a sentence</h2>
      <input
        type="text"
        value={sentence}
        onChange={event => setSentence(event.target.value)}
        style={{ fontSize: "2rem" }}
      />

      <div>
        {tags.map((tag, i) => (
          <div key={i}>
            {tag.token}: {tag.tag}
          </div>
        ))}
      </div>
    </main>
  )
}
