"use strict";

const { db } = require("./database");
const { EmployerService } = require("./services/EmployerService");
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

  try {
    const employer = await EmployerService.findById(id);

    return formatJSONResponse(200, employer);
  } catch ({ error }) {
    return formatJSONResponse(error.statusCode ? error.statusCode : 500, {
      error: error.message,
    });
  }
};

module.exports.createEmployer = async (event) => {
  const { name, age, office } = JSON.parse(event.body);

  try {
    const newEmployer = await EmployerService.create({ name, age, office });

    return formatJSONResponse(200, newEmployer);
  } catch (error) {
    return formatJSONResponse(error.statusCode ? error.statusCode : 500, {
      error: error.message,
    });
  }
};
