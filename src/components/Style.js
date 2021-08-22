import React from 'react';
import TextInput from './TextInput'
// Style Component is used when we want the user to select an option from some textoptions
// or take a text by user in input field
// like as when we want to make the feature of border-style we can give options like dashed
// solid etc. and also for the general text in input field
// these options will come in props so that the Component becomes generic  
class Style extends React.Component{
    constructor(props){
     super(props);
     this.state={
        //  this is the data about the "other" option at the last
         otherStyle:{
            //  this is the boolean value on whether we want to show this other dialog box or not
             setShowOtherStyle:false,
         }
     }
    }
    // this function is to show the dialog box when the user hovers on the "other" option 
    showOtherStyle=()=>{
        this.setState({
            otherStyle:{
                setShowOtherStyle:true
            }
        })
    }
    // this is to hide the above dialog box
    hideOtherStyle=()=>{
        this.setState({
            otherStyle:{
                setShowOtherStyle:false
            }
        })
    }
    componentDidMount(){
        const {changeTheProperty, hideContextMenu,
        hideContext, 
        hideOtherBackgroundColor,
        hideStyle,heading}=this.props;
        const btns=document.getElementsByClassName("borderStyle")
        // here we have added the event listener on onclick of the respective options in the style Component
        for(let btn of btns){
            // here we have removed the inherited event listeners 
            btn.addEventListener("mousedown",(e)=>{
             e.stopPropagation();
            });
            btn.addEventListener("mouseup",(e)=>{
                e.stopPropagation();
               });
            //    here we have added the event listener of click to change the required value 
            // as clicked by the user of the respective property
            btn.addEventListener("click",(e)=>{
            //   here changeTheProperty function is called on heading as heading is coming in props
            // according to css property to be changed as dialog box has been made accordingly
                changeTheProperty(heading,btn.innerHTML);
                // hide functions need to be called after the property is changed so that
                // user view becomes better
                hideStyle();
                hideContext();
                hideContextMenu();
                hideOtherBackgroundColor();

            });
        }
    //  here event listeners are applied on the "other" option so that it should be visible on hovering
        //removing the inherited event listeners 
    const styleOther=document.getElementById("styleOther");
        styleOther.addEventListener('mousedown',(e)=>{
          e.stopPropagation();
        });
        styleOther.addEventListener('mouseup',(e)=>{
            e.stopPropagation();
          });
        styleOther.addEventListener("mouseover",()=>{
            // function called to show the dialog box which sholud appaer on the hover of "other"
            this.showOtherStyle();
        });
    }

    render(){
        const {x,y,changeTheProperty, hideContextMenu,
            hideContext, 
            hideOtherBackgroundColor,
            hideStyle,styleArray,heading}=this.props;
        const {setShowOtherStyle,whoseText}=this.state.otherStyle
        // console.log("styleArray=",styleArray);
        const style={
            position:"absolute",
            left:x+"px",
            top:y+"px",
            display:"flex",
            flexDirection:"column"
        }
       return(
        <>
        <div style={style} id="style">
            {/* heading is coming in the props as it is generic as it is used for border-style and also for the font-style option */}
        <div className="borderStyle" ><strong>{heading}</strong></div> 
            {
                // used the map function on the styleArray which is coming in props so that the component becomes generic
             styleArray.map((item)=>{
                
               return <div className="borderStyle" >{item}</div> 
             })
            }
   {/* this is the other option for any other value which is not provided directly */}
       <div id="styleOther">other</div>
       {/* TextInput Component is called here as here we need to take a text as input */}
       {(setShowOtherStyle&&<TextInput
    //    in whoseText we need to pass the css property so that the user knows about which property 
    // the user want's to give the text and taken from the heading from the props  
       whoseText={heading}
       hideContextMenu={hideContextMenu}
       hideContext={hideContext} 
       hideOtherBackgroundColor={hideOtherBackgroundColor}
       hideStyle={hideStyle}
       changeTheProperty={changeTheProperty}
       x={100}
       y={100}
       />)}
        </div>

        </>
       );

    }
}
export default Style;