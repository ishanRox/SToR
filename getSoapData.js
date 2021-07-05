const { json } = require("body-parser");
const soap = require("soap");

async function getSoapData(wsdlUrl) {
  return new Promise((resolve, reject) => {
    const clientInit = (err, client) => {
      let methods = Object.getOwnPropertyNames(client).filter((e) =>
        e.includes("Number")
      );
      //xmlParser(client.wsdl.xml);
      console.log(client.wsdl.xml);
      resolve(xmlParser(client.wsdl.xml));
    };
    soap.createClient(wsdlUrl, clientInit);
  });
}

function xmlParser(xmlDoc) {
  const xmldoc = require("xmldoc");
  const document = new xmldoc.XmlDocument(xmlDoc);
  return document;
}

exports.getSoapData = getSoapData;
