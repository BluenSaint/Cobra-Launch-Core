import { useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileWithPreview extends File {
  preview: string;
  path?: string;
}

export default function KYCUploadCard() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map(
          (file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }) as FileWithPreview
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
          <li key={file.path || file.name}>
            {file.path || file.name} - {file.size} bytes
          </li>
        ))}
      </ul>
    </div>
  );
}
