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
        let url = 'https://db8111f2.ngrok.io/api/customers?limit=3';
        const { data } = await axios.get(url);
        setCustomers(_.mapKeys(data, 'id'));
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
        let url = 'https://db8111f2.ngrok.io/api/invoices';
        let invoiceData = [];
        for (let index = 0; index < customersLength; index++) {
          const customerId = Object.keys(customers)[index];
          const customer = customers[customerId];
          const { data } = await axios.get(`${url}?customer=${customer.id}`);
          invoiceData = [...invoiceData, ...data];
        }
        setInvoices(invoiceData);
      } catch (error) {
      } finally {
        return;
      }
    };

    getInvoices();
  }, [customers]);

  //const [rows, setRows] = useState([]);

  // const buildRows = () => {

  // };

  const rows = useMemo(() => {
    if (invoices.length === 0) return;
    debugger;
    const rows = _.chain(invoices)
      .groupBy('customer')
      .map((groupedInvoices, id) => {
        const totals = _.reduce(
          groupedInvoices,
          (totals, invoice) => {
            totals.paidInvoices = totals.paidInvoices + (invoice.paid ? 1 : 0);
            totals.totalAmountPaid =
              totals.paidInvoices + (invoice.paid ? invoice.amount_paid : 0);
            totals.unpaidInvoices =
              totals.unpaidInvoices + (!invoice.paid ? 1 : 0);
            totals.totalAmountDue =
              totals.paidInvoices + (!invoice.paid ? invoice.amount_due : 0);
            return totals;
          },
          {
            paidInvoices: 0,
            totalAmountPaid: 0,
            unpaidInvoices: 0,
            totalAmountDue: 0
          }
        );
        const email = customers[id].email;
        return { id, email, ...totals };
      })
      .value();
    debugger;
    return rows;
  }, [customers, invoices]);
  return <Table rows={rows} />;
};

TableContainer.propTypes = {};

export default TableContainer;
