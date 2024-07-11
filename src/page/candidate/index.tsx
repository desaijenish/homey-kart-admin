import styled from "@emotion/styled";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { useRouter, useSearchParams } from "next/navigation";
import { Button, Link, TablePagination, TextField } from "@mui/material";
import { ProgressIndicator } from "../../components/ProgressIndicator";
import { useGetCandidateQuery } from "../../redux/api/candidate";
import TableHeader from "./TableHeader";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../../redux/authSlice";

const RootContainer = styled.div({
  padding: 35,
});
const Header = styled.div({
  display: "flex",
  justifyContent: "space-between",
  padding: "24px 5px",
  alignItems: "center",
});

const NameContainer = styled.div({
  color: "#020617",
  fontFamily: "Switzer",
  fontSize: "29px",
  fontStyle: "normal",
  fontWeight: 500,
});
const Candidate = () => {
  const token: any = useSelector(getToken);
  console.log(token);
  const router = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchPage = searchParams.get("id");
  const [searchInput, setSearchInput] = React.useState<string>("");
  const [search, setSearch] = React.useState<string>("");

  const { data: candidate, isFetching } = useGetCandidateQuery({ search });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [toggle, setToggle] = React.useState(true);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    router(`/candidate/?tab=${newPage + 1}`);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const userDetailTab = (index: number | undefined) => {
    router(`/candidate/Info/${index}`);
  };

  React.useEffect(() => {
    if (searchPage !== null) {
      const searchNumber = parseInt(searchPage, 10);
      if (!isNaN(searchNumber)) {
        setPage(searchNumber - 1);
      }
    }
  }, [searchPage]);

  const handleSearch = () => {
    setSearch(searchInput);
    setToggle(false);
  };

  const handleClear = () => {
    setSearchInput("");
    setSearch("");
    setToggle(true);
  };

  return (
    <RootContainer>
      <Header>
        <NameContainer>Candidate</NameContainer>
        <Button variant="contained" onClick={() => router("/candidate/add")}>
          Candidate Add
        </Button>
      </Header>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <TextField
          label="Search"
          placeholder="Search"
          sx={{ m: 1, width: "25ch", borderRadius: "30%" }}
          InputProps={{
            startAdornment: <SearchIcon />,
            endAdornment: searchInput && (
              <ClearIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setSearchInput("")}
              />
            ),
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {toggle ? (
          <Button variant="outlined" onClick={handleSearch}>
            Search
          </Button>
        ) : (
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHeader />
          <TableBody>
            {candidate && candidate ? (
              (rowsPerPage > 0
                ? candidate?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : candidate
              ).map((row: any) => (
                <TableRow
                  key={row.email}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    onClick={() => userDetailTab(row?.id)}
                  >
                    <Link underline="none" style={{ cursor: "pointer" }}>
                      {row.first_name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{row.last_name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">{row.skill}</TableCell>
                  <TableCell align="center">{row.addr}</TableCell>
                  <TableCell align="center">{row.city}</TableCell>
                  <TableCell align="center">{row.state}</TableCell>
                  <TableCell align="center" style={{ cursor: "pointer" }}>
                    EDIT
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
        <TablePagination
          component="div"
          count={candidate?.length || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <ProgressIndicator open={isFetching} />
      </TableContainer>
    </RootContainer>
  );
};

export default Candidate;
