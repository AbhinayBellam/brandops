// types/authTypes.ts
export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

// 👇 Add for Register
export interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: 'franchisor' | 'franchisee' | 'customer' | '';
}

export interface RegisterErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}
