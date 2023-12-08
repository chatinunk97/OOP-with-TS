import { User } from "./models/User";

const user = new User({ name: "new Kanon", age: 116 });

//Reminder for how 'this' work in JS
user.get("name");

user.on("click", () => {
  console.log("Clicked!");
});

user.trigger("click");
