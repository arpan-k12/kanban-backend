import { Customers } from "../models/customer.model";
import { CustomersCreateAttributes } from "../types/models/customers.types";

export class CustomerRepository {
  static async findByEmail(c_email: string): Promise<Customers | null> {
    return Customers.findOne({ where: { c_email } });
  }
  static async createCustomer(
    data: CustomersCreateAttributes
  ): Promise<Customers | null> {
    return Customers.create(data);
  }
  static async updateCustomer(
    id: string,
    data: Partial<CustomersCreateAttributes>
  ): Promise<Customers | null> {
    const customer = await Customers.findByPk(id);
    if (!customer) {
      return null;
    }
    await customer.update(data);
    return customer;
  }
  static async deleteCustomer(id: string): Promise<Customers | null> {
    const customer = await Customers.findByPk(id);
    if (!customer) {
      return null;
    }
    await customer.destroy();
    return customer;
  }
  static async getAllCustomers(): Promise<Customers[]> {
    return Customers.findAll();
  }
  static async getCustomerById(id: string): Promise<Customers | null> {
    return Customers.findByPk(id);
  }
}
