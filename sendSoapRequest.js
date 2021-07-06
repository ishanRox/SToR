const soap = require("soap");

function soapCall(wsdlUrl, tagArgs, soapTag) {
 
  return new Promise((resolve, reject) => {
    
    const soapCall = (err, result) => {
      resolve(result);
    };

    const clientInit = (err, client) => {
      client[soapTag]({dNum:tagArgs}, soapCall);
    };

    soap.createClient(wsdlUrl, clientInit);
  });
}

exports.soapCall = soapCall;
