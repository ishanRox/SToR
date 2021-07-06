const { json } = require("body-parser");
const soap = require("soap");
const { regexParser } = require("./parsers/regexParser");

async function getSoapData(wsdlUrl) {
  return new Promise((resolve, reject) => {
    const clientInit = (err, client) => {
      let methods = Object.getOwnPropertyNames(client).filter((e) =>
        e.includes("Number")
      );

      const tagsWithArgs = regexParser(client.wsdl.xml);

      resolve(tagsWithArgs);
    };
    soap.createClient(wsdlUrl, clientInit);
  });
}

exports.getSoapData = getSoapData;
