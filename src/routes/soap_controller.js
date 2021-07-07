const soap = require("soap");

const { router } = require(`../config/config`);

const { getEndpoints } = require("../service/rest_endpoint.service");
const { getSoapSchema } = require("../service/soap_schema.service");
const { soapCall } = require("../service/soap_request.service");

exports.getWsdlTags = async function (req, res, next) {
  const wsdlUrl = req.body.url;
  const tagData = await getSoapSchema(wsdlUrl);

  res.status(201).json(tagData);
};

exports.createEndpoint = async function (req, res, next) {
  const wsdlUrl = req.body.url;
  console.log("route created " + wsdlUrl);
  const tagData = await getSoapSchema(wsdlUrl);

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
          console.log('cool');
      console.log(tagArgs);
      try {
        const result =  await this['soapCall'](wsdlUrl, tagArgs, tagName);
         
        res.status(201).json({
          data: result,
        });
      } catch (error) {
        console.log(error);
        res.status(404);
      }`;
    router.post(
      `/${e}`,
      new AsyncFunction("req", "res", dynamicCode).bind({
        soapCall: soapCall,
        wsdlUrl: wsdlUrl,
        tagName: e,
      })
    );
  });

  res.status(201).json({
    tagNames: tagData,
  });
};

exports.soapRequest = async (req, res, next) => {
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
};
