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
import DocDisplay from "./components/DocDisplay";
import ImgDisplay from "./components/ImgDisplay";

function App() {
  // Upload State
  const [imageUpload, setImageUpload] = useState(null);
  // Fetching states
  const [imageUrls, setImageUrls] = useState([]);
  const [pdfUrls, setPdfUrls] = useState([]);
  const [docUrls, setDocUrls] = useState([]);
  const [loading ,setLoading] = useState(false)
  // Ref state for delete function
  const [docFileRefList, setDocFileRefList] = useState([])
  const [pdfFileRefList, setPdfFileRefList] = useState([])
  const [imgFileRefList, setImgFileRefList] = useState([])

  // Validate file type in frontend
  const [fileType, setFileType] = useState("")
  // Folder Refs
  const imagesListRef = ref(storage, "images/");
  const pdfListRef = ref(storage, "pdf/");
  const docListRef = ref(storage, "doc/");

  const uploadImage = () => {
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        setLoading(false);
        setImageUpload("")
        window.alert("Success")
        window.location.reload()
      });
    });
  };

  const uploadPdf = () => {
    const imageRef = ref(storage, `pdf/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        setLoading(false);
        setImageUpload("")
        window.alert("Success")
        window.location.reload()
      });
    });
  }

  const uploadDoc = () => {
    const imageRef = ref(storage, `doc/${imageUpload.name + v4() + '.doc'}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        setLoading(false);
        setImageUpload("") 
        window.alert("Success")
        window.location.reload()
      });
    });
  }


  const upload = () => {
    if (imageUpload == null){ alert("Please select file"); return}
    setLoading(true)
    console.log(fileType)
    if(fileType.startsWith('image')) {
      uploadImage(); 
      return
    } else if(fileType === 'application/pdf') {
      uploadPdf(); 
      return
    } else if(fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileType === 'application/msword') {
      uploadDoc()
      return
    } else alert("File type not supported, Please upload pdf, doc, docx, image only")
  }

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        setImgFileRefList((prev)=>[...prev, item])
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });

    // fetch pdfs
    listAll(pdfListRef).then((response) => {
      response.items.forEach((item) => {
        setPdfFileRefList((prev)=>[...prev, item]) 
        getDownloadURL(item).then((url) => {
          setPdfUrls((prev)=> [...prev,url]);
        });
      }); 
    });

    // Fetch Docs
    listAll(docListRef).then((response) => {
      response.items.forEach((item) => {
        setDocFileRefList((prev)=>[...prev, item])
        getDownloadURL(item).then((url) => {
          setDocUrls((prev)=> [...prev,url]);
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
      <button onClick={upload}>{loading ? "Loading": "Upload"}</button>
      <br />
      {docUrls.map((url, index) => {
        return <DocDisplay downloadUrl={url} fileRef={docFileRefList[index]} key={index}/>;
      })}
      <br />
      {imageUrls.map((url, index) => {
        return <ImgDisplay downloadUrl={url} fileRef={imgFileRefList[index]} key={index}/>
      })}
      <br />
      {pdfUrls.map((url, index) => {
        return <PdfDisplay downloadUrl={url} fileRef={pdfFileRefList[index]} key={index}/>;
      })}

    </div>
  );
}

export default App; 