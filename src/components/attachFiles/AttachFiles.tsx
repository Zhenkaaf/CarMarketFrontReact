import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

interface AttachFilesProps {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const AttachFiles: React.FC<AttachFilesProps> = ({
  selectedFiles,
  setSelectedFiles,
}) => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const openFileFolder = (
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
    filePickerRef.current?.click();
  };

  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChange");
    console.log(event.target.files);
    const files = event.target.files;
    if (files) {
      const allFiles = [...selectedFiles, ...files];
      if (allFiles.length > 7) {
        alert("You can select up to 7 photos, jpg / png.");
        return;
      }
      const urls = Array.from(allFiles).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedPhotos(urls);
      setSelectedFiles(Array.from(allFiles));
    }
  };

  const setFirstPhoto = (index: number) => {
    console.log("setFirstPhoto", index);
    const copyOfUploadedPhotos = [...uploadedPhotos];
    const copyOfSelectedFiles = [...selectedFiles];
    const firstPhoto = copyOfUploadedPhotos.splice(index, 1)[0];
    copyOfUploadedPhotos.unshift(firstPhoto);
    const firstFile = copyOfSelectedFiles.splice(index, 1)[0];
    copyOfSelectedFiles.unshift(firstFile);
    setUploadedPhotos(copyOfUploadedPhotos);
    setSelectedFiles(copyOfSelectedFiles);
  };

  const removePhoto = (indexToRemove: number) => {
    const updatedUploadedPhotos = uploadedPhotos.filter(
      (_, index) => index !== indexToRemove
    );
    const updatedSelectedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setUploadedPhotos(updatedUploadedPhotos);
    setSelectedFiles(updatedSelectedFiles);
  };

  return (
    <Box>
      <Button
        sx={{ marginTop: "5px" }}
        variant="contained"
        onClick={(event) => openFileFolder(event)}
        startIcon={<DriveFolderUploadIcon sx={{ marginTop: "-2px" }} />}
        color="secondary"
      >
        Add photos
      </Button>
      <Typography sx={{ fontSize: "12px", color: "grey", marginTop: "3px" }}>
        max 7 photos, jpg / png
      </Typography>

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

      <ImageList
        sx={{
          width: "500px",
          "@media (max-width: 540px)": {
            width: "400px",
          },
          "@media (max-width: 440px)": {
            width: "320px",
          },
        }}
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
              />,
              <ImageListItemBar
                key={`bar-${index}`}
                title="Main photo"
                sx={{
                  "& .MuiImageListItemBar-title": {
                    color: "#ff4f00",
                  },
                }}
                actionIcon={
                  <IconButton sx={{ color: "red" }}>
                    <DeleteForeverIcon onClick={() => removePhoto(index)} />
                  </IconButton>
                }
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
                subtitle="Click to photo to set as main"
                sx={{
                  "@media (max-width: 540px)": {
                    "& .MuiImageListItemBar-subtitle": {
                      fontSize: "10px",
                    },
                  },
                  "@media (max-width: 440px)": {
                    "& .MuiImageListItemBar-subtitle": {
                      fontSize: "7.5px",
                    },
                  },
                }}
                actionIcon={
                  <IconButton sx={{ color: "red" }}>
                    <DeleteForeverIcon
                      fontSize="small"
                      onClick={() => removePhoto(index)}
                    />
                  </IconButton>
                }
              />,
            ]}
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default AttachFiles;
