"use strict";

const employers = [
  { id: 1, name: "Brendo", email: "brendo@mail.com", office: "chefe", age: 21 },
  { id: 2, name: "Andrei", email: "andrei@mail.com", office: "chefe", age: 15 },
  { id: 3, name: "Maisa", email: "maisa@mail.com", office: "chefe", age: 50 },
  { id: 4, name: "Jose", email: "jose@mail.com", office: "chefe", age: 57 },
];

module.exports.listEmployers = async (event) => {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify(employers),
  };
};
