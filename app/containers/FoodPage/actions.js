
import {
  SET_FOOD_LIST_PENDING,
  SAVE_FOOD_LIST,
  DELETE_FOOD_ITEM_PENDING,
  EDIT_FOOD_ITEM,
} from './constants';


/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function setFoodList() {
  return {
    type: SET_FOOD_LIST_PENDING,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function saveFoodList(foodList) {
  return {
    type: SAVE_FOOD_LIST,
    foodList,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */


export function deleteItem(itemType, index) {
  return {
    type: DELETE_FOOD_ITEM_PENDING,
    itemType,
    index,
  };
}

export function editItem(editingItem) {
  return {
    type: EDIT_FOOD_ITEM,
    editingItem,
  };
}
