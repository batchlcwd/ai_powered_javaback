# MyBasket REST API Documentation

Base URL: `http://localhost:8080/api/v1`

## Authentication Module

### Register User

**POST** `/auth/register`

- **Description**: Register a new user account.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "phone": "+1234567890",
    "address": "123 Grocery Lane, Market City"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "userId": "user_123",
    "message": "User registered successfully"
  }
  ```

### Login

**POST** `/auth/login`

- **Description**: Authenticate user and receive a JWT token.
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1...",
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "role": "CUSTOMER"
    }
  }
  ```

---

## Products Module

### Get All Products

**GET** `/products`

- **Description**: Retrieve a paginated list of products.
- **Query Params**:
  - `page` (default: 0)
  - `size` (default: 10)
  - `sortBy` (default: name)
  - `categoryId` (optional filter)
- **Response** (200 OK):
  ```json
  {
    "content": [
      {
        "productId": "prod_001",
        "name": "Fresh Organic Apples",
        "description": "Crisp and sweet apples from local farms.",
        "price": 2.99,
        "stockQuantity": 100,
        "category": "Fruits",
        "imageUrl": "http://localhost:8080/products/prod_001/image"
      }
    ],
    "totalPages": 5,
    "totalElements": 50
  }
  ```

### Get Product by ID

**GET** `/products/{productId}`

- **Description**: Get details of a single product.
- **Response** (200 OK):
  ```json
  {
    "productId": "prod_001",
    "name": "Fresh Organic Apples",
    "price": 2.99,
    "isAvailable": true
  }
  ```

### Create Product (Admin)

**POST** `/products`

- **Description**: Add a new grocery item.
- **Request Body**:
  ```json
  {
    "name": "Whole Wheat Bread",
    "description": "Freshly baked whole grain bread.",
    "price": 3.49,
    "stockQuantity": 50,
    "categoryId": "cat_bakery"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "productId": "prod_002",
    "message": "Product created successfully"
  }
  ```

### Upload Product Image

**POST** `/products/{productId}/image`

- **Description**: Upload an image for a specific product.
- **Content-Type**: `multipart/form-data`
- **Form Data**:
  - `productImage`: (File)
- **Response** (200 OK):
  ```json
  {
    "message": "Image uploaded successfully",
    "imageUrl": "http://localhost:8080/products/prod_001/image"
  }
  ```

### Serve Product Image

**GET** `/products/{productId}/image`

- **Description**: Serve the image file for the product.
- **Response**: Image binary (image/jpeg, image/png).

---

## Categories Module

### Get All Categories

**GET** `/categories`

- **Description**: List all product categories (e.g., Fruits, Vegetables, Dairy).
- **Response** (200 OK):
  ```json
  [
    { "categoryId": "cat_fruits", "title": "Fruits" },
    { "categoryId": "cat_veg", "title": "Vegetables" }
  ]
  ```

---

## Cart Module

### Get Cart

**GET** `/cart`

- **Description**: Get current user's shopping cart.
- **Response** (200 OK):
  ```json
  {
    "cartId": "cart_user_123",
    "items": [
      {
        "productId": "prod_001",
        "productName": "Apples",
        "quantity": 2,
        "subTotal": 5.98
      }
    ],
    "totalAmount": 5.98
  }
  ```

### Add Item to Cart

**POST** `/cart/items`

- **Request Body**:
  ```json
  {
    "productId": "prod_001",
    "quantity": 2
  }
  ```

### Remove Item from Cart

**DELETE** `/cart/items/{productId}`

---

## Orders Module

### Place Order

**POST** `/orders`

- **Description**: Convert active cart into an order.
- **Request Body**:
  ```json
  {
    "shippingAddress": "123 Main St, Springfield",
    "paymentMethod": "CREDIT_CARD"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "orderId": "ord_999",
    "status": "PENDING",
    "totalAmount": 5.98
  }
  ```

### Get User Orders

**GET** `/orders/user/{userId}`

- **Description**: History of user's orders.
- **Response** (200 OK):
  ```json
  [
    {
      "orderId": "ord_999",
      "date": "2024-01-29T10:00:00Z",
      "status": "DELIVERED",
      "totalAmount": 15.5
    }
  ]
  ```
