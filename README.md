# 🔌NAV Connector (REST)

Nav Connector (REST) is a MiddleWare (REST) API that allows Web Client or PWA connect to NAV via OData Directly and GET and POST to NAV.

- [ ] Download
- [ ] Install Dependencies
- [ ] Test Locally
  - [ ] Add Environmental Variables
- [ ] Deploy

## Installation
Download or Clone repository then run to install all dependencies.

```bash
npm install 
```

Create a .env file in the root and add the following variables

```
NAV_HOST=https://<Server>:<WebSerivcePort>/
NAV_PATH=/ODataV4/<Company>/
NAV_USER=Nav user goes Here
NAV_PASSWORD=Nav Password Goes Here
PORT=80
```

Change <Server>,<WebServicePort> and <Company> to what your OData URL variables are.


## Deploy
You can either deploy to Heroku or start locally with:

```bash
npm start
```

## How to Use
Make a request to the server as a promise() or else the NAV Server tends to crash if too many requests are sent over the API, (working on a Socket API).

Create an Async Function connecting to MiddleWare API

```javascript
async function getAJAX() {
  let xhr = new XMLHttpRequest();
  let url = 'API_URL GOES HERE';
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.open('GET', url, false);
  try {
    xhr.responseType = 'json';
    xhr.send();
    if (xhr.status != 200) {
      return `Error: ${xhr.status}:  ${xhr.statusText}`;
    } else {
      return await xhr.response;
    }
  } catch(err) {
    // Send Error
    console.log(err);
  }
}
```

Then use the .then() format to map and display 

```javascript
getAJAX().then(async (data) => {
  // Map information
  console.log(await data);
});
```

### API URL Structure
```javascript
/************* QUOTES *************/
// Get all Quotes from Customer #
${API_URL}quotes/{Customer_Number};

// Get Quote Header
${API_URL}quote/{Quote_No};

// Get Quote Lines
${API_URL}quotelines/{Quote_No};
```

```javascript
/************* ORDERS *************/
// Get all Sales Orders from Customer #
${API_URL}orders/{Customer_Number};

// Get Sales Order Header
${API_URL}order/{Order_No};

// Get Sales Order Lines
${API_URL}orderlines/{Order_No};
```

```javascript
/************* INVOICES *************/
// Get all Invoices from Customer #
${API_URL}invoices/{Customer_Number};`
```

### 🗃 File Structure
```
|--app                  // API Logic
| |--api
| | |--controllers
| | | |--api.js         // NAV Endpoints
|--routes
| |--api.js             // API URL Structure
|--cache.js             // Memory Cache 
|--server.js            // Entry File
```

**API URL Structure is in the `/routes/` directory**

**Change NAV Endpoints are in `/app/api/controllers/` directory**