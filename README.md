# Ada Pets Node

<!-- Note: this was based on Ada Pets React no the other way around. -->

## At a Glance

- Individual, [stage 1](https://github.com/Ada-Developers-Academy/pedagogy/blob/master/rule-of-three.md#stage-1) project.
- To be completed in class on **DATE**. No pull request is required.

## Learning Goals

* Reading and understanding existing JavaScript code
* Using axios to read data from an API in JavaScript
* Parsing through an API response in JavaScript and extracting desired information
* Using axios to write data to an API in JavaScript

## Introduction

Ada Lovelace is starting a pet rescue service advertising pets in need of rescue via an API and is building a CLI app.   This app should load the list of pets automatically and present a menu with options.   The user should be able to list all pets, select a pet and see details, add new pets and remove a pet from the App once adopted.

She's managed to figure out the CLI parts on her own but needs your help with the API requests.


### Setup

1. Fork and clone this repository
2. Run `npm install` to install dependencies
3. Run the app with `node src/main.js`

### Layout

You will be adding your code to `src/adaPets.js`.  All of the functions you need to implement are currently there, just with empty bodies.

There are two other files that we've provided that you won't need to change `src/main.js` and `src/result.js`.  They are worth taking a quick look at but don't worry too much if you don't understand them fully.
* `src/main.js` is the actual driver code for the CLI app.  If you want to manually test your code you can use this.
* `src/result.js` is the library we've written to handle results and errors for this app.  It provides three functions, two of which you will use and one of which you're going to see in the tests.  **Every helper function should make sure to call `setResult` or `setError` before each `return`.**  What we pass into setResult and setError will be detailed per wave.
  * `setResult` call this function to set the result of your function.  We use this because Axios is asynchronous.
  * `setError` call this function to indicate an error in your function.  Again, we use this because Axios is asynchronous.
  *  If it takes too long for your code to produce a result (like say because you haven't written it yet) it will time out.

There are tests for each of the waves in the `test/` directory, there is one file per wave.  For example you can run the Wave 1 tests with `jest test/wave1.test.js`.

**Note: Because Axios is asynchronous we will need to use `setResult` instead of returning results and `setError` instead of throwing errors.**

## Wave 0: Familiarize Yourself with the Pets API


We will be using a simulated API for this exercise called [json-server](https://github.com/typicode/json-server).  This node package will take a JSON file and use it to generate a RESTful API.  

You can look at the `package.json` file and see this section

```json
"scripts": {
    "test": "jest",
    "server": "json-server --watch pets.json"
  },
```

This means you can start the API server by typing `$ npm run server`.  This will start the API on port 3000.

You can preview it by going to [http://localhost:3000/pets](http://localhost:3000/pets).  

In Postman, try to make a few API calls to verify how it works including:

- Listing all the pets
- Listing a single pet by ID
- Adding a pet
- Updating a Pet

Notice how the `pets.json` file changes.

## Wave 1: List Pets

Before we start doing things like looking at individual pets we want to be able to get a list of all of the pets.

To do this fill out the `listPets` function.  This will need to make a call to the Pets API and should `setResult` a list of objects containing (at least) the pet's `id` and `name` and should call `setError` with an error message if the request fails.

You can run the Wave 1 tests with `jest test/wave1.test.js`.  Once these are passing move on to Wave 2.

These tests use a mocking library to do what we used VCR to do in Ruby.  In each test you'll see a `mock.onGet` or `mock.onPost` to set up what should happen for that particular test before the actual assertions.

### Function to complete

* `listPets`
  * `setResult` should be passed the array of pets.
  * `setError` should be passed an error message.  (You may need to write this.)

## Wave 2: Details

We now want to be able to look at individual pets.  Like in Slack CLI we're going to want to select a given pet before we ask for details on one.  To do this we're going to fill out a few functions that we're creating within a closure.  There is a provided function `selectPet` that will prompt you for a pet's `id` and save it.

To do this you will need to fill out the `petDetails` function.  This will need to make a call to the Pets API and should `setResult` and object with details for the pet and should call `setError` with an error message if the request fails.

You can run the Wave 2 tests with `jest test/wave2.test.js`.  Once these are passing move on to Wave 3.

### Function to complete

* `showDetails`
  * `setResult` should be passed the `Object` that represents the pet.
  * `setError` should be passed an error message.  (You may need to write this.)

## Wave 3: Remove Pet

Once a pet is adopted we don't still want to show it on the list.  (We don't want people fighting over the same pet after all :wink:.)

To do this fill out the `removePet` function.  This will need to call to the Pets API to remove the pet.  This should `setResult` with a success message if this works and should call `setError` with an error message if the request fails.

You can run the Wave 3 tests with `jest test/wave3.test.js`.  Once these are passing move on to Wave 4.

### Function to complete

* `removePet`
  * `setResult` should be passed a success message.  (You may need to write this.)
  * `setError` should be passed an error message.  (You may need to write this.)


## Wave 4: Add a Pet

Sometimes we'll have new pets that want to be adopted.

To do this fill out the `addPet` function.  This will need to call the Pets API to add the pet.  This should `setResult` with a success message if this works and should call `setError` with an error message if the request fails.

You can run the Wave 4 tests with `jest test/wave4.test.js`.  Once these are passing you're done!  :tada:

### Function to complete

* `addPet`
  * `setResult` should be passed the new pet (from the API).
  * `setError` should be passed an error message.  (You may need to write this.)
