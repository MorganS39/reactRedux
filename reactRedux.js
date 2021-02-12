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

// Use provider to connect Redux to React
// This for some reason did not work when I typed it the first time.
// I looked up the answer and it was exactly what I had typed but then retyped it and it worked?
const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <DisplayMessages />
      </Provider>
    );
  }
};

// Map state to props
const state = [];

const mapStateToProps = (state) => {
    return {
        messages: state
    }
};

// Map dispatch to props
const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message))
    }
  }
};

// Connect Redux to React
class Presentational extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h3>This is a Presentational Component</h3>
  }
};

const connect = ReactRedux.connect;

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps) (Presentational)

// Connect Redux to the messages app
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational)

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
};

// Extract local state into Redux
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    this.props.submitNewMessage(this.state.input);
    this.setState({
      input: ''
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.props.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};