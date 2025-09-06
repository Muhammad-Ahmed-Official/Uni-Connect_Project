import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

interface FileInputProps {
    onUpload?: (files: File[]) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onUpload }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
    const [uploadError, setUploadError] = useState<string | null>(null);

    // Handle file drop or selection
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

        // Previews for image files
        const previews = acceptedFiles.map((file) =>
            file.type.startsWith('image/') ? URL.createObjectURL(file) : ''
        );
        setFilePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
        // accept: 'image/*,application/pdf,application/msword,.txt,.xlsx', // You can modify this based on allowed file types
    });

    const handleRemoveFile = (fileToRemove: File, index: number) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
        setFilePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        setUploading(true);
        setUploadError(null);

        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));

        try {
            const response = await axios.post('/upload-endpoint', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                // onUploadProgress: (progressEvent: ProgressEvent) => {
                //     const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                //     setUploadProgress((prev) => ({
                //         ...prev,
                //         [files[0].name]: progress,
                //     }));
                // },
            });

            if (onUpload) {
                onUpload(files);
            }

            setFiles([]);
            setFilePreviews([]);
            setUploading(false);
        } catch (error) {
            setUploadError('An error occurred while uploading the files');
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div
                {...getRootProps()}
                className={`hover:border-blue-400 group border-2 border-dashed p-6 w-full max-w-2xl text-center cursor-pointer ${uploading ? 'bg-gray-100' : 'bg-white'
                    }`}
            >
                <input {...getInputProps()} />
                <div className="text-gray-900 font-medium group-hover:text-blue-500">Drag & drop files here, or click to select files</div>
            </div>

            {files.length > 0 && (
                <div className="w-full max-w-2xl">
                    <h3 className="text-lg font-semibold">Files:</h3>
                    <div className="space-y-2 flex flex-wrap gap-2 items-center">
                        {files.map((file, index) => (
                            <div key={file.name} className="flex justify-between items-center border p-3 rounded-lg shadow-sm bg-white relative mb-0">
                                <div className="flex flex-col space-y-2">
                                    <span className="font-medium">{file.name}</span>
                                    {/* Display image preview if it's an image */}
                                    {file.type.startsWith('image/') && filePreviews[index] && (
                                        <img
                                            src={filePreviews[index]}
                                            alt={file.name}
                                            className="w-32 h-32 object-contain rounded-md"
                                        />
                                    )}

                                    {uploadProgress[file.name] && (
                                        <div className="w-full bg-gray-200 rounded-lg mt-1">
                                            <div
                                                className="bg-green-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-l-lg"
                                                style={{ width: `${uploadProgress[file.name]}%` }}
                                            >
                                                {uploadProgress[file.name]}%
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button
                                    className="text-red-600 text-lg font-bold absolute top-1 right-2 cursor-pointer"
                                    onClick={() => handleRemoveFile(file, index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {uploadError && <div className="text-red-500 text-center">{uploadError}</div>}

            {
                uploading && (
                    <div className="mt-4">
                        <button
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md disabled:bg-gray-400"
                            onClick={handleUpload}
                            disabled={uploading || files.length === 0}
                        >
                            {uploading && 'Uploading...'}
                        </button>
                    </div>
                )
            }

        </div>
    );
};

export default FileInput;