import React from 'react';
import PropTypes from 'prop-types';

const columns = [
  { columnId: 'id', name: '#', type: 'text' },
  { columnId: 'email', name: 'Email', type: 'text' },
  { columnId: 'paidInvoices', name: 'Paid Invoices', type: 'number' },
  { columnId: 'totalAmountPaid', name: 'Total Amount Paid', type: 'number' },
  { columnId: 'unpaidInvoices', name: 'Unpaid Invoices', type: 'number' },
  { columnId: 'totalAmountDue', name: 'Total Amount Due', type: 'number' }
];

const Table = ({ rows }) => {
  const renderTableHeader = () => {
    return (
      <tr>
        {columns.map(column => {
          return <th key={column.columnId}>{column.name}</th>;
        })}
      </tr>
    );
  };
  const renderRows = () => {
    return rows.map(row => {
      return (
        <tr key={row.id}>
          {columns.map((column, index) => {
            return (
              <td key={`cell-${row.id}-${index}`}>{row[column.columnId]}</td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <table>
      <thead>{renderTableHeader()}</thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object)
};
Table.defaultProps = {
  rows: []
};

export default Table;
