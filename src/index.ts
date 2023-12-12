import { UserForm } from "./views/UserForms";
import { User } from "./models/User";

const user = User.buildUser({ id: 6 });
user.fetch();
setTimeout(() => {
  console.log(user);
  const userForm = new UserForm(document.getElementById("root"), user);
  userForm.render();
}, 3000);
