import { deleteObject } from 'firebase/storage'
import './PdfDisplay.css'
import { useState } from 'react'

const ImgDisplay = (props) => {

  const [loading, setLoading] = useState(false)

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
      <img className='img' loading='lazy' width="500" height="600" src={props.downloadUrl}></img>
    </div>

    <div className="pdf-name">Img</div>

    <div onClick={handleDelete} className="delete">
      {loading ? "loading" : <img onClick={handleDelete} className='delete-svg' src='/delete.svg'></img>}
    </div>
    <div className="download-icon">
    <a href={props.downloadUrl} >
      <img className='download-svg' src='./cloud-download-icon.svg'></img>
    </a>
    </div>
  </div>
  </>
}

export default ImgDisplay