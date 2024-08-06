import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct) => {
    const response = await axios.post(
      "http://localhost:5000/products",
      newProduct
    );
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedProduct }) => {
    const response = await axios.patch(
      `http://localhost:5000/products/${id}`,
      updatedProduct
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: {
      fetch: false,
      add: false,
      update: false,
    },
    error: null,
    searchQuery: "",
    selectedProduct: "",
    selectedMaterial: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setSelectedMaterial: (state, action) => {
      state.selectedMaterial = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading.fetch = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading.fetch = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading.fetch = false;
      })
      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading.add = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload); // Add the new product to the list
        state.loading.add = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading.add = false;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.loading.update = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading.update = false;
      });
  },
});

export const { setSearchQuery, setSelectedProduct, setSelectedMaterial } =
  productSlice.actions;

export default productSlice.reducer;
