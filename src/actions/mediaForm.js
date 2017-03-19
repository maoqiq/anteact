import types from '../constants/actionTypes';
import {createActions} from '../utils/reduxHelper';


export const mediaFormSubmit = createActions([
  types.MEDIA_FORM_SUBMIT_REQUEST,
  types.MEDIA_FORM_SUBMIT_SUCCESS,
  types.MEDIA_FORM_SUBMIT_FAILURE,
]);
