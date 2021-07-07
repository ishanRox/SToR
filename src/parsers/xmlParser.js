function xmlParser(xmlDoc) {
  const xmldoc = require("xmldoc");
  const document = new xmldoc.XmlDocument(xmlDoc);
  return document;
}

exports.xmlParser = xmlParser;
