// import "./datable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import DialogTitle from '@mui/material/DialogTitle';
import { supabase } from '../client';
import { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";


const IdPublish = () => {

    const [data, setData] = useState([]);
    const [post, setPost] = useState({ Republishment: "", YearRepublishment: "", Publisher: "" })
    const { Republishment, YearRepublishment, Publisher } = post

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        publish();
    }, [])

    const publish = async () => {
        const { data } = await supabase
            .from("Publish")
            .select('*')
        console.log(data)
        setData(data)
    }
    async function createPost() {
        const { error } = await supabase
            .from('Publish')
            .insert([{ Republishment, YearRepublishment, Publisher }])
            .single()
        setPost({ Republishment: "", YearRepublishment: "", Publisher: "" })
        publish()
        if (error) {
            console.log("Lỗi")
            alert("Thêm không thành công !")
            return
        }
        alert("Thêm thành công !")

    }

    const remove = async (id) => {
        const { error } = await supabase
            .from('Publish')
            .delete()
            .match({ IdPublish: id })

        if (error) {
            console.log("lỗi")
            alert("Không thể xóa lỗi khóa ngoại ! ")
            return
        }

        publish()
    }

    const rows = data.map((post) => ({
        id: post.IdPublish,
        name: post.Republishment,
        year: post.YearRepublishment,
        Hometown: post.Publisher
    }));

    const Columns = [

        { field: 'id', headerName: "ID", width: 70, height: 100 },
        { field: 'name', headerName: "Lần tái bản", width: 200, editable: true },
        { field: 'year', headerName: "Năm xuất bản", width: 150, editable: true },
        { field: 'Hometown', headerName: "Nhà xuất bản", width: 400, editable: true }];


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
                            onClick={() => { if (window.confirm("Bạn có muốn xóa không")) remove(params.row.id) }}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="Table">
                    <div className="TableTitle">
                        Quản lí nhà xuất bản
                        <button onClick={handleClickOpen} className="link">
                            Thêm mới
                        </button>
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={rows}
                        columns={Columns.concat(actionColumn)}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        checkboxSelection
                    />

                </div>
                <div>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>
                            Thêm nhà xuất bản
                        </DialogTitle>
                        <DialogContent>
                            <form >
                                <div className="row" >
                                    <div  >
                                        <div className="form-group ">
                                            <label className="required">Nhập lần tái bản</label>
                                            <input type="text" className="form-control "
                                                value={Republishment}
                                                onChange={e => setPost({ ...post, Republishment: e.target.value })}></input>
                                        </div>

                                        <div className="form-group " style={{ marginTop: 20 }}>
                                            <label className="required">Nhập năm tái bản</label>
                                            <input type="text" className="form-control "
                                                value={YearRepublishment}
                                                onChange={e => setPost({ ...post, YearRepublishment: e.target.value })}></input>
                                        </div>

                                        <div className="form-group " style={{ marginTop: 20 }}>
                                            <label className="required">Nhập nhà xuất bản</label>
                                            <input type="text" className="form-control "
                                                value={Publisher}
                                                onChange={e => setPost({ ...post, Publisher: e.target.value })}></input>
                                        </div>
                                    </div>



                                </div>


                            </form>
                        </DialogContent>
                        <DialogActions>
                            <div className='button'>
                                <button onClick={createPost} type="reset" value="Reset" className='btn btn-primary text-center'>Thêm</button>
                                <button onClick={() => setOpen(false)} className='btn btn-danger' type="reset" value="Reset" style={{ marginLeft: 20 }}>Đóng</button>
                            </div>

                        </DialogActions>

                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default IdPublish;
