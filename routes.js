var express = require("express");
var router = express.Router();

const { getSoapData } = require("./getSoapData");
const { soapCall } = require("./sendSoapRequest");

//get soap tag list
router.post("/api/wsdlTags", async (req, res, next) => {
  const wsdlUrl = req.body.url;
  const tagData = await getSoapData(wsdlUrl);

  res.status(201).json(tagData);
});

//create endpoints using soap tag list
router.post("/api/wsdlCreate", async (req, res, next) => {
  const wsdlUrl = req.body.url;
  const tagData = await getSoapData(wsdlUrl);

  tagData.forEach((element) => {
    router.get(
      "/get/" + element,
      new Function('return console.log("hello, " + name + "!");')
    );
  });

  res.status(201).json({
    tagNames: tagData,
  });
});

//get wsdl data
router.post("/api/wsdlData", async (req, res, next) => {
  const wsdlUrl = req.body.url;
  const tagArgs = req.body.tagArgs;
  const tagName = req.body.tagName;

  try {
    const result = await soapCall(wsdlUrl, tagArgs, tagName);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

module.exports = router;
