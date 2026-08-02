import QRCode from "qrcode";

export const generateQRCode = async (data) => {
  return await QRCode.toDataURL(
    JSON.stringify(data)
  );
};