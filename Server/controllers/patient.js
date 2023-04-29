const { BadRequestError, NotFoundError, UnauthenticatedError } = require("../errors");
const Patient = require("../models/patient");
const { exec } = require("child_process");
const os = require("os");
const path = require("path");

const createPatient = async (req, res) => {
  const { patientName, userId } = req.body;
  // let result = "didnt ran";

  if (!patientName) {
    throw new BadRequestError("Please provide patient Name");
  }
  if (req.file === undefined) {
    throw new BadRequestError("Please provide picture");
  }
  // const model = await tf.loadLayersModel("./model.json");

  const { filename } = req.file;
  // exec(`python -c test.py"`, (error, stdout, stderr) => {
  //   if (error) {
  //     res.status(500).send(stderr);
  //   } else {
  //     res.send(stdout);
  //   }
  // });
  // const img = await loadImage(`C:/Users/rawat/Desktop/Vihaan-Beckend/public/assets/${filename}`);
  // // Create a canvas of size 224x224
  // const canvas = createCanvas(150, 150);

  // // Draw the image on the canvas
  // const ctx = canvas.getContext("2d");
  // ctx.drawImage(img, 0, 0, 150, 150);

  // // Get the pixel data of the canvas
  // const imageData = ctx.getImageData(0, 0, 150, 150);

  // // Normalize the pixel data
  // const pixelData = imageData.data.map((value, index) => {
  //   if ((index + 1) % 4 === 0) {
  //     return value / 255.0;
  //   } else {
  //     return value;
  //   }
  // });

  // // Reshape the pixel data into the required shape of [1, 224, 224, 3]
  // const reshapedPixelData = [];
  // for (let i = 0; i < pixelData.length; i += 4) {
  //   reshapedPixelData.push(pixelData[i]);
  //   reshapedPixelData.push(pixelData[i + 1]);
  //   reshapedPixelData.push(pixelData[i + 2]);
  // }
  // const batchedImg = tf.tensor4d(reshapedPixelData, [1, 150, 150, 3]);
  // const myArray = await batchedImg.array();
  // const myString = JSON.stringify(myArray);

  // const pythonProcess = spawn("python", [
  //   "C:/Users/rawat/Desktop/Vihaan-Beckend/controllers/main1.py",
  // ]);
  // pythonProcess.stdin.write(`C:/Users/rawat/Desktop/Vihaan-Beckend/public/assets/${filename}`);

  // pythonProcess.stdout.on("data", async (data) => {
  //   await res.send(data.toString());
  // });

  // pythonProcess.stderr.on("data", (data) => {
  //   console.error(data.toString());
  // });

  // pythonProcess.on("close", (code) => {
  //   console.log(`Python process exited with code ${code}`);
  // });
  // console.log(result);
  // res.send(result);
  let result = "";
  const pythonFile = path.join(__dirname, "main1.py");
  const patient = await Patient.create({
    createdBy: userId,
    picture: filename,
    patientName,
  });
  if (os.platform() === "win32") {
    const inputArg = "C:/Users/rawat/Desktop/Vihaan-Beckend/public/assets/" + filename;
    exec(`python ${pythonFile} ${inputArg}`, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error}`);
        return;
      }
      result = await stdout;
      console.log(stdout);
      res.status(200).send({ result });
    });
  } else {
    const inputArg = "C:/Users/rawat/Desktop/Vihaan-Beckend/public/assets/" + filename;
    exec(`python3 ${pythonFile} ${inputArg}`, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error}`);
        return;
      }
      result = await stdout;
      console.log(stdout);
      res.status(200).send({ result });
    });
  }
};
const getAllReports = async (req, res) => {
  const { userId } = req.body;
  const patient = await Patient.find({ createdBy: userId });
  res.send({ patient });
};

module.exports = { createPatient, getAllReports };
