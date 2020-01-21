import React from "react";
import { connect } from "react-redux";
import { getUsers } from "./redux/action-creators";

class App extends React.Component {
  componentDidMount() {
    this.props.getList();
  }

  render() {
   
    return (
      <div>
        {/* <ul>
          {list.data && list.data.map((user, index) => {
            return (
              <li key={index}>{user.login}</li>
            );
          })}
        </ul> */}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    list: state.list
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => { dispatch(getUsers()); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
