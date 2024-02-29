import ReactPaginate from 'react-paginate';
import { ToastContainer,toast,Bounce } from "react-toastify";
import { useEffect, useState,useRef } from "react";
import axios from "axios";


const Employees = () => {
 
const [data,setData]=useState([]);

const currentpage=useRef();
const [limit,setLimit]=useState(2);
const [pageCount,setPageCount]=useState([]);
useEffect(()=>{currentpage.current=1;
  getPaginatedUsers();},[]);

function handlePageChange(e){
 currentpage.current=e.selected+1;
  getPaginatedUsers();
}
function changeLimit(){
  getPaginatedUsers
}

  const handleEdit = (employeeId) => {
    
    console.log(`Edit employee with ID ${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    try {
      if (employeeId === undefined) {
        console.error('Employee ID is undefined');
        return;
      }
      
      const response = await axios.delete(`http://localhost:3000/employeelist/${employeeId}`)
      if (response.status === 200) {
        toast.info(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        } else {
          toast.error("Failed to delete employee", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
      }
    } catch (error) {
      toast.error("Error deleting employee", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };
  function getPaginatedUsers() {
    axios.get(`http://localhost:3000/employeelist?page=${currentpage.current}&limit=${limit}`)
      .then((response) => {
       
       console.log(response.data);
       setPageCount(parseInt(response.data.results.pagecount, 10) || 1);

        setData(response.data.results.result2)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
       
      });
  }
  return (
    <>
      <div className="flex items-start justify-between mx-3">
        <h1 className="mb-8 text-xl">Employees</h1>
      </div>

      <section className="mx-auto w-full px-4 py-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Age</th>
              <th className="py-2">Department</th>
              <th className="py-2">Salary</th>
              <th className="py-2">Hire Date</th>
              <th className="py-2">Marital Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody> 
            {data.map((i) => (
              <tr key={i.empId}>
                {i.id}
                <td className="py-2">{i.empId}</td>
                <td className="py-2">{i.name}</td>
                <td className="py-2">{i.age}</td>
                <td className="py-2">{i.dept}</td>
                <td className="py-2">{i.salary}</td>
                <td className="py-2">{i.hiredate}</td>
                <td className="py-2">{i.martial_status}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleEdit(i.id)}
                  
                    className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i.empId)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ReactPaginate
  breakLabel="..."
  nextLabel="next >"
  onPageChange={handlePageChange}
  pageRangeDisplayed={5}
  pageCount={pageCount}
  previousLabel="< previous"
  renderOnZeroPageCount={null}
  marginPagesDisplayed={2}
  containerClassName="flex items-center justify-center space-x-2 mt-4"
  pageClassName="px-3 py-2 border rounded hover:bg-orange-200"
  pageLinkClassName="text-black-500"
  previousClassName="px-3 py-2 border rounded hover:bg-orange-300"
  previousLinkClassName="text-black-500"
  nextClassName="px-3 py-2 border rounded hover:bg-orange-300"
  nextLinkClassName="text-black-500"
  activeClassName="bg-orange-500 text-white"
/><input
    className="px-3 py-2 border rounded mt-4"
    type="text"
    placeholder="Limit"
    onChange={(e) => setLimit(e.target.value)}
  />
  <button
    className="px-3 py-2 bg-orange-500 text-white rounded mt-2"
    onClick={changeLimit}
  >
    Change limit
  </button>
      </section>
        <ToastContainer
  position="top-center"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
  transition={Bounce}  
/>
    </>
  );
};

export default Employees;
