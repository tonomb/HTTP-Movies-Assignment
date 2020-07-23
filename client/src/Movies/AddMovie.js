import React, {Component} from 'react'
import axios from 'axios'


const initialFormValues ={
    title: '',
    director:'',
    metascore:'',
    stars:''
}

class AddMovie extends React.Component{
    // const history = useHistory()
    // const [formValues, setFormValues ]=useState(initialFormValues)
    // const {setUpdatedMovie } = props
    constructor(props){
        super(props);
        this.state ={
            formValues: initialFormValues
        }
    }
    

  
     handleChange = e =>{
        e.preventDefault()
        this.setState({
            formValues: {
                ...this.state.formValues,
            [e.target.name]: e.target.value}
        })
        // if(e.target.name === 'stars'){  // === this doesn´t work
        //     this.setState({
        //         formValues: {...this.state.formValues,
        //         stars: e.target.value.split(',') }
        //     })
        // }
    }
    
   
    

     addMovie= (e)=>{
        e.preventDefault()
        const starsArray = this.state.formValues.stars.split(',') 
            this.setState({
                formValues: {
                    ...this.state.formValues,
                    stars: starsArray
                }
            }, ()=>  axios.post(`http://localhost:5000/api/movies`, this.state.formValues)
            .then(res =>{
                console.log('response', res.data);
                console.log('formated values', this.state.formValues);
                this.props.setUpdatedMovie(true);
                this.props.history.push(`/`)  //how to use history on a class component
            })
            .catch(err =>{
                console.log(err);
            })) 
    }

    
    render(){

        return(
        <div>
            <form>
                <input type='text' placeholder='title' value={this.state.formValues.title} name='title' onChange={this.handleChange}/>
                <input type='text' placeholder='director' value={this.state.formValues.director} name='director' onChange={this.handleChange}/>
                <input type='text' placeholder='metascore' value={this.state.formValues.metascore} name='metascore' onChange={this.handleChange}/>
                <input type='text' placeholder='stars' value={this.state.formValues.stars} name='stars' onChange={this.handleChange}/>
                <button onClick={this.addMovie} >Add Movie</button>
            </form>
        </div>
        )
    }
    
}


export default AddMovie;