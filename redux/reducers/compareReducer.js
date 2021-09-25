import { compareActionTypes } from '../actions/compareActions/compareActionTypes'

const initialCompareState = {
  compareItems: [],
}
const compareReducer = (state = initialCompareState, action) => {
  const { payload } = action
  switch (action.type) {
    case compareActionTypes.ADD_TO_COMPARE: {
      return {
        ...state,
        compareItems: addNewProductToCompare(state.compareItems, payload),
      }
    }
    case compareActionTypes.REMOVE_FROM_COMPARE:
      return {
        ...state,
        compareItems: state.compareItems.filter(
          (compareItem) => compareItem.id !== payload.id
        ),
      }

    case compareActionTypes.CLEAR_COMPARE:
      return {
        ...state,
        compareItems: [],
      }
    default:
      return state
  }
}

function addNewProductToCompare(compareItems, compareToAdd) {
  const isIncompare = !!compareItems.find(
    (compareItem) => compareItem.id === compareToAdd.id
  )
  if (isIncompare) {
    return compareItems.map((compareItem) => {
      return compareItem.id === compareToAdd.id
        ? { ...compareToAdd, quantity: compareItem.quantity + 1 }
        : compareItem
    })
  }
  return [...compareItems, { ...compareToAdd, quantity: 1 }]
}
export default compareReducer
