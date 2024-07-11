import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import styled from "@emotion/styled";
import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetTimeTableQuery } from "../../redux/api/timetable";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

dayjs.extend(duration);

const RootContainer = styled.div(() => ({
  padding: 35,
}));
const Header = styled.div(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "24px 5px",
  alignItems: "center",
}));

const NameContainer = styled.div(() => ({
  color: "#020617",
  fontFamily: "Switzer",
  fontSize: "29px",
  fontStyle: "normal",
  fontWeight: 500,
}));

interface TimeTableRow {
  id: number;
  end_time: string | null;
  start_time: string;
  start_break: string | null;
  end_break: string | null;
  employee_id: number;
  first_name: string;
  last_name: string;
}

const calculateDuration = (
  startTime: string,
  endTime: string | null,
  startBreak: string | null,
  endBreak: string | null
): string => {
  const start = dayjs(startTime);
  const end = endTime ? dayjs(endTime) : dayjs();
  let totalDuration: any;

  if (startBreak && endBreak) {
    const breakStart = dayjs(startBreak);
    const breakEnd = dayjs(endBreak);
    const breakDuration = dayjs.duration(breakEnd.diff(breakStart));
    totalDuration = dayjs.duration(end.diff(start)).subtract(breakDuration);
  } else {
    totalDuration = dayjs.duration(end.diff(start));
  }

  return `${totalDuration.hours()}h ${totalDuration.minutes()}m`;
};

const calculateLateTime = (startTime: string) => {
  const start = dayjs(startTime);
  const scheduledStartTime = dayjs(startTime).hour(9).minute(30).second(0);
  const lateDiffInMinutes = start.diff(scheduledStartTime, "minute");
  const lateHours = Math.floor(lateDiffInMinutes / 60);
  const lateMinutes = lateDiffInMinutes % 60;
  return `${lateHours}h ${lateMinutes}m`;
};

const TimeTable: React.FC = () => {
  const router = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchPage = searchParams.get("tab");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectDate, setSelectDate] = useState(dayjs().format('YYYY-MM-DD'));
  const { data: TimeTableData } = useGetTimeTableQuery({ selectDate });

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    router(`/timetable/?tab=${newPage + 1}`);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (searchPage !== null) {
      const searchNumber = parseInt(searchPage, 10);
      if (!isNaN(searchNumber)) {
        setPage(searchNumber - 1);
      }
    }
  }, [searchPage]);

  return (
    <RootContainer>
      <Header>
        <NameContainer>TimeTable</NameContainer>
        <DemoItem label="Mobile variant" sx={{ width: 200 }}>
          <MobileDatePicker
            value={dayjs(selectDate)}
            onChange={(value: any) => {
              setSelectDate(dayjs(value).format('YYYY-MM-DD'));
            }}
          />
        </DemoItem>
      </Header>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableRow>
            <TableCell align="center" style={{ fontWeight: "800" }}>
              Employee Name
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "800" }}>
              Duration
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "800" }}>
              Late Time
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "800" }}>
              Start Time
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "800" }}>
              End Time
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "800" }}>
              Break Start
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "800" }}>
              Break End
            </TableCell>
          </TableRow>
          <TableBody>
            {TimeTableData && TimeTableData.length > 0 ? (
              (rowsPerPage > 0
                ? TimeTableData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : TimeTableData
              ).map((row: TimeTableRow) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    {row.first_name} {row.last_name}
                  </TableCell>
                  <TableCell align="center">
                    {calculateDuration(
                      row.start_time,
                      row.end_time,
                      row.start_break,
                      row.end_break
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {calculateLateTime(row.start_time)}
                  </TableCell>

                  <TableCell align="center">
                    {row.start_time &&
                      dayjs(row.start_time).format("ddd, MMM D, YYYY h:mm A")}
                  </TableCell>
                  <TableCell align="center">
                    {row.end_time &&
                      dayjs(row.end_time).format("ddd, MMM D, YYYY h:mm A")}
                  </TableCell>
                  <TableCell align="center">
                    {row.start_break &&
                      dayjs(row.start_break).format("ddd, MMM D, YYYY h:mm A")}
                  </TableCell>
                  <TableCell align="center">
                    {row.end_break &&
                      dayjs(row.end_break).format("ddd, MMM D, YYYY h:mm A")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={TimeTableData?.length || 0}
        page={page} 
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </RootContainer>
  );
};

export default TimeTable;
