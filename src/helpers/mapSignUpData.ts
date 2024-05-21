import { CreateUserDTO, RegistrationFormData } from '@/utils/interfaces';

export const mapSignUpData = (formData: RegistrationFormData): CreateUserDTO => ({
    first_name: formData.firstName || '',
    second_name: formData.secondName || '',
    login: formData.login || '',
    email: formData.email || '',
    password: formData.password || '',
    phone: formData.phone || '',
  });
