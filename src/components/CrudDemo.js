import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CrudDemo = () => {
    
    const [persons, setPersons] = useState([]);
    const [person, setPerson] = useState({id: 0, name: "", email: ""});

    const API_URL = "https://localhost:44342/People";
 
    
    useEffect(() => {
        
        const getApi = async () => {
            const response = await axios.get(API_URL);
            if(response.status === 200){
                console.log("Get API successfull");
                console.log(response.data);
                setPersons(response.data);
            }else{
                console.log("Get API failed")
            }
        };

        getApi();

    }, []); // empty [] means it will only run once

    
    const TableHeader = () => {
        return(
            <thead>
            <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        );
    };
    
    const TableAction = () => {
        return(
            <ul className="nav">
                <li><input type="button" className="btn btn-primary" name="details" value="Details" /></li>
                <li><input type="button" className="btn btn-danger" name="delete" value="Delete" /></li>
                <li><input type="button" className="btn btn-warning" name="edit" value="Edit" /></li>
            </ul>
        );
    };

    const TableRow = (props) => {
    return <tbody>
            {
                props.people.map(showPeople=>{

                    const cyclePeople=<tr key={showPeople.id}>
                        <td>{showPeople.id}</td>
                        <td>{showPeople.firstName}</td>
                        <td>{showPeople.lastName}</td>
                        <td>{showPeople.email}</td>
                        <td><TableAction /></td>
                    </tr>

                    return cyclePeople;
                })
            }
        </tbody>
    };


    const Table = () => {
        return <div className="container">
                <br/>
                <h3>List Of People</h3>
                <table className="table">
                    <TableHeader/>
                    <TableRow people={persons} />
                </table>
            </div>
    };

    
    return(Table());    //  Return for CrudDemo
};


export default CrudDemo;