import React from 'react';
import { Link } from 'react-router-dom';
import { Button, CssBaseline, Container, Typography } from '@material-ui/core';

const Entry = () => {
  return (
    <div className="Entry">
		  <CssBaseline />
      <Container fixed>
        <Typography component="div" style={{ height: '100vh', backgroundColor: '#fff' }}>
          <Typography component="h1" align="right" style={{ backgroundColor: '#fff', padding: '64px 0', fontSize: '24px' }} >
            Graffiti
          </Typography>
          <Typography component="div" align="center">
            <Button variant="contained" color="primary">
              <Link style={{textDecoration: 'none', color: 'inherit'}} to='/room/create/'>
                ルームを作る
              </Link>
            </Button>
          </Typography>
          <Typography component="div" align="center">
            <Button color="primary">
              <Link style={{textDecoration: 'none', color: 'inherit'}} to='/room/join/'>
                ルームに参加
              </Link>
            </Button>
          </Typography>
        </Typography>
      </Container>
    </div>
  );
};

export default Entry;
