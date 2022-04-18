import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  edit_main_btn: {
    marginLeft: theme.spacing(1),
    border: "1px solid #222",
    width: "10vw",
  },
  paper: {
    backgroundColor: theme.palette.primary.dark,
  },
  colorTextPrimary: {
    color: "white",
  },
  reset_btn: {
    marginLeft: theme.spacing(1),
    border: `1px solid ${theme.palette.secondary.main}`,
    color: "white",
    background: "#273D49CC",
  },
  save_btn: {
    marginRight: theme.spacing(1),
    color: "white",
  },
  cancel_btn: {
    color: theme.palette.secondary.light,
    marginRight: "12vw",
  },
  root: {
    maxWidth: 500,
    height: 500,
    margin: "auto",
  },
  TextField: {
    width: 250,
    height: 50,
    color: "white",
    padding: "0px 0px",
    fontSize: "1rem",
    // border: "1px solid #356680",
    borderRadius: "10px",
    opacity: "1",
    backgroundColor: "#fff",
    borderColor: "#356680",
  },
  label: {
    color: "#97A1A9",
  },
  editButtons: {
    marginLeft: theme.spacing(1),
    border: `1px solid ${theme.palette.secondary.main}`,
    color: "white",
    background: "#273D49CC",
  },
  root: {
    "& .MuiOutlinedInput-input": {
      padding: "16px 0px",
    },
    "& .MuiInputBase-input": {
      // color: "white",
      paddingLeft: "5px",
    },
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "40vw",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      paddingTop: "10px",
    },
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function EditDialogForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [invoiceCurrency, setInvoiceCurrency] = React.useState("");
  const [customerPaymentTerms, setCustomerPaymentTerms] = React.useState("");
  const [id, setId] = React.useState(props.selected);
  const [statusCode, setStatusCode] = React.useState(props.statusCode);
  const handleClickOpen = () => {
    setOpen(true);
    setStatusCode("");
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemove = () => {
    props.onChange(!props.remove);
  };
  const ids = props.selected;
  const handleEdit = () => {
    console.log("id", id);
    const config = {
      body: {
        ids,
        customerPaymentTerms,
        invoiceCurrency,
      },
    };

    axios.post(`${SERVER_URL}/EditRecord`, config).then((res) => {
      setStatusCode(res.status);
    });
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        className={classes.edit_main_btn}
        onClick={handleClickOpen}
      >
        Edit
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{
          paper: classes.paper,
          root: classes.root,
        }}
      >
        <div
          style={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <Typography variant="h6" style={{ color: "#FFFFFF" }}>
              Edit
            </Typography>
          </DialogTitle>
          {/* if status code is 200, then print success */}
          {statusCode === 500 && (
            <p
              style={{
                color: "#00b31e",
                fontSize: "1rem",
                fontWeight: "bold",
                marginLeft: "8vw",
                border: "1px solid #00b31e",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              Record Modified Successfully!! Status {statusCode}
            </p>
          )}
        </div>
        <DialogContent dividers>
          <Grid container spacing={1} direction="row">
            <Grid item>
              <TextField
                label="Invoice Currency"
                className={classes.TextField}
                onChange={(e) => setInvoiceCurrency(e.target.value)}
                type="text"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Customer Payment Terms"
                className={classes.TextField}
                onChange={(e) => setCustomerPaymentTerms(e.target.value)}
                type="string"
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            classes={{ containedPrimary: classes.primary }}
            variant="contained"
            size="small"
            color="#273D49CC"
            className={classes.editButtons}
            onClick={handleEdit}
            style={{
              color: "#FFFFFF",
              width: "47vw",
              borderBlockColor: "#14AFF1",
              borderColor: "#fff",
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="#273D49CC"
            size="small"
            onClick={handleClose}
            className={classes.editButtons}
            style={{
              color: "#FFFFFF",
              width: "47vw",
              borderBlockColor: "#14AFF1",
              borderColor: "#fff",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
