const { db } = require("../database");

class EmployerRepository {
  async findById(id) {
    const { Item } = await db
      .get({
        TableName: "employers",
        Key: {
          id,
        },
      })
      .promise();

    return Item;
  }

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
