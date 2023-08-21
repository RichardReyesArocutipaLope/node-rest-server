import { request, response } from "express";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const uploadFile = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  const { file } = req.files;
  console.log(__dirname);
  const uploadPath = __dirname + "/../uploads/" + file.name;

  file.mv(uploadPath, (err) => {
    if (err) return res.status(500).send({ err });
    res.json({ msg: "File uploaded to " + uploadPath });
  });
};
