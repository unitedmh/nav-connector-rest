const DigestFetch = require('digest-fetch')

// ENV Login and PATH
const host = process.env.NAV_HOST
const path = process.env.NAV_PATH
const user = process.env.NAV_USER
const pass = process.env.NAV_PASSWORD

const digestOptions = {
  logger: console,
  algorithm: 'MD5-sess',
  statusCode: 401,
  cnonceSize: 8
}
const client = new DigestFetch(user, pass, digestOptions);

module.exports = {
  get: async function (req, res, next) {
    let type = req.params.type;
    let id = req.params.id;

    let url = '';

    if (type === 'quotes') { url = `${host}${path}Quotes?$filter=Sell_to_Customer_No eq '${id}'&$orderby=No desc&$top=15`; };
    if (type === 'quote') { url = `${host}${path}Quotes(Document_Type='Quote',No='${id}')`; };
    if (type === 'quotelines') { url = `${host}${path}Quotes(Document_Type='Quote',No='${id}')/QuotesSalesLines`; };
    if (type === 'orders') { url = `${host}${path}SalesOrder?$filter=Sell_to_Customer_No eq '${id}'&$orderby=No desc&$top=15`; };
    if (type === 'order') { url = `${host}${path}SalesOrder(Document_Type='Order',No='${id}')`; };
    if (type === 'orderlines') { url = `${host}${path}SalesOrder(Document_Type='Order',No='${id}')/SalesOrderSalesLines`; };
    if (type === 'customer') { url = `${host}${path}Customers('${id}')`; }
    if (type === 'invoices') { url = `${host}${path}InvoiceList?$filter=Sell_to_Customer_No eq '${id}'&$orderby=No desc&$top=15`; }

    console.log(url);
    try {
      const factory = () => ({
        headers: {
          'Connection': 'keep-alive',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const response = await client.fetch(url, { factory })
      const result = await response.json()
      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  },
  post: async function (req, res, next) {
    let type = req.params.type;
    let id = req.params.id;

    let url;
    let content;

    if (type === 'quote' && id === 'new') {
      url = `${host}${path}Quotes`;
      let body = JSON.stringify(req.body)
      let { documentType, customerNo } = JSON.parse(body);
      content = {
        "Document_Type": documentType,
        "Sell_to_Customer_No": customerNo
      };
    }

    if (type === 'quotelines') {
      url = `${host}${path}QuotesSalesLines`;
      let body = JSON.stringify(req.body)
      let { documentType, lineNo, type, no, quantity } = JSON.parse(body)
      content = {
        "Document_No": id,
        "Document_Type": documentType,
        "Line_No": lineNo,
        "No": no,
        "Type": type,
        "Quantity": quantity.toString()
      };
    }

    try {
      const factory = () => ({
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json',
          'Connection': 'keep-alive'
        },
        body: JSON.stringify(content)
      });

      const result = await client.fetch(url, { factory });
      const json = await result.json()
      res.status(200).json({ data: json });
    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  },
  clear: async function (req, res, next) {
    try {
      res.status(200).json({ message: 'Cache Cleared' });
    } catch (err) {
      res.status(500).send(err);
    }
  },
}