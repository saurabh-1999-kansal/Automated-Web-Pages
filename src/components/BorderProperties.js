// This Component is based on the border properties where we have different properties 
// that are related to border like border-style,border-width,border-radius,border-color
// which will open up in dialog box when the user hover on border in the context menu Component
import React from 'react';
// Color is a Component which can be used any where when the user wan't to change the color
// of any thing in his App be it be background-color,border-color,font-color,etc
import Color from './Color';
// Number is a component which can be used where we wan't to take  Number as input by the user
import Number from './Number';
// Style is a Component which can be used when we wan't the user to select from a 
// list of elements 
import Style from './Style';
class BorderProperties extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { x, y, hideColor, showNumber, hideNumber, showColor, showStyle, hideStyle, showRadius,
            hideRadius, hideOtherBackgroundColor } = this.props;
            // this is the border width button where we will take the width of the border as input
            // the user when does the changes in the input field ,on the spot the changes will 
            // also appear as we have applied the evnt listener on onChange and not on onClick 
        const btn1 = document.getElementById("borderWidth");
        btn1.addEventListener("mouseover", () => {
            // so that extra dialog boxes get hidden when this dialog box will appear
            hideColor();
            hideRadius();
            hideStyle();
            hideOtherBackgroundColor();
            // given the call to show this Component(Number)
            showNumber(x + 100, y + 21);
        });
        //  here we will take border Color as input 
        const btn2 = document.getElementById("borderColor");
        btn2.addEventListener("mouseover", () => {
            hideNumber();
            hideRadius();
            hideStyle();
            showColor(x + 100, y + 46);
        });
        //  here we will take border Style as input 
        const btn3 = document.getElementById("borderStyle");
        btn3.addEventListener("mouseover", () => {
            hideNumber();
            hideRadius();
            hideColor();
            hideOtherBackgroundColor();
            showStyle(x + 100, y + 61);
        });
        //  here we will take border Radius as input 
        const btn4 = document.getElementById("borderRadius");
        btn4.addEventListener("mouseover", () => {
            hideNumber();
            hideColor();
            hideStyle();
            hideOtherBackgroundColor();
            showRadius(x + 100, y + 87);
        });

    }

    render() {
        const { x, y, setShowNumber, setShowStyle, setShowColor, setShowRadius, changeTheProperty, hideContextMenu, hideContext,
            hideOtherBackgroundColor, showOtherBackgroundColor, setShowOtherBackgroundColor, hideStyle, bdrd, bdwd } = this.props;
        const style = {
            position: 'absolute',
            left: x + "px",
            top: y + "px",
            display: 'flex',
            flexDirection: 'column'
        }
        return (
  
            <div style={style} id="contextMenu">
                {/* This is the heading of the border properties dialog box */}
                <strong className="title">Properties</strong>
                {/* these are the different options which will come in it */}
                <div id="borderWidth" className="contextMenuBtns">
                    borderWidth</div>

                <div id="borderColor" className="contextMenuBtns">
                    borderColor</div>
                <div id="borderStyle" className="contextMenuBtns"
                >
                    borderStyle</div>
                <div id="borderRadius" className="contextMenuBtns"
                >
                    borderRadius</div>
                    {/* Here are the different Conditionaly rendered Components 
                    which will come on their respective mouseover events on respective buttons */}
                {
                    // to show the Number Component when the user keeps his mouse on the 
                    // borderWidth button
                    setShowNumber && (
                        <Number
                            changeTheProperty={changeTheProperty}
                            x={100}
                            y={21}
                            hideContextMenu={hideContextMenu}
                            hideContext={hideContext}
                            // this is the type of width as we can use number component at any place
                            // but it will change different css property according 
                            // to the type of width the user want's to change
                            TypeOfWidthToBeChanged="borderWidth"
                            // def is the default value that shall come as plceholder on the 
                            // input field so that the user will can know the current value
                            // of the respective nuber input
                            def={bdwd}
                        />
                    )
                }
               {/* Color Component shall appear when the user places his mouse on the 
                    borderColor button */}
                {
                    setShowColor && (

                        <Color
                            changeTheProperty={changeTheProperty}
                            hideContextMenu={hideContextMenu}
                            hideContext={hideContext}
                            hideOtherBackgroundColor={hideOtherBackgroundColor}
                            showOtherBackgroundColor={showOtherBackgroundColor}
                            x={100}
                            y={46}
                            setShowOtherBackgroundColor={setShowOtherBackgroundColor}
                            // this is as color is a generic property which can be used 
                            // at any place but we need to give the respective property
                            // whose color need to be changed
                            whoseColorToChange="borderColor"
                        />
                    )
                }
                {/* this Style Component will appear when the user places his mouse on the
                borderStyle button */}
                {
                    setShowStyle && (

                        <Style
                            hideContextMenu={hideContextMenu}
                            hideContext={hideContext}
                            hideOtherBackgroundColor={hideOtherBackgroundColor}
                            hideStyle={hideStyle}
                            changeTheProperty={changeTheProperty}
                            x={100}
                            y={69}
                            // As style is a generic Component which can be used at any 
                            //  place where we wan't to give different text options to the user
                            // those different texts can given as props in this array
                            // and the corresponding property which they belongs to must be given 
                            // in the heading 
                            styleArray={["solid", "double", "dashed", "dotted"]}
                            heading="borderStyle"

                        />
                    )
                }
                {/* this Style Component will appear when the user places his mouse on the
                borderRadius button */}
                {
                    setShowRadius && (
                        <Number
                            changeTheProperty={changeTheProperty}
                            x={100}
                            y={95}
                            hideContextMenu={hideContextMenu}
                            hideContext={hideContext}
                            TypeOfWidthToBeChanged="borderRadius"
                            def={bdrd}
                        />
                    )
                }
            </div>
        )
    }
}
export default BorderProperties;