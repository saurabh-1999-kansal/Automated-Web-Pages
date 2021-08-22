// Color Component can be used anywhere ,where we wan't to change the color of any css property 
import  {Component} from 'react';
import OtherBackgroundColor from './OtherBackgroundColor';
class Color extends Component{
  constructor(props){
      super(props);
  }

  componentDidMount(){
    const {x,y,changeTheProperty, hideContextMenu, hideContext,hideOtherBackgroundColor
        ,showOtherBackgroundColor,whoseColorToChange}=this.props;
    const btns = document.getElementsByClassName("contextMenuBtns");
    for (let btn of btns) {
        // here we are adding the event Listeners on all the values given as options to a particular property
        // here we have stopped the propagation of event Listener of mousedown  and mouseup which is comming from Content Component 
        btn.addEventListener("mousedown", (e) => {
            e.stopPropagation();
        });
        btn.addEventListener("mouseup", (e) => {
            e.stopPropagation();
        });
        // here we have added the click listener so that the property changes it the state of the Content when the 
        // user clicks on a particular option
        btn.addEventListener("click", (e) => {
            // whoseColorToChange is a generic value which will come in props accoprding to 
            // the css property the user wan'ts to change
            changeTheProperty(whoseColorToChange, btn.innerHTML);
            // console.log("In event listener");
            // as when the user selects a particular option and now need to see the changes in the div so these both shall be hidden
            hideContextMenu();
            hideContext();
            hideOtherBackgroundColor();
        });
       
    }
    // this is when the user places the mouse on the other button to get any general ccolor
    // according to the rgb values
    let other=document.getElementById("otherBackgroundColor");
    other.addEventListener("mouseover",()=>{
        let x1=x+100;
        let y1=y+125;
        showOtherBackgroundColor(x1,y1);
    })
   
  }
  render(){
    
    const{x,y,setShowOtherBackgroundColor,changeTheProperty,hideContext,hideContextMenu,hideOtherBackgroundColor}=this.props;
    const style = {
        position: 'absolute',
        left: x + "px",
        top: y + "px",
        display: 'flex',
        flexDirection: 'column',
        
    }
      return(
        <div style={style} id="contextMenu">
            {/* this is the heading of the colors Component */}
        <strong>Colors</strong>
        {/* different options given which can be chosen directly  */}
        <div  className="contextMenuBtns">
            red</div>
        <div  className="contextMenuBtns">
            yellow</div>
        <div  className="contextMenuBtns"
        >
            green</div>
        <div className="contextMenuBtns"
        >
            blue</div>
            {/* this is for the user to select any general color according to the rgb values */}
        <div  id="otherBackgroundColor" className="contextMenuBtns"
        >
            other</div>
{/* OtherBackgroundColor Component will appear when the user places the mouse on the other button */}
        {setShowOtherBackgroundColor&&<OtherBackgroundColor
        x={100}
        y={125}
        hideOtherBackgroundColor={this.hideOtherBackgroundColor}  
        changeTheProperty={changeTheProperty}
        hideContext={hideContext}
        hideContextMenu={hideContextMenu}
        hideOtherBackgroundColor={hideOtherBackgroundColor}
            />} 
    </div>
    
      )
      
  }
}
export default Color;
