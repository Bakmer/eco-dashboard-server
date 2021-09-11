import messages from "../constants/messages";
import { UserInputError } from "apollo-server-express";

export const capitalize = (text: string): string => {
  const mySentence = text.toLowerCase();
  const words = mySentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
};

export const handleError = (error: any) => {
  if (error.Err) {
    return new Error(error.Err);
  } else if (error.InputErr) {
    return new UserInputError(error.InputErr);
  } else {
    return new Error(messages.GENERIC_ERROR);
  }
};
