## API Endpoints

Below are described all the API routes for each database entity

#### Users
- INDEX route: '/users' [GET] [token required]
- SHOW route: '/users/:id' [GET] [token required]
- CREATE route: '/users' [POST]
- AUTH route: '/users/auth' [POST]
- DELETE route: '/users/:id' [DELETE] [token required]
- User orders by status route: '/users/:id/orders' [GET] [token required]

#### Categories
- INDEX route: '/categories' [GET]
- SHOW route: '/categories/:id' [GET]
- CREATE route: '/categories' [POST] [token required]
- UPDATE route: '/categories/:id' [PUT] [token required]
- DELETE route: '/categories/:id' [DELETE] [token required]
  
#### Products
- INDEX route: '/products' [GET]
- SHOW route: '/products/:id' [GET]
- CREATE route: '/products' [POST] [token required]
- UPDATE route: '/products/:id' [PUT] [token required]
- DELETE route: '/products/:id' [DELETE] [token required]
- Products by category id route: '/products_by_category_id/:id' [GET]
- Top 5 most popular products route: '/top-five-popular-products' [GET]  

#### Orders
- INDEX route: '/orders' [GET] [token required]
- SHOW route: '/orders/:id' [GET] [token required]
- CREATE route: '/orders' [POST] [token required]
- UPDATE route: '/orders/:id' [PUT] [token required]
- DELETE route: '/orders/:id' [DELETE] [token required]
- Add products to order route: '/orders/:id/products' [POST] [token required] 
- Order products route: '/products_in_order/:id' [GET] [token required]

## Data Shapes
In addition to the data schemas described below, it is possible to check their types in the file `src/types/index.ts`.
#### User
- id SERIAL PRIMARY KEY
- username VARCHAR(100)
- first_name VARCHAR(100)
- last_name VARCHAR(100)
- password_digest VARCHAR

### Category
- id SERIAL PRIMARY KEY
- name VARCHAR(100)

#### Product
- id SERIAL PRIMARY KEY
- name VARCHAR(64) NOT NULL
- price INTEGER NOT NULL
- category_id bigint REFERENCES categories(id)

#### Orders
- id SERIAL PRIMARY KEY
- status VARCHAR(64)
- user_id bigint REFERENCES users(id)

