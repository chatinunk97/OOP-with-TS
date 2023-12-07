import { User } from "./models/User";

const user = new User({ id: 8, name: "new Kanon", age: 116 });

user.events.on("change", () => {
  console.log("Change triggered!");
});

user.events.trigger("change");
