import bycryptjs from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        phone: '1234567890',
        password: bycryptjs.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Vijay',
        email: 'vijay@gmail.com',
        phone: '1234567890',
        password: bycryptjs.hashSync('123456', 10),
    },
    {
        name: 'Kumar',
        email: 'kumar@gmail.com',
        phone: '1234567890',
        password: bycryptjs.hashSync('123456', 10),
    },
];

export default users;