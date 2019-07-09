import React from 'react';
import PropTypes from 'prop-types';

const TableTitleCell = ({ column }) => {
  const renderTitleCell = () => {
    switch (column.type) {
      case 'number':
        return <th style={{ textAlign: 'right' }}>{column.name}</th>;

      default:
        return <th style={{ textAlign: 'left' }}>{column.name}</th>;
    }
  };

  return renderTitleCell();
};

TableTitleCell.propTypes = {
  column: PropTypes.object
};

export default TableTitleCell;
