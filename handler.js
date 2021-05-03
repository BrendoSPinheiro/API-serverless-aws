"use strict";

const employers = [
  { id: 1, name: "Brendo", age: 21, office: "chefe" },
  { id: 2, name: "Andrei", age: 15, office: "chefe" },
  { id: 3, name: "Maisa", age: 50, office: "chefe" },
  { id: 4, name: "Jose", age: 57, office: "chefe" },
];

const { db } = require("./src/database");
const params = {
  TableName: "employers",
};

const formatJSONResponse = (status, response) => {
  return {
    statusCode: status,
    body: JSON.stringify(response, null, 2),
  };
};

module.exports.listEmployers = async (event) => {
  try {
    const data = await db.scan(params).promise();

    return formatJSONResponse(200, data);
  } catch (error) {
    return formatJSONResponse(error.statusCode ? error.statusCode : 500, {
      error: error.message,
    });
  }
};

module.exports.getEmployer = async (event) => {
  const { id } = event.pathParameters;

  const employer = employers.find((item) => item.id === Number(id));

  if (!employer) {
    return formatJSONResponse(404, { error: "Employer not found" });
  }

  return formatJSONResponse(200, employer);
};

module.exports.createEmployer = async (event) => {
  const { name, age, office } = JSON.parse(event.body);

  if (!name || !age || !office) {
    return formatJSONResponse(400, { error: "data is required" });
  }

  const newId = employers[employers.length - 1].id + 1;

  const newEmployer = {
    id: newId,
    name,
    age,
    office,
  };

  employers.push(newEmployer);

  return formatJSONResponse(200, newEmployer);
};
