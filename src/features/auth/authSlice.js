import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// contoh aja, dummy
const fakeLoginAPI = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "emailEmployeeHJ@domainHJ.com" && password === "password123") {
        resolve({
          token: 'dummy-jwt-token-123',
          user: {
            email: email,
            name: "John Doe",
            role: "admin",
            department: "Security",
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
          }
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
};

// untuk login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fakeLoginAPI(email, password);
      
      // Simpan ke localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return true;
});

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
};

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;