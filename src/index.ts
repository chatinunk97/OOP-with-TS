import { UserList } from "./views/UserList";
import { Collection } from "./models/Collections";
import { UserProps, User } from "./models/User";

const users = new Collection(
  "http://localhost:3000/users",
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on("change", () => {
  setTimeout(() => {
    const root = document.getElementById("root");
    if (root) {
      new UserList(root, users).render();
    }
  }, 3000);
});
users.fetch();
