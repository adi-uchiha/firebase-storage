import "./App.css";
import { useState } from "react";
import {
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import CurrentSubject from "./components/Subjects/CurrentSubject";


function App() {
  const [fileType, setFileType] = useState("")
  const [newFileCount, setNewFileCount] = useState(0)

  const [uploadSubject, setUploadSubject] = useState('sub1')
  // Upload State
  const [imageUpload, setImageUpload] = useState(null);
  // Fetching states

  const [loading, setLoading] = useState(false)

  // Validate file type in frontend
  // Folder Refs


  const uploadImage = () => {
    const imageRef = ref(storage, `${uploadSubject}/images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      setLoading(false)
      setImageUpload("")
      window.alert("Success")
      setNewFileCount(newFileCount+1)
      // getDownloadURL(snapshot.ref).then((url) => {
      //   // setImageUrls((prev) => [...prev, url]);
      //   setLoading(false);
      //   setImageUpload("")
      //   window.alert("Success")
      //   setNewFileCount(newFileCount + 1)
      //   // window.location.reload()
      // });
    });
  };

  const uploadPdf = () => {
    const imageRef = ref(storage, `${uploadSubject}/pdf/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      setLoading(false);
      setImageUpload("")
      window.alert("Success")
      setNewFileCount(newFileCount+1)


      // getDownloadURL(snapshot.ref).then((url) => {
      //   setImageUrls((prev) => [...prev, url]);

      // });
    });
  }

  const uploadDoc = () => {
    const imageRef = ref(storage, `${uploadSubject}/doc/${imageUpload.name + v4() + '.doc'}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      setImageUpload("")
      setLoading(false)
      window.alert("Success")
      setNewFileCount(newFileCount+1)

    });
  } 


  const upload = () => {
    if (imageUpload == null) { alert("Please select file"); return }
    setLoading(true)
    console.log(fileType)
    if (fileType.startsWith('image')) {
      uploadImage();
      return
    } else if (fileType === 'application/pdf') {
      uploadPdf();
      return
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileType === 'application/msword') {
      uploadDoc()
      return
    } else alert("File type not supported, Please upload pdf, doc, docx, image only")
  }



  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
          setFileType(event.target.files[0].type)
        }}
      />
      <button onClick={upload}>{loading ? "Loading" : "Upload"}</button>
      <br />

      <label htmlFor="cars">Choose a subject:</label>
      <select name="Subjects" id="subjects" onChange={(e)=>setUploadSubject(e.target.value)}>
        <option value="sub1">Sub1</option>
        <option value="sub2">Sub2</option>
        <option value="sub3">Sub3</option>
      </select>

      <br />
        <CurrentSubject subject={uploadSubject} newFileCount={newFileCount}/>
    </div>
  );
}

export default App; 