var express = require("express");
var router = express.Router();
const crypto = require("crypto");
const path = require("path");

/* GET users listing. */
router.post("/", async function (req, res, next) {
  const { filePath = "" } = req.body;
  try {
    // 如果没有文件被上传，则返回以下 JSON 数据
    if (!req.files) {
      res.send({
        status: "No file uploaded",
        link: "undefined",
      });
    } else {
      let data = req.files.undefined; // 声明字段名为 data 的图片数据为 data 变量
      let md5 = crypto.createHash("md5").update(data.name).digest("hex"); // 取 data 文件名的 MD5 值
      data.mv(`.${filePath}/` + md5 + path.extname(data.name)); // 存储(移动)图片到 uploads 文件夹，文件名为 data 文件名 MD5 + 文件拓展名
      // 发送以下 JSON 数据
      res.send({
        status: "ok",
        link: `localhost:3000${filePath}/` + md5 + path.extname(data.name),
      });
    }
  } catch (err) {
    // 如果上传出现错误，则返回 HTTP 500.
    res.status(500).send(err);
  }
  // res.send("respond with a resource");
});

module.exports = router;
