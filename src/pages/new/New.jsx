import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";

import { supabase } from "../../client";
import { useParams } from "react-router-dom";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";


function New() {
  const { idBill } = useParams();

  const [data, setData] = useState([]);
  const [dataBill, setDatabill] = useState([]);

  useEffect(() => {
    fetchBills();
    fetchBill();
  }, [])

  // truy vấn
  async function fetchBill() {

    const { data } = await supabase
      .from('Bill')
      .select('*')
      .eq('IdBill', idBill)
    setDatabill(data)
    // console.log(data)
  }


  async function fetchBills() {

    const { data } = await supabase
      .from('InvoiceDetails')
      .select('*,Book(*),Bill(*)')
      .eq('IdBill', idBill)
    setData(data)

  }
   var TotalMoney = 0
  {
    dataBill.map((post,index)=>(
      TotalMoney = post.TotalMoney
      ))
    
  }
  // console.log(TotalMoney)
  

  const items = data.map((post, index) => ({
    id: index,
    item: post.Book.NameBook,
    img: `https://fzcwotbqbzolyknivfmw.supabase.co/storage/v1/object/public/${post.Book.image}`,
    quantity: post.Amount,
    price: post.Book.Price,
  }));

  const rows = [
    ...items,
    { id: 'TAX', label: 'Giảm giá', taxRate: 0, taxTotal: 0},
    { id: 'TOTAL', label: 'Tổng tiền', total:TotalMoney+ " đ" },
  ];

  const baseColumnOptions = {
    sortable: false,
    pinnable: false,
    hideable: false,
  };

  const columns = [
    {
      field: 'item',
      headerName: 'Tên sách',
      ...baseColumnOptions,
      flex: 3,
      colSpan: ({ row }) => {
        if (row.id === 'SUBTOTAL' || row.id === 'TOTAL') {
          return 3;
        }
        if (row.id === 'TAX') {
          return 3;
        }
        return undefined;
      },
      valueGetter: ({ value, row }) => {
        if ( row.id === 'TAX' || row.id === 'TOTAL') {
          return row.label ;
        }
        return value;
      },
    },
    {
      field: 'img',
      headerName: 'Hình ảnh ',
      ...baseColumnOptions,
      flex: 2,
      colSpan: ({ row }) => {
        if (row.id === 'SUBTOTAL' || row.id === 'TOTAL') {
          return 3;
        }
        if (row.id === 'TAX') {
          return 2;
        }
        return undefined;
      },
      valueGetter: ({ value, row }) => {
        if ( row.id === 'TAX' || row.id === 'TOTAL') {
          return row.label ;
        }
        return value;
      },
      renderCell: (params) => {
        // console.log(params.formattedValue);
        return (
          <>
            <img style={{width:40,maxHeight:40}} src={params.formattedValue} />
          </>
        );
      }
    },
    {
      field: 'quantity',
      headerName: 'Số lượng',
      ...baseColumnOptions,
      flex: 1,
      sortable: false,
    },
    {
      field: 'price',
      headerName: 'Giá tiền',
      flex: 1,
      ...baseColumnOptions,
      valueGetter: ({ row, value }) => {
        if (row.id === 'TAX') {
          return `${row.taxRate}%`;
        }
        return value;
      },
    },
    {
      field: 'total',
      headerName: 'Thành tiền',
      flex: 1,
      ...baseColumnOptions,
      valueGetter: ({ row }) => {
        
        if (row.id === 'TAX') {
          return row.taxTotal;
        }
        if (row.id === 'TOTAL') {
          return row.total;
        }
        return (row.price * row.quantity)+" đ";
      },
    },
  ];

  const getCellClassName = ({ row, field }) => {
    if ( row.id === 'TOTAL' || row.id === 'TAX') {
      if (field==='item'   )  {
        return 'bold';
      }
    if ( row.id === 'TOTAL' ) {

      if(field === 'total'){
        return 'bold'
      }
    }
  }
    return '';
  };

  return (
    <div className="new">

      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Đơn Hàng: #{idBill} </h1>
          {
            dataBill.map((post, index) => (
              <div key={index}>
                <p>Ngày đặt hàng: {post.DateSetUp} </p>
              </div>

            ))
          }

        </div>
        <div className="bottom">
          <div className="title">
            <p>Danh sách sản phẩm</p>

          </div>

          <div className="Table">
            <Box
              sx={{
                width: '100%',
                '& .bold': {
                  fontWeight: 800,
                  fontSize: 15
                },
              }}
            >
              <DataGrid
                autoHeight
                disableExtendRowFullWidth
                disableColumnFilter
                disableSelectionOnClick
                hideFooter
                showCellRightBorder
                showColumnRightBorder
                getCellClassName={getCellClassName}
                components={{ Toolbar: GridToolbar }}
                columns={columns}
                rows={rows}
              />
            </Box>

          </div>

          {/* <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
          {/* <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button>Send</button>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default New;
