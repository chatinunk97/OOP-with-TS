import { User } from "./models/User";

const user = new User({});

user.on("click", () => {
  console.log("first222");
});
user.on("click", () => {
  console.log("first111");
});

user.trigger("click");
