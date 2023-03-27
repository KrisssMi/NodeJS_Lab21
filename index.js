const express = require("express");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const PORT = 3000;

const cellPhonesRoute = require("./routes/cellphones");
const app = express();

app.engine("handlebars", expressHandlebars());
app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use("/", cellPhonesRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening to http://localhost:${PORT}/`);
});
