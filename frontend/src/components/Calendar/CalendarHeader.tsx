import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import "../../styles/Calendar.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

type CalendarHeaderProps = {
  allMonths: string[];
  setMonth: (month: string) => void;
  toggleMonthSelect: () => void;
  currentMonth: () => any;
  currentYear: () => any;
  showMonthTable: boolean;
};

const CalendarHeader = ({
  allMonths,
  setMonth,
  toggleMonthSelect,
  currentMonth,
  currentYear,
  showMonthTable,
}: CalendarHeaderProps) => {
  let months: any[] = [];
  let rows: any[] = [];
  let cells: any[] = [];

  allMonths.map((month) =>
    months.push(
      <TableCell
        className="month-cell"
        style={{ textAlign: "center" }}
        key={month}
        onClick={(e) => setMonth(month)}
      >
        <span>{month}</span>
      </TableCell>
    )
  );

  months.forEach((month, i) => {
    if (i % 3 !== 0 || i === 0) {
      cells.push(month);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(month);
    }
  });
  rows.push(cells);

  let monthList = rows.map((row, i) => <TableRow key={i}>{row}</TableRow>);

  return (
    <TableContainer component={Paper} className="month-selector">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              className="toggle-month"
              onClick={() => toggleMonthSelect()}
            >
              {currentMonth()}
              <ArrowDropDownIcon className="arrow-icon" />
            </TableCell>
            <TableCell>{currentYear()}</TableCell>
          </TableRow>
        </TableHead>
        {showMonthTable ? (
          <TableBody>
            <TableRow>
              <TableCell
                style={{ textAlign: "center" }}
                className="select-month-title"
              >
                Select a month
              </TableCell>
            </TableRow>
            {monthList}
          </TableBody>
        ) : null}
      </Table>
    </TableContainer>
  );
};

export default CalendarHeader;
