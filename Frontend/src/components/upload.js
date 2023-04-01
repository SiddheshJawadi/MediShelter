import { useState } from 'react'

export default function FileUpload() {
  const [file, setFile] = useState(null)

  function handleFileChange(event) {
    setFile(event.target.files[0])
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    console.log(data)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  )
}
