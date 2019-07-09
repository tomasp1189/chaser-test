import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';
import TableCell from './TableCell';
import TableHead from './TableHead';

const columns = [
  { columnId: 'id', name: '#', type: 'text' },
  { columnId: 'email', name: 'Email', type: 'email' },
  { columnId: 'paidInvoices', name: 'Paid Invoices', type: 'number' },
  { columnId: 'totalAmountPaid', name: 'Total Amount Paid', type: 'number' },
  { columnId: 'unpaidInvoices', name: 'Unpaid Invoices', type: 'number' },
  { columnId: 'totalAmountDue', name: 'Total Amount Due', type: 'number' }
];

const Table = ({ rows }) => {
  const renderRows = () => {
    return rows.length === 0 ? (
      <tr>
        <td colSpan={columns.length}>Loading...</td>
      </tr>
    ) : (
      rows.map(row => {
        return (
          <TableRow>
            {columns.map((column, index) => {
              return (
                <TableCell
                  key={`cell-${row.id}-${index}`}
                  row={row}
                  column={column}
                />
              );
            })}
          </TableRow>
        );
      })
    );
  };

  return (
    <table>
      <TableHead columns={columns} />
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
