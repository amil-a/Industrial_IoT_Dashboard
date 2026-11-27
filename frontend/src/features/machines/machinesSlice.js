import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getMachines,
  getMachineById,
  updateMachineStatus as patchMachineStatus,
} from "../../api/machineApi";

function extractErrorMessage(error, fallback) {
  return error?.response?.data?.error || error?.message || fallback;
}

export const fetchMachines = createAsyncThunk(
  "machines/fetchMachines",
  async (_, { rejectWithValue }) => {
    try {
      return await getMachines();
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Failed to fetch machines."));
    }
  }
);

export const fetchMachineById = createAsyncThunk(
  "machines/fetchMachineById",
  async (id, { rejectWithValue }) => {
    try {
      return await getMachineById(id);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Failed to fetch machine details."));
    }
  }
);

export const updateMachineStatus = createAsyncThunk(
  "machines/updateMachineStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await patchMachineStatus(id, status);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Failed to update machine status."));
    }
  }
);

const initialState = {
  machines: [],
  selectedMachine: null,
  loading: false,
  error: null,
  updating: false,
  updateError: null,
};

const machinesSlice = createSlice({
  name: "machines",
  initialState,
  reducers: {
    selectMachine: (state, action) => {
      state.selectedMachine = action.payload;
      state.updateError = null;
    },
    clearSelectedMachine: (state) => {
      state.selectedMachine = null;
      state.updateError = null;
    },
    clearUpdateError: (state) => {
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMachines
      .addCase(fetchMachines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMachines.fulfilled, (state, action) => {
        state.loading = false;
        state.machines = action.payload;
      })
      .addCase(fetchMachines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // fetchMachineById
      .addCase(fetchMachineById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMachineById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMachine = action.payload;
      })
      .addCase(fetchMachineById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // updateMachineStatus
      .addCase(updateMachineStatus.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateMachineStatus.fulfilled, (state, action) => {
        state.updating = false;
        const updatedMachine = action.payload;

        const index = state.machines.findIndex((m) => m.id === updatedMachine.id);
        if (index !== -1) {
          state.machines[index] = updatedMachine;
        }

        if (state.selectedMachine && state.selectedMachine.id === updatedMachine.id) {
          state.selectedMachine = updatedMachine;
        }
      })
      .addCase(updateMachineStatus.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload || action.error.message;
      });
  },
});

export const { selectMachine, clearSelectedMachine, clearUpdateError } =
  machinesSlice.actions;

export default machinesSlice.reducer;
