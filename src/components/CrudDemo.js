import {BrowserRouter as Router, Route, Switch, Link, useParams, useHistory} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CrudDemo = () => {
    
    const [persons, setPersons] = useState([]);
    const [routerToggle, setRouterToggle] = useState(0);
    let history = useHistory();

    const API_URL = "https://localhost:44342/People";
 

    const Initialize = () => {          //Render list of people from API
        useEffect(() => {
            let controller = new AbortController();
        
            const getApi = async () => {
                const response = await axios.get(API_URL, {signal: controller.signal});
                if(response.status === 200){
                    setPersons(response.data);
                    console.log("Get API successfull");
                }else{
                    console.log("Get API failed");
                }
            };
            
            getApi();
            return () => controller?.abort();    
        }, []); // empty [] means it will only run once
    }
    Initialize();

    
    const PersonDetails = ({data}) => {
        const { id } = useParams();
        const [person, setPerson] = useState('');

        useEffect(()  => {
            let controller = new AbortController();

            const getPerson = async () => {
                const response = await axios.get(API_URL + '/' + id, {signal: controller.signal});
                if(response.status === 200){
                    setRouterToggle(1);
                    setPerson(response.data);
                    console.log("Get Person successfull");
                    
                }else{
                    console.log("Get Person failed")
                }
            };
            
            getPerson();
            return () => controller?.abort();
        }, [id])

        return(
            <div className="container">
                <br />
                <h1>Person Information</h1>
                <br />
                <br />
                <h3>{person.title}</h3><br />
                <h5>Id: {person.id}</h5>
                <h5>Name: {person.firstName} {person.lastName}</h5>
                <h5>{person.email}</h5>
                <br/>
                <BackToCrud />
            </div>
            );  // Return for PersonDetails
    }
    

    const BackToCrud = () => {
        return(
            <Link className="btn btn-secondary" type="button" to="/crud">Back</Link>
        );
    }


    const Form = () => {
          setRouterToggle(1);

          const { register, handleSubmit, reset } = useForm();
        
          const savePerson= (newPerson) =>{
              console.log(newPerson);

              axios.request({
                  method: 'post',
                  url: API_URL,
                  data: newPerson
              }).then(response => {
                  history.push('/crud');
              }).catch(err => console.log(err));

          }

          const onSubmit = (data) => {
              const newPerson = {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  email: data.email,
                  title: data.title
              }
              savePerson(newPerson);
          }

          return(
              <div className="container">
                <br />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <header><h3>Add Person</h3></header>

                    <div><br />
                    <label htmlFor="firstName">First Name</label><br/>
                    <input type="text" {...register("firstName", { required:true, minLength:2, maxLength:80 })} id="firstName" />
                    </div>
                    <label htmlFor="lastName">Last Name</label><br/>
                    <input type="text" {...register("lastName", { required: true, minLength:2, maxLength:80 })} id="lastName" />
                    <br />
                    <label htmlFor="email">Email</label><br />
                    <input type="email" {...register("email", { required: true })} id="email" />
                    <br/>
                    <label htmlFor="title">Title</label><br />
                    <input type="text" {...register("title", { required: true, minLength:2, maxLength: 40})} id="title" />
                    <br />

                    

                    <input type="submit" className="btn-primary" value="Submit"/>
                    <input type="reset" className="btn-warning" value="Reset" onClick={() => reset({ firstName: "", lastName: "", email: "", title: ""}) }/>
                    <br/>
                    <br />
                    <BackToCrud />
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
                <li><Link className="btn btn-primary" type="button" to={`/crud/PersonDetails${props.findPerson}`}>Details</Link></li>
                <li><Link className="btn btn-danger" type="button" to={`/crud/PersonDetails/NonExistent`}>Delete</Link></li>
                <li><Link className="btn btn-warning" type="button" to="/crud/NoGoEdit">Edit</Link></li>
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
        return(
            <div className="container">
                <br/>
                <Link className="btn btn-primary" type="button" to={`/crud/CreatePerson`}>Add Person</Link>
                <br/>
                <br/>
                <h3>List Of People</h3>
                <table className="table">
                    <TableHeader />
                    <TableRow people={persons} />
                </table>
            </div>
        );
    };

    







    if(routerToggle === 1) {
        return(
            <Router>
                <Switch>
                <Route path="/crud/CreatePerson" component={Form} />
                    <Route path="/crud/PersonDetails:id">
                        <PersonDetails data={persons} />
                    </Route>
                    <Route path="/crud" component={CrudDemo} />
                </Switch>
            </Router>
        );
    }else {
        return(
            <Router>
                <Switch>
                    <Route path="/crud/CreatePerson" component={Form} />
                    <Route path="/crud/PersonDetails:id">
                        <PersonDetails data={persons} />
                    </Route>
                </Switch>
                <Table />
            </Router>
        );
        }

    //  Return for CrudDemo
};


export default CrudDemo;