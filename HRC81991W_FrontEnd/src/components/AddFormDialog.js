import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const useStyle = makeStyles((theme) => ({
  add: {
    marginLeft: theme.spacing(1),
    width: "10vw",
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.primary.main,
    background: "#273D49CC",
  },
  root: {
    maxWidth: 900,
    height: 500,
    margin: "auto",
  },
  paperWidthSm: {
    maxWidth: 1900,
  },
  label: {
    color: "#97A1A9",
  },
  button: {
    float: "right",
  },
  TextField: {
    width: 300,
    height: 60,
    color: "white",
    padding: "0px 0px",
    fontSize: "1rem",
    border: "1px solid #356680",
    borderRadius: "10px",
    opacity: "1",
    backgroundColor: "#fff",
    borderColor: "#356680",
  },
  colour: {
    borderColor: "#14AFF1",
  },
  root: {
    "& .MuiOutlinedInput-input": {
      // padding: "5px 0px",
    },
    "& .MuiInputBase-input": {
      // color: "white",
      paddingLeft: "5px",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      paddingTop: "10px",
    },
  },
}));
export default function AddFormDialog() {
  const [open, setOpen] = React.useState(false);
  const [businessCode, setBusinessCode] = useState("");
  const [customerNumber, setCustomerNumber] = useState(0);
  const [clearDate, setClearDate] = useState(new Date());
  const [businessYear, setBusinessYear] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [postingDate, setPostingDate] = useState(new Date());
  const [documentCreateDate, setDocumentCreateDate] = useState(
    new Date().getFullYear()
  );
  const [dueDate, setDueDate] = useState(new Date());
  const [invoiceCurrency, setInvoiceCurrency] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [postingId, setPostingId] = useState(0);
  const [totalOpenAmount, setTotalOpenAmount] = useState(0);
  const [baselineCreateDate, setBaselineCreateDate] = useState(
    new Date().getFullYear()
  );
  const [customerPaymentTerms, setCustomerPaymentTerms] = useState("");
  const [invoiceId, setInvoiceId] = useState(1);

  const [statusCode, setStatusCode] = useState("");

  const classes = useStyle();
  const handleClickOpen = () => {
    setOpen(true);
    setStatusCode("");
  };
  const handleClose = () => {
    setOpen(false);
  };

  const DialogActions = withStyles((theme) => ({
    root: {
      backgroundColor: "#2A3E4C",
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit,
    },
  }))(MuiDialogActions);
  const handleAddNew = () => {
    const config = {
      body: {
        businessCode,
        customerNumber,
        clearDate,
        businessYear,
        documentId,
        postingDate,
        documentCreateDate,
        dueDate,
        invoiceCurrency,
        documentType,
        postingId,
        totalOpenAmount,
        baselineCreateDate,
        customerPaymentTerms,
        invoiceId,
      },
    };
    // handleClose();

    axios.post(`${SERVER_URL}/AddRecord`, config).then((res) => {
      setStatusCode(res.status);
      console.log(res.status);
    });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="#273D49CC"
        size="small"
        onClick={handleClickOpen}
        className={classes.add}
      >
        Add
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: classes.paper,
          root: classes.root,
          paperWidthSm: classes.paperWidthSm,
        }}
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ backgroundColor: "#2A3E4C" }}
        >
          <font color="white">Add</font>
          {/* print the status code */}
          <div
            className="statusCode"
            style={{
              display: "inline-block",
            }}
          >
            {/* if status code is 200, then print success */}
            {statusCode === 200 && (
              <p
                style={{
                  color: "#00b31e",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  marginLeft: "30vw",
                  border: "1px solid #00b31e",
                  borderRadius: "10px",
                  padding: "8px",
                }}
              >
                Record Inserted Successfully!! Status: {statusCode}
              </p>
            )}
            {/* if status code is not 200, then print error */}
            {statusCode > 200 && (
              <p
                style={{
                  color: "red",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                Error {statusCode}
              </p>
            )}
          </div>
          <Button
            aria-label="close"
            onClick={handleClose}
            endIcon={<CloseIcon />}
            className={classes.button}
          >
            {" "}
          </Button>
        </DialogTitle>

        <DialogContent
          style={{
            backgroundColor: "#2A3E4C",
            margin: 0,
            padding: "1 px solid",
          }}
        >
          <form>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={3}>
                <TextField
                  value={businessCode}
                  onChange={(e) => setBusinessCode(e.target.value)}
                  label="Business Code"
                  className={classes.TextField}
                  type="String"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  value={customerNumber}
                  onChange={(e) => setCustomerNumber(e.target.value)}
                  label="Customer Number"
                  className={classes.TextField}
                  type="number"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  value={clearDate}
                  onChange={(e) => setClearDate(e.target.value)}
                  label="Clear Date"
                  InputLabelProps={{ shrink: true }}
                  className={classes.TextField}
                  type="date"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  value={businessYear}
                  onChange={(e) => setBusinessYear(e.target.value)}
                  label="Business Year"
                  className={classes.TextField}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  value={documentId}
                  onChange={(e) => setDocumentId(e.target.value)}
                  label="Document Id"
                  className={classes.TextField}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  value={postingDate}
                  onChange={(e) => setPostingDate(e.target.value)}
                  label="Posting Date"
                  className={classes.TextField}
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  value={documentCreateDate}
                  onChange={(e) => setDocumentCreateDate(e.target.value)}
                  label="Document Create Date"
                  className={classes.TextField}
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  label="Due Date"
                  className={classes.TextField}
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  value={invoiceCurrency}
                  onChange={(e) => setInvoiceCurrency(e.target.value)}
                  label="Invoice Currency"
                  className={classes.TextField}
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  label="Document Type"
                  className={classes.TextField}
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  value={postingId}
                  onChange={(e) => setPostingId(e.target.value)}
                  label="Posting Id"
                  className={classes.TextField}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  value={totalOpenAmount}
                  onChange={(e) => setTotalOpenAmount(e.target.value)}
                  label="Total Open Amount"
                  className={classes.TextField}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  value={baselineCreateDate}
                  onChange={(e) => setBaselineCreateDate(e.target.value)}
                  label="Baseline Create Date"
                  className={classes.TextField}
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  value={customerPaymentTerms}
                  onChange={(e) => setCustomerPaymentTerms(e.target.value)}
                  label="Customer Payment Terms"
                  className={classes.TextField}
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  value={invoiceId}
                  onChange={(e) => setInvoiceId(e.target.value)}
                  label="Invoice Id"
                  className={classes.TextField}
                  type="number"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>

        <DialogActions>
          <div className="ButtonHeader">
            <div className="right">
              <Button
                variant="outlined"
                color="#2C404E"
                className={classes.colour}
                style={{
                  color: "#FFFFFF",
                  margin: "0 10px 0 0",
                  width: "47vw",
                  borderBlockColor: "#14AFF1",
                  borderColor: "#fff",
                }}
                onClick={handleAddNew}
              >
                Add
              </Button>
              <Button
                variant="outlined"
                color="#2C404E"
                className={classes.colour}
                style={{
                  color: "#FFFFFF",
                  width: "47vw",
                  borderBlockColor: "#14AFF1",
                  borderColor: "#fff",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
