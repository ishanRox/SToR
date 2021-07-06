const { json } = require("body-parser");
const soap = require("soap");

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

function xmlParser(xmlDoc) {
  const xmldoc = require("xmldoc");
  const document = new xmldoc.XmlDocument(xmlDoc);
  return document;
}

function regexParser(xmlDoc) {
  return xmlDoc
    .match(/(.*xs:element.*)/g)
    .map((e) => e.trim())
    .reduce(
      (accum, val) => {
        const endSubArray = accum[accum.length - 1];

        if (!endSubArray || val.includes(`</xs:element>`)) {
          accum.push([]);
        } else {
          accum[accum.length - 1].push(val);
        }

        return accum;
      },
      [[]]
    );
}

exports.getSoapData = getSoapData;
