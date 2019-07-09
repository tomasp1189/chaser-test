import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import Table from '.';

const TableContainer = props => {
  const [customers, setCustomers] = useState({});

  // this would be inside a customerApiClient file

  useEffect(() => {
    const getCustomers = async () => {
      try {
        let url = 'https://api.stripe.com/v1/customers?limit=100';
        const { data } = await axios.get(url, {
          headers: {
            Authorization: 'Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc'
          }
        });
        setCustomers(_.mapKeys(data.data, 'id'));
      } catch (error) {
      } finally {
        return;
      }
    };
    getCustomers();
  }, []);

  const [invoices, setInvoices] = useState([]);

  // this would be inside a invoiceApiClient file
  useEffect(() => {
    const getInvoices = async () => {
      try {
        const customersLength = Object.keys(customers).length;
        if (customersLength === 0) return;
        let url = 'https://api.stripe.com/v1/invoices';
        let {
          data: { data: invoiceData }
        } = await axios.get(`${url}?limit=100`, {
          headers: {
            Authorization: 'Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc'
          }
        });
        setInvoices(invoiceData);
      } catch (error) {
      } finally {
        return;
      }
    };

    getInvoices();
  }, [customers]);

  const rows = useMemo(() => {
    if (invoices.length === 0) return;
    const rows = {};
    invoices.forEach(invoice => {
      let row = rows[invoice.customer];
      // if row doesn't exist yet we set initial values
      if (!row)
        row = {
          id: invoice.customer,
          email: invoice.customer_email,
          paidInvoices: 0,
          totalAmountPaid: 0,
          unpaidInvoices: 0,
          totalAmountDue: 0
        };

      row.paidInvoices = row.paidInvoices + (invoice.paid ? 1 : 0);
      row.totalAmountPaid =
        row.paidInvoices + (invoice.paid ? invoice.amount_paid : 0);
      row.unpaidInvoices = row.unpaidInvoices + (!invoice.paid ? 1 : 0);
      row.totalAmountDue =
        row.paidInvoices + (!invoice.paid ? invoice.amount_due : 0);
      rows[invoice.customer] = row;
    });
    return _.map(rows, row => row);
  }, [customers, invoices]);
  return <Table rows={rows} />;
};

TableContainer.propTypes = {};

export default TableContainer;
