import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { v4 as uuidv4 } from "uuid";

interface AttachFilesProps {
  setExistingPhotos: React.Dispatch<
    React.SetStateAction<{ id: string; url: string }[]>
  >;
  //setNewFilesToUpload: React.Dispatch<React.SetStateAction<File[]>>;
  setNewFilesToUpload: React.Dispatch<
    React.SetStateAction<{ id: string; file: File; url: string }[]>
  >;
  setFilesToDelete: React.Dispatch<
    React.SetStateAction<{ id: string; url: string }[]>
  >;
  setHasFilesChanged: (value: boolean) => void;
  existingPhotos: { id: string; url: string }[];
  //newFilesToUpload: File[];
  newFilesToUpload: { id: string; file: File; url: string }[];
  filesToDelete: { id: string; url: string }[];
}

const AttachFiles = ({
  setExistingPhotos,
  setNewFilesToUpload,
  setHasFilesChanged,
  setFilesToDelete,
  existingPhotos,
  newFilesToUpload,
  filesToDelete,
}: AttachFilesProps) => {
  console.log("uploadedFiles", existingPhotos);
  const filePickerRef = useRef<HTMLInputElement>(null);

  const [existingAndSelectedPhotos, setExistingAndSelectedPhotos] = useState<
    { id: string; file?: File; url: string }[]
  >([]);

  console.log("existingAndSelectedPhotos", existingAndSelectedPhotos);
  console.log("newFilesToUpload", newFilesToUpload);
  console.log("filesToDelete", filesToDelete);
  useEffect(() => {
    setExistingAndSelectedPhotos([...existingPhotos]);
  }, [existingPhotos]);

  /*   useEffect(() => {
    if (uploadedFiles) {
      console.log("useEffectAttachFiles------------");
      const urls = uploadedFiles.map((file) =>
        typeof file === "string" ? file : URL.createObjectURL(file)
      );
      setExistingAndSelectedPhotos(urls);
    }
  }, [uploadedFiles]); */

  /*  useEffect(() => {
    if (uploadedFiles && setHasFilesChanged) {
      const filesChanged = hasFilesChanged(uploadedFiles, uploadedFiles);
      setHasFilesChanged(filesChanged);
    }
  }, [uploadedFiles, uploadedFiles, setHasFilesChanged]); */

  const openFileFolder = (
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
    filePickerRef.current?.click();
  };

  /*   const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      //const newFiles = Array.from(files) as File[];
      const newFiles = Array.from(files).map((file) => ({
        id: uuidv4(),
        file,
        url: URL.createObjectURL(file),
      }));
      console.log("newFiles", newFiles);
      console.log(
        "existingAndSelectedPhotos.length",
        existingAndSelectedPhotos.length
      );
      console.log("newFiles.length", newFiles.length);
      console.log("filesToDelete.length", filesToDelete.length);
      const totalFilesCount =
        existingAndSelectedPhotos.length +
        newFiles.length -
        filesToDelete.length;
      console.log("totalFilesCount****", totalFilesCount);
      // Очистка значения `input`
      if (filePickerRef.current) {
        filePickerRef.current.value = "";
      }
       //Очистка значения input в элементе <input type="file"> необходима для того, чтобы ////пользователи могли повторно выбирать те же файлы, которые они уже выбрали ранее. Без этой //очистки браузер может не вызывать событие onChange, если пользователь выбирает те же самые файлы повторно, поскольку значение input не изменяется. 
      if (totalFilesCount > 7) {
        alert("You can select up to 7 photos, jpg / png.");
        return;
      }
      //const urls = newFiles.map((file) => URL.createObjectURL(file));
      //const urls = newFiles.map((newFile) => URL.createObjectURL(newFile.file));
      setExistingAndSelectedPhotos((prev) => [
        ...prev,
        ...newFiles.map(({ url }) => url),
      ]);
      setNewFilesToUpload((prev) => [...prev, ...newFiles]);
    }
  }; */
  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        id: uuidv4(),
        file,
        url: URL.createObjectURL(file),
      }));
      console.log("newFiles", newFiles);
      const allFiles = [...existingAndSelectedPhotos, ...newFiles].filter(
        (file) =>
          !filesToDelete.some((deletedFile) => deletedFile.url === file.url)
      );

      console.log("allFiles.length", allFiles.length);

      if (allFiles.length > 7) {
        alert("You can select up to 7 photos, jpg / png.");
        return;
      }

      // Обновление состояний
      setExistingAndSelectedPhotos((prev) => [
        ...prev,
        ...newFiles.map((file) => file),
      ]);
      setNewFilesToUpload((prev) => [...prev, ...newFiles]);
    }
  };

  const setFirstPhoto = (index: number) => {
    console.log("setFirstPhoto", index);
    const copyOfexistingAndSelectedPhotos = [...existingAndSelectedPhotos];
    const copyOfuploadedFiles = [...existingPhotos];
    const firstPhoto = copyOfexistingAndSelectedPhotos.splice(index, 1)[0];
    copyOfexistingAndSelectedPhotos.unshift(firstPhoto);
    const firstFile = copyOfuploadedFiles.splice(index, 1)[0];
    copyOfuploadedFiles.unshift(firstFile);
    setExistingAndSelectedPhotos(copyOfexistingAndSelectedPhotos);
    // setuploadedFiles(copyOfuploadedFiles);
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
      console.log("удаление BLOB");
      URL.revokeObjectURL(photoToDelete.url);
      //Когда вы вызываете URL.createObjectURL(file), браузер создает временный URL, который ссылается на указанный файл в памяти. Этот URL можно использовать для отображения файла. Однако этот URL будет существовать до тех пор, пока вы его явно не освободите.
      setNewFilesToUpload((prev) =>
        prev.filter((photo) => photo.id !== photoId)
      );
    }
    setExistingAndSelectedPhotos(filteredAllFiles);
  };

  const hasFilesChanged = (
    prevFiles: (File | string)[] | undefined,
    currentFiles: (File | string)[]
  ): boolean => {
    // Преобразуем массив файлов в строки с описанием файла
    const fileToString = (file: File | string) =>
      typeof file === "string"
        ? file
        : `${file.name}_${file.size}_${file.lastModified}`;

    // Преобразуем массив файлов в строки и сортируем
    const prevFileStrings = prevFiles?.map(fileToString).sort() || [];
    const currentFileStrings = currentFiles.map(fileToString).sort();

    // Сравниваем отсортированные массивы строк
    return (
      prevFileStrings.length !== currentFileStrings.length ||
      prevFileStrings.some((str, index) => str !== currentFileStrings[index])
    );
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
        {existingAndSelectedPhotos.map((photo, index) => (
          <ImageListItem
            key={index}
            cols={index === 0 ? 2 : 1}
            rows={index === 0 ? 2 : 1}
          >
            {index === 0 && [
              <img
                key={`photo-${index}`}
                srcSet={photo.url}
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
                    onClick={() => deletePhoto(photo.id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                }
              />,
            ]}
            {index !== 0 && [
              <img
                key={`photo-${index}`}
                srcSet={photo.url}
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

export default AttachFiles;
