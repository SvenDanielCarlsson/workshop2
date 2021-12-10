import {BrowserRouter as Router, Route, Switch, Link, useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CrudDemo = () => {
    
    const [persons, setPersons] = useState([]);
    let personDetailToggle = 0;

    const API_URL = "https://localhost:44342/People";
 
    function Initialize() {
        useEffect(() => {
        
            const getApi = async () => {
                const response = await axios.get(API_URL);
                if(response.status === 200){
                    setPersons(response.data);
                    console.log("Get API successfull");
                    //console.log(response.data);
                }else{
                    console.log("Get API failed")
                }
            };
    
            getApi();
    
        }, []); // empty [] means it will only run once
    }
    Initialize();

    function KladdFunktion() {
        const [girl, setGirl] = useState([]);

        useEffect(() => {
        
            const getApin = async () => {
                setGirl(persons);
                console.log("MIKKA");
                console.log(girl);
            };  
            
            getApin();
        }, []); // empty [] means it will only run once
    }
    //KladdFunktion();



    const PersonDetails = ({data}) => {

        const { id } = useParams();
        const [person, setPerson] = useState([]);
        
        console.log("useParams saaaays: ", id);

        useEffect(()  => {
            const getPerson = async () => {
                //await setPerson(persons[id-1]);   //works but is wrong, aka not from API
                const response = await axios.get(API_URL + '/' + id);
                if(response.status === 200){
                    setPerson(response.data);
                    console.log("Get Person successfull");
                    
                    personDetailToggle = 1;
                }else{
                    console.log("Get Person failed")
                }
            };

            getPerson();
        }, [])

        return(
            console.log("fakedelete"),
            <div className="container">
                <br />
                <h1>Person Information</h1><br />
                <h3>{person.title}</h3><br />
                <h5>Id: {person.id}</h5>
                <h5>Name: {person.firstName} {person.lastName}</h5>
                <h5>{person.email}</h5>
            </div>
            );  // Return for PersonDetails
    }
    
    /*type FormValues ={
        firstName: String;
        lastName: String;
        email: String;
        title: String;
    };*/
    const Form = () => {
        
        /*const { register } = useForm({
            mode: 'onSubmit',
            reValidateMode: 'onChange',
            defaultValues: {},
            resolver: undefined,
            context: undefined,
            criteriaMode: "firstError",
            shouldFocusError: true,
            shouldUnregister: false,
            shouldUseNativeValidation: false,
            delayError: undefined
          })
        */
          const { register, handleSubmit, reset } = useForm();
        
          return(
              <div className="container">
                <br />
                <form onSubmit={handleSubmit((data) =>{console.log(data)})}>
                    <headers>Feel free to add a person</headers><br />

                    <div>
                    <label for="firstName">First Name</label><br/>
                    <input type="text" {...register("firstName", { required:true, minLength:2, maxLength:25 })} id="firstName" />
                    </div>
                    <label for="lastName">Last Name</label><br/>
                    <input type="text" {...register("lastName", { required: true, minLength:2, maxLength:25 })} id="lastName" />
                    <br />
                    <label for="email">Email</label><br />
                    <input type="email" {...register("email", { required: true })} id="email" />
                    <br/>
                    <label for="title">Title</label><br />
                    <input type="text" {...register("title", { required: true, minLength:2, maxLength: 30})} id="title" />
                    <br />
                    <input type="submit" />
                    <input type="reset" onClick={() => reset({ firstName: "", lastName: "", email: "", title: ""}) }/>
                </form>
              </div>
          )
    }

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
    
    const TableAction = (props) => {
        
        return(
            <ul className="nav">
                <li><input type="button" className="btn btn-primary" name="details" value="Details" /></li>
                <li><input type="button" className="btn btn-danger" name="delete" value="Delete" onClick={PersonDetails} /></li>

                <li>
                    <Link to={`/crud/PersonDetails${props.findPerson}`}>
                        <button type="button" className="btn btn-danger" value="DELETE" />
                    </Link></li>
                
                <li><input type="button" className="btn btn-warning" name="edit" value={props.id} /></li>
            </ul>
        );
    };

    const TableRow = (props) => {
    return <tbody>
            {
                props.people.map(showPeople=>{

                    const giveId = showPeople.id;

                    const cyclePeople=<tr key={showPeople.id}>
                        <td>{showPeople.id}</td>
                        <td>{showPeople.firstName}</td>
                        <td>{showPeople.lastName}</td>
                        <td>{showPeople.email}</td>
                        <td><TableAction findPerson={giveId}/></td>
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
                    <TableHeader />
                    <TableRow people={persons} />
                </table>
            </div>
            
    };

    







    if(personDetailToggle == 1) {
        return(
            <Router>
                <Switch>
                    <Route path="/crud/PersonDetails:id">
                        <PersonDetails data={persons} />
                    </Route>
                </Switch>
            </Router>
        );
    }else {
        return(
            <Router>
                <Form />
                <Table />
                <Switch>
                    <Route path="/crud/PersonDetails:id">
                        <PersonDetails data={persons} />
                    </Route>
                </Switch>
            </Router>
        );
        }

    //  Return for CrudDemo
};


export default CrudDemo;