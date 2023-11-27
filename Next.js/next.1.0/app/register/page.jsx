import RegisterForm from '@/components/register-form';

export const metadata = {
    title: 'Register',
    description: 'Register page',
}

export default async function Register() {
    return (
        <RegisterForm />
    );
}