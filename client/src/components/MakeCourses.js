import React from "react";
import Courses from "../Pages/Courses";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";

const MakeCourses = () => {
  return (
    <>
      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <Courses />
        </Paper>
      </Container>
    </>
  );
};

export default MakeCourses;
