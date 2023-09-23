import React, {useState, useEffect} from 'react';
import { alluser } from "../../api";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";


function AllUser() {
    const [data , setData] = useState([]);

    const navigate = useNavigate();

	const handleRegistration = () => {
		navigate('/')
	}

    const getAllUserList = async () => {
        const result = await alluser();
        // console.log(result);
        setData(result.data);
    };

    useEffect(() => {
        getAllUserList();
      }, []);

  return (
    <div>
        <h1 className='mt-5 px-3'>All User Data</h1>
         <table className='mt-5'>
      <thead>
        <tr className='px-5'>
          <th className='px-5'>First Name</th>
          <th className='px-5'>Last Name</th>
          <th className='px-5'>Email</th>
          <th className='px-5'>Country</th>
          <th className='px-5'>State</th>
          <th className='px-5'>City</th>
          <th className='px-5'>Gender</th>
          <th className='px-5'>Dob</th>

        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
           <td className='px-5'>{row.firstname}</td>
          <td className='px-5'>{row.lastname}</td>
          <td className='px-2'>{row.email}</td>
          <td className='px-5'>{row.country}</td>
          <td className='px-5'>{row.state}</td>
          <td className='px-5'>{row.city}</td>
          <td className='px-5'>{row.gender}</td>
          <td className='px-3'>{row.dob}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Button onClick={handleRegistration} className="mt-3 mx-3">
          Register new user
        </Button>

    </div>
  )
}

export default AllUser