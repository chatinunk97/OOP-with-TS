import { User } from "./models/User";

const user = new User({ name: "new Kanon", age: 116 });

//Reminder for how 'this' work in JS

console.log(user.get('name'))
