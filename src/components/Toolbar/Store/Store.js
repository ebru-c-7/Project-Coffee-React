import React, {useState} from "react";
import classes from "./Store.module.css";

const Store = (props) => {
  const [store, setStore] = useState("default");

  let options = props.stores.map(store => (
    <option value={"store-"+ store.toLowerCase()} key={store}>{store}</option>
  ));

  const storeChangeHandler = (value) => {
      setStore(value);
  };

  return (
    <div className={classes.Store}>
        <select value={store} name="" className={classes.StoreOpt} onChange={event => storeChangeHandler(event.target.value)}>
          <option value="default" disabled>Select Store</option>
          {options}
        </select>
    </div>
  );
};

export default Store;

// class Store extends Component {
//     state = {
//       store: "default"
//     };

//     storeChangeHandler = (value) => {
//       this.setState({store: value});
//     }

//     render() {
//     let options = this.props.stores.map(store => (
//         <option value={"store-"+ store.toLowerCase()} key={store}>{store}</option>
//     ));

//     return ( 
//     <div className={classes.Store}>
//         <select value={this.state.store} name="" className={classes.StoreOpt} onChange={event => {this.storeChangeHandler(event.target.value)}}>
//           <option value="default" disabled>Select Store</option>
//           {options}
//         </select>
//       </div>
//       );
//     }
// };

