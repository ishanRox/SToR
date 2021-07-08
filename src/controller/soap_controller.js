const soap = require("soap");

const { router } = require(`../config/config`);

const { getSoapSchema } = require("../service/soap_schema.service");
const { soapCall } = require("../service/soap_request.service");
const { createEndpoints } = require("../service/rest_endpoint_create.service");

exports.getSoapSchema = async function (req, res, next) {
  try {
    const wsdlUrl = req.body.url;
    const tagData = await getSoapSchema(wsdlUrl);

    res.status(201).json(tagData);
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};

exports.createEndpoints = async function (req, res, next) {
  try {
    const wsdlUrl = req.body.url;
    const tagData = await getSoapSchema(wsdlUrl);

    createEndpoints(soapCall, wsdlUrl, tagData, router);

    res.status(201).json({
      tagNames: tagData,
    });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};

exports.sendSoapRequest = async (req, res, next) => {
  try {
    const wsdlUrl = req.body.url;
    const tagArgs = req.body.tagArgs;
    const tagName = req.body.tagName;

    const result = await soapCall(wsdlUrl, tagArgs, tagName);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};
