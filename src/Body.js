import React, { Component } from 'react'
import request from 'superagent'
import Spinner from './Spinner'

const sleep = (x) => new Promise((res, rej) => setTimeout(() => {res() }, x))

export default class Body extends Component {
    state = {
        quotes: [],
        loading: false,
        query: ''
    }
    /* --------- TOO WET --------------
    // below is the function that gets called as soon as the component is "born" or mounts (so on component load)
    componentDidMount = async () => {
        //below, show spinner until loaded
        this.setState({loading:true});
        const apiData = await request.get('https://futuramaapi.herokuapp.com/api/quotes')

        await sleep(3000)
        //below, once loaded, no longer need spinner
        this.setState({loading:false})
        //to make it actually render on the page we have to setState
        this.setState({quotes: apiData.body})
    }
    handleFetch = async () => {
        //below, show spinner until loaded
        this.setState({loading:true})
        const response = await request.get('https://futuramaapi.herokuapp.com/api/quotes')

        await sleep(3000)
        //below, once loaded, no longer need spinner
        this.setState({loading:false})
        //to make it actually render on the page we have to setState
        this.setState({quotes: response.body})
    } ---------- REFACTOR -------------*/

    componentDidMount = async () => {
        await this.fetch();
    }

    handleClick = async () => {
        await this.fetch();
    }

    handleChange = async (e) => {
        this.setState({ query: e.target.value })
    }

    fetch = async () => {
        //below, show spinner until loaded
        this.setState({loading:true})
        const response = await request.get(`https://futuramaapi.herokuapp.com/api/quotes?search=${this.state.query}`)

        await sleep(3000)
        //below, once loaded, no longer need spinner
        this.setState({loading:false})
        //to make it actually render on the page we have to setState
        this.setState({quotes: response.body})
    }
    
    render() {
        return (
            <div className= 'api-content'>
                <input onChange= {this.handleChange} />
                <section>
                    <button onClick={this.handleClick}>Fetch</button>
                    {this.state.loading 
                        ? <Spinner />
                        : this.state.quotes.map(quote => 
                        <div>
                            <p>{quote.quote}</p>
                            <p>{quote.character}</p>
                            <img src={quote.image} alt={`${quote.character}`}></img>
                        </div>)}
                </section>
            </div>
        )
    }
}
