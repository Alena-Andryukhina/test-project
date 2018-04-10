import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';

import messages from './messages';
import TypeOfFood from 'components/TypeOfFood';
import 'bootstrap/dist/css/bootstrap.css';
import FoodListItem from './FoodListItem'

import {
  saveFoodList,
  setFoodList,
} from './actions'
import injectSaga from "../../../internals/templates/utils/injectSaga";
import saga from "./saga";

const defaultState = {
  name: '',
  composition: '',
  cost: '',
  type: '',
  subtype: '',
};


class FoodPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }

  componentDidMount () {
    this.props.setFoodList();
  }

  componentWillReceiveProps (nextProps) {
   if (nextProps.shouldRendered !== this.props.shouldRendered) {
     this.props.setFoodList();
   }
   if (nextProps.editingItem !== null && this.props.editingItem === null) {
      this.startEdit(nextProps.editingItem)
   }
  }

  addFood = () => {
    const { menuItems } = this.props;
    const { name, cost, subtype, type, composition } = this.state;
    if ([ name, cost, type, composition ].includes('')) return null;
    let newItem = {
      type: type.trim(),
      items: [
        {
          subtype,
          name,
          composition,
          cost,
        }
      ]
    };
    let existsType = false;

    menuItems.forEach(item => {
      if (newItem.type.toLowerCase() === item.type.toLowerCase()) {
        existsType = true;
        item.items.push(newItem.items[0])
        item.items =  item.items.sort((a, b) => {
          if(a.subtype < b.subtype) return -1;
          if(a.subtype > b.subtype) return 1;
          return 0;
        });

        let subtype = '';

        item.items.forEach((item) => {
          item.subtypeIsHidden = false;
          if (subtype === item.subtype) {
            item.subtypeIsHidden = true;
            return;
          }
          subtype = item.subtype
        })
      }
    });

    if (!existsType) {
      menuItems.push(newItem)
    }

    this.setStateToDefault();
    this.props.saveFoodList(menuItems);
  };

  changeInput(nameField, e) {
    this.setState({
      [nameField]: e.target.value
    })
  }

  startEdit = (item) => {
    this.setState({ ...defaultState, ...item.item, type: item.type });
  };

  saveItem = () => {
    const { menuItems, editingItem } = this.props;
    const { name, composition, cost, subtype } = this.state;
    menuItems.forEach((item) => {
      if (item.type === editingItem.type) {
        item.items[editingItem.index] = { name, composition, cost, subtype };
      }
    });
    this.setStateToDefault();
    this.props.saveFoodList(menuItems);
  };

  setStateToDefault = () => {
    this.setState({ ...defaultState })
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center">
          MENU
        </h1>
        <FoodListItem className="mb-3">
          {this.props.menuItems.map((item, index) => {
            return <TypeOfFood {...item} key={`item${index}`}/>
          })}
        </FoodListItem>
        <form className="row border form-inline p-2">
          <div className="form-group col-6 p-2">
            <label>Тип блюда: </label>
            <input placeholder="*Required field" readOnly={!this.props.saveDisabled} className="form-control ml-auto" onChange={this.changeInput.bind(this,'type')} value={this.state.type}/>
          </div>
          <div className="form-group col-6 p-2">
            <label>Подтип блюда: </label>
            <input className="form-control ml-auto" onChange={this.changeInput.bind(this,'subtype')} value={this.state.subtype}/>
          </div>
          <div className="form-group col-6 p-2">
            <label>Название блюда: </label>
            <input placeholder="*Required field" className="form-control ml-auto" onChange={this.changeInput.bind(this,'name')} value={this.state.name}/>
          </div>
          <div className="form-group col-6 p-2">
            <label>Состав блюда: </label>
            <input placeholder="*Required field" className="form-control ml-auto" onChange={this.changeInput.bind(this,'composition')} value={this.state.composition}/>
          </div>
          <div className="form-group col-6 p-2">
            <label>Цена: </label>
            <input placeholder="*Required field" className="form-control ml-auto" onChange={this.changeInput.bind(this,'cost')} value={this.state.cost}/>
          </div>
          <div className="form-group col-6 justify-content-end">
            <button
              type="button"
              className="btn btn-outline-dark m-1"
              onClick={this.addFood}
              disabled={!this.props.saveDisabled}
            >Add</button>
            <button
              type="button"
              className="btn btn-outline-info m-1"
              onClick={this.saveItem}
              disabled={this.props.saveDisabled}
            >Save</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFoodList: () => dispatch(setFoodList()),
    saveFoodList: (e) => dispatch(saveFoodList(e)),
  };
}

const mapStateToProps = (state) => {
  return ({
    shouldRendered: state.toJS().food.shouldRendered,
    menuItems: state.toJS().food.foodList || [],
    saveDisabled: state.toJS().food.saveButtonDisabled,
    editingItem: state.toJS().food.editingItem,
  });
};

const withSaga = injectSaga({ key: 'food', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withSaga,
  withConnect,
)(FoodPage);
