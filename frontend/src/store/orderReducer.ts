import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { API_URL } from '@/config/index';
interface OrderState {
  orders: any[]; // Define the type for orders as needed

  // Define the type for order as needed
  isLoading: boolean;
  error: string;
  remainingPages: any;
  page: number;
  message: string;
  date: string;
}

const initialState: OrderState = {
  orders: [],

  remainingPages: 0,
  isLoading: false,
  page: 0,
  error: '',
  message: '',
  date: '',
};

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async (
    data: {
      pageNo?: number | any;
      time?: string | null;
    },
    thunkAPI: any,
  ) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB');
    const page = data.pageNo || 1;
    const time = data.time || formattedDate;
    try {
      // console.log('time', time);

      const order = await axios.get(
        // `${API_URL}/api/data?date=${time}&page=${page}`,
        `https://alphasweeps-ae44af8990fe.herokuapp.com/api/data?date=${time}&page=${page}`,
      );

      // Check if the date has changed

      return {
        data: order.data,
        page,
        date: time,
      };
    } catch (err: any) {
      // console.log(err.response.data);
      // const axiosError = err as AxiosError; // Explicitly cast to AxiosError
      return thunkAPI.rejectWithValue(
        err.response.data || 'Error fetching orders',
      );
    }
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrders: (state) => {
      state.orders = [];
      state.page = 1;
      state.remainingPages = 0;
      state.isLoading = true;
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
        const newOrders = payload?.data?.data ? payload?.data?.data : [];
        const existingOrders = state.orders || [];

        // Concatenate new orders with existing orders
        state.orders = [...existingOrders, ...newOrders];
        // state.orders = payload?.data?.data && payload?.data?.data;
        // console.log('Remaining', payload, state.remainingPages);
        state.remainingPages = payload?.data?.remaining_pages;
        state.date = payload.date;
        state.page = payload.page;
      })
      .addCase(getOrders.rejected, (state, { payload }) => {
        state.isLoading = false;
        // state.orders = [];
        state.error = payload as string;
        state.message = 'no  data found';
      });
  },
});

export const { resetOrders } = orderSlice.actions;

export default orderSlice.reducer;
