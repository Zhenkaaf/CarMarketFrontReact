import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";

const CabinetPage = () => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const openFileFolder = () => {
    filePickerRef.current?.click();
  };

  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChange");
    console.log(event.target.files);
    const files = event.target.files;
    if (files) {
      const allFiles = [...selectedFiles, ...files];
      if (allFiles.length > 7) {
        alert("You can select up to 7 files.");
        return;
      }
      const urls = Array.from(allFiles).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedPhotos(urls);
      setSelectedFiles(Array.from(allFiles));
    }
  };

  const uploadFilesToServer = async () => {
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

  const setFirstPhoto = (index: number) => {
    const copyOfUploadedPhotos = [...uploadedPhotos];
    const firstPhoto = copyOfUploadedPhotos.splice(index, 1)[0];
    copyOfUploadedPhotos.unshift(firstPhoto);
    setUploadedPhotos(copyOfUploadedPhotos);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <button onClick={openFileFolder}>Choose photos</button>
      <input
        type="file"
        onChange={selectFiles}
        accept="image/*,.png,.jpg"
        multiple
        ref={filePickerRef}
        style={{
          opacity: 0,
          height: 0,
          width: 0,
          lineHeight: 0,
          overflow: "hidden",
          padding: 0,
          margin: 0,
        }}
      />
      <button onClick={uploadFilesToServer}>Save to server</button>

      <ImageList
        sx={{ width: 500 /*  height: 450 */ }}
        /* cols={2} */
        rowHeight={164}
        gap={8}
      >
        {uploadedPhotos.map((photoUrl, index) => (
          <ImageListItem
            key={index}
            cols={index === 0 ? 2 : 1}
            rows={index === 0 ? 2 : 1}
          >
            {index === 0 && [
              <img
                key={`photo-${index}`}
                srcSet={photoUrl}
                src={photoUrl}
                alt={`Uploaded Photo ${index + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                  position: "absolute",
                }}
                onClick={() => setFirstPhoto(index)}
              />,
              <ImageListItemBar
                key={`bar-${index}`}
                title="Main photo"
                sx={{
                  "& .MuiImageListItemBar-title": {
                    color: "#ff4f00",
                  },
                }}
              />,
            ]}
            {index !== 0 && [
              <img
                key={`photo-${index}`}
                srcSet={photoUrl}
                src={photoUrl}
                alt={`Uploaded Photo ${index + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => setFirstPhoto(index)}
              />,
              <ImageListItemBar
                key={`bar-${index}`}
                subtitle="Click to set as main"
              />,
            ]}
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default CabinetPage;
