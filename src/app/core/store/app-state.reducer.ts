import { ActionReducerMap } from '@ngrx/store'
import * as fromLoaderReducer from './reducers/loader.reducer'

export interface AppState {
  loader: fromLoaderReducer.State
}

export const reducers: ActionReducerMap<AppState, any> = {
  loader: fromLoaderReducer.loaderReducer
}
