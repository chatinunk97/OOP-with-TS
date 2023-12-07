import { User } from "./models/User";

const user = new User({ id: 8, name: "new Kanon", age: 116 });

user.sync.fetch(1).then((response) => console.log(response));
