// import { Box, Typography } from '@mui/material'
import { Box, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Action } from '../../../Images/Icons/icons';
import axios from 'axios';
import Container from '../../Layout/Containre';
import { useSelector } from 'react-redux';



function CardBox() {
  const [data, setData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const {signup} = useSelector(state => state)
  console.log('SignUn Datas:- ', signup.entities);

  let user = JSON.parse(localStorage.getItem('user')).logged
  console.log('local user', JSON.parse(user));

  const SearchHandle = (e) => {
    setSearchText(e.target.value)
  }
  console.log(searchText);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); // Replace with your API endpoint
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    // setUserLogged(user !== null)
    // console.log(data);
    // Function to fetch data from the API

    fetchData();

  }, []);

  return (
    <>
      <Container>
        <Box className="header-text">
          <Typography variant="h1" sx={{fontSize: '32px', textAlign: 'start', paddingTop: '20px'}} color="white">Comment List</Typography>
        </Box>
        {data ? (
          <>

            <Box sx={{ padding: '20px 0', position: 'sticky', top: '60px', backgroundColor: '#000' }}>
              <TextField
                type='text'
                placeholder="Search here"
                name="search"
                value={searchText}
                onChange={SearchHandle}
                sx={{ gridColumn: '1 / full' }}
              />

            </Box>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px',
              p: '0 0 20px'
            }}>
              {
                
                data?.length > 0 ? (
                  data
                    .filter(item => item.body.includes(searchText) || item.title.includes(searchText))
                    .map(item => (
                      
                      <Box
                        key={item.id}
                        area-id={item.id}
                        area-label={item.userId}
                        sx={{
                          padding: '10px 20px',
                          border: '1px solid #fff',
                        }}
                      >          {console.log(data.length)}
                        <Typography variant="body2" sx={{ pb: '10px', lineHeight: '1.3', color: 'red' }}>
                          No: {item.id}
                        </Typography>
                        <Typography variant="body2" sx={{ pb: '10px', lineHeight: '1.3' }}>
                          {item.userId}. {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '12px', color: '#adadad' }}>
                          {item.body}
                        </Typography>
                      </Box>
                    ))
                ) : (
                  <Box className="Error"
                    sx={{
                      padding: '10px 20px',
                      border: '1px solid #fff',
                    }}>
                    <Typography variant="h1" sx={{ pb: '10px', lineHeight: '1.3', color: 'white' }}>
                      Data not found
                    </Typography>
                  </Box>
                )
              }
            </Box>
          </>
        ) : (
          <Typography variant="body2" sx={{
            padding: '3px 20px',
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}><Action /></Typography>
        )}
      </Container>
    </>
  )
}

export default CardBox
