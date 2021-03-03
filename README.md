# ecapp-redux-react

This is an exercise in developing an app with two types of users with Redux and Firebase.

## Technical composition

The front-end is developed with React, and the back-end with Firebase and Redux.
Firebase uses `Firestore`, `Cloud Functions`, `Cloud Storage`, and `Hosting`.
Redux is based on the `re-ducks` pattern.

Styling is mainly based on `Material UI` and `CSS in JS`. Some CSS is defined in CSS files in the `assets` directory.
Some components use other external libraries such as `react-id-swiper`.
Some components use other external libraries such as `react-id-swiper`, etc. (It might be better to unify the libraries to `Material UI`)

Because `CSS in JS` is used, CSS designs such as `BEM` are omitted (because class name collisions will not occur).

## DB Design

### firestore

- users
- - user

- products
- - product

- categories
- - category

Authentication in Firebase keeps `users` separately from Firestore.
For ease of use, the `uid` of `users` in Firestore and the `uid` of Authentication are the same.

### Data held by `product` (`documents` in the `products` collection)

```JS
id: string,
name: string,
description: string,
categories: [{id: string, name: string, order: number}],
gender: string, //male | female | others
images: [{ image: {path: string, src: string} }]
```

### Data held by `user` (`documents` in the `users` collection)

```JS
icon: string,
uid: string,
username: string,
role: string,
mail: string,
password: string
cart: [],
```

## command

### setup

Clone the repository in the folder you want to create.
`git clone https://github.com/newt0/talentlink.git`

After navigating to the root directory of the project with `cd talentlink`,
use `yarn` (or `yarn install`) to import the necessary dependencies.

※ Use `yarn` instead of `npm`. This is because both `yarn` and React are developed by Facebook and have a high affinity.

※ It is assumed that the environment has been built with `homebrew`, `nodebrew`, etc.
※ You will need to set up a firebase project. You will also need to select the Blaze plan.

### Run local server

Run `yarn dev` and then open `http://localhost:3000/` in your browser.

### deploy

Run `yarn build`.
Then, after building finishied,
`firebase deploy --only hosting` to deploy to Firebase Hosting.
