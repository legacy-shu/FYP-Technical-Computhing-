import { Paper, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Document, Page } from "react-pdf";

const AddFiles = () => {
  const [files, setFiles] = useState([]);
  const [pdfFile, setPdfFile] = useState(undefined);
  const [rejected, setRejected] = useState([]);
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
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
  rejected.map(({ file, errors }) => {
    console.log(file);
    errors.map((error) => {
      console.log(error.message);
    });
  });

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Paper>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p style={{ color: "red" }}>Drop the file here...</p>
        ) : (
          <p style={{ color: "" }}>
            Drag 'n' Drop some file here, or click to select file
          </p>
        )}
        <em>(Select File)</em>
      </div>
      <div>
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </Paper>
  );
};

export default AddFiles;
