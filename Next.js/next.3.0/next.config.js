/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
    reactStrictMode: false,
    sassOptions: {
        inludePaths: [
            path.join(__dirname, 'styles'),
        ],
    },
};