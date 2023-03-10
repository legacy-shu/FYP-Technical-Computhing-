import { Box, Fab } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import { storage } from "../../utils/firebase";
import { ref, uploadString, getBlob } from "firebase/storage";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
const AddFiles = ({ userProfile, setUserProfile, userProfileService }) => {
  const [files, setFiles] = useState([]);
  const [pdfFile, setPdfFile] = useState(undefined);
  const [rejected, setRejected] = useState([]);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    if (userProfile?.cv) {
      getCVFromStorage();
    }
  }, [userProfile]);
  useEffect(() => {
    if (pdfFile) {
      uploadCVToStorage();
    }
  }, [pdfFile]);
  const updateUserProfile = async (userId, profile) => {
    const resp = await userProfileService.updateUser(userId, profile);
    if (resp.status === 200) {
      setUserProfile(resp.data.profile);
    } else {
      console.log(resp.message);
    }
  };
  const uploadCVToStorage = async () => {
    if (pdfFile) {
      const storageRef = ref(storage, `CVs/${userProfile.user.id}`);
      const snapshot = await uploadString(storageRef, pdfFile, "data_url");
      if (snapshot.metadata) {
        userProfile.cv = true;
        updateUserProfile(userProfile.user.id, userProfile);
        console.log("Uploaded a data_url string!");
      }
    }
  };
  const getCVFromStorage = async () => {
    const storageRef = ref(storage, `CVs/${userProfile.user.id}`);
    const pdf = await getBlob(storageRef);
    setPdfFile(pdf);
  };
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
      // "image/*": [],
    },
  });
  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };
  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{ m: 1, alignContent: "center" }}
      >
        {pdfFile ? (
          <Fab
            sx={{ boxShadow: 0 }}
            variant="extended"
            color="secondary"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <CloudQueueIcon sx={{ mr: 1 }} />
            Update Your CV
          </Fab>
        ) : (
          <Fab
            sx={{ boxShadow: 0 }}
            variant="extended"
            color="secondary"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <CloudQueueIcon sx={{ mr: 1 }} />
            Upload Your CV
          </Fab>
        )}
      </Box>
      <Box sx={{ m: 2 }}>
        <Document
          noData="Upload your CV please..."
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </Box>
    </Box>
  );
};

export default AddFiles;
