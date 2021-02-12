// Getting started with React Redux
class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      input: "",
      messages: []
    }
  }
  render() {
    return <div />
  }
};

// Manage state locally first
class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
  }
  handleChange(event){
    this.setState({
      input: event.target.value,
      messages: this.state.messages
    })
  }
  submitMessage(){
    this.setState({
      input: '',
      messages: [...this.state.messages, this.state.input]
    })
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input onChange={this.handleChange.bind(this)} value={this.state.input}/>
        <button onClick={this.submitMessage.bind(this)}>Submit</button>
        <ul>
          {this.state.messages.map((x, i)=>{
            return <li key={i}>{x}</li>
          })}
        </ul>
      </div>
    );
  }
};

// Extract state logic and Redux
const ADD = 'ADD';

const addMessage = message => {
    return {
        type: ADD,
        message
    };
};
const messageReducer = (pastState = [], action) => {
    switch (action.type) {
        case ADD:
            return [...pastState, action.message];
            break;
    default:
        return pastState;
    }
};
const store = Redux.createStore(messageReducer);

//