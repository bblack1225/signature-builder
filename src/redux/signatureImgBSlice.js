import { createSlice } from "@reduxjs/toolkit";
import { InfoType } from "../constants/InfoType";

const initialState = {
  typeBCol: [
    {
      id: 1,
      type: InfoType.NORMAL,
      columnName: '姓名',
      img: '',
      icon: InfoType.NORMAL.icon,
      value:null,
    },
    {
      id: 2,
      type: InfoType.NORMAL,
      columnName: '職稱',
      img: '',
      icon: InfoType.NORMAL.icon,
      value: null,
    },
    {
      id: 3,
      type: InfoType.PHONE,
      columnName: '手機',
      img: '',
      icon: InfoType.PHONE.icon,
      value: null,
    },
    {
      id: 4,
      type: InfoType.PHONE,
      columnName: '公司電話',
      img: '',
      icon: InfoType.PHONE.icon,
      value: null,
    },
    {
      id: 5,
      type: InfoType.EMAIL,
      columnName: 'Email',
      img: '',
      icon: InfoType.EMAIL.icon,
      value: null,
    },
    {
      id: 6,
      type: InfoType.WEBSITE,
      columnName: '公司官網',
      img: '',
      icon: InfoType.WEBSITE.icon,
      value: null,
    },
  ],
  typeCCol: [
  {
    id: 1,
    type: InfoType.NORMAL,
    columnName: '姓名',
    img: '',
    icon: InfoType.NORMAL.icon,
  },
  {
    id: 2,
    type: InfoType.NORMAL,
    columnName: '職稱',
    img: '',
    icon: InfoType.NORMAL.icon,
  },
  {
    id: 3,
    type: InfoType.PHONE,
    columnName: '手機',
    img: '',
    icon: InfoType.PHONE.icon,
  },
  {
    id: 4,
    type: InfoType.PHONE,
    columnName: '公司電話',
    img: '',
    icon: InfoType.PHONE.icon,
  },
  {
    id: 5,
    type: InfoType.EMAIL,
    columnName: 'Email',
    img: '',
    icon: InfoType.EMAIL.icon,
  }
]
};

export const signatureImgBSlice = createSlice({
  name: 'signatureImg',
  initialState,
  reducers: {
    insertColumn: (state, action) => {
      const { type, form } = action.payload;
      if (type === 'typeB'){
        state.typeBCol = state.typeBCol.concat(form);
      } else {
        state.typeCCol = state.typeCCol.concat(form)
      }
    }, 
    deleteColumn: (state, action) => {
      const { id, type } = action.payload;
    console.log('action', action);      
      if(type === 'typeB'){
        state.typeBCol = state.typeBCol.filter((col) => col.id !== id);
      }else {
        state.typeCCol = state.typeCCol.filter(col => col.id !== id);
      }
      
    }, 
    updateColumn: (state, action) => {
      const { type, form } = action.payload;
      if(type === 'typeB'){
        const index = state.typeBCol.findIndex((col) => col.id === form.id);
        state.typeBCol[index] = {
          ...state.typeBCol[index],
          ...form,
        };
      }else {
        const index = state.typeCCol.findIndex((col) => col.id === form.id);
        state.typeBCol[index] = {
          ...state.typeBCol[index],
          ...form,
        };
      }
    },
  }
});

export const { insertColumn, deleteColumn, updateColumn } = signatureImgBSlice.actions;

export default signatureImgBSlice.reducer;