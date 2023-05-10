import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import DocDisplay from "../DocDisplay";
import ImgDisplay from "../ImgDisplay";
import PdfDisplay from "../PdfDisplay";
import { storage } from "../../firebase";

const CurrentSubject = ({subject, newFileCount}) => {
  console.log(subject, newFileCount)
  let trigger = newFileCount
  let subjectTrigger = subject
    // Ref state for delete function
  const [docFileRefList, setDocFileRefList] = useState([])
  const [pdfFileRefList, setPdfFileRefList] = useState([])
  const [imgFileRefList, setImgFileRefList] = useState([])
  const [imageUrls, setImageUrls] = useState([]);
  const [pdfUrls, setPdfUrls] = useState([]);
  const [docUrls, setDocUrls] = useState([]);

  const imagesListRef = ref(storage, `${subject}/images/`);
  const pdfListRef = ref(storage, `${subject}/pdf/`);
  const docListRef = ref(storage, `${subject}/doc/`);

  useEffect(() => {
    console.log(subject, newFileCount)

    setImgFileRefList([])
    setImageUrls([])
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        setImgFileRefList((prev) => [...prev, item])
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });

    // fetch pdfs
    listAll(pdfListRef).then((response) => {
      response.items.forEach((item) => {
        setPdfFileRefList((prev) => [...prev, item])
        getDownloadURL(item).then((url) => {
          setPdfUrls((prev) => [...prev, url]);
        });
      });
    });

    // Fetch Docs
    listAll(docListRef).then((response) => {
      response.items.forEach((item) => {
        setDocFileRefList((prev) => [...prev, item])
        getDownloadURL(item).then((url) => {
          setDocUrls((prev) => [...prev, url]);
        });
      });
    });
  }, [newFileCount, subject]);

  return <div>
    <h1>Current Subject: {subject}</h1>
    {docUrls.map((url, index) => {
        return <DocDisplay downloadUrl={url} fileRef={docFileRefList[index]} key={index} />;
      })}
      <br />
      {imageUrls.map((url, index) => {
        return <ImgDisplay downloadUrl={url} fileRef={imgFileRefList[index]} key={index} />
      })}
      <br />
      {pdfUrls.map((url, index) => {
        return <PdfDisplay downloadUrl={url} fileRef={pdfFileRefList[index]} key={index} />;
      })}
  </div>
}

export default CurrentSubject