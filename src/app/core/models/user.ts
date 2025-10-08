export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  username?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  role?: string;
  token?: string; // 'PARTNER', 'ASSOCIATE', 'PARALEGAL', 'ADMIN', 'SECRETARY'
  barNumber?: string;
  barRegistrationDate?: Date;
}

export enum UserRole {
  PARTNER = 'PARTNER',
  ASSOCIATE = 'ASSOCIATE',
  PARALEGAL = 'PARALEGAL',
  ADMIN = 'ADMIN',
  SECRETARY = 'SECRETARY',
}
