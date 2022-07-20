// import "./datable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from '../client';
import { useEffect } from "react";


const TypeBook = () => {

  const [data, setData] = useState([]);
  const [post, setPost] = useState({ NameType: "" })
  const { NameType } = post

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    bookType()
  }, [])

  const bookType = async () => {
    const { data } = await supabase
      .from("BookType")
      .select('*')
    console.log(data)
    setData(data)
  }

  async function createPost() {
    const { error } = await supabase
      .from('BookType')
      .insert([{ NameType }])
      .single()

    setPost({ NameType })
    bookType()
    if (error) {
      console.log("Lỗi")
      alert("Thêm không thành công !")
      return
    }
    alert("Thêm thành công !")

  }

  const remove = async (id) => {
    const { error } = await supabase
      .from('BookType')
      .delete()
      .match({ idType: id })

    if (error) {
      console.log("lỗi", error)
      alert("Không thể xóa lỗi khóa ngoại ! ")
      return
    }

    bookType()
  }

  const rows = data.map((post) => ({
    id: post.idType,
    nametype: post.NameType
  }));

  const Columns = [

    { field: 'id', headerName: "ID", width: 70, height: 100 },
    { field: 'nametype', headerName: "Thể loại sách", width: 400, editable: true }];


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
    <form>
      <div className="Table">
        <div className="TableTitle">
          Thể loại sách
          <div className='col-sm-4'>
            <div className="form-group ">
              <input type="text" className="form-control "
                value={NameType}
                onChange={e => setPost({ ...post, NameType: e.target.value })}></input>
            </div>
          </div>
          <div>
            <button onClick={createPost} className='link' style={{ marginLeft: 50 }}>Thêm</button>
          </div>
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
    </form>
  );
};

export default TypeBook;
