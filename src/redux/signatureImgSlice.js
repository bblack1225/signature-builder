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
      value: null,
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
  ],
  logoForm: {
    img: '',
    value: 'https://www.infolink-group.com/',
  },
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
      console.log('action',action)
      const { id, type, form } = action.payload;
      if (type === 'B') {
        const index = state.typeBCol.findIndex((col) => col.id === id);
        state.typeBCol[index] = {
          ...state.typeBCol[index],
          ...form,
        };
      } else {
        const index = state.typeCCol.findIndex((col) => col.id === id);
        state.typeBCol[index] = {
          ...state.typeBCol[index],
          ...form,
        };
      }
    },
    updateLogoColumn: (state, action) => {
      const { img } = action.payload;
      state.logoForm = {
        ...state.logoForm,
        img,
      };
    },
  },
});

export const { insertColumn, deleteColumn, updateColumn, updateLogoColumn } =
  signatureImgSlice.actions;

export default signatureImgSlice.reducer;
