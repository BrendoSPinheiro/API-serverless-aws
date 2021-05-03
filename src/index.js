"use strict";

const { EmployerService } = require("./services/EmployerService");

const formatJSONResponse = (status, response) => {
  return {
    statusCode: status,
    body: JSON.stringify(response, null, 2),
  };
};

module.exports.listEmployers = async (event) => {
  try {
    const employers = await EmployerService.findAll();

    return formatJSONResponse(200, employers);
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
  } catch (error) {
    return formatJSONResponse(error.statusCode ? error.statusCode : 500, {
      error: error.message,
    });
  }
};

module.exports.createEmployer = async (event) => {
  const { nome, idade, cargo } = JSON.parse(event.body);

  try {
    const newEmployer = await EmployerService.create({ nome, idade, cargo });

    return formatJSONResponse(200, newEmployer);
  } catch (error) {
    return formatJSONResponse(error.statusCode ? error.statusCode : 500, {
      error: error.message,
    });
  }
};

module.exports.updateEmployer = async (event) => {
  const { id } = event.pathParameters;
  const { nome, idade, cargo } = JSON.parse(event.body);

  try {
    const updatedEmployer = await EmployerService.update(id, {
      nome,
      idade,
      cargo,
    });

    return formatJSONResponse(200, updatedEmployer);
  } catch (error) {
    return formatJSONResponse(error.statusCode ? error.statusCode : 500, {
      error: error.message,
    });
  }
};

module.exports.deleteEmployer = async (event) => {
  const { id } = event.pathParameters;

  try {
    await EmployerService.delete(id);
    return formatJSONResponse(204);
  } catch (error) {
    return formatJSONResponse(error.statusCode ? error.statusCode : 500, {
      error: error.message,
    });
  }
};
