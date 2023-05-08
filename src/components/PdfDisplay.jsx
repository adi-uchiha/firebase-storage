import { deleteObject } from 'firebase/storage'
import './PdfDisplay.css'
import { useState } from 'react'

const PdfDisplay = (props) => {

  const [loading, setLoading] = useState(false)

  const firebaseUrl = props?.downloadUrl
  const regex = /%2F(.*?)\.pdf/;
  const match = regex.exec(firebaseUrl);
  match[1];
  const fileName = decodeURIComponent(match[1]) + '.pdf'


  function handleDelete() {
    setLoading(true)
    console.log("Delete")
    deleteObject(props.fileRef).then(()=> {
      alert("Gyi file lul, Refresh plix")
      window.location.reload()
    })
  }
  
  return <>
  <div className='pdf-display'> 
    <div className='pdf-icon'>
      <img className='pdf-svg' src='/pdficon.svg'></img>
    </div>

    <div className="pdf-name">{fileName}</div>

    <div onClick={handleDelete} className="delete">
      {loading ? "loading..." : <img onClick={handleDelete} className='delete-svg' src='/delete.svg'></img>}
    </div>
    <div className="download-icon">
    <a href={firebaseUrl} download="" target="_blank" rel="noreferrer">
      <img className='download-svg' src='/cloud-download-icon.svg'></img>
    </a>
    </div>
  </div>
  </>
}

export default PdfDisplay