import { Mail, KeyRound, User } from 'lucide-react';

export const fields = [
    {
        id: 'name',
        label: 'Username',
        image: <User size='20' />,
    },
    {
        id: 'email',
        label: 'E-Mail',
        image: <Mail size='20' />,
        // validate: (val) => {
        //     if (!/^\S+@\S+\.\S+$/.test(val)) {
        //         return 'Incorrect email format';
        //     }
        // },
    },
    {
        type: 'password',
        id: 'password',
        label: 'Password',
        image: <KeyRound size='20' />,
    },
];