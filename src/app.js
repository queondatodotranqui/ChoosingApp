class ChoosingApp extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            options: []
        }

        this.deleteOptions = this.deleteOptions.bind(this)
        this.addOptions = this.addOptions.bind(this)
    }

    deleteOptions(){
        this.setState(()=>{
            return { options: []}
        })
    }

    addOptions(data){
        this.setState(()=>{
            const options = this.state.options.concat(data)
            return { options }
        })
    }

    render(){
        const { options } = this.state

        return(
            <div className="container-fluid contenedor">
                <Header />
                <div className="box">
                    <Action 
                        hasOptions={options.length > 0}
                        delete={this.deleteOptions}    
                    />
                    <AddOption addOptions={this.addOptions}/>
                    <Options data={options} />
                </div>
            </div>
        )
    }
}

const Header = () => {
    return(
        <div className="header">
            <h1>Choosing App</h1>
        </div>
    )
}

class Action extends React.Component{

    render(){

        return(
            <div className="makeD">
                <button onClick={this.handlePick} className="btn btn-info" disabled={!this.props.hasOptions}>Make decision</button>
                <button onClick={this.props.delete} className="btn btn-danger">Remove All</button>
            </div>
        )
    }
}

class Options extends React.Component{

    render(){
        return(
            <div className="options">
                {
                    this.props.data && (
                        this.props.data.map((item)=>{
                            return <Option key={item} data={item}/>
                        })
                    )
                }
            </div>
        )
    }
}

const Option = (props) =>
    <div className="option">
        {props.data}
    </div>

const AddOption = (props) =>{
    return(
        <form className="addOption" onSubmit={(e)=>{
            e.preventDefault()
            const option = e.target.elements.option.value.trim()

            if(option){
                props.addOptions(option)
                e.target.elements.option.value = ''
            }
        }}>
            <div className="form-group d-flex">
                <input type="text" placeholder="Option..." name="option" style={{width:'75%'}}></input>
                <button type="submit" className="btn btn-primary" style={{width:'25%'}}>Add</button>
            </div>
        </form>
    )
}


ReactDOM.render(<ChoosingApp />, document.getElementById('root'))
