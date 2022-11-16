## 1. Validate user input to limit SQL injections and XSS attacks

Let’s start with one of the most popular attacks, the SQL Injection. As the name suggests, a SQL injection attack happens when a hacker is able to execute SQL statements on your database. This becomes possible when you don’t sanitize the input from the frontend. In other words, if your Node.js backend takes the parameter from the user-provided data and uses it directly as a part of the SQL statement. For example:

```bash
  connection.query('SELECT * FROM orders WHERE id = ' + id, function (error, results, fields) {
    if (error) throw error;
    // ...
  });
```

The above query is SQL injection vulnerable. Why? Because the id parameter is taken directly from the frontend. Instead of sending just the id, the attacker can manipulate the request and send SQL commands with it. Instead of sending just 4564 (the id of the order), the attacker can send 4564; DROP TABLE ORDERS; and Node.js will wipe your database. Bummer!

How do you avoid that? There are a few ways, but the basic idea is to not blindly pass parameters from the frontend to the database query. Instead, you need to validate or escape values provided by the user. How to do it exactly depends on the database you use and the way you prefer to do it. Some database libraries for Node.js perform escaping automatically (for example node-mysql and mongoose). But you can also use more generic libraries (like Sequelize)[https://sequelize.org/] or knex.

## 2. XSS attacks

Cross-Site Scripting (XSS) attacks work similarly to SQL injections. The difference is that instead of sending malicious SQL, the attacker is able to execute JavaScript code. The reason for that is the same as before, not validating input from the user.

```bash
  app.get('/find_product', (req, res) => {
    ...
    if (products.length === 0) {
      return res.send('<p>No products found for "' + req.query.product + '"</p>');
    }
    ...
  });
```

As you can see in the snippet above, whatever the user puts in the search field, if not found in the database, will be sent back to the user in an unchanged form. What that means is that if an attacker puts JavaScript code instead of the product name in your search bar, the same JavaScript code will be executed.

How do you fix that? Again, validate the user input! You can use (validatorjs)[https://github.com/mikeerickson/validatorjs] or (xss-filters)[https://www.npmjs.com/package/xss-filters] for that.

## 3. Implement strong authentication

Having a broken, weak, or incomplete authentication mechanism is ranked as the second most common vulnerability. It’s probably due to the fact that many developers think about authentication as “we have it, so we’re secure.” In reality, weak or inconsistent authentication is easy to bypass. One solution is to use existing authentication solutions like Okta or OAuth.

If you prefer to stick with native Node.js authentication solutions, you need to remember a few things. When creating passwords, don’t use the Node.js built-in crypto library; use Bcrypt or Scrypt. Make sure to limit failed login attempts, and don’t tell the user if it’s the username or password that is incorrect. Instead, return a generic “incorrect credentials” error. You also need proper session management policies. And be sure to implement 2FA authentication. If done properly, it can increase the security of your application drastically. You can do it with modules like node-2fa or speakeasy.

(Read more)[https://blog.sqreen.com/nodejs-security-best-practices/].