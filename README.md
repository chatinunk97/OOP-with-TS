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
