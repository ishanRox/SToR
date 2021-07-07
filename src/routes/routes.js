const {router}=require(`../config/config`);

// Require controller modules.
const {
  getWsdlTags,
  createEndpoint,
  soapRequest,
} = require("../controller/soap_controller");

//get soap tag list
router.post("/api/wsdlTags", getWsdlTags);

//create endpoints using soap tag list
router.post("/api/wsdlCreate", createEndpoint);

//send soap request
router.post("/api/soapRequest", soapRequest);


module.exports = router;
