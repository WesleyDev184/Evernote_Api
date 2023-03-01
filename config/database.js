import { Promise, connect } from "mongoose";
Promise = global.Promise;

connect("mongodb://localhost/javascriptNote", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));
