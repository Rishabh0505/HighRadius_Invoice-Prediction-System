import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TablePagination from "@mui/material/TablePagination";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  Grid,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
} from "@material-ui/core";
import Footer from "./Footer";
import axios from "axios";
import { headCells } from "./headCells";

import InputBase from "@material-ui/core/InputBase";

import DeleteRecordComponent from "./DeleteDialogForm";
import AddRecordComponent from "./AddFormDialog";
import EditRecordComponent from "./EditDialogForm";
import { SERVER_URL } from "../utils/constants";
import AdvanceSearch from "./AdvanceSearch";

const useStyles = makeStyles((theme) => ({
  root: {
      margin: "2rem auto",
      width: "80%",
      [theme.breakpoints.down("sm")]: {
          width: "100%",
          marginBottom: "0",
      },
  },
  paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
  },
  table: {
      minWidth: 2000,
  },
  Grid: {
      display: "flex",
      flexDirection: "column",
  },
  checkboxbodycell: {
      padding: "2px 10px",
      transform: "scale(0.7)",
      color: theme.palette.primary.main,
  },
  checkboxhead: {
      padding: "3px 10px",
      transform: "scale(0.7)",
      color: theme.palette.primary.main,
  },
  tablecontainer: {
      maxHeight: 370,
      marginBottom: "10px",
  },
  main: {
      // paddingTop: '20px',
      paddingLeft: "30px",
      paddingRight: "30px",
  },
  paper: {
      display: "flex",
      flexWrap: "wrap",
      backgroundColor: "#273D49CC",
  },
  root: {
      "& .MuiTableCell-root": {
          padding: "1px",
          fontSize: "0.60rem",
          borderBottom: "none",
      },
      "& .PrivateSwitchBase-root-18": {
          padding: "1px 1px",
      },
      "& .MuiTableCell-stickyHeader": {
          background: "#283A46",
          fontWeight: "bolder",
          color: "#97A1A9",
          fontSize: "15px",
          borderBottom: "1px solid #283A46",
      },
      "& .MuiTableCell-body": {
          color: "white",
          maxHeight: "5px",
          fontSize:"12px"
      },
      root: {
          "& .MuiFormLabel-root": {
              fontSize: "0.25rem",
              color: "white",
          },
      },
      sizeSmall: {
          height: "3px",
      },
  },

  /* Panel Header */
  header: {
      padding: "30px 30px",
  },
  input: {
      fontSize: "0.6rem",
      marginLeft: theme.spacing(1),
      flex: 1,
  },

  labelroot: {
      fontSize: "0.5rem",
      color: theme.palette.primary,
  },
  searchpaper: {
      backgroundColor: "#fff",
      height: "30px",
      marginLeft: theme.spacing(1),
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 200,
      border: `1px solid ${theme.palette.secondary.main}`,
  },
  primary: {
      color: "white",
  },
  oultined: {
      color: "blue",
  },
}));

