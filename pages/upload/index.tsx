import React, { useState } from "react";
import { useRouter } from "next/router";
import Dropzone from "react-dropzone";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setIsAnalyzing(true);
    toast.info("File upload started");

    // Simulate API call
    setTimeout(() => {
      // Call the API endpoint
      fetch("/api/upload", {
        method: "POST",
        body: file,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("File uploaded successfully:", data);
          setIsAnalyzing(false);
          toast.success("File uploaded successfully");
          router.push("/dashboard");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setIsAnalyzing(false);
          toast.error("Error uploading file");
        });
    }, 3000);
  };

  return (
    <div className="upload-page">
      <h1>Upload Your Credit Report</h1>
      <Dropzone onDrop={handleDrop} accept="application/pdf">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop a PDF file here, or click to select one</p>
          </div>
        )}
      </Dropzone>
      {isAnalyzing && (
        <p>
          Analyzing Credit MRI… <span className="spinner"></span>
        </p>
      )}
    </div>
  );
};

export default UploadPage;
