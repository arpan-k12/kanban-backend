import { Customers } from "../models/customer.model";
import { CustomersCreateAttributes } from "../types/models/customers.types";

export class CustomerRepository {
  static async createCustomer(
    data: CustomersCreateAttributes
  ): Promise<Customers | null> {
    return Customers.create(data);
  }
}