export default function HomePageTable() {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const [pageCount, setCount] = useState(1);
  const [responseData, setResponseData] = useState([]);
  const [isNext, isNextFunc] = useState(false);
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [advanceSearchData, setAdvanceSearchData] = useState();
  // states for pagination
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const displayData = (e) => {
      axios
          .get(
              `${SERVER_URL}/send-records?page=${pageCount}`
          )
          .then(function (response) {
              const rowData = response.data;
              setRowData(rowData);
          })
          .catch(function (error) {
              console.log(error);
          });
  };

  // infinite scroll
  const handleLoad = useCallback(() => {
      try {
          const fetchData = async () => {
              const response = await axios.get(
                  `${SERVER_URL}/send-records?page=${pageCount}`
              );
              
              rowData.push(...response.data);
              setResponseData([...responseData, ...response.data]);
              isNextFunc(true);
          };
          fetchData();
      } catch (error) {
          console.log(error);
      }
  }, [pageCount]);

  function fetchMoreData() {
      setCount(pageCount + 1);
  }
  useEffect(() => {
      if (advanceSearch) {
          console.log(advanceSearchData);
          const { documentId, invoiceId, customerNumber, businessYear } =
              advanceSearchData;
              const config = {
                  body: {
                      documentId, invoiceId, customerNumber, businessYear
                  },
                };
          try {
              const fetchData = async () => {
                  const response = await axios.post(
                      `${SERVER_URL}/AdvanceSearchRecord`,config
                  );
                  console.log(response.data);
                  setRowData([...response.data]);
                  setResponseData([...response.data]);
                  // console.log([...response.data]);
              };
              fetchData();
          } catch (error) {
              console.log(error);
          }
      }
      setAdvanceSearch(false);
  }, [advanceSearch]);
  // call the function on component mount
  useEffect(() => {
      displayData();
  }, []);

  useEffect(() => {
      handleLoad();
  }, [handleLoad, pageCount]);


  const handleRemove = () => {
      setRemove(!remove);
      handleLoad();
  };

  const handleEdit = () => {
    setEdit(!edit);
    handleLoad();
    setSelected([]);
  };

  // for search operation using debouncing.
  const debounce = (func) => {
      let timer;
      return function (...args) {
          const context = this;
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
              timer = null;
              func.apply(context, args);
          }, 1000);
      };
  };
  const handleSearch = (e) => {
      setSearch(e.target.value);
      try {
          const fetchData = async () => {
              const response = await axios.get(
                  `${SERVER_URL}/SearchRecord?searchKeyword=${e.target.value}`
              );
              console.log(response.data)
              setRowData([...response.data])
              setResponseData([...response.data]);
          };
          fetchData();
      } catch (error) {
          console.log(error);
      }
  };

  const optimisedSearch = useCallback(debounce(handleSearch), []);

  // for selecting all checkboxes
  const handleSelectAllClick = (event) => {
      if (event.target.checked) {
          setSelected(responseData.map((row) => row.sl_no));
          return;
      }
      setSelected([]);
  };

  // for checkbox selection
  const handleClick = (event, sl_no) => {
      const selectedIndex = selected.indexOf(sl_no);
      // console.log(selectedIndex);
      let newSelected = [];

      if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, sl_no);
          // console.log(sl_no)
      } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
              selected.slice(0, selectedIndex),
              selected.slice(selectedIndex + 1)
          );
      }
      setSelected(newSelected);
  };

  // for pagination
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

  const isSelected = (sl_no) => selected.indexOf(sl_no) !== -1;
  
  return (
      <div className={classes.main}>
          <Paper elevation={3} className={classes.paper}>
              {/* function buttons */}
              <Grid xs={12}>
                  <Grid
                      container
                      direction="row"
                      justify="space around"
                      className={classes.header}
                      variant="outlined "
                  >
                      <Grid
                          item
                          xs={4}
                          direction="row"
                          style={{ display: "flex" }}
                      >
                          <Button
                              classes={{
                                  containedPrimary: classes.primary,
                              }}
                              style={{
                                  backgroundColor: "#15AEF2",
                                  borderRadius: "4px 0 0 4px",
                                  width: "10vw",
                              }}
                              variant="contained"
                              color={
                                  selected.length > 0
                                      ? "secondary"
                                      : "primary"
                              }
                              size="small"
                          >
                              Predict
                          </Button>
                          <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              style={{
                                  borderColor: "#15AEF2",
                                  borderWidth: "1px 0 1px 0",
                                  borderRadius: "0",
                                  width: "10vw",
                              }}
                          >
                              Analytics View
                          </Button>
                          <AdvanceSearch
                              advanceSearch={advanceSearch}
                              setAdvanceSearch={setAdvanceSearch}
                              advanceSearchData={advanceSearchData}
                              setAdvanceSearchData={setAdvanceSearchData}
                          />

                      </Grid>
                      <Grid
                          item
                          xs={3}
                          direction="row"
                          style={{
                              display: "flex",
                              justifyContent: "center",
                          }}
                      >
                            {/* refresh icon here */}
                            <RefreshIcon 
                          onClick={() => {
                              displayData();                                
                          }}
                          // change-color
                          style={{
                              color: "#15AEF2",
                              marginRight: "1.5vh",
                              cursor: "pointer",
                              border: "1px solid #15AEF2",
                              borderRadius: "12%",
                              width: "3.5vw",
                              height: "2.0vw",
                          }
                      }
                          />
                          
                          <Paper
                          // increase-width
                          style={{
                              width: "15vw",
                              height: "5vh",
                              border: "1px solid #15AEF2",
                          }}
                              component="form"
                              className={classes.searchpaper}
                              alignItems="center"
                          >
                              <InputBase
                                  className={classes.input}
                                  placeholder="Search Customer Id"
                                  inputProps={{
                                      "aria-label":
                                          "Search by Invoice Number",
                                      size: "small",
                                      style: {
                                          fontSize: "0.8rem",
                                          fontWeight: "bold",
                                      },
                                  }}
                                  onChange={optimisedSearch}
                              />
                          </Paper>
                      </Grid>
                      <Grid container item xs={5} justify="space-between">
                          <AddRecordCompone nt />
                          <EditRecordComponent
                          selected={selected}
                          onChange={handleEdit}
                          />
                          <DeleteRecordComponent
                              selected={selected}
                              remove={remove}
                              onChange={handleRemove}
                          />
                      </Grid>
                  </Grid>
              </Grid>

              {/* Data table */}

              <Grid xs={12} >
                      <TableContainer
                          className={classes.tablecontainer}
                          id="scrollableDiv"
                      >
                          <Table
                              className={classes.table + " " + classes.root}
                              stickyHeader
                              aria-label="sticky table"
                              size={"small"}
                          >
                              <TableHead>
                                  <TableRow>
                                      <TableCell>
                                          <Checkbox
                                              className={classes.checkboxhead}
                                              onChange={handleSelectAllClick}
                                              inputProps={{
                                                  "aria-label":
                                                      "select all invoice",
                                              }}
                                          />
                                      </TableCell>

                                      {headCells.map((headCell, index) => (
                                          <TableCell
                                              key={headCell.id}
                                              align="center"
                                              padding={
                                                  headCell.disablePadding
                                                      ? "none"
                                                      : "default"
                                              }
                                          >
                                              {headCell.label}
                                          </TableCell>
                                      ))}
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  { rowData
                                      .slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
                                      .map((row, index) => {
                                      const isItemSelected = isSelected(
                                          row.sl_no
                                      );
                                      const labelId = `enhanced-table-checkbox-${index}`;
                                      return (
                                          <TableRow
                                              key={row.sl_no}
                                              style={
                                                  isItemSelected
                                                      ? {
                                                            background:
                                                                "#2A5368",
                                                        }
                                                      : index % 2
                                                      ? {
                                                            background:
                                                                "#283A46",
                                                        }
                                                      : {
                                                            background:
                                                                "#273D49CC",
                                                        }
                                              }
                                              onClick={(event) =>
                                                  handleClick(
                                                      event,
                                                      row.sl_no
                                                  )
                                              }
                                              aria-checked={isItemSelected}
                                              tabIndex={-1} // to set table header tabIndex as -1
                                              selected={isItemSelected}
                                          >
                                              <TableCell>
                                                  <Checkbox
                                                      className={
                                                          classes.checkboxbodycell
                                                      }
                                                      checked={isItemSelected}
                                                      inputProps={{
                                                          "aria-labelledby":
                                                              labelId,
                                                      }}
                                                  />
                                              </TableCell>

                                              {/* Data insertion inside the row */}
                                              <TableCell align="center">
                                                  {row.sl_no}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.business_code}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.cust_number}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.clear_date}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.buisness_year.substring(0,4)}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.doc_id}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.posting_date}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.document_create_date}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.due_in_date}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.invoice_currency}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.document_type}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.posting_id}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.total_open_amount}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.baseline_create_date}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.cust_payment_terms}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {row.invoice_id}
                                              </TableCell>
                                          </TableRow>
                                      );
                                  })}
                              </TableBody>
                          </Table>
                      </TableContainer>   

                       <TablePagination 
                      // change color of text and bold the text
                      style={{
                          color: "#fff",
                          fontSize: "1.2rem",
                      }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rowData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />     
              </Grid> 
          </Paper>
          {/* create a div in center */}
         <Footer />
      </div>
  );
}