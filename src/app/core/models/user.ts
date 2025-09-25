export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  phoneNumber?: string;
  role?: string;
  token?: string; // JWT or auth token
}
