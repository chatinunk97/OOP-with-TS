# Modal Class and View Class

- Modal Class => store data
- View Class => HTML and user view/input

We are building a mega User class
that can do anything like

- store info of the user
- print out the props
- update the props
- Fetch the user data

# Type Literal

We should create a Interface instead of typing directly
From

```
  constructor(private data: { name: string; age: number }) {}
```

to

```
interface UserProps {
  name: string;
  age: number;
}

```

# Private Props

We don't want user to access the props directly and manipulate it
so we will create a function (Method) inside the class to access to that information

```
  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }
```

# Optional property in an Object Interface

This allow us to create a class with out the property at first
and then have someone update it using methods

```
interface UserProps {
  name?: string;
  age?: number;
}

```

# Type Annotation : type allias

Callback in type annotation looks like this
not => {} , this will mean it will return an object

```
type Callback = () => void;
```

In case we don't know the object keys we can still use type annotation like this

```
 events: { [key: string]: Callback[] } = {};
```

# JSON server another alternative way to set up db

A JSON file will be a simple db for you to write and get data from

1. Create a JSON file
2. Install json-server library

```
npm install json-server
```

3. Run the server using

```
npx json-server --version
```

# Using TS with Axios

Here we are fetching data

```
import axios, { AxiosResponse } from "axios";
  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get("id")}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }
```

Let's break it down why we are doing this
The User class job is to be an object that can be created and can do the following stuff

1. Hold data of name and age
2. Method , update the data
3. Get the data / trigger methods inside the User (since we set thos data as private)

But there's no way to keep this user's data on the frontpage if we don't have a db
So must have a db like json-server this will keep the data for us

- But how are we going to get the information ?
  We can't just use axios.get() something like that because we have stored the method that has this function inside our User Class

1. We create a class, with a ID => This allow us to know when fetching the data which user we are talking about
2. Use the method that fetch the data THEN with the received data SET it to this.data now we will be having the data from the db as this.data
3. The reason we check this.data because if the newly created User Object
   does not have an ID (which is linked to the db) that means we are writing down a new user to the db. So we will need to use POST to create a new user
   But if there's an ID that means we are attempting to update the data
   so we use POST instead

- User that does not exist in server
  We are creating a new user on our frontend
  then save it (POST to the db)

```
const user = new User({ name: "Kanon", age: 16 });
user.save();
```

- Already exist user
  Since we know (and it's required) the id of the user
  we have the if checking whether there's an id in the this.data
  if there's it will not create a new user it will take all this.data (remember this.data is the newly created User obj in the frontend)
  and then update it on top the old record

```
const user = new User({ id: 8, name: "new Kanon", age: 116 });
user.save();
```

# Refactor : Composition focus

User another class in another class
it's not extends or Inherit
