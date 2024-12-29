import { useEffect, useState } from "react";
import LogTimeModal from "../LogTimeModal/LogTimeModal";
import TimeSheetTable from "../TimeSheetTable/TimeSheetTable";
import "./TimeSheet.scss";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const TimeSheet = () => {

   const currentMonthStart = dayjs().startOf('month');
   const currentMonthEnd = dayjs().endOf('month');

    const predefinedIssues = [
        'Bug-123',
        'Feature-456',
        'Enhancement-789',
        'Task-001',
        'Task-002',
        'Bug-456',
        'Bug-789',
        'Feature-001',
        'Task-003',
        'Enhancement-001',
      ];
    
      const [data, setData] = useState(
        predefinedIssues.map((issue) => ({ issue })) // Initialize rows with predefined issues
      );
      const [columns, setColumns] = useState([]);

      // Initialize table with current month's columns
  useEffect(() => {
    initializeTableColumns(currentMonthStart, currentMonthEnd);
  }, []);

  const initializeTableColumns = (start, end) => {
    const newColumns = [];
    for (let date = start; date.isBefore(end) || date.isSame(end); date = date.add(1, 'day')) {
      newColumns.push({
        title: `${date.format('ddd').toUpperCase()} \n ${date.format('D')}`,
        dataIndex: `day_${date.format('YYYY-MM-DD')}`, // Unique column key
        key: `day_${date.format('YYYY-MM-DD')}`,
        render: (time) => time || '-', // Show dash if no time is logged
      });
    }
    setColumns(newColumns);
  };
    
      const handleDateRangeChange = (dates) => {
        if (dates && dates[0] && dates[1]) {
          const from = dayjs(dates[0]);
          const to = dayjs(dates[1]);
    
          const newColumns = [];
          for (let date = from; date.isBefore(to) || date.isSame(to); date = date.add(1, 'day')) {
            newColumns.push({
              title: `${date.format('ddd').toUpperCase()} \n ${date.format('D')}`,
              dataIndex: `day_${date.format('YYYY-MM-DD')}`, // Unique column key
              key: `day_${date.format('YYYY-MM-DD')}`,
              render: (time) => time || '-', // Show dash if no time is logged
            });
          }
          setColumns(newColumns);
        }
      };
    
      const handleLogTime = ({ issue, date, time }) => {
        const columnKey = `day_${date.format('YYYY-MM-DD')}`;
    
        setData((prevData) =>
          prevData.map((row) =>
            row.issue === issue ? { ...row, [columnKey]: time.format('HH:mm') } : row
          )
        );
      };

    // const handleOnSubmit = (values) => {
    //     console.log("values", values);
    //     // let obj = { id: uuidv4(), ...values }
    //     // setData([...data, obj]);

    //     const columnKey = `day_${values.date.date()}`;

    //     const existRow = data.find((row) => row.name === values.name);

    //     if(existRow){
    //         setData((prev) => prev.map((row) => row.name === values.name ? {...row, [columnKey] : values.time.format("HH:mm")} : row))
    //     }else{
    //         setData((prev) => [...prev, {name : values.name, [columnKey] : values.time.format("HH:mm")}])
    //     }
    // }

//     useEffect(() => {
// console.log("data", data)
//     }, [data])

    return (
        <div className="timesheet-container">
            <div className="row">
                <div className="month-select">
                    <RangePicker onChange={handleDateRangeChange} defaultValue={[currentMonthStart, currentMonthEnd]}/>
                </div>
                <div className="log-time">
                    <LogTimeModal onSubmit={handleLogTime} issues={predefinedIssues}/>
                </div>

            </div>
            <div className="timesheet-table">
                <TimeSheetTable data={data} columns={columns}/>
            </div>
        </div>
    )
}
export default TimeSheet;