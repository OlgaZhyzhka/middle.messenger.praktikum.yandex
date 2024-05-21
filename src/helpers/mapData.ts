import { CreateUserDTO, RegistrationFormData, UpdateProfileData, UpdateUserDTO } from '@/utils/interfaces';

export const mapSignUpData = (formData: RegistrationFormData): CreateUserDTO => ({
    first_name: formData.firstName || '',
    second_name: formData.secondName || '',
    login: formData.login || '',
    email: formData.email || '',
    password: formData.password || '',
    phone: formData.phone || '',
  });

  export const mapUserProfileData = (formData: UpdateProfileData): UpdateUserDTO => ({
    first_name: formData.firstName || '',
    second_name: formData.secondName || '',
    display_name: formData.chatName || '',
    login: formData.login || '',
    email: formData.email || '',
    phone: formData.phone || '',
  });