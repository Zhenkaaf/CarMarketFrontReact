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
import { useRef } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { v4 as uuidv4 } from "uuid";

interface IFileWithId {
  file: File;
  id: string;
}

interface IAttachFilesWhenCreateProps {
  selectedFiles: IFileWithId[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<IFileWithId[]>>;
}

const AttachFilesCreate = ({
  selectedFiles,
  setSelectedFiles,
}: IAttachFilesWhenCreateProps) => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  console.log("selectedFiles", selectedFiles);
  const openFileFolder = (
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
    filePickerRef.current?.click();
  };

  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      //Преобразуем FileList в массив
      const newFiles = Array.from(files);
      const newFilesWithId = newFiles.map((file) => ({
        file,
        id: uuidv4(),
      }));
      console.log("newFilesWithId*******", newFilesWithId);
      const allFiles = [...selectedFiles, ...newFilesWithId];
      // Очистка значения `input`
      if (filePickerRef.current) {
        filePickerRef.current.value = "";
      }
      if (allFiles.length > 5) {
        alert("You can select up to 5 photos, jpg / png.");
        return;
      }
      setSelectedFiles(allFiles);
    }
    // Сброс значения поля ввода, чтоб повторно выбирать один и тот же файл
    //event.target.value = "";
  };

  const setFirstPhoto = (index: number) => {
    const copyOfSelectedFiles = [...selectedFiles];
    const firstFile = copyOfSelectedFiles.splice(index, 1)[0];
    copyOfSelectedFiles.unshift(firstFile);
    setSelectedFiles(copyOfSelectedFiles);
  };

  const deletePhoto = (photoId: string) => {
    const filteredSelectedFiles = selectedFiles.filter(
      (file) => file.id !== photoId
    );
    setSelectedFiles(filteredSelectedFiles);
  };

  return (
    <Box>
      <Button
        sx={{
          //marginTop: "5px",
          width: "100%",
          "&:hover": {
            backgroundColor: `${theme.palette.secondary.light}`,
          },
          "&.Mui-disabled": {
            backgroundColor: `${theme.palette.background.default}`,
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
          color: "grey",
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
            key={fileWithId.id}
            cols={index === 0 ? 2 : 1}
            rows={index === 0 ? 2 : 1}
          >
            {index === 0 && [
              <img
                key={`photo0-${fileWithId.id}`}
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
                key={`bar0-${fileWithId.id}`}
                title="Main photo"
                sx={{
                  "& .MuiImageListItemBar-title": {
                    color: "#ff4500",
                  },
                }}
                actionIcon={
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => deletePhoto(fileWithId.id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                }
              />,
            ]}
            {index !== 0 && [
              <img
                key={`photo-${fileWithId.id}`}
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
                key={`bar-${fileWithId.id}`}
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
                    onClick={() => deletePhoto(fileWithId.id)}
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

export default AttachFilesCreate;
