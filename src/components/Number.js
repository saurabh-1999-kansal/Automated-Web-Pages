import React from 'react';
// This is the Component which can be used anywhere,where we need to take a number as input from the user
class Number extends React.Component{

    
  constructor(props){
    super(props);
    this.state={
        // here the default value is comming from the props as we want it to be shown in the 
        // placeholder in the input field for the current value
        number:props.def
    }
  }
//   this function is called on onChange in the input field
  handleOnChange=()=>{
    //   this is about the css property to be changed(property which can take number as value) 
    const {TypeOfWidthToBeChanged}=this.props;
    const {changeTheProperty}=this.props;
    const {number}=this.state;
    changeTheProperty(TypeOfWidthToBeChanged,number+"px");
}
componentDidMount(){
    const {hideContext,hideContextMenu}=this.props
    const number=document.getElementById("number");
    // stopping the events comming from the Content Component
    number.addEventListener("mousedown",(e)=>{
        e.stopPropagation();
    });
    number.addEventListener("mouseup",(e)=>{
        e.stopPropagation();
    });
    // this is the ok button below the input field
    let ok=document.getElementById("ok"); 
    ok.addEventListener("click",()=>{
    //    console.log("yoyo");
    // just need to hide the Component on onclick as the properties are changing with onchange only
       hideContext();
       hideContextMenu();
    });    
}
    render(){
        const {x,y}=this.props;
        const style={
            position:"absolute",
            left:x+"px",
            top:y+"px",         
        }
       return(
        <>
        <div style={style} id="number">
            <div><input id="inp" onChange={(e)=>{
                  this.setState({number:e.target.value},()=>{this.handleOnChange();});             
                }}
                type="number" 
                // placeholder taken from the state and state taken from the props
                placeholder={this.state.number+"(current value)"}  
                /></div>
            <div id="ok">OK</div>
        </div>
        </>
       );

    }
}
export default Number;