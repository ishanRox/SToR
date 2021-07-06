function regexParser(xmlDoc) {
    return xmlDoc
      .match(/(.*xs:element.*)/g)
      .map((e) => e.trim())
      .reduce(
        (accum, val) => {
          const endSubArray = accum[accum.length - 1];
  
          if (!endSubArray || val.includes(`</xs:element>`)) {
            accum.push([]);
          } else {
            accum[accum.length - 1].push(val);
          }
  
          return accum;
        },
        [[]]
      );
  }

  
exports.regexParser = regexParser;