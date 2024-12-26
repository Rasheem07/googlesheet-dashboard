/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const uploadFile = async (file: File): Promise<any> => {
  const formData = new FormData();
  console.log(file)
  formData.append("file", file);

  console.log(formData)
  const response = await fetch("/api/drive/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  return response.json();
};

const UploadSpreadsheet = () => {
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spreadsheets"] });
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const handleUpload = () => {
    if (file) {
      mutation.mutate(file);
    }
  };

  return (
      <Dialog>
        <DialogTrigger
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 flex items-center rounded-md shadow-md cursor-pointer"
        >
          Upload <span className="md:block hidden">a new book</span>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Upload a new Spreadsheet</DialogTitle>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed p-4 text-center ${
              isDragActive ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here...</p>
            ) : (
              <p>Drag & drop a .xlsx file here, or click to select one</p>
            )}
          </div>
          {file && (
            <div className="mt-4">
              <p>Selected file: {file.name}</p>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded mt-2"
                onClick={handleUpload}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Uploading..." : "Upload"}
              </button>
            </div>
          )}
          {mutation.isError && (
            <div className="text-red-500 mt-2">
              Error: {(mutation.error as Error).message}
            </div>
          )}
          {mutation.isSuccess && (
            <div className="text-green-500 mt-2">
              File uploaded successfully!
            </div>
          )}
        </DialogContent>
      </Dialog>
  );
};

export default UploadSpreadsheet;
