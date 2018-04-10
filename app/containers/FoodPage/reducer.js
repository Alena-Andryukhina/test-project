
import { fromJS } from 'immutable';

import {
  SET_FOOD_LIST_FULFILLED,
  SAVE_FOOD_LIST,
  DELETE_FOOD_ITEM_FULFILLED,
  EDIT_FOOD_ITEM,
} from './constants';

const initialState = fromJS({
  saveButtonDisabled: true,
  editingItem: null,
  shouldRendered: false,
  foodList:  [
    {
      type: 'Пицца',
      items: [
        {
          subtype: 'Римская',
          name: 'Неаполь',
          composition: 'Сыр, помидоры',
          cost: '250 рублей',
        },
        {
          subtype: 'Обычная',
          name: 'Маргарита',
          composition: 'Сыр, помидоры',
          cost: '300 рублей'
        },
      ],
    },
    {
      type: 'Роллы',
      items: [
        {
          subtype: '',
          name: 'Кабаяки',
          composition: 'Рыба, рис',
          cost: '250 рублей'
        },
        {
          subtype: '',
          name: 'Нинзя',
          composition: 'Рыба, рис',
          cost: '250 рублей'
        }
      ],
    },
  ],
});

function foodReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FOOD_LIST_FULFILLED:
      return state
        .set('saveButtonDisabled', true)
        .set('foodList', action.foodList)
        .set('shouldRendered', false);
    case SAVE_FOOD_LIST:
      return state
        .set('saveButtonDisabled', true)
        .set('foodList', action.foodList)
        .set('shouldRendered', true)
        .set('editingItem', null);
    case DELETE_FOOD_ITEM_FULFILLED:
      return state
        .set('foodList', action.foodList)
        .set('shouldRendered', true);
    case EDIT_FOOD_ITEM:
      return state
        .set('saveButtonDisabled', false)
        .set('editingItem', action.editingItem)
    default:
      return state;
  }
}

export default foodReducer;
