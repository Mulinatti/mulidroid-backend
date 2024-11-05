export interface IEmployeeRequest {
  id?: string;
  name: string;
  alias: string;
  birthdate: string;
  driver: boolean;
  phoneNumber: string;
}

export interface IEmployeePost extends IEmployeeRequest {
  username: string;
  email: string;
};

export interface IEmployePut extends Partial<IEmployeeRequest> {};