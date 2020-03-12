import { createAction, props } from '@ngrx/store';

import { Book } from '@app/books/models';

export const loadBook = createAction(
  '[Book Exists Guard] Load Book',
  props<{ book: Book }>()
);
