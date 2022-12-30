import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    datavalues: {},
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
        setdatavalues: (state, action) => {
            state.datavalues = action.payload;
        },
        setgraphs: (state, action) => {
            state.graphs = action.payload;
        },
        setshowgraps: (state) => {
            state.showgraphs = true;
        },
        setshownewmodel: (state) => {
            state.shownewmodel = true;
        }
    }
})

export const { setdatavalues, setgraphs, setshowgraps,setshownewmodel } = dataSlice.actions;
export default dataSlice.reducer;