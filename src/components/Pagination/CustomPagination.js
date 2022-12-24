import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import './CustomPagination.css'

const CustomPagination = ({setPage, numOfPages = 10}) => {
  
  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo(0,0);
  }

  return (
    <div style={{
      width:'100%',
      display:'flex',
      justifyContent:'center',
      margin:'1.5rem 0'
    }}>
      <Pagination
      count={numOfPages}
      variant="outlined"
      onChange= {(e) => { handlePageChange(e.target.textContent) }}
      hideNextButton
      hidePrevButton
      />
    </div>
  );
}

export default CustomPagination