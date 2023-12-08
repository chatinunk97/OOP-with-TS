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

# Serialize / Deserialize

1. Serialize : Converting properties out an object and convert in to something else (JSON) then save it
2. Deserialize : take th saved serialized data and put it back in to an object

# Defining relationship between classes

class Sync in module Sync is needing the method set and get
which was originally in User what should we do ?

1. We are using delegation , giving those methods to the class Sync
   (a person sent or authorized to represent others, in particular an elected representative sent to a conference.)
   Downside : Sync will now only work with class User (not general)

2. Serialize interface => serialize():{} it gives more flexible to an argument of class Sync ; save(id:number , serialize : Serializable):void
   This allow other class, not only User to pass in anything that satisfy Serializable which is quite handy
   Downside : the type annotation for the output cannot be checked further than {}

3. Turn class Sync into a generic class using <T>
   allowing the caller to determine the type of the input

# Refactor save and fetch

Just a reminder about class
normally class method is accessable after we do something like new Class(arg)
then the argument taken in while creating the class can also be used to set some property in the Object

```
constructor(public baseUrl : string)
```

Which this property will be accessible cause it's public

Now to the methods.
After creating the object all methods (that are not restricted) can be accessable
and also take in arg from outside like normal function

Since the class Sync's fetch method does not have access to the method SET that's in class User
we changed the purpose of fetch from fetching data then update the data to just fecthing and return the data

```
  fetch(id: number): void {
    axios.get(`${this.rootUrl}/${id}`).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }
```

```
 fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }
```

This also apply with save as well we are now just shooting request to backend
without getting anything back => we don't know what happen

```
  save(data: UserProps): AxiosPromise {
    const { id } = data;
    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post("${this.rootUrl}", data);
    }
  }
```

- Side note : Generic Constraints : Tell TS the minimum requirement of <T>
  We used <T> before but sometime it's too loose that we cannot
  predict what property or method this T has

- Another side note : Implements vs Extends
  Implements : The value must follow the implements requiremennt
  Extends : The value GETS the methods and properties

  ```
  interface HasId {
  id: number;
  }
  export class Sync<T extends HasId>
  ```

  The reason we hard code Eventing but not for sync
  is becaue Sync is more likely to be change
  Now we are trying to sync data to API but we might, in the future, save the data to local

# tsconfig.json

```
tsc --init
```

This will generate us a tsconfig.json file which it will auto enable
the strict mode of ts
Normally property that is marked as 'Optional' TS will assume ok it will always be defined
BUT if we generate tsconfig.json file, the optional property will be either the defined type OR underfined , since it's optional

The take for this is by just geenrating the tsconfig file behavior of optional properties will change

we will come back to Sync again below

# Refactor Attributes

```
 get(propName: string): string | number {
    return this.data[propName];
  }
```

looking back to get method
the type annotation string | number may cause us problem
the attributes of user someday may change to boolean or other stuff

So can't we just put in string | number | boolean
Well, yes this will work just fine BUT remember the type union
when we try to use this value's method it will only shows us the option that is shared between these 3 types only

OR ELSE , we must make a type gaurd like if(typeof value === "number) do that

Which is kinna bad practice

Solution

_direct type annotation_ like below will not work
because we already define the type as string | number | boolean

```
const id : number = attrs.get('id')
```

We can use _type asertion_ to overwrite what TS telss us

```
const id = attrs.get('id) as number
```

this will not apply if id is a string, it's kinna hard-coded

# Link Attributes to User Class

```
export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;
  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }
}
```

Now that the class Attributes needs an Obj to be parsed in to the class as an argument to create the attribute
Before the User class does not have any input what so ever, so we need a constructor methods to take in the UserProps then assign it the new Attributes to the this.attribute

# Now test , more about Delegation

now that we have delegated most of the work to the children function when we going to use the methods or get to the property we would need something like

```
user.attributes.get('id')
user.attributes.get('name')
user.attributes.get('age')

user.sync.save()
user.sync.fetch()
```

Which is not that good cause the concelt od delegation is to
move the methods or property to another class but the super class still has to have a way to 'call' those item as well
By the above method we are just directly accessing the value which is not quite best practice

# Back to getter again

It's a method that allows you to get property from a class
but the deal is you don't have to call it

```
class Person {
  constructor(public name: string) {}

  get userName(): string {
    return this.name;
  }
}

const boss = new Person("Boss")
console.log(boss.userName)

```

Now we link the User to the Events's methods

```
  get on() {
    return this.events.on;
  }
```

In this getter we are not calling the "on" method in Event class
but we are returning the reference of the method
We can now assign this to a variable or just call it
The arguments has to be the same tho

```
user.on('change',()=>{
    console.log('User was changed !')
})
```

The same thing as trigger

```
  get trigger() {
    return this.events.trigger;
  }
```

# 'this' keyword in JS

```
const colors = {
  color: "red",
  printColor() {
    console.log(this.color);
  },
};

colors.printColor();
// This means what is on the left of the caller
// which is colors => colors.color

const printColor = colors.printColor;
printColor(); // undefined
//but for this example there's nother to the left of the caller
// which makes this result in undefined

//You can also see it this way, when we initialize the variable
// It's equal to the method printColor inside colors however, the other property like 'color'
// Does not come with it so it's like you just call a function that's referencing to nothing (nothing on the left)
```

Let's comeback to our User class
We are using get so it will refer to the user
as its 'this' and our user (class User) does not have a data property
(what get method does is return this.data[propName];)
which it will be translate in to user.data[propname] whichh it's already undefined on the user.data step

```
user.get('id')
```
