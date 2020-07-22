import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'


const initialFormValues ={
    title: '',
    director:'',
    metascore:'',
    stars:''
}

function UpdateMovie(props){
    const history = useHistory()
    const {id} = useParams()
    const [formValues, setFormValues ]=useState(initialFormValues)
    const {setMovieList, movieList } = props


    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res =>{
                setFormValues(res.data)
            })
            .catch(err =>{
                console.log(err);
            })
    },[id])

    const handleChange = e =>{
        e.preventDefault()
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }


    const updateMovie= (e)=>{
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, formValues)
            .then(res =>{
                //Refactor this,  works but not ideal, updated movie goes to the bottom of the list 
                let newMoviesList = [...movieList]
                newMoviesList = newMoviesList.filter( movie => movie.id !== formValues.id)
                newMoviesList.push(formValues)
                setMovieList(newMoviesList)
               history.push(`/movies/${id}`)
            })
            .catch(err =>{
                console.log(err);
            })
    }


    return(
        <div>
            <form>
                <input type='text' placeholder='title' value={formValues.title} name='title' onChange={handleChange}/>
                <input type='text' placeholder='director' value={formValues.director} name='director' onChange={handleChange}/>
                <input type='text' placeholder='metascore' value={formValues.metascore} name='metascore' onChange={handleChange}/>
                <input type='text' placeholder='stars' value={formValues.stars} name='stars' onChange={handleChange}/>
                <button onClick={updateMovie}>Update Movie Info</button>
            </form>
        </div>
    )
}


export default UpdateMovie