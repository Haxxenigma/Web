const http = require('http');
const https = require('https');
const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const createMySQLConnection = require('./db');

const app = express();
const hostname = '192.168.1.93';
const httpPort = 80;
const httpsPort = 443;

const credentials = {   //sudo openssl req -x509 -days 365 -nodes -newkey rsa:4096 -keyout private.key -out certificate.crt
    key: fs.readFileSync(path.join(__dirname, 'cert', 'private.key'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'certificate.crt'), 'utf8'),
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'superSecretKey',
    cookie: { secure: true }
}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

async function formatDate(input) {
    const date = new Date(input);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function first_sentence(text) {
    const first_sentence = text.match(/^[^.!?]+[.!?]+/);
    return first_sentence ? first_sentence[0] : '';
}

app.post('/register', upload.single('userImage'), async (req, res) => {
    const connection = await createMySQLConnection();
    try {
        const { name, email, password1, password2, birthDate } = req.body;
        const userImage = req.file ? req.file.filename : null;
        const birthDate2 = birthDate ? birthDate : null;
        let errors = [];

        const [nameExists] = await connection.query('SELECT * FROM users WHERE name = ?', [name]);
        if (nameExists && nameExists.length > 0) {
            errors.push('User with this name already exists');
        }
        const [emailExists] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (emailExists && emailExists.length > 0) {
            errors.push('User with this email already exists');
        }
        if (password1 !== password2) {
            errors.push(`The passwords don't match`);
        }
        if (errors.length > 0) {
            const data = {
                title: 'Register',
                user: req.session.user,
                userImage: req.session.userImage,
                errors: errors,
            };
            return res.render('register', data);
        }
        const hashedPass = await bcrypt.hash(password1, 10);
        await connection.query(
            'INSERT INTO users(name, email, password, birth_date, user_image) VALUES(?, ?, ?, ?, ?)',
            [name, email, hashedPass, birthDate2, userImage]
        );
        if (req.session.user !== 'admin') {
            req.session.user = name;
            req.session.userImage = userImage;
        }
        return res.redirect(`/users/${name}`);
    } catch (err) {
        return console.error(`\n[-] Errors during registration: ${err}\n`);
    } finally {
        connection.end();
    }
});

app.post('/login', async (req, res) => {
    const connection = await createMySQLConnection();
    try {
        const { name, password } = req.body;
        let errors = [];

        const result = await connection.query('SELECT * FROM users WHERE name = ?', [name]);
        if (result[0][0]) {
            var passMatches = await bcrypt.compare(password, result[0][0].password);
            var userImage = result[0][0].user_image;
        }
        if (!passMatches) {
            errors.push('Wrong name or password');
            const data = {
                title: 'Log In',
                user: req.session.user,
                userImage: req.session.userImage,
                errors: errors,
            };
            return res.render('login', data);
        }
        req.session.user = name;
        req.session.userImage = userImage;
        return res.redirect(`/users/${name}`);
    } catch (err) {
        return console.error(`\n[-] Errors during log in: ${err}\n`);
    } finally {
        connection.end();
    }
});

app.post('/users/:profile/edit', upload.single('userImage'), async (req, res) => {
    const connection = await createMySQLConnection();
    try {
        const { name, email, birthDate, clearUserImage } = req.body;
        const profile = req.params.profile;
        const isChecked = clearUserImage === 'on';
        const birthDate2 = birthDate ? birthDate : null;
        let userImage = req.file ? req.file.filename : null;
        let errors = [];

        const result = await connection.query('SELECT * FROM users WHERE name = ?', [profile]);
        const [nameExists] = await connection.query('SELECT * FROM users WHERE name = ? AND NOT name = ?', [name, result[0][0].name]);
        if (nameExists && nameExists.length > 0) {
            errors.push('User with this name already exists');
        }
        const [emailExists] = await connection.query('SELECT * FROM users WHERE email = ? AND NOT name = ?', [email, result[0][0].name]);
        if (emailExists && emailExists.length > 0) {
            errors.push('User with this email already exists');
        }
        if (isChecked && userImage) {
            errors.push('Please choose to either upload a new image or delete the current one, not both');
            if (fs.existsSync(`${__dirname}/public/uploads/${userImage}`)) {
                fs.unlink(`${__dirname}/public/uploads/${userImage}`, (err) => {
                    if (err) {
                        console.error(`Error during deleting file: ${err}`);
                    }
                });
            }
        }
        const filePath = `${__dirname}/public/uploads/${result[0][0].user_image}`;
        result[0][0].birth_date = result[0][0].birth_date ? await formatDate(result[0][0].birth_date) : null;
        if (errors.length > 0) {
            const data = {
                title: 'Edit profile',
                user: req.session.user,
                userImage: req.session.userImage,
                profile: result[0][0],
                errors: errors,
            };
            return res.render('edit', data);
        } else {
            const deleteImage = (filePath) => {
                if (fs.existsSync(filePath)) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(`Error during deleting file: ${err}`);
                        }
                    });
                }
            };
            if (userImage) {
                deleteImage(filePath);
            } else {
                if (isChecked) {
                    deleteImage(filePath);
                    userImage = null;
                } else {
                    userImage = result[0][0].user_image;
                }
            }
            await connection.query(
                'UPDATE users SET name = ?, email = ?, birth_date = ?, user_image = ? WHERE name = ?',
                [name, email, birthDate2, userImage, profile]
            );
            if (profile === req.session.user) {
                req.session.user = name;
                req.session.userImage = userImage;
            }
            return res.redirect(`/users/${name}`);
        }
    } catch (err) {
        console.error(`\n[-] Errors during editing: ${err}\n`);
    } finally {
        connection.end();
    }
});

app.post('/users/:profile/chpasswd', async (req, res) => {
    const connection = await createMySQLConnection();
    try {
        const { password0, password1, password2 } = req.body;
        const profile = req.params.profile;
        let errors = [];

        const result = await connection.query('SELECT password FROM users WHERE name = ?', [profile]);
        var passMatches = await bcrypt.compare(password0, result[0][0].password);
        if (passMatches) {
            if (password1 === password2) {
                const hashedPass = await bcrypt.hash(password1, 10);
                await connection.query('UPDATE users SET password = ? WHERE name = ?', [hashedPass, profile]);
                return res.redirect(`/users/${profile}`);
            } else {
                errors.push(`The passwords don't match`);
            }
        } else {
            errors.push('Incorrect password');
        }
        const data = {
            title: 'Change password',
            user: req.session.user,
            userImage: req.session.userImage,
            profile: profile,
            errors: errors,
        };
        return res.render('chpasswd', data);
    } catch (err) {
        console.error(`\n[-] Errors while changing passwd: ${err}\n`);
    } finally {
        connection.end();
    }
});

app.post('/article/create', upload.single('thumbnail'), async (req, res) => {
    const connection = await createMySQLConnection();
    try {
        const { title, content } = req.body;
        const thumbnail = req.file ? req.file.filename : null;
        const author = req.session.user;

        const result = await connection.query(
            'INSERT INTO articles(title, author, thumbnail, content) VALUES(?, ?, ?, ?)',
            [title, author, thumbnail, content]
        );
        const id = result[0].insertId;
        return res.redirect(`/article/${id}`);
    } catch (err) {
        console.error(`\n[-] Errors during creating an article: ${err}\n`);
    } finally {
        connection.end();
    }
});

app.post('/article/:id/edit', upload.single('thumbnail'), async (req, res) => {
    const connection = await createMySQLConnection();
    try {
        const { title, content, clearThumbnail } = req.body;
        const id = req.params.id;
        const isChecked = clearThumbnail === 'on';
        let thumbnail = req.file ? req.file.filename : null;
        let errors = [];

        const [article] = await connection.query('SELECT * FROM articles WHERE id = ?', [id]);
        if (isChecked && thumbnail) {
            errors.push('Please choose to either upload a new image or delete the current one, not both');
            if (fs.existsSync(`${__dirname}/public/uploads/${thumbnail}`)) {
                fs.unlink(`${__dirname}/public/uploads/${thumbnail}`, (err) => {
                    if (err) {
                        console.error(`Error during deleting file: ${err}`);
                    }
                });
            }
        }
        if (errors.length > 0) {
            const data = {
                title: `Edit an article '${article[0].title}'`,
                user: req.session.user,
                userImage: req.session.userImage,
                article: article[0],
                errors: errors,
            };
            return res.render('article_edit', data);
        }
        const deleteImage = (filePath) => {
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Error during deleting file: ${err}`);
                    }
                });
            }
        };
        const filePath = `${__dirname}/public/uploads/${article[0].thumbnail}`;
        if (thumbnail) {
            deleteImage(filePath);
        } else {
            if (isChecked) {
                deleteImage(filePath);
                thumbnail = null;
            } else {
                thumbnail = article[0].thumbnail;
            }
        }
        await connection.query(
            'UPDATE articles SET title = ?, thumbnail = ?, content = ? WHERE id = ?',
            [title, thumbnail, content, id]
        );
        return res.redirect(`/article/${id}`);
    } catch (err) {
        console.error(`\n[-] Errors during editing an article: ${err}\n`);
    } finally {
        connection.end();
    }
});

app.post('/article/:id/delete', async (req, res) => {
    const connection = await createMySQLConnection();
    try {
        const id = req.params.id;
        const [article] = await connection.query('SELECT * FROM articles WHERE id = ?', [id]);
        const filePath = `${__dirname}/public/uploads/${article[0].thumbnail}`;
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error during deleting file: ${err}`);
                }
            });
        }
        await connection.query('DELETE FROM articles WHERE id = ?', [id]);
        return res.redirect(`/`);
    } catch (err) {
        console.error(`\n[-] Errors while deleting an article: ${err}\n`);
    } finally {
        connection.end();
    }
});


