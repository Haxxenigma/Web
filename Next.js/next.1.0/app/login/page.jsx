import LoginForm from '@/components/login-form';

export const metadata = {
    title: 'Login',
    description: 'Login page',
}

export default async function Login() {
    return (
        <LoginForm />
    );
}