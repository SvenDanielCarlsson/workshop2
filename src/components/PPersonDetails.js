import {BrowserRouter as Router, Route, Switch, Link, useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import CrudDemo from "./CrudDemo";;


const PPersonDetails = ({data}) => {

    console.log("PPPPP");
    const BeersonDetails = ({data}) => {

        const { id } = useParams();
        const [person, setPerson] = useState([]);
        
        console.log("useParams saaaays: ", id);

        useEffect(()  => {
            const getPerson = async () => {
                //await setPerson(persons[id-1]);   //works but is wrong, aka not from API
                const response = await axios.get(CrudDemo.API_URL + '/' + id);
                if(response.status === 200){
                    setPerson(response.data);
                    console.log("Get Person successfull");
                }else{
                    console.log("Get Person failed")
                }

                /*await axios.get(API_URL + '/'+ id).then((response)=> {
                console.log("RESPONSE: ", response.data);
                if(response.status === 200) {
                    setPerson(response.data)
                    console.log("successfull");
                    //console.log(person.firstName);

                    //setError();
                }else {
                    console.log("Get Person failed"");
                }
                })*/
            };

            
            getPerson();
        }, [])

        return(
            console.log("fakedelete"),
            <div>
            <h1>Person Information</h1>
            <h3>{person.title}</h3><br />
            <h5>Id: {person.id}</h5>
            <h5>Name: {person.firstName} {person.lastName}</h5>
            <h5>{person.email}</h5>
            </div>
            );  // Return for PersonDetails
    }
    return(BeersonDetails);
}

export default PPersonDetails;