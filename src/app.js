class ChoosingApp extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            options: []
        }

        this.deleteOptions = this.deleteOptions.bind(this)
        this.addOptions = this.addOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
    }

    componentDidMount(){
        try{
            const options = JSON.parse(localStorage.getItem('options'))
        
            this.setState(()=> ({ options }))
        }
        catch(e){
            console.log('Error:', e)
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
            console.log('saving data')
        }
    }

    deleteOptions(){ this.setState(()=> ({options:[]})) }

    addOptions(data){
        if(!data){
            return 'Empty value'
        } else if (this.state.options.includes(data)){
            return 'Already exists'
        }

        this.setState((prevState)=> ({options: prevState.options.concat(data)}))
    }

    handlePick(){
        const number = Math.floor(Math.random() * this.state.options.length)
        alert(this.state.options[number])
        this.deleteOptions()
    }

    handleDeleteOption(option){
        this.setState((prevState)=>({options:prevState.options.filter((item)=>{return item != option})})
        )
    }

    render(){
        const { options } = this.state

        return(
            <div className="container-fluid contenedor" style={{
                backgroundImage: `url(/img/backgroundImage-min.jpg)`,
                backgroundSize:'cover'
            }}>
                <Header />
                <div className="box">
                    <Action 
                        handlePick={this.handlePick}
                        hasOptions={options.length > 0}
                        delete={this.deleteOptions}    
                    />
                    <AddOption addOptions={this.addOptions}/>
                    <Options data={options} delete={this.handleDeleteOption}/>
                </div>
            </div>
        )
    }
}


const Header = (props) => 
    <div className="header">
        <h1>{props.title}</h1>
    </div>

Header.defaultProps ={
    title: 'What do we eat?'
}


const Action = (props) =>
    <div className="makeD">
        <button className="btn btn-success" disabled={!props.hasOptions} onClick={props.handlePick}>Make decision</button>
        <button onClick={props.delete} disabled={!props.hasOptions} className="btn btn-danger">Remove All</button>
    </div>


const Options = (props) =>
    <div className="options">
        {
            props.data && (
                props.data.map((item)=>(
                    <Option 
                        delete={props.delete} 
                        key={item} 
                        data={item}
                    />)
                )
            )
        }
    </div>


const Option = (props) =>
    <div className="option">
        <div>
            {props.data}
        </div>
        <button onClick={(e)=>{
            props.delete(props.data)
        }} className="btn btn-danger">❌</button>
    </div>
    


class AddOption extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            error:undefined
        }
    }

    render(){
        const { error } = this.state
        return(
            <form className="addOption" onSubmit={(e)=>{
                e.preventDefault()
                
                const option = e.target.elements.option.value.trim()
                const Error = this.props.addOptions(option)

                this.setState(()=>{
                    return { error:Error }
                })

                e.target.elements.option.value = ''
            }}>
                <div className="form-group d-flex">
                    {
                        error && <p>{error}</p>
                    }
                    <input type="text" placeholder="Food..." name="option" style={{width:'75%', padding:'15px'}}></input>
                    <button type="submit" className="btn btn-primary" style={{width:'25%'}}>Add</button>
                </div>
            </form>
        )
    }
}


ReactDOM.render(<ChoosingApp />, document.getElementById('root'))
