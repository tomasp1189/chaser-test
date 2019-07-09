import React from 'react';
import PropTypes from 'prop-types';

const TableCell = ({ row, column }) => {
  const renderChip = () => {
    return (
      row.unpaidInvoices > 0 && (
        <span
          style={{
            marginLeft: 5,
            backgroundColor: 'red',
            color: 'white',
            padding: '2px 3px',
            borderRadius: 5,
            fontSize: 10,
            fontWeight: 700
          }}
        >
          Overdue
        </span>
      )
    );
  };
  const renderCell = () => {
    switch (column.type) {
      case 'number':
        return <td style={{ textAlign: 'right' }}>{row[column.columnId]}</td>;

      case 'email':
        return (
          <td style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex' }}>
              {row[column.columnId]}
              {renderChip()}
            </div>
          </td>
        );

      default:
        return <td style={{ textAlign: 'left' }}>{row[column.columnId]}</td>;
    }
  };

  return renderCell();
};

TableCell.propTypes = {
  row: PropTypes.object,
  column: PropTypes.object
};

export default TableCell;
