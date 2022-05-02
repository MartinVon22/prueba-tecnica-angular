import { Action } from '@ngrx/store';

export const SHOW_LOADER = 'SHOW_LOADER';

export class showLoaderAction implements Action {
  readonly type = SHOW_LOADER;
  constructor(public payload: any) {}
}

export type allLoaderAction = showLoaderAction
