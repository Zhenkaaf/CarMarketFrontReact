import { UseFormSetValue } from "react-hook-form";
import { IFormValues } from "../types";

export const excludeSpacesAndZero = (
  event: React.ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<IFormValues>
) => {
  let inputValue = event.target.value.replace(/\s/g, "");
  if (inputValue.length === 1 && inputValue[0] === "0") {
    inputValue = "";
  }
  if (inputValue.length > 6) {
    inputValue = inputValue.slice(0, 6);
  }
  if (event.target.name == "mileage") {
    inputValue = inputValue.slice(0, 3);
  }
  const fieldName = event.target.name as keyof IFormValues;
  setValue(fieldName, inputValue);
};
