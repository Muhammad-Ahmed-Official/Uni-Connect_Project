"use client";

import { upload } from "@imagekit/next";
import { useRef, useState, useCallback } from "react";
import { Image, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => any;
}

const FileUpload = ({ onSuccess, onProgress }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image (JPEG, PNG, WEBP)");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5 MB");
      return false;
    }
    return true;
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
    setProgress(0);
    setError(null);
  };

  const handleUpload = async (selectedFile: File) => {
    if (!validateFile(selectedFile)) return;
    setUploading(true);
    setError(null);

    try {
      const authRes = await fetch("/api/upload-auth");
      const auth = await authRes.json();

      const response = await upload({
        file: selectedFile,
        fileName: selectedFile.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        signature: auth?.authenticationParams.signature,
        expire: auth?.authenticationParams.expire,
        token: auth?.authenticationParams.token,
        onProgress: (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
            if (onProgress) onProgress(percent);
          }
        },
      });

      onSuccess(response);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile && validateFile(selectedFile)) {
        setFile(selectedFile);
        setFilePreview(URL.createObjectURL(selectedFile));
        handleUpload(selectedFile);
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
  });

  return (
    <div className="flex flex-col items-center space-y-4">
      {!file && (
        <div
          {...getRootProps()}
          className="hover:border-blue-400 border-2 border-dashed p-6 w-full max-w-md text-center cursor-pointer bg-white rounded-lg shadow-sm transition-all hover:shadow-md"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center text-gray-700">
            <Image size={36} className="text-blue-500 mb-2" />
            <p className="font-medium">Drag & drop image here</p>
            <p className="text-gray-500 text-sm">or click to select</p>
          </div>
        </div>
      )}

      {file && (
        <div className="relative w-full border rounded-lg shadow-md bg-white">
          <button
            className="absolute top-2 right-3 cursor-pointer text-red-600 text-xl font-bold"
            onClick={handleRemoveFile}
          >
            &times;
          </button>

          <div className="flex flex-col items-center space-y-2">
            {/* <span className="font-medium text-gray-800">{file.name}</span> */}

            {filePreview && (
              <img
                src={filePreview}
                alt={file.name}
                className="w-48 h-52 object-contain rounded-md"
              />
            )}

            {uploading && (
              <div className="flex items-center space-x-2 mt-2 text-blue-600">
                <Loader2 className="animate-spin w-4 h-4" />
                <span>Uploading... {progress}%</span>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;