import "./TimeSheetTable.scss";
import React from 'react';
import { Table } from 'antd';



const TimeSheetTable = ({ data, columns }) => {

    // Calculate the "Total" row
  const totalRow = columns.reduce((totals, column) => {
    const columnKey = column.dataIndex;
    const totalTime = data.reduce((sum, row) => {
      const time = row[columnKey];
      if (time) {
        const [hours, minutes] = time.split(':').map(Number);
        return sum + hours * 60 + minutes; // Convert time to minutes
      }
      return sum;
    }, 0);

    const totalHours = Math.floor(totalTime / 60);
    const totalMinutes = totalTime % 60;
    return {
      ...totals,
      [columnKey]: `${totalHours}:${totalMinutes.toString().padStart(2, '0')}`, // Convert back to HH:mm format
    };
  }, {});

  totalRow.issue = 'Total'; // Label for the "Issue" column

// Add "Total Logged Time" for each row
const dataWithTotalLoggedTime = data.map((row) => {
    const totalTimeForRow = columns.reduce((sum, column) => {
      const time = row[column.dataIndex];
      if (time) {
        const [hours, minutes] = time.split(':').map(Number);
        return sum + hours * 60 + minutes; // Convert to minutes
      }
      return sum;
    }, 0);

    const totalHours = Math.floor(totalTimeForRow / 60);
    const totalMinutes = totalTimeForRow % 60;

    return {
      ...row,
      totalLoggedTime: `${totalHours}:${totalMinutes.toString().padStart(2, '0')}`, // Convert to HH:mm
    };
  });

  // Calculate the total of totalLoggedTime for the "Total" row
  const totalLoggedTimeForAllRows = dataWithTotalLoggedTime.reduce((sum, row) => {
    const [hours, minutes] = row.totalLoggedTime.split(':').map(Number);
    return sum + hours * 60 + minutes; // Convert to minutes and sum
  }, 0);

  const totalHours = Math.floor(totalLoggedTimeForAllRows / 60);
  const totalMinutes = totalLoggedTimeForAllRows % 60;

  totalRow.totalLoggedTime = `${totalHours}:${totalMinutes.toString().padStart(2, '0')}`;


  // Combine dynamic columns with a fixed issue column and the new "Total Logged Time" column
  const allColumns = [
    {
      title: 'Issue',
      dataIndex: 'issue',
      key: 'issue',
      fixed: 'left', // Keeps the issue column fixed on horizontal scroll
    },
    {
      title: 'Logged',
      dataIndex: 'totalLoggedTime',
      key: 'totalLoggedTime',
      render: (time) => time || '-', // Show dash if no time is logged
    },
    ...columns, // Dynamic date columns
  ];


    return (
        <div className="table-container">
            <Table
                columns={allColumns}
                dataSource={[...dataWithTotalLoggedTime, totalRow]}
                rowKey={(record) => record.key}
                pagination={false}
                scroll={{x : true}}
                bordered
            />
        </div>

    );
};

export default TimeSheetTable;