app.get('/users/admin/cab', async (req, res) => {
    const connection = await createMySQLConnection();
    try {
        const tablesArray = await connection.query('SHOW TABLES');
        const users = await connection.query('SELECT * FROM users');
        const articles = await connection.query('SELECT * FROM articles');
        const tables = tablesArray[0].map(table => table.Tables_in_nodejs);

        if (req.session.user !== 'admin') {
            return res.redirect('/forbidden');
        }
        for (const user of users[0]) {
            user.birth_date = user.birth_date ? await formatDate(user.birth_date) : null;
            user.created_at = user.created_at ? await formatDate(user.created_at) : null;
            user.updated_at = user.updated_at ? await formatDate(user.updated_at) : null;
        }
        for (const article of articles[0]) {
            article.created_at = article.created_at ? await formatDate(article.created_at) : null;
            article.updated_at = article.updated_at ? await formatDate(article.updated_at) : null;
        }
        const data = {
            title: 'Admin page',
            user: req.session.user,
            userImage: req.session.userImage,
            tables: tables,
            users: users[0],
            articles: articles[0],
        };
        return res.render('admin', data);
    } catch (err) {
        console.error(`\n[-] Errors while rendering an admin page: ${err}\n`);
    } finally {
        connection.end();
    }
});

app.get('/', async (req, res) => {
    const connection = await createMySQLConnection();
    try {
        const data = {
            title: 'Home',
            user: req.session.user,
            userImage: req.session.userImage,
        };
        return res.render('home', data);

    } catch (err) {
        console.error(`\n[-] Errors while rendering a home page: ${err}\n`);
    } finally {
        connection.end();
    }
})

app.get('/blog', async (req, res) => {
    const connection = await createMySQLConnection();
    try {
        const articles = await connection.query(
            'SELECT articles.*, users.user_image AS author_image FROM articles ' +
            'JOIN users ON articles.author = users.name',
        );
        for (const article of articles[0]) {
            article.created_at = await formatDate(article.created_at);
            article.content = first_sentence(article.content);
            // article.content = article.content.length > 300 ? article.content.slice(0, 300) : article.content;
            // article.content += '...';
        }
        const data = {
            title: 'Blog',
            user: req.session.user,
            userImage: req.session.userImage,
            articles: articles[0],
        };
        return res.render('blog', data);
    } catch (err) {
        console.error(`\n[-] Errors while rendering an index page: ${err}\n`);
    } finally {
        connection.end();
    }
});

app.get('/search', async (req, res) => {
    const connection = await createMySQLConnection();
    try {
        const q = req.query.q.toLowerCase();
        const articles = await connection.query(
            'SELECT articles.*, users.user_image AS author_image FROM articles ' +
            'JOIN users ON articles.author = users.name',
        );
        const filteredArticles = articles[0].filter(article =>
            article.title.toLowerCase().includes(q) ||
            article.content.toLowerCase().includes(q));
        for (const article of articles[0]) {
            article.created_at = await formatDate(article.created_at);
            article.content = first_sentence(article.content);
        }
        const data = {
            title: 'Blog',
            user: req.session.user,
            userImage: req.session.userImage,
            articles: filteredArticles,
        };
        return res.render('blog', data);
    } catch (err) {
        console.error(`\n[-] Errors while getting search query results: ${err}\n`);
    } finally {
        connection.end();
    }
})

app.get('/register', (req, res) => {
    const data = {
        title: 'Register',
        user: req.session.user,
        userImage: req.session.userImage,
        errors: [],
    };
    return res.render('register', data);
});

app.get('/login', (req, res) => {
    const data = {
        title: 'Log In',
        user: req.session.user,
        userImage: req.session.userImage,
        errors: [],
    };
    return res.render('login', data);
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.error(`\n[-] Errors during log out: ${err}\n`);
        }
        res.clearCookie('connect.sid');
        return res.redirect('/login');
    });
});

app.get('/users/:profile', async (req, res, next) => {
    const connection = await createMySQLConnection();
    try {
        const profile = req.params.profile;
        const result = await connection.query('SELECT * FROM users WHERE name = ?', [profile]);
        const articles = await connection.query(
            'SELECT articles.*, users.user_image AS author_image FROM articles ' +
            'JOIN users ON articles.author = users.name ' +
            'WHERE author = ?',
            [profile]
        );
        for (const article of articles[0]) {
            article.created_at = await formatDate(article.created_at);
            article.content = first_sentence(article.content);
        }
        if (result[0][0]) {
            result[0][0].birth_date = result[0][0].birth_date ? await formatDate(result[0][0].birth_date) : null;
            const data = {
                title: 'Profile',
                user: req.session.user,
                userImage: req.session.userImage,
                profile: result[0][0],
                articles: articles[0],
            };
            return res.render('profile', data);
        } else {
            next();
        }
    } catch (err) {
        console.error(`\n[-] Errors during profiling: ${err}\n`);
    } finally {
        connection.end();
    }
});

