export const phoneNumberValidation = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  let inputValue = event.target.value;
  inputValue = inputValue.replace(/[^0-9+]|(?<=\+.*?)[^0-9]/g, "");

  if (inputValue.length < 4) {
    inputValue = "+380";
  }
  if (inputValue.length > 13) {
    inputValue = inputValue.slice(0, 13);
  }
  return inputValue;
};
