import axios from "axios"

import { useState, useEffect } from "react"

export default () => {
  const [word, setWord] = useState("")
  const [pluralWord, setPluralWord] = useState("")

  useEffect(() => {
    if (!word) return
    ;(async word => {
      const response = await axios.post(`/api/plural`, {
        word
      })

      setPluralWord(response.data)
    })(word)
  }, [word])

  return (
    <>
      <input
        type="text"
        value={word}
        onChange={event => setWord(event.target.value)}
      />
      <div>{pluralWord}</div>
    </>
  )
}
