import { createWriteStream } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";

// export default async function handler(req: any, res: NextApiResponse) {
//   const File = req.body;
//   console.log(File, "hello");
//   const { name, type } = File;
//   const filename = `${type.split("/")[1]}`;
//   const publicPath = join(process.cwd(), "public");
//   const filePath = join(publicPath, filename);
//   const fileStream = createWriteStream(filePath);
//   fileStream.on("error", (error) => {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while uploading the image." });
//   });
//   fileStream.on("finish", () => {
//     const url = `/public/${filename}`;
//     res.status(200).json({ message: "Image uploaded successfully.", url });
//   });
//   fileStream.end(File.data);
// }
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const filename = req.body;
    console.log(filename, "HEY");
    // const { name, type, data } = image;
    // console.log(type, "ZERZE3"); // add this line

    // const filename = `${type.split("/")[1]}`;
    // const publicPath = join(process.cwd(), "public");
    // const filePath = join(publicPath, filename);
    // const fileStream = createWriteStream(filePath);
    // fileStream.on("error", (error) => {
    //   console.log(error);
    //   res
    //     .status(500)
    //     .json({ message: "An error occurred while uploading the image." });
    // });
    // fileStream.on("finish", () => {
    //   const url = `/public/${filename}`;
    //   res.status(200).json({ message: "Image uploaded successfully.", url });
    // });
    // fileStream.end(data);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while uploading the image." });
  }
}
