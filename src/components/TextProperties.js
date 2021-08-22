import React from 'react';
import Color from './Color';
import Number from './Number';
import Style from './Style';
import TextArea from './TextArea';
// TextProperties Component is when we need to change the properties related to text and it
// is displayed when the user hover of the "text" option in the Context Component 
// it will appear conditionally in the ContextMenu Component 
class TextProperties extends React.Component{

    constructor(props){
      super (props);
      this.state={
          setShowTextArea:false
      }
    }
    // it is to show the TextArea Component
    showTextArea=()=>{
        this.setState({
            setShowTextArea:true
        })
    }
    // it is to hide the TextArea Component
    hideTextArea=()=>{
        this.setState({
            setShowTextArea:false
        })
    }
    componentDidMount(){
        const {x,y,hideColor,showNumber,hideNumber,showColor,showStyle,hideStyle,showRadius,
            hideRadius,hideOtherBackgroundColor}=this.props;
    // here we have applied mouseover event on different options in the text properties
    // here mouseover on the fontSize property is applied
      const btn1=document.getElementById("fontSize");
      btn1.addEventListener("mouseover",()=>{
          hideColor();
          hideRadius();
          hideStyle();
          hideOtherBackgroundColor();
          this.hideTextArea();
        //   as Number Component need to be shown on the hover of fontSize  
          showNumber(x+100,y+21);      
      });
      // here mouseover on the fontColor property is applied 
      const btn2=document.getElementById("fontColor");
      btn2.addEventListener("mouseover",()=>{
        hideNumber();
        hideRadius();
        hideStyle();
        //   as Color Component need to be shown on the hover of fontColor  
        showColor(x+100,y+46);  
        this.hideTextArea();   
      });
       // here mouseover on the fontFamily property is applied
      const btn3=document.getElementById("fontFamily");
      btn3.addEventListener("mouseover",()=>{
        hideNumber();
        hideRadius();
        hideColor();
        this.hideTextArea();
        hideOtherBackgroundColor();
         //   as Style Component need to be shown on the hover of fontFamily
        showStyle(x+100,y+61);     
      });
      const txt=document.getElementById("area");
      txt.addEventListener("mouseover",()=>{
        hideNumber();
        hideRadius();
        hideColor();
         //   as TextArea Component need to be shown on the hover of TextArea
        this.showTextArea();
      });
    }
    render(){
    const {x,y,setShowNumber,setShowStyle,setShowColor,changeTheProperty,hideContextMenu,hideContext,
        hideOtherBackgroundColor,showOtherBackgroundColor,setShowOtherBackgroundColor,hideStyle,changingDivId}=this.props;
        const style={
            position:'absolute',
            left:x+"px",
            top:y+"px",
            display:'flex',
            flexDirection:'column'
        }
       return(
           
        <div style={style} id="contextMenu">
                       <strong className="title">Properties
                           </strong> 
                        <div id="area">
                            TextArea</div>
                        <div id="fontSize" className="contextMenuBtns">
                            fontSize</div>
                        
                        <div  id="fontColor" className="contextMenuBtns">
                            color</div>
                        <div  id="fontFamily" className="contextMenuBtns"
                        >
                            fontFamily</div>
                    {/* here different components are being called conditionally according to the hover */}
                       {
                          this.state.setShowTextArea&&<TextArea
                          rows="10"
                          cols="10"
                          x={100}
                          y={21}
                          changingDivId={changingDivId}
                          />
                       }
                        {
                            setShowNumber&&(
                              <Number
                              changeTheProperty={changeTheProperty}
                              x={100}
                              y={46}                           
                              hideContextMenu={hideContextMenu}
                              hideContext={hideContext}
                              TypeOfWidthToBeChanged="fontSize"
                              def={35}
                              />
                            )
                        }

                         {
                            setShowColor&&(
                               
                                <Color
                                changeTheProperty={changeTheProperty}
                                hideContextMenu={hideContextMenu}
                                hideContext={hideContext} 
                                hideOtherBackgroundColor={hideOtherBackgroundColor}
                                showOtherBackgroundColor={showOtherBackgroundColor}
                                x={100} 
                                y={69}
                                setShowOtherBackgroundColor={setShowOtherBackgroundColor}
                                whoseColorToChange="color"
                                />
                            )
                        }
                        {
                            setShowStyle&&(
                               
                                <Style
                                hideContextMenu={hideContextMenu}
                                hideContext={hideContext} 
                                hideOtherBackgroundColor={hideOtherBackgroundColor}
                                hideStyle={hideStyle}
                                changeTheProperty={changeTheProperty}
                                x={100}
                                y={95}
                                styleArray={["cursive","fantasy","serif","monospace"]}
                                heading="fontFamily"
                                />
                            )
                        }
                    
                    </div>
       )
    }
}
export default TextProperties;