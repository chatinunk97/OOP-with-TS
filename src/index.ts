import { User } from "./models/User";

const user = new User({ id: 8, name: "New new Kanoan", age: 26 });

//Reminder for how 'this' work in JS

user.on("change", () => {
  console.log(user);
});

user.save();
