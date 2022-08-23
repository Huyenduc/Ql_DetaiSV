import * as React from 'react';
import PropTypes from 'prop-types';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../../components/datatable/datatable.scss";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


import { supabase } from '../../client';
import { useEffect, useState } from "react";



export default function Books() {

    const [data, setData] = useState([]);
    const [Author, setAuthor] = useState([])
    const [Type, setType] = useState([])
    const [Publish, setPublish] = useState([])
    const [post, setPost] = useState({ NameBook: "", IdAuthor: "", IdType: "", Describe: "", IdPublish: "", Price: "" })
    const [image, setImage] = useState()
    const [avatarUrl, setAvatatUrl] = useState("")
    const { NameBook, IdAuthor, IdType, Describe, IdPublish, Price } = post


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        book();
        author();
        type();
        publish();
    }, [])

    const book = async () => {
        const { data } = await supabase
            .from("Book")
            .select('*,Author(*),Publish(*),BookType(*)')
        console.log(data)
        setData(data)
    }
    async function author() {
        const { data } = await supabase
            .from("Author")
            .select()
        setAuthor(data)
    }

    async function type() {
        const { data } = await supabase
            .from("BookType")
            .select()
        setType(data)
    }

    async function publish() {
        const { data } = await supabase
            .from("Publish")
            .select()
        setPublish(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let avatarUrl = ""

        if (image) {
            const { data, error } = await supabase.storage.from("avatars").upload(`${Date.now()}_${image.name}`, image)

            if (error) {
                alert("Chọn ảnh sách !")
                return
            }
            if (data) {
                setAvatatUrl(data.Key)
                avatarUrl = data.Key
            }
        }

        const { error } = await supabase
            .from('Book')
            .insert([{ NameBook, IdAuthor, IdType, IdPublish, Describe, image: avatarUrl, Price }])
            .single()
        setPost({ NameBook: "", IdAuthor: "", IdType: "", Describe: "", IdPublish: "", Price: "" })
        book()
        if (error) {
            console.log("Lỗi")
            alert("Thêm không thành công !")
            return
        }
        alert("Thêm thành công !")

    }
    // Xóa sách
    const remove = async (id) => {
        const { error } = await supabase
            .from('Book')
            .delete()
            .match({ idBook: id })

        if (error) {
            console.log("lỗi")
            alert("Không thể xóa lỗi khóa ngoại ! ")
            return
        }
        book()
    }


    const ExpandableCell = ({ value }) => {
        const [expanded, setExpanded] = React.useState(false);

        return (
            <Box>
                {expanded ? value : value.slice(0, 120)}&nbsp;
                {value.length > 200 && (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <Link
                        type="button"
                        component="button"
                        sx={{ fontSize: 'inherit' }}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? ' Ẩn bớt' : ' Xem thêm'}
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
        {
            field: 'Describe', headerName: "Mô tả", width: 400,
            renderCell: (params) => <ExpandableCell {...params} />,
        },
        { field: 'Year', headerName: "Năm xb", width: 80, editable: true },
        { field: 'Publisher', headerName: "Nhà xuất bản", width: 200, editable: true },
        { field: 'Price', headerName: "Giá", width: 100, editable: true },
        {
            field: 'actions',
            type: 'actions',
            width: 100,
            getActions: () => [
              <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
              <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
            ],
          },];


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
            type: 'action',

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

        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="Table">
                    <div className="TableTitle">
                        Thể loại sách
                        <button className="link" onClick={handleClickOpen}>
                            Thêm mới
                        </button>
                    </div>
                    <DataGrid
                        rows={rows}
                        columns={columns.concat(actionColumn)}
                        getEstimatedRowHeight={() => 100}
                        getRowHeight={() => 'auto'}
                        pageSize={10}
                        showCellRightBorder
                        showColumnRightBorder
                        experimentalFeatures={{ newEditingApi: true }}
                        initialState={{ pinnedColumns: { right: ['action'] } }}
                        checkboxSelection
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
                <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        Thêm Sách
                    </DialogTitle>
                    <DialogContent>
                        <form >
                            <div className='row '>
                                <div className="bottom">
                                    <div className="left">
                                        <img
                                            src={
                                                image
                                                    ? URL.createObjectURL(image)
                                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className="right">
                                        <form>
                                            <div className="formInput">
                                                <label htmlFor="file">
                                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                                </label>
                                                <input
                                                    type="file"
                                                    id="file"
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                    style={{ display: "none" }}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className='card-body'>

                                    <div className="row" >

                                        <div className="form-group " >
                                            <label className="required">Nhập tên sách</label>
                                            <input type="text" className="form-control "
                                                value={NameBook}
                                                onChange={e => setPost({ ...post, NameBook: e.target.value })}></input>
                                        </div>

                                        <div className="form-group " style={{ marginTop: 20 }}>
                                            <label className="required">Chọn tác giả</label>
                                            <select className='form-control' onChange={(e) => { setPost({ ...post, IdAuthor: e.target.value }) }}>
                                                <option >- Chọn - </option>
                                                {
                                                    Author.map((post) => (
                                                        <option value={post.IdAuthor} key={post.id}>{post.NameAuthor} </option>))
                                                }
                                            </select>
                                        </div>

                                        <div className="form-group " style={{ marginTop: 20 }}>
                                            <label className="required">Chọn thể loại</label>
                                            <select className='form-control' onChange={(e) => { setPost({ ...post, IdType: e.target.value }) }}>
                                                <option >- Chọn - </option>
                                                {
                                                    Type.map((post) => (
                                                        <option value={post.idType} key={post.id}>{post.NameType} </option>))
                                                }
                                            </select>
                                        </div>

                                        <div className="form-group " style={{ marginTop: 20 }}>
                                            <label className="required">Chọn Nhà xuất bản</label>
                                            <select className='form-control' onChange={(e) => { setPost({ ...post, IdPublish: e.target.value }) }}>
                                                <option >- Chọn - </option>
                                                {
                                                    Publish.map((post) => (
                                                        <option value={post.IdPublish} key={post.id}>{post.Publisher} </option>))
                                                }
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1" style={{ marginTop: 10 }}>Nhập mô tả</label>
                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="4"
                                                value={Describe}
                                                onChange={e => setPost({ ...post, Describe: e.target.value })}></textarea>
                                        </div>

                                        <div className="form-group " style={{ marginTop: 20 }}>
                                            <label className="required">Nhập giá sách </label>
                                            <input type="text" className="form-control "
                                                value={Price}
                                                onChange={e => setPost({ ...post, Price: e.target.value })}></input>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <div className='button'>
                            <button onClick={handleSubmit} type="reset" value="Reset" className='btn btn-primary text-center'>Thêm</button>
                            <button onClick={() => setOpen(false)} className='btn btn-danger' type="reset" value="Reset" style={{ marginLeft: 20 }}>Đóng</button>
                        </div>

                    </DialogActions>

                </Dialog>
            </div>
            </div>
        </div>
    );
}
