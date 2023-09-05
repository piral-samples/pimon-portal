export interface User {
  id: string;
  username: string;
  roles: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface UserCreate {
  password: string;
  username: string;
  roles: Array<string>;
}

export interface UserUpdate {
  roles: Array<string>;
}