app.get('/users/:profile/edit', async (req, res) => {
    connection = await createMySQLConnection();
    try {
        const profile = req.params.profile;
        const result = await connection.query('SELECT * FROM users WHERE name = ?', [profile]);
        if (req.session.user !== profile && req.session.user !== 'admin') {
            return res.redirect('/forbidden');
        }
        result[0][0].birth_date = result[0][0].birth_date ? await formatDate(result[0][0].birth_date) : null;
        const data = {
            title: 'Edit profile',
            user: req.session.user,
            userImage: req.session.userImage,
            profile: result[0][0],
            errors: [],
        };
        return res.render('edit', data);
    } catch (err) {
        console.error(`\n[-] Errors during getting page for editing: ${err}\n`);
    } finally {
        connection.end();
    }
});

app.get('/users/:profile/chpasswd', (req, res) => {
    const profile = req.params.profile;
    if (req.session.user !== profile && req.session.user !== 'admin') {
        return res.redirect('/forbidden');
    }
    const data = {
        title: 'Change password',
        user: req.session.user,
        userImage: req.session.userImage,
        profile: profile,
        errors: [],
    };
    return res.render('chpasswd', data);
});

app.get('/article/create', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const data = {
        title: 'Create an article',
        user: req.session.user,
        userImage: req.session.userImage,
    };
    return res.render('article_create', data);
});

app.get('/article/:id', async (req, res, next) => {
    const connection = await createMySQLConnection();
    try {
        const id = req.params.id;
        const [article] = await connection.query('SELECT * FROM articles WHERE id = ?', [id]);
        if (article[0]) {
            const [user] = await connection.query('SELECT * FROM users WHERE name = ?', [article[0].author]);
            article[0].created_at = await formatDate(article[0].created_at);
            const data = {
                title: `Article '${article[0].title}'`,
                user: req.session.user,
                userImage: req.session.userImage,
                article: article[0],
                articleAuthorImage: user[0].user_image,
            };
            return res.render('article', data);
        } else {
            next();
        }
    } catch (err) {
        console.error(`\n[-] Errors during rendering article: ${err}\n`);
    } finally {
        connection.end();
    }
});

app.get('/article/:id/edit', async (req, res) => {
    const connection = await createMySQLConnection();
    try {
        const id = req.params.id;
        const [article] = await connection.query('SELECT * FROM articles WHERE id = ?', [id]);
        if (article[0]) {
            if (article[0].author !== req.session.user && 'admin' !== req.session.user) {
                return res.redirect('/forbidden');
            }
            const data = {
                title: `Edit an article '${article[0].title}'`,
                user: req.session.user,
                userImage: req.session.userImage,
                article: article[0],
                errors: [],
            };
            return res.render('article_edit', data);
        } else {
            next();
        }
    } catch (err) {
        console.error(`\n[-] Errors during getting page for editing an article: ${err}\n`);
    } finally {
        connection.end();
    }
});

app.get('/article/:id/delete', async (req, res) => {
    const connection = await createMySQLConnection();
    try {
        const id = req.params.id;
        const [article] = await connection.query('SELECT * FROM articles WHERE id = ?', [id]);
        if (article[0]) {
            if (article[0].author !== req.session.user && 'admin' !== req.session.user) {
                return res.redirect('/forbidden');
            }
            const data = {
                title: `Delete an article '${article[0].title}'`,
                user: req.session.user,
                userImage: req.session.userImage,
                article: article[0],
            };
            return res.render('article_delete', data);
        } else {
            next();
        }
    } catch (err) {
        console.error(`\n[-] Errors during getting page for deleting an article: ${err}\n`);
    } finally {
        connection.end();
    }
})

app.get('/forbidden', (req, res) => {
    const data = {
        title: 'Forbidden',
        user: req.session.user,
        userImage: req.session.userImage,
    };
    return res.render('forbidden', data);
});

app.use((req, res) => {
    const data = {
        title: 'Not Found',
        user: req.session.user,
        userImage: req.session.userImage,
    };
    return res.render('notfound', data);
});


const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
});

const httpsServer = https.createServer(credentials, app);


httpServer.listen(httpPort, hostname);

httpsServer.listen(httpsPort, hostname, () => {     //node index.js
    console.log(`HTTPS Server is running at https://${hostname}:${httpsPort}/`);
});