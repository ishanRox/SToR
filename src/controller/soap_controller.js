const soap = require("soap");

const { router } = require(`../config/config`);

const { getSoapSchema } = require("../service/soap_schema.service");
const { soapCall } = require("../service/soap_request.service");
const { createEndpoints } = require("../service/rest_endpoint_create.service");

exports.getWsdlTags = async function (req, res, next) {
  const wsdlUrl = req.body.url;
  const tagData = await getSoapSchema(wsdlUrl);

  res.status(201).json(tagData);
};

exports.createEndpoint = async function (req, res, next) {
  const wsdlUrl = req.body.url;
  console.log("route created " + wsdlUrl);
  const tagData = await getSoapSchema(wsdlUrl);

  createEndpoints(soapCall, wsdlUrl, tagData, router);

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
