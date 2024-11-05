export interface IUserRequest {
  id?: string;
  username: string;
  password: string;
}

export interface IUserPost extends IUserRequest {};

export interface IUserPut extends Partial<IUserRequest> {};