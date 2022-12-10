import { createSlice } from '@reduxjs/toolkit';
import { InfoType } from '../constants/InfoType';

const initialState = {
  typeBCol: [
    {
      id: 1,
      type: InfoType.NORMAL,
      columnName: '姓名',
      img: '',
      icon: InfoType.NORMAL.icon,
      value: null,
      isDisabled: true,
    },
    {
      id: 2,
      type: InfoType.NORMAL,
      columnName: '職稱',
      img: '',
      icon: InfoType.NORMAL.icon,
      value: null,
      isDisabled: true,
    },
    {
      id: 3,
      type: InfoType.PHONE,
      columnName: '手機',
      img: '',
      icon: InfoType.MOBILE_PHONE.icon,
      value: null,
      isDisabled: false,
    },
    {
      id: 4,
      type: InfoType.PHONE,
      columnName: '市話',
      img: '',
      icon: InfoType.TELEPHONE.icon,
      value: null,
      isDisabled: false,
    },
    {
      id: 5,
      type: InfoType.EMAIL,
      columnName: 'Email',
      img: '',
      icon: InfoType.EMAIL.icon,
      value: null,
      isDisabled: false,
    },
    {
      //big size: https://i.imgur.com/sEi6t0z.png
      //small size: https://i.imgur.com/hJqk4is.png
      id: 6,
      type: InfoType.WEBSITE,
      columnName: '官網連結',
      img: 'https://i.imgur.com/sEi6t0z.png',
      icon: InfoType.WEBSITE.icon,
      value: 'https://www.infolink-group.com',
      isDisabled: true,
    },
  ],
  typeCCol: [
    {
      id: 1,
      type: InfoType.NORMAL,
      columnName: '職稱',
      img: '',
      icon: InfoType.NORMAL.icon,
      value: null,
      isDisabled: true,
    },
    {
      id: 2,
      type: InfoType.NORMAL,
      columnName: '姓名',
      img: '',
      icon: InfoType.NORMAL.icon,
      value: null,
      isDisabled: true,
    },
    {
      id: 3,
      type: InfoType.PHONE,
      columnName: '手機',
      img: '',
      icon: InfoType.MOBILE_PHONE.icon,
      value: null,
      isDisabled: false,
    },
    {
      id: 4,
      type: InfoType.PHONE,
      columnName: '市話',
      img: '',
      icon: InfoType.TELEPHONE.icon,
      value: null,
      isDisabled: false,
    },
    {
      id: 5,
      type: InfoType.EMAIL,
      columnName: 'Email',
      img: '',
      icon: InfoType.EMAIL.icon,
      value: null,
      isDisabled: false,
    },
  ],
};

export const signatureImgSlice = createSlice({
  name: 'signatureImg',
  initialState,
  reducers: {
    insertColumn: (state, action) => {
      const { type, form } = action.payload;
      if (type === 'B') {
        state.typeBCol = state.typeBCol.concat(form);
      } else {
        state.typeCCol = state.typeCCol.concat(form);
      }
    },
    deleteColumn: (state, action) => {
      const { id, type } = action.payload;
      if (type === 'B') {
        state.typeBCol = state.typeBCol.filter((col) => col.id !== id);
      } else {
        state.typeCCol = state.typeCCol.filter((col) => col.id !== id);
      }
    },
    updateColumn: (state, action) => {
      const { id, type, form } = action.payload;
      if (type === 'B') {
        const index = state.typeBCol.findIndex((col) => col.id === id);
        state.typeBCol[index] = {
          ...state.typeBCol[index],
          ...form,
        };
      } else {
        const index = state.typeCCol.findIndex((col) => col.id === id);
        state.typeCCol[index] = {
          ...state.typeCCol[index],
          ...form,
        };
      }
    }
  },
});

export const { insertColumn, deleteColumn, updateColumn } =
  signatureImgSlice.actions;

export default signatureImgSlice.reducer;
