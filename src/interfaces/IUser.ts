export interface IUser {
  id?: string;
  admin: boolean;
  employeeId: string;
  username: string;
  password: string;
}

export interface IUserRequest {
  username: string;
  password: string;
}


export interface IUserPost extends Partial<IUserRequest> {};