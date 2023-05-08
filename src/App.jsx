import "./App.css";
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import PdfDisplay from "./components/PdfDisplay";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [pdfUrls, setPdfUrls] = useState([]);
  const [loading ,setLoading] = useState(false)
  const [fileType, setFileType] = useState("")

  const imagesListRef = ref(storage, "images/");
  const pdfListRef = ref(storage, "pdf/");



  const uploadImage = () => {
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url)
        setImageUrls((prev) => [...prev, url]);
        setLoading(false);
        setImageUpload("")
        window.alert("Success")
      });
    });
  };

  const uploadPdf = () => {
    const imageRef = ref(storage, `pdf/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url)
        setImageUrls((prev) => [...prev, url]);
        setLoading(false);
        setImageUpload("")
        window.alert("Success")
      });
    });
  }

  const upload = () => {
    if (imageUpload == null) return;
    setLoading(true)
    if(fileType === 'image/jpeg'|'image/png'|'image/jpg') {uploadImage()}
    if(fileType === 'application/pdf') {uploadPdf()}
    else {alert("File type not supported, Please upload pdf, jpeg, jpg, png only")}
  }

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });

    // fetch pdfs
    listAll(pdfListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setPdfUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
          setFileType(event.target.files[0].type)
        }}
      />
      <button onClick={upload}>{loading ? "Loading": "Upload Image"}</button>
      <br />
      {imageUrls.map((url, index) => {
        return <img src={url} key={index}/>;
      })}
      <br />
      <PdfDisplay downloadUrl={pdfUrls[0]}/>
    </div>
  );
}

export default App;