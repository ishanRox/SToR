const soap = require("soap");

function soapCall(wsdlUrl, tagArgs, soapTag) {
  console.log("tAGARGS" + tagArgs);
  return new Promise((resolve, reject) => {
    const soapCall = (err, result) => {
      resolve(result);
    };

    const clientInit = (err, client) => {
      if (err) console.log(err);

      client.setSecurity(new soap.BasicAuthSecurity("username", "password"));
      client[soapTag](tagArgs, soapCall);
    };
    //remove strictSSL
    var req = require("request").defaults({
      strictSSL: false,
    });
    soap.createClient(
      wsdlUrl,
      {
        request: req,
      },
      clientInit
    );
  });
}

exports.soapCall = soapCall;
