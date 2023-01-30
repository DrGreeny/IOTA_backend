import { createRequire } from "module";
import getAddressBalance from "./scripts/getAddressBalance";
import getNodeInfo from "./scripts/getNodeInfo";
import { initLogger } from "@iota/client";
const require = createRequire(import.meta.url);

const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/iota", async function (req, res) {
  const nodeData = await getNodeInfo();
  const balance = await getAddressBalance();
  console.log(balance);
  //console.log(nodeData);
  res.json(nodeData);
});

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
  initLogger();
  console.log("Example app listening at http://%s:%s", host, port);
});
