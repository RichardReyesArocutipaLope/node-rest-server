import { request, response } from "express";
import { uploadFileHelper } from "../helpers/uploadFile.js";

export const uploadFile = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).send("No files were uploaded.");
  }

  try {
    const nameFile = await uploadFileHelper(req.files, undefined, "imgs");
    res.json({ nameFile });
  } catch (error) {
    res.status(400).json({ error });
  }
};
