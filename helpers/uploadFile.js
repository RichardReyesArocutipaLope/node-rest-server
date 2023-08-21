import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const uploadFileHelper = (
  files,
  validExtensions = ["png", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const cutName = file.name.split(".");
    const fileExtension = cutName[cutName.length - 1];

    //Validar la extension
    if (!validExtensions.includes(fileExtension)) {
      return reject(
        `La extension ${fileExtension} no es permitida, ${validExtensions}`
      );
    }

    const finalName = uuidv4() + "." + fileExtension;
    const uploadPath = __dirname + "/../uploads/" + folder + "/" + finalName;

    file.mv(uploadPath, (err) => {
      if (err) return reject(err);
      resolve(finalName);
    });
  });
};
