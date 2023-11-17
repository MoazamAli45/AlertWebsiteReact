import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface OrderState {
  orders: any[]; // Define the type for orders as needed
  // Define the type for order as needed
  isLoading: boolean;
  error: string;
  remainingPages: number;
  page: number;
  message: string;
}

const initialState: OrderState = {
  orders: [],
  remainingPages: 0,
  isLoading: false,
  page: 0,
  error: '',
  message: '',
};

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async (
    data: {
      pageNo?: number;
      time?: string | null;
    },
    thunkAPI,
  ) => {
    const page = data.pageNo || 1;
    const time = data.time || '2023-11-08';
    console.log('page', page);
    console.log('time', time);
    try {
      const order = await axios.get(
        `http://74.91.123.162/api/data?Date=${time}&page=${page}`,
      );

      return { data: order.data, page };
    } catch (err) {
      const axiosError = err as AxiosError; // Explicitly cast to AxiosError
      return thunkAPI.rejectWithValue(axiosError || 'Error fetching orders');
    }
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orders = [];
      state.error = '';
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = '';
        state.message = '';
        // state.orders = [];
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.orders = payload?.data?.data && payload?.data?.data;
        state.remainingPages =
          payload?.data?.remainingPages && payload.data.remainingPages;
        state.page = payload.page;
      })
      .addCase(getOrders.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.orders = [];
        state.error = payload as string;
        state.message = 'no  data found';
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
