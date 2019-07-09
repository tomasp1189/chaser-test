import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';
import TableTitleCell from './TableTitleCell';

const TableHead = ({ columns }) => {
  return (
    <thead>
      <TableRow>
        {columns.map(column => {
          return <TableTitleCell key={column.columnId} column={column} />;
        })}
      </TableRow>
    </thead>
  );
};

TableHead.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object)
};
TableHead.defaultProps = {
  columns: []
};

export default TableHead;
