const endpoints = new Set();
const args = new Set();

const iterate = (obj) => {
  Object.keys(obj).forEach((key, i) => {
    console.log(`key: ${key}`);
    if (typeof obj[key] === "object") {
      endpoints.add(key);
      iterate(obj[key]);
    } else {
      args.add(key);
      console.log("__________________ ");
    }
  });
};

function getEndpoints(soaPTagList) {
  iterate(soaPTagList);

  console.log(endpoints);
  console.log(args);
  return endpoints;
}

exports.getEndpoints = getEndpoints;
