# Project Name

This project consists of a `backend` built with `json-server` and a `frontend` built with React. It includes functionality for displaying and editing a list of products with various features.

## Project Structure

- **backend**: Contains the `db.json` file for the `json-server`.
- **frontend**: Contains the React application.

## Features

### Frontend

- **Display Products**: Displays a list of products fetched from the backend.
- **Search Functionality**: Search products by name.
- **Sort Functionality**: Sort products by different fields, such as product name and price.
- **Filter Functionality**: Filter products by type and material.
- **Bulk Actions**: Apply actions to multiple selected products.
- **Add Product**: Add new products using a modal form.
- **Edit Product**: Edit product details inline.
- **Redux Integration**: Uses Redux for state management and `createAsyncThunk` for asynchronous actions.
- **Components**:
  - **App**: Main application component.
  - **AddProductModal**: Modal component for adding new products.
  - **EditForm**: Form component for editing product details.

### Backend

- **json-server**: Simple REST API to handle products data.
- **Endpoints**:
  - `GET /products`: Fetch all products.
  - `POST /products`: Add a new product.
  - `PATCH /products/:id`: Update an existing product.


## Getting Started

### Prerequisites

- Node.js installed
- Git installed

### Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/yourrepository.git
   cd yourrepository

Setup Backend:

Navigate to the backend folder and start the json-server:

```sh
npx json-server --watch db.json --port 5000
This will start the backend server at http://localhost:5000.

Setup Frontend:

Navigate to the frontend folder, install dependencies, and start the React application:


```sh
npm install
npm start
This will start the frontend server at http://localhost:3000.

## Usage
### Display Products:

Navigate to http://localhost:3000 to view the product list.
Use the sort icons to sort products by different fields.
## Search Products:

Use the search input to find products by name.
## Filter Products:

Use the dropdowns to filter products by type and material.
## Add Products:

Click the "Add Products" button to open the AddProductModal.
Fill in the details and submit the form to add a new product.
## Edit Products:

Click on the "Quick Edit" or "Add Product Details" buttons to expand the row and edit product details.
Submit the form to update the product details in the json-server.


Dependencies
- React
- Redux
- json-server
- @fortawesome/react-fontawesome (for icons)
## Styling
Custom CSS is used for styling the components. Ensure you have appropriate styles in styles.css and AddProductModal.css and EdirForm.css.
