/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  DELETE_FOOD_ITEM_PENDING,
  DELETE_FOOD_ITEM_FULFILLED,
  SET_FOOD_LIST_PENDING,
  SET_FOOD_LIST_FULFILLED,
} from './constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

const getFoodList = state => state.toJS().food.foodList;

export function* deleteItem({ itemType: type, index }) {

  const foodList = yield select(getFoodList);

  foodList.forEach((item, ind) => {
    if (item.type === type) {
      item.items.splice(index, 1)
    }
    if (item.items.length === 0) {
      foodList.splice(ind, 1)
    }
  });

  yield put({
    type: DELETE_FOOD_ITEM_FULFILLED,
    foodList,
  })
}

export function* setList() {
  const foodList = yield select(getFoodList);

  foodList.forEach(item => {
    item.items = item.items.sort((a, b) => {
      if (a.subtype < b.subtype) return -1;
      if (a.subtype > b.subtype) return 1;
      return 0;
    });

    let subtype = '';

    item.items.forEach((item) => {
      if (subtype === item.subtype) {
        item.subtypeIsHidden = true;
        return;
      }
      item.subtypeIsHidden = false;
      subtype = item.subtype
    })
  });

  yield put({
    type: SET_FOOD_LIST_FULFILLED,
    foodList,
  })
}

export function* editItem(type, index) {
  const { menuItems } = this.state;
  menuItems.forEach((item, ind) => {
    if (item.type === type) {
      editingItem = item.items[index]
    }
  });
  this.setState({ ...editingItem, type, saveDisabled: false, editingItem: { type, index } }, this.formData)
};

/**
 * Root saga manages watcher lifecycle
 */
export default function* deleteItems() {
  yield takeLatest(DELETE_FOOD_ITEM_PENDING, deleteItem);
  yield takeLatest(SET_FOOD_LIST_PENDING, setList);
}
