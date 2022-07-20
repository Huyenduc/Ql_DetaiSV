// import "./datable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from '../client';
import { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";


const Customer = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        author();
    }, [])

    const author = async () => {
        const { data } = await supabase
            .from("Customer")
            .select('*')
        console.log(data)
        setData(data)
    }

    const remove = async (id) => {
        const { error } = await supabase
            .from('Customer')
            .delete()
            .match({ IdAuthor: id })

        if (error) {
            console.log("lỗi")
            alert("Không thể xóa lỗi khóa ngoại ! ")
            return
        }

        author()
    }

    const rows = data.map((post) => ({
        id: post.IdCustomer,
        name: post.NameCustomer,
        year: post.Address,
        Hometown: post.Phone
    }));

    const Columns = [
        { field: 'id', headerName: "ID", width: 70, height: 100 },
        { field: 'name', headerName: "Tên Khách hàng", width: 200, editable: true },
        { field: 'year', headerName: "Địa chỉ", width: 300, editable: true },
        { field: 'Hometown', headerName: "Số điện thoại", width: 100, editable: true }];

    // const actionColumn = [
    //     {
    //         field: "action",
    //         headerName: "Action",
    //         width: 200,
    //         renderCell: (params) => {
    //             return (
    //                 <div className="cellAction">
    //                     <Link to="/users/test" style={{ textDecoration: "none" }}>
    //                         <div className="viewButton">View</div>
    //                     </Link>
    //                     <div
    //                         className="deleteButton"
    //                         onClick={() => { if (window.confirm("Bạn có muốn xóa không")) remove(params.row.id) }}
    //                     >
    //                         Delete
    //                     </div>
    //                 </div>
    //             );
    //         },
    //     },
    // ];
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="Table">
                    <div className="TableTitle">
                        Thông tin khách hàng
                        {/* <Link to="/users/new" className="link">
                            Thêm mới
                        </Link> */}
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={rows}
                        columns={Columns}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        checkboxSelection
                    />

                </div>
            </div>
        </div>
    );
};

export default Customer;
