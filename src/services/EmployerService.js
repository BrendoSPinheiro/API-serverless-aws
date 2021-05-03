const { v4: uuid } = require("uuid");

const { EmployerRepository } = require("../repositories/EmployerRepository");

class EmployerService {
  async findAll() {
    const employers = await EmployerRepository.findAll();

    return employers;
  }

  async findById(id) {
    const employerById = await EmployerRepository.findById(id);

    if (!employerById) {
      throw new Error("Employer not found");
    }

    return employerById;
  }

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

    try {
      await EmployerRepository.create(employer);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

exports.EmployerService = new EmployerService();
