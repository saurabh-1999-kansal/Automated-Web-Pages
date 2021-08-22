import React from 'react';
// This Component is for when we want to take Color in RGB format from the user for general colors
class OtherBackgroundColor extends React.Component{
    
    constructor(props){
     super(props);
    //  these rgb values are changed on onChange
     this.state={
         r:0,
         g:0,
         b:0
     }
    }
    // this function is called on the onChange of the input fields
handleOnChange=()=>{
    const {changeTheProperty}=this.props;
    const {r,g,b}=this.state;
    changeTheProperty("backgroundColor","rgb("+r+","+g+","+b+")");
}
    componentDidMount=()=>{
        const {hideContext,hideContextMenu,hideOtherBackgroundColor}=this.props;

        const otherBackground=document.getElementById("otherBackground");
        // removing the inherited event listeners
        otherBackground.addEventListener("mousedown",(e)=>{
       e.stopPropagation();
        });
        otherBackground.addEventListener("mouseup",(e)=>{
            e.stopPropagation();
             });
        // just hide functions need to be called on ok as changes will reflect with the changes 
        // in the input field as we have applied the event listener on onchange
        let ok=document.getElementById("ok"); 
        ok.addEventListener("click",()=>{
            hideContext();
            hideContextMenu();
            hideOtherBackgroundColor();
        });
        
    }
    render(){
        const {x,y}=this.props;
        // console.log(x,y);
       const styles={
            position:"absolute",
            left:x+"px",
            top:y+"px",
            backgroundColor:"yellow"
        }
        return (
            <>
            <div style={styles}  id="otherBackground">
                {/* heding of the dialog box */}
              <div  className="rbc"><strong className="title">RGB</strong></div>
              <div  className="rgb"><input type="number" onChange={(e)=>{
                  this.setState({r:e.target.value});
                  this.handleOnChange();
                  }} placeholder="Enter R value <= 255"/></div>
              <div  className="rgb"><input type="number"  onChange={(e)=>{
                  this.setState({g:e.target.value});
                  this.handleOnChange();
            }} placeholder="Enter G value <= 255"/></div>
              <div  className="rgb"><input type="number"  onChange={(e)=>{
                  this.setState({b:e.target.value});
                  this.handleOnChange()
                }} placeholder="Enter B value <= 255"/></div>
              <div id="ok">OK</div>
            </div>
            </>
        );
    }
}
 export default OtherBackgroundColor;