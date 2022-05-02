import * as fromLoaderActions from '../actions/loader.actions'

export interface State {
  showLoader: boolean
}

const initialState: State = {
  showLoader: true
}

export function loaderReducer(
  state = initialState,
  action: fromLoaderActions.allLoaderAction
) {
  switch (action.type) {
    case fromLoaderActions.SHOW_LOADER: {
      return {
        ...state,
        showLoader: action.payload
      }
    }
    default: {
      return state
    }
  }
}
