import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchFoodList,
  deleteItem,
  editItem,
} from '../../containers/FoodPage/actions'

class MenuItem extends Component {

  deleteItem = () => {
    const { deleteItem, type, index } = this.props;
    deleteItem(type, index)
  };

  editItem = () => {
    const { editItem, type, item, index } = this.props;
    editItem({ item, type, index })
  };

  render() {
    const { item } = this.props;
    return (
      <div>
        { !item.subtypeIsHidden && <div className="bg-warning text-light p-1">{item.subtype}</div>}
        <div className="row no-gutters border-bottom">
          <div className="col-6 p-1">{item.name}</div>
          <div className="col-6 text-right p-1">{item.cost}</div>
          <div className="col text-secondary small p-1">{item.composition}</div>
          <div>
            <button
              className="btn btn-outline-warning m-1"
              type="button"
              onClick={this.editItem}
            >Изменить</button>
            <button
              type="button"
              className="btn btn-outline-dark m-1"
              onClick={this.deleteItem}
            >&times;</button>
          </div>
        </div>
      </div>
    );
  }
}

MenuItem.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
  index: PropTypes.number,
};

function mapDispatchToProps(dispatch) {
  return {
    deleteItem: (type, index) => dispatch(deleteItem(type, index)),
    editItem: (item) => dispatch(editItem(item)),
  };
}

export default connect(null, mapDispatchToProps)(MenuItem)
