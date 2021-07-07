const soap = require("soap");

async function getSoapSchema(wsdlUrl) {
  return new Promise((resolve, reject) => {
    
    const clientInit = (err, client) => {
      resolve(client.describe());
    };

    soap.createClient(wsdlUrl, clientInit);
  });
}

exports.getSoapSchema = getSoapSchema;
