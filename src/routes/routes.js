const { router } = require(`../config/config`);

// Require controller modules.
const {
  getSoapSchema,
  createEndpoints,
  sendSoapRequest,
} = require("../controller/soap_controller");

//get soap tag list
router.post("/api/soap-schema", getSoapSchema);

//create endpoints using soap tag list
router.post("/api/create-endpoints", createEndpoints);

//send soap request
router.post("/api/soap-request", sendSoapRequest);

module.exports = router;
