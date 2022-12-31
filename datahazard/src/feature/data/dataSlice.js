import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    datavalues: {},
    selectedcols:[],
    file: [],
    graphs:{
        xaxis:[],
        yaxis:[]
    },
    showgraphs: false,
    shownewmodel: false,
}

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setfile: (state, action) => {
            state.file = action.payload;
        },
        setdatavalues: (state, action) => {
            state.datavalues = action.payload;
        },
        setselectedcols: (state, action) => {
            state.selectedcols = action.payload;
        },
        setgraphs: (state, action) => {
            state.graphs = action.payload;
        },
        setshowgraps: (state,action) => {
            state.showgraphs = action.payload;
        },
        setshownewmodel: (state, action) => {
            state.shownewmodel = action.payload;
        }
    }
})

export const { setdatavalues, setgraphs, setshowgraps,setshownewmodel, setselectedcols, setfile } = dataSlice.actions;
export default dataSlice.reducer;