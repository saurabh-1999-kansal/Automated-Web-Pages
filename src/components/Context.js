// This is the Component which is for the dialog box which will appear when the user right clicks on a particular div
// On right clicking it will show the required options(css properties) which can be changed by the user
import React from 'react';
import ContextMenu from './ContextMenu';
class Context extends React.Component{

   componentDidMount(){
    const {showContextMenu,x,y,changeWhatToShow,hideOtherBackgroundColor}=this.props;
    // her we are adding the evnt listener of mouseover to all the properties so that the corresponding
    // Context Menu is visible based on the value of property
    const btns=document.getElementsByClassName("colorBtns");
    for(let btn of btns){
     btn.addEventListener('mouseover',(e)=>{
    //    this is the attribute value which is used to get the coordinates of the ContextMenu Component from the Context Component
         let down=btn.getAttribute("down");
        //  just added the width of Context Component in the X coordinate of Context to get the x coordinate of Context Menu Component
         const x1=x+100;
        //  this calculation is done based on the fact that the height of every option(icluding the) in the property is 30px
         const y1=y+30*parseInt(down);
        //  this function is called here to make the changes in the state in the Content Component in the 
        // data of the Context Menu Component so that when now because of the state changes re-render takes place,
        // then these values will be passed in props in the Context Menu Component and it should come the desired position respectively
         showContextMenu(x1,y1);
        //  here we have called the function to change  (whatToShow) which is passed as props to the ContextMenu 
        // so that we can calculate there that which propertie's values option does we need to show the user
        // according to the mouseover button 
         changeWhatToShow(btn.innerHTML);
         hideOtherBackgroundColor();
        
     });
    }
}
    render(){
        // these are the absolute coordinates that were passed in props
        const {x,y,setShowContextMenu,contextMenu,otherBackgroundColor,changeTheProperty,hideContext,
            hideContextMenu,showOtherBackgroundColor,hideOtherBackgroundColor,ht,wd,bdrd,bdwd,changingDivId}=this.props;
        // these are the styles which are decided dynamically according what comes in the props
        // and some properties are static also which are common
        const style={
            position:'absolute',
            left:x+"px",
            top:y+"px",
            display:'flex',
            flexDirection:'column'
        }

        return (
        <div style={style} id="context">
           <div> <strong className="title">Properties</strong></div>
           {/* these are the divs which are the options of the properties */}
            <div className="colorBtns" down="1">backgroundColor</div>
            <div className="colorBtns" down="2">border</div>
            <div className="colorBtns" down="3">height</div>
            <div className="colorBtns" down="4">width</div>
            <div className="colorBtns" down="5">text</div>
            <div className="colorBtns" down="6">image</div>
            {setShowContextMenu&& <ContextMenu 
            // these are the props required by the ContextMenu Component
            // these are the coordinates where the contextMenu should occur(the coordinates after calculation)
            
            x={122.88} 
            y={contextMenu.y-y}
            ht={ht}
            wd={wd}
            bdwd={bdwd}
            bdrd={bdrd}
            changingDivId={changingDivId}
            // this function is to chnage the respective property and its value
            changeTheProperty={changeTheProperty}
            // this function is to hide the ContextMenu Component 
            hideContextMenu={hideContextMenu}
            // this function is to hide the Context
            hideContext={hideContext}
            // this variable has the name of the property whose values the user wan'ts to see
            // so that he can click on one to make the changes respectively
            whatToShow={contextMenu.whatToShow}
            showOtherBackgroundColor={showOtherBackgroundColor}
            hideOtherBackgroundColor={hideOtherBackgroundColor}
            setShowOtherBackgroundColor={otherBackgroundColor.setShowOtherBackgroundColor}
            /> } 
          
            
        </div>
        );
    }

}

export default Context;