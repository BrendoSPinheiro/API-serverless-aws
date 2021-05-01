"use strict";

const employers = [
  { id: 1, name: "Brendo", email: "brendo@mail.com", office: "chefe", age: 21 },
  { id: 2, name: "Andrei", email: "andrei@mail.com", office: "chefe", age: 15 },
  { id: 3, name: "Maisa", email: "maisa@mail.com", office: "chefe", age: 50 },
  { id: 4, name: "Jose", email: "jose@mail.com", office: "chefe", age: 57 },
];

module.exports.listEmployers = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(employers),
  };
};

module.exports.getEmployer = async (event) => {
  const { id } = event.pathParameters;

  const employer = employers.find((item) => item.id === Number(id));

  if (!employer) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Employer not found" }, null, 2),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(employer, null, 2),
  };
};
