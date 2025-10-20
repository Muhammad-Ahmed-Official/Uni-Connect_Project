import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface SingleFileInputProps {
  onFileSelect?: (file: File | null) => void;
}

const onUpload: React.FC<SingleFileInputProps> = ({ onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(selectedFile));
      } else {
        setFilePreview(null);
      }

      if (onFileSelect) {
        onFileSelect(selectedFile);
      }
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false, // single file only
  });

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
    if (onFileSelect) onFileSelect(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {!file && (
        <div
          {...getRootProps()}
          className="hover:border-blue-400 border-2 border-dashed p-6 w-full max-w-md text-center cursor-pointer bg-white rounded-lg shadow-sm"
        >
          <input {...getInputProps()} />
          <div className="text-gray-900 font-medium hover:text-blue-500">
            Drag & drop file here, or click to select
          </div>
        </div>
      )}

      {file && (
        <div className="w-full max-w-md border p-4 rounded-lg shadow-md bg-white relative">
          <button
            className="absolute top-2 right-3 text-red-600 text-xl font-bold"
            onClick={handleRemoveFile}
          >
            &times;
          </button>

          <div className="flex flex-col items-center space-y-2">
            <span className="font-medium text-gray-800">{file.name}</span>

            {filePreview ? (
              <img
                src={filePreview}
                alt={file.name}
                className="w-48 h-48 object-contain rounded-md"
              />
            ) : (
              <p className="text-gray-500">File ready to upload</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default onUpload;