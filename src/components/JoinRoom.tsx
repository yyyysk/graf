import React from 'react';
import { Link } from 'react-router-dom';
import { Button, CssBaseline, Container, Typography, TextField } from '@material-ui/core';

const JoinRoom = () => {
  return (
    <div className="Entry">
		  <CssBaseline />
        <Container fixed>
          <Typography component="div" style={{ height: '100vh', backgroundColor: '#fff' }}>
            <Typography component="h2" align="left">Graffiti</Typography>
            <form noValidate autoComplete="off">
              <Typography component="div" align="center" style={{margin: '8px'}}>
                <TextField id="standard-basic" label="Room名" />
              </Typography>
              <Typography component="div" align="center">
                <Button variant="contained" color="primary">
                  参加
                </Button>
              </Typography>
              <Typography component="div" align="center">
                <Button color="primary">
                  <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
                    キャンセル
                  </Link>
                </Button>
              </Typography>
            </form>
          </Typography>
        </Container>
    </div>
  );
};

export default JoinRoom;
