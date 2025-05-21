import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function KYCUploadCard() {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".jpg, .png, .pdf",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
      <ul>
        {files.map((file) => (
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        ))}
      </ul>
    </div>
  );
}
