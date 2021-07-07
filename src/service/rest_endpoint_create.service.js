const { getEndpoints } = require("../service/rest_endpoint.service");

function createEndpoints(soapCall, wsdlUrl, tagData, router) {
  //endpoint creation
  const endPointArray = Array.from(getEndpoints(tagData));
  const AsyncFunction = Object.getPrototypeOf(async function (
    req,
    res
  ) {}).constructor;

  endPointArray.forEach((e) => {
    console.log(e);
    const dynamicCode = `
       const wsdlUrl = this['wsdlUrl'];
       const tagArgs = req.body.tagArgs;
       const tagName = this['tagName'];
           console.log('cool');
       console.log(tagArgs);
       try {
         const result =  await this['soapCall'](wsdlUrl, tagArgs, tagName);
          
         res.status(201).json({
           data: result,
         });
       } catch (error) {
         console.log(error);
         res.status(404);
       }`;
    router.post(
      `/${e}`,
      new AsyncFunction("req", "res", dynamicCode).bind({
        soapCall: soapCall,
        wsdlUrl: wsdlUrl,
        tagName: e,
      })
    );
  });
}

exports.createEndpoints = createEndpoints;
