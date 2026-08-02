import crypto from "crypto";

export const generateEventCode = (title) => {
  const words = title
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0);

  let code = "";

  if (words.length === 1) {
    code = words[0].substring(0, 3);
  } else {
    code = words
      .map(word => word[0])
      .join("");
  }

  code = code.toUpperCase();

  const random = crypto
    .randomBytes(2)
    .toString("hex")
    .toUpperCase();

  return `${code}${random}`;
};