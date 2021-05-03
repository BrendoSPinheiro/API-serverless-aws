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

  async create({ nome, idade, cargo }) {
    if (!nome || !idade || !cargo) {
      throw new Error("Data is required");
    }

    const timestamp = new Date().getTime();

    const employer = {
      id: uuid(),
      nome,
      idade,
      cargo,
      created_at: timestamp,
      updated_at: timestamp,
    };

    try {
      await EmployerRepository.create(employer);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id, { nome, idade, cargo }) {
    if (!nome || !idade || !cargo) {
      throw new Error("Data is required");
    }

    const employerExists = await EmployerRepository.findById(id);

    if (!employerExists) {
      throw new Error("Employer not found");
    }

    const updatedEmployer = await EmployerRepository.update(id, {
      nome,
      idade,
      cargo,
    });

    return updatedEmployer;
  }

  async delete(id) {
    const employerExists = await EmployerRepository.findById(id);

    if (!employerExists) {
      throw new Error("Employer not found");
    }

    await EmployerRepository.delete(id);
  }
}

exports.EmployerService = new EmployerService();
