const { db } = require("../database");

class EmployerRepository {
  async create(employer) {
    await db
      .put(
        {
          TableName: "employers",
          Item: employer,
          ReturnValues: "ALL_OLD",
        },
        (err, data) => {
          if (err) {
            throw new Error(err.message);
          }
        }
      )
      .promise();
  }
}

exports.EmployerRepository = new EmployerRepository();
