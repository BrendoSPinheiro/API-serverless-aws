const { db } = require("../database");

class EmployerRepository {
  async findAll() {
    const { Items } = await db
      .scan({
        TableName: "employers",
      })
      .promise();

    return Items;
  }

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

  async update(id, { nome, idade, cargo }) {
    const timestamp = new Date().getTime();

    try {
      const updatedEmployer = await db
        .update({
          TableName: "employers",
          Key: {
            id,
          },
          UpdateExpression:
            "SET nome = :nome, idade = :idade, cargo = :cargo," +
            "updated_at = :updated_at",
          ConditionExpression: "attribute_exists(id)",
          ExpressionAttributeValues: {
            ":nome": nome,
            ":idade": idade,
            ":cargo": cargo,
            ":updated_at": timestamp,
          },
          ReturnValues: "ALL_NEW",
        })
        .promise();
      return updatedEmployer;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(id) {
    try {
      await db
        .delete({
          TableName: "employers",
          Key: {
            id,
          },
          ConditionExpression: "attribute_exists(id)",
        })
        .promise();
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

exports.EmployerRepository = new EmployerRepository();
