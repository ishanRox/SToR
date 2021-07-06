const soap = require("soap");

function soapCall(wsdlUrl, tagArgs, soapTag) {
console.log(tagArgs); 
  return new Promise((resolve, reject) => {
    
    const soapCall = (err, result) => {
      resolve(result);
    };

    const clientInit = (err, client) => {
      console.log({...tagArgs});
      client[soapTag](tagArgs, soapCall);
    };

    soap.createClient(wsdlUrl, clientInit);
  });
}

exports.soapCall = soapCall;
