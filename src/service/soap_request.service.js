const soap = require("soap");

function soapCall(wsdlUrl, tagArgs, soapTag) {
  console.log("tAGARGS" + tagArgs);
  return new Promise((resolve, reject) => {
    const soapCall = (err, result) => {
      resolve(result);
    };

    const clientInit = (err, client) => {
      client[soapTag](tagArgs, soapCall);
    };

    soap.createClient(wsdlUrl, [{ disableCache: true }], clientInit);
  });
}

exports.soapCall = soapCall;
