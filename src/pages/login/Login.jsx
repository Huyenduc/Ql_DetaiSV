import * as React from 'react';
import PropTypes from 'prop-types';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { supabase } from '../../client';
import { useEffect, useState } from "react";



export default function ExpandableCells() {

  const [data, setData] = useState([]);

  useEffect(() => {
    book();
  }, [])

  const book = async () => {
    const { data } = await supabase
      .from("Book")
      .select('*,Author(*),Publish(*),BookType(*)')
    console.log(data)
    setData(data)
  }
  const ExpandableCell = ({ value }) => {
    const [expanded, setExpanded] = React.useState(false);

    return (
      <Box>
        {expanded ? value : value.slice(0, 200)}&nbsp;
        {value.length > 200 && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link
            type="button"
            component="button"
            sx={{ fontSize: 'inherit' }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'view less' : 'view more'}
          </Link>
        )}
      </Box>
    );
  };

  ExpandableCell.propTypes = {
    /**
     * The cell value, but if the column has valueGetter, use getValue.
     */
    value: PropTypes.any,
  };

  const columns = [

    { field: 'id', headerName: "ID", width: 70, height: 100 },
    { field: 'NameBook', headerName: "Tên sách", width: 200, editable: true },
    { field: 'NameType', headerName: "Thể loại", width: 200, editable: true },
    { field: 'IdAuthor', headerName: "Tên tác giả", width: 200, editable: true },
    { field: 'Describe', headerName: "Mô tả", width: 400,
     renderCell: (params) => <ExpandableCell {...params} />,
    },
    { field: 'Year', headerName: "Năm xb", width: 80, editable: true },
    { field: 'Publisher', headerName: "Nhà xuất bản", width: 200, editable: true },
    { field: 'Price', headerName: "Giá", width: 100, editable: true }];
  

  const rows = data.map((post) => ({
    id: post.idBook,
    NameBook: post.NameBook,
    NameType: post.BookType.NameType,
    IdAuthor: post.Author.NameAuthor,
    Year: post.Publish.YearRepublishment,
    Publisher: post.Publish.Publisher,
    Price: post.Price,
    Describe: post.Describe

  }))

  const actionColumn = [
    {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
            return (
                <div className="cellAction">
                    <Link to="/users/test" style={{ textDecoration: "none" }}>
                        <div className="viewButton">View</div>
                    </Link>
                    <div
                        className="deleteButton"
                    >
                        Delete
                    </div>
                </div>
            );
        },
    },
];



  return (
    <div style={{ height: 800, width: 800 }}>
      <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        getEstimatedRowHeight={() => 80}
        getRowHeight={() => 'auto'}
        components={{ Toolbar: GridToolbar }}
        sx={{
          '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
            py: 1,
          },
          '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
            py: '15px',
          },
          '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
            py: '22px',
          },
        }}
      />
    </div>
  );
}
