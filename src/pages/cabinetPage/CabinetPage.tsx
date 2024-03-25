import axios from "axios";
import { useState } from "react";

const CabinetPage = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploaded, setUploaded] = useState();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length < 0) {
      alert("please select a file");
      return;
    }
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    /*  const res = await fetch("url", {
      method: "POST",
      body: formData,
    }); */
    try {
      const response = await axios.post(
        "http://localhost:3000/api/car/upload-images",
        formData
      );
      console.log("Upload successful", response.data);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <input
        type="file"
        onChange={handleChange}
        accept="image/*,.png,.jpg"
        multiple
      />
      <button onClick={handleUpload}>Save to server</button>

      {selectedFiles.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>
                <strong>Name:</strong> {file.name}
                <br />
                <strong>Type:</strong> {file.type}
                <br />
                <strong>Size:</strong> {file.size} bytes
                <br />
                <strong>Last Modified Date:</strong>{" "}
                {new Date(file.lastModified).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CabinetPage;
