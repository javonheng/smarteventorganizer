const Hamoni = require("hamoni-sync");
const https = require("https");

const accountId = "5d9d1676-1b20-435a-8906-ebba486b82ac";
const appId = "1e49e2a24d2c4a48b4f9725d22a379f7";
let hamoni;

const data = JSON.stringify({ accountId, appId });

const options = {
  hostname: "api.sync.hamoni.tech",
  path: "/v1/token",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length
  }
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", token => {
    hamoni = new Hamoni(token);
    hamoni
      .connect()
      .then(response => {
        hamoni
          .createList("datagrid", [
            { firstName: "James", lastName: "Darwin" },
            { firstName: "Jimmy", lastName: "August" }
          ])
          .then(() => console.log("create success"))
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  });
});

req.on("error", error => {
  console.error(error);
});

req.write(data);
req.end();
