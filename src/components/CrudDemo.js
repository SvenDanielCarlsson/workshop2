import React, {useState} from 'react';

const CrudDemo = () => {
    

    //  States
    const allPersons = [
        {id: 1, name: "Daniel Storsten", email: "fake@mail.facom"},
        {id: 2, name: "Gustav Tros", email: "trosn@gunnar.facom"},
        {id: 3, name: "Mats Karlsson", email: "mats@karlsson.facom"}
    ];
    const [persons, setPersons] = useState(allPersons);
    const [person, setPerson] = useState({id: 0, name: "", email: ""});

    const TableHeader = () => {
        return(
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
        );
    };

    const TableRow = () => {
        return (
            <tbody>
                <tr>
                    <td>info</td>
                    <td>info</td>
                    <td>info</td>
                    <td><TableAction /></td>
                </tr>
            </tbody>

        );
    };

    const TableAction = () => {
        return(
            <ul className="nav">
                <li><input type="button" className="details" name="details" value="Details" /></li>
                <li><input type="button" className="bg-dark" name="delete" value="Delete" /></li>
                <li><input type="button" className="bg-light" name="edit" value="Edit" /></li>
            </ul>
        );
    }




    //  Return for CrudDemo, aka html presentation
    return(
        <div className="container">
            <h2>THIS IS CRUUUUUUD!</h2>
            <table className="table">
                <TableHeader/>
                <TableRow />
            </table>
        </div>
        );
};


export default CrudDemo;