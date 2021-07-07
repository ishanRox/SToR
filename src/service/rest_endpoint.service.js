const endpointSet = new Set();
const argSet = new Set();

const recursiveEndpointSearch = (obj) => {

  Object.keys(obj).forEach((key, i) => {
  
    if (typeof obj[key] === "object") {
      endpointSet.add(key);
      recursiveEndpointSearch(obj[key]);
    } else {
      argSet.add(key);
    }

  });
};

function getEndpoints(soapTagList) {
  recursiveEndpointSearch(soapTagList);
  return endpointSet;
}

exports.getEndpoints = getEndpoints;
