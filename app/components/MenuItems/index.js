import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '../MenuItem';

class MenuItems extends React.Component{
  render () {
    return (
      <div>
        {this.props.items.map((item, index) => {
          return (
            <MenuItem
              index={index}
              type={this.props.type}
              item={item}
              key={item.name}
            />
          )
        })}
      </div>
    );
  }
}

MenuItems.propTypes = {
  item: PropTypes.any,
};

export default MenuItems;
