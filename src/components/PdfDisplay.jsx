import './PdfDisplay.css'

const PdfDisplay = (props) => {
  // console.log(props.downloadUrl)
  const firebaseUrl = props?.downloadUrl
  const regex = /%2F(.*?)\.pdf/;
  const match = regex.exec(firebaseUrl);
  match[1];
  const fileName = decodeURIComponent(match[1]) + '.pdf'
  console.log(fileName)
  
  return <>
  <div className='pdf-display'> 
    <div className='pdf-icon'>
      <img className='pdf-svg' src='src/assets/pdficon.svg'></img>
    </div>
    <div className="pdf-name">NAME</div>
    <div className="download-icon">
    <a href={firebaseUrl} download="Exam form" target="_blank" rel="noreferrer">
      <img className='download-svg' src='src/assets/cloud-download-icon.svg'></img>
    </a>
    </div>
  </div>
  </>
}

export default PdfDisplay