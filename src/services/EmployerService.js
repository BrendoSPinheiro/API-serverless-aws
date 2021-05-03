const { v4: uuid } = require("uuid");
const { EmployerRepository } = require("../repositories/EmployerRepository");

class EmployerService {
  async create({ name, age, office }) {
    if (!name || !age || !office) {
      throw new Error("Data is required");
    }

    const timestamp = new Date().getTime();

    const employer = {
      id: uuid(),
      name,
      age,
      office,
      created_at: timestamp,
      updated_at: timestamp,
    };

    await EmployerRepository.create(employer);
  }
}

exports.EmployerService = new EmployerService();
