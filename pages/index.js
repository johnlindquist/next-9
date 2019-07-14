import axios from "axios"

// IndexPage.getInitialProps = async function() {
//   const message = await fetch(`http://localhost:3000/api/hello`, {
//     method: "POST",
//     body: "apple"
//   }).then(r => r.text())

//   return { message }
// }

import { useState, useEffect, useCallback } from "react"

function IndexPage(props) {
  const [word, setWord] = useState("")
  const [pluralWord, setPluralWord] = useState("")

  useEffect(() => {
    if (!word) return

    ;(async word => {
      const response = await axios.post(`http://localhost:3000/api/hello`, {
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
