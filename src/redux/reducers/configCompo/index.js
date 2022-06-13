// ** Initial State
const initialState = {
  mainTabData: [],
  subTabData: [],
  tabData: [],
  fieldsData: [],
  isExistData: null
}

const configCompoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MAIN_TAB_DATA':
      return { ...state, mainTabData: action.value }
    case 'SUB_TAB_DATA':
      return { ...state, subTabData: action.value }
    case 'TAB_DATA':
      return { ...state, tabData: action.value }
    case 'FIELD_SETS':
      return { ...state, fieldsData: action.value }
    case 'ISEXISTDATA':
      return { ...state, isExistData: action.value }
    default:
      return state
  }
}

export default configCompoReducer