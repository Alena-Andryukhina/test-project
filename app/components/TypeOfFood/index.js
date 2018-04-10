import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '../MenuItem';

class TypeOfFood extends Component {
  render () {
    return (
      <div>
        <div>
          <h3 className="bg-dark text-light text-center mb-0">
            {this.props.type}
          </h3>
          {this.props.items.map((item, index) => {
            return (
              <MenuItem
                index={index}
                type={this.props.type}
                item={item}
                key={`item${index}`}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

TypeOfFood.propTypes = {
  item: PropTypes.any,
};

export default TypeOfFood;
