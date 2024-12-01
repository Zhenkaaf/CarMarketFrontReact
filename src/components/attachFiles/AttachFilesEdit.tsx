import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { v4 as uuidv4 } from "uuid";

interface IAttachFilesProps {
  setNewFilesToUpload: React.Dispatch<
    React.SetStateAction<{ id: string; file: File; url: string }[]>
  >;
  setFilesToDelete: React.Dispatch<
    React.SetStateAction<{ id: string; url: string }[]>
  >;
  setMainPhotoId: React.Dispatch<React.SetStateAction<string>>;
  existingPhotos: { id: string; url: string }[];
  filesToDelete: { id: string; url: string }[];
}

const AttachFilesEdit = ({
  setNewFilesToUpload,
  setFilesToDelete,
  setMainPhotoId,
  existingPhotos,
  filesToDelete,
}: IAttachFilesProps) => {
  console.log("uploadedFiles", existingPhotos);
  const theme = useTheme();
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [existingAndSelectedPhotos, setExistingAndSelectedPhotos] = useState<
    { id: string; file?: File; url: string }[]
  >([]);

  useEffect(() => {
    setExistingAndSelectedPhotos([...existingPhotos]);
  }, [existingPhotos]);

  const openFileFolder = (
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
    filePickerRef.current?.click();
  };

  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        id: uuidv4(),
        file,
        url: URL.createObjectURL(file),
      }));
      console.log("newFilesEDIT", newFiles);
      const allFiles = [...existingAndSelectedPhotos, ...newFiles].filter(
        (file) =>
          !filesToDelete.some((deletedFile) => deletedFile.url === file.url)
      );
      if (allFiles.length > 5) {
        alert("You can select up to 5 photos, jpg / png.");
        return;
      }
      setExistingAndSelectedPhotos((prev) => [...prev, ...newFiles]);
      setNewFilesToUpload((prev) => [...prev, ...newFiles]);
    }
    // Сброс значения поля ввода, чтоб повторно выбирать один и тот же файл
    event.target.value = "";
  };

  const setFirstPhoto = (mainPhotoId: string) => {
    setExistingAndSelectedPhotos((prev) => {
      const mainPhoto = prev.find((photo) => photo.id === mainPhotoId);
      if (!mainPhoto) return prev;
      const otherPhotos = prev.filter((photo) => photo.id !== mainPhotoId);
      return [mainPhoto, ...otherPhotos];
    });
  };

  const deletePhoto = (photoId: string) => {
    const photoToDelete = existingAndSelectedPhotos.find(
      (photo) => photo.id === photoId
    );
    if (photoToDelete?.url.startsWith("http")) {
      setFilesToDelete((prev) => [...prev, photoToDelete]);
    }
    const filteredAllFiles = existingAndSelectedPhotos.filter(
      (photo) => photo.id !== photoId
    );
    // Освобождение URL-объекта
    if (photoToDelete?.url.startsWith("blob")) {
      URL.revokeObjectURL(photoToDelete.url);
      //Когда вы вызываете URL.createObjectURL(file), браузер создает временный URL, который ссылается на указанный файл в памяти. Этот URL можно использовать для отображения файла. Однако этот URL будет существовать до тех пор, пока вы его явно не освободите.
      setNewFilesToUpload((prev) =>
        prev.filter((photo) => photo.id !== photoId)
      );
    }
    setExistingAndSelectedPhotos(filteredAllFiles);
  };

  useEffect(() => {
    console.log("установка нового главного фото");
    if (existingAndSelectedPhotos.length > 0) {
      setMainPhotoId(existingAndSelectedPhotos[0].id);
    }
    if (existingAndSelectedPhotos.length === 0) {
      setMainPhotoId("");
    }
  }, [existingAndSelectedPhotos, setMainPhotoId]);

  return (
    <Box>
      <Button
        sx={{
          marginTop: "5px",
          "&:hover": {
            backgroundColor: theme.palette.secondary.light
          },
        }}
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
          color: theme.palette.text.primary,
          marginTop: "3px",
          marginLeft: "5px",
        }}
      >
        max 5 photos, jpg / png
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
          maxWidth: "500px",
          width: "100%",
        }}
        rowHeight={164}
        gap={20}
      >
        {existingAndSelectedPhotos.map((photo, index) => (
          <ImageListItem
            key={photo.id}
            cols={index === 0 ? 2 : 1}
            rows={index === 0 ? 2 : 1}
          >
            {index === 0 && [
              <img
                key={`photo0-${photo.id}`}
                src={photo.url}
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
                key={`bar0-${photo.id}`}
                title="Main photo"
                sx={{
                  "& .MuiImageListItemBar-title": {
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  },
                }}
                actionIcon={
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => deletePhoto(photo.id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                }
              />,
            ]}
            {index !== 0 && [
              <img
                key={`photo-${photo.id}`}
                src={photo.url}
                alt={`Uploaded Photo ${index + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => setFirstPhoto(photo.id)}
              />,
              <ImageListItemBar
                key={`bar-${photo.id}`}
                subtitle="Click to photo to set as main"
                sx={{
                  "@media (max-width: 490px)": {
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
                    onClick={() => deletePhoto(photo.id)}
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

export default AttachFilesEdit;
