import axios from "axios"

import { useState, useEffect } from "react"

function IndexPage() {
  const [word, setWord] = useState("")
  const [pluralWord, setPluralWord] = useState("")

  useEffect(() => {
    if (!word) return
    ;(async word => {
      const response = await axios.post(`/api/plural`, {
        word
      })

      console.log({ response })

      setPluralWord(response.data)
    })(word)
  }, [word])

  return (
    <div>
      {word}
      <input
        type="text"
        value={word}
        onChange={event => setWord(event.target.value)}
      />
      <h2>{pluralWord}</h2>
    </div>
  )
}

export default IndexPage
