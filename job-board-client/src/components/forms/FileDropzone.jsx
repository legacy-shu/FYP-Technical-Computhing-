import { Box } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const AddFiles = () => {
  const [files, setFiles] = useState([]);
  const [pdfFile, setPdfFile] = useState(undefined);
  const [rejected, setRejected] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });

  //when drop files in drop zone, it't the callback
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    //file to preview link
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        // ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
    //pdf to base64
    if (acceptedFiles?.length && acceptedFiles[0].type === "application/pdf") {
      let reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onloadend = (e) => {
        setPdfFile(e.target.result);
      };
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [],
    },
  });

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };
  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  //TODO : it will be deleted
  rejected.map(({ file, errors }) => {
    console.log(file);
    errors.map((error) => {
      console.log(error.message);
    });
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        minHeight="10vh"
        sx={{ border: 1, m: 4, alignContent: "center" }}
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ color: "green" }}>Drop the file here...</p>
          ) : (
            <p
              style={{
                color: "#00838f",
                paddingLeft: "40px",
                paddingRight: "40px",
              }}
            >
              Drag 'n' Drop your CV or Click to select your CV
            </p>
          )}
        </div>
      </Box>
      <div>
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </Box>
  );
};

export default AddFiles;
