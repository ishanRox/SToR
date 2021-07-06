var express = require("express");
const { getEndpoints } = require("./endPoint");
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
  console.log("route created");
  const tagData = await getSoapData(wsdlUrl);
  console.log(tagData);

  //endpoint creation
  const endPointArray = Array.from(getEndpoints(tagData));
  const AsyncFunction = Object.getPrototypeOf(async function (
    req,
    res
  ) {}).constructor;
  endPointArray.forEach((e) => {
    console.log(e);
    const dynamicCode = `
    const wsdlUrl = this['wsdlUrl'];
    const tagArgs = req.body.tagArgs;
    const tagName = this['tagName'];
    
    try {
      const result =  await this['soapCall'](wsdlUrl, tagArgs, tagName);
       
      res.status(201).json({
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(404);
    }`;
    router.post(`/${e}`, new AsyncFunction("req", "res", dynamicCode).bind({'soapCall':soapCall,'wsdlUrl':wsdlUrl,'tagName':e}));
  });

  res.status(201).json({
    tagNames: tagData,
  });
});

function h() {
  console.log("hello");
}
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
