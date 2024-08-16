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
import { v4 as uuidv4 } from "uuid";

interface FileWithId {
  file: File;
  id: string;
}

interface AttachFilesWhenCreateProps {
  selectedFiles: FileWithId[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<FileWithId[]>>;
}

const AttachFilesWhenCreate = ({
  selectedFiles,
  setSelectedFiles,
}: AttachFilesWhenCreateProps) => {
  console.log("renderAttachFilesWhenCreate");
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [mainPhotoId, setMainPhotoId] = useState<string | null>(null);
  //const [filesUrls, setFilesUrls] = useState<string[]>([]);
  console.log(selectedFiles);
  const openFileFolder = (
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
    filePickerRef.current?.click();
  };

  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChange");
    const files = event.target.files;
    if (files) {
      //Преобразуем FileList в массив
      const newFiles = Array.from(files);
      const newFilesWithId = newFiles.map((file) => ({
        file,
        id: uuidv4(),
      }));
      const allFiles = [...selectedFiles, ...newFilesWithId];
      //const allFiles = [...selectedFiles, ...newFiles];
      // Очистка значения `input`
      if (filePickerRef.current) {
        filePickerRef.current.value = "";
      }
      if (allFiles.length > 7) {
        alert("You can select up to 7 photos, jpg / png.");
        return;
      }
      /* const blobs = allFiles.map((file) => URL.createObjectURL(file));
      console.log(blobs); */
      setSelectedFiles(allFiles);
    }
  };

  /* const setFirstPhoto = (index: number) => {
    console.log("setFirstPhoto", index);
    const copyOffilesUrls = [...filesUrls];
    const copyOfSelectedFiles = [...selectedFiles];
    const firstPhoto = copyOffilesUrls.splice(index, 1)[0];
    copyOffilesUrls.unshift(firstPhoto);
    const firstFile = copyOfSelectedFiles.splice(index, 1)[0];
    copyOfSelectedFiles.unshift(firstFile);
    setFilesUrls(copyOffilesUrls);
    setSelectedFiles(copyOfSelectedFiles);
  }; */
  const setFirstPhoto = (index: number) => {
    console.log("setFirstPhoto", index);
    const copyOfSelectedFiles = [...selectedFiles];
    const firstFile = copyOfSelectedFiles.splice(index, 1)[0];
    copyOfSelectedFiles.unshift(firstFile);
    setSelectedFiles(copyOfSelectedFiles);
    /* setMainPhotoId(firstFile.photoId); */
  };

  /* const removePhoto = (indexToRemove: number) => {
    const updatedfilesUrls = filesUrls.filter(
      (_, index) => index !== indexToRemove
    );
    const updatedSelectedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setFilesUrls(updatedfilesUrls);
    setSelectedFiles(updatedSelectedFiles);
  }; */
  const removePhoto = (indexToRemove: number) => {
    // Удаляем фото из списка
    const updatedSelectedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    // Если удаляем главное фото
    if (selectedFiles[indexToRemove].photoId === mainPhotoId) {
      // Устанавливаем новый ID главного фото, если есть другие фото
      if (updatedSelectedFiles.length > 0) {
        setMainPhotoId(updatedSelectedFiles[0].photoId);
      } else {
        setMainPhotoId(null); // Нет фото, сбрасываем значение
      }
    }
    // Обновляем состояние с новыми фото
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
      <Typography
        sx={{
          fontSize: "12px",
          color: "grey",
          marginTop: "3px",
          marginLeft: "5px",
        }}
      >
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
        {selectedFiles.map((fileWithId, index) => (
          <ImageListItem
            key={index}
            cols={index === 0 ? 2 : 1}
            rows={index === 0 ? 2 : 1}
          >
            {index === 0 && [
              <img
                key={`photo-${index}`}
                //srcSet={photoUrl}
                /*  src={photoUrl} */
                src={URL.createObjectURL(fileWithId.file)}
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
                    color: "#ff4500",
                  },
                }}
                actionIcon={
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => removePhoto(index)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                }
              />,
            ]}
            {index !== 0 && [
              <img
                key={`photo-${index}`}
                //srcSet={photoUrl}
                /*  src={photoUrl} */
                src={URL.createObjectURL(fileWithId.file)}
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
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => removePhoto(index)}
                  >
                    <DeleteForeverIcon fontSize="small" />
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

export default AttachFilesWhenCreate;
