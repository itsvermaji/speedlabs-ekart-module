import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CssBaseline, Container, Paper, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
    justifyContent: 'center',
    marginRight: '100px',
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
}));

function createData(ID, Product, Category, Label, Students, Price, Actions) {
  return { ID, Product, Category, Label, Students, Price, Actions };
}

const rows = [
  createData('1', 'Science', 'Class 6', 'Private', 5000, 2000, 'Details'),
  createData('2', 'Mathmematics', 'Class 6', 'Private', 2000, 2000, 'Details'),
  createData('3', 'English', 'Class 6', 'Global', 3000, 2000, 'Details'),
];

export default function Course() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.buttonDiv}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className={classes.button}
          startIcon={<AddShoppingCartRoundedIcon />}
        >
          MarketPlace
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className={classes.button}
          startIcon={<AddCircleOutlineRoundedIcon />}
        >
          Create Course
        </Button>
      </div>
      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Product</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Label</TableCell>
                  <TableCell align="right">Students</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    <TableCell align="right">{row.Product}</TableCell>
                    <TableCell align="right">{row.Category}</TableCell>
                    <TableCell align="right">{row.Label}</TableCell>
                    <TableCell align="right">{row.Students}</TableCell>
                    <TableCell align="right">{row.Price}</TableCell>
                    <TableCell align="right">{row.Actions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
}
