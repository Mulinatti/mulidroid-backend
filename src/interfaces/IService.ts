interface IServiceRequest {
  id?: string;
  address: string;
  neighborhood: string;
  serviceDate: string;
  value: number;
  vehicle: string;
  employees: string[];
  phoneNumber: string;
}

export interface IServicePost extends IServiceRequest {}

export interface IServicePut extends Partial<IServiceRequest> {}
