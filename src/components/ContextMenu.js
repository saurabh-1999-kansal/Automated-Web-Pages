import React from 'react';
import Color from './Color';
import Number from './Number';
import BorderProperties from './BorderProperties';
import TextInput from './TextInput';
import TextProperties from './TextProperties';

// This is the ContextMenu Component which is required to show the options(about values to a particular property) to the user about  particular property
class ContextMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            // this is the data about the Number Component
            number: {
                // this boolean value is about whether we want to show the Number Component or not 
                setShowNumber: false,
                // these are its coordinates
                x: 0,
                y: 0
            },
            // this is the data about the Style Component
            style: {
                setShowStyle: false,
                x: 0,
                y: 0
            },
            // this is the data about the Color Component
            color: {
                setShowColor: false,
                x: 0,
                y: 0
            },
            // this is for whether we want to show the border radius option or not
            // conditionally changed on hover of ContetMenu Component
            radius: {
                setShowRadius: false,
                x: 0,
                y: 0
            }
        }
    }
// this function is called for showing the Number Componenet
    showNumber = (x, y) => {
        // console.log("I m in show number");
        this.setState({
            number: {
                setShowNumber: true,
                x: x,
                y: y
            },
        });
    }
    // this function is called for hiding the Number Componenet
    hideNumber = () => {
        // console.log("i m in hide number");
        this.setState({
            number: {
                setShowNumber: false
            },
        });
    }
// this function is called for showing the Color Componenet
    showColor = (x, y) => {
        // console.log("I m in show color");
        this.setState({
            color: {
                setShowColor: true,
                x: x,
                y: y
            },
        });
    }
     // this function is called for hiding the Color Componenet
    hideColor = () => {
        this.setState({
            color: {
                setShowColor: false
            }
        })
    }
// this function is called for showing the Style Componenet
    showStyle = (x, y) => {

        this.setState({
            style: {
                setShowStyle: true,
                x: x,
                y: y
            }
        })
    }
 // this function is called for hiding the Style Componenet
    hideStyle = () => {

        this.setState({
            style: {
                setShowStyle: false
            }
        });
    }
// this function is called for showing the Radius dialog box
    showRadius = (x, y) => {
        // console.log("I m in show radius");
        this.setState({
            radius: {
                setShowRadius: true,
                x: x,
                y: y
            }
        })
    }
    // this function is called for hiding the Radius dialog box
    hideRadius = () => {
        this.setState({
            radius: {
                setShowRadius: false
            }
        });
    }
    render() {
        const { x, y, whatToShow, hideContext, hideContextMenu, hideOtherBackgroundColor,
            showOtherBackgroundColor, setShowOtherBackgroundColor, otherBackgroundColor
            , ht, wd, bdrd, bdwd, changingDivId } = this.props;


    //   Here we have taken out boolean value on what need to be shown according
    // to the hover on the contextMenu Component
    // whether if backgroundColor need to be shown ,we would hve passed backgroundColor in whatToShow
        const backgroundColor = (((whatToShow) === "backgroundColor") ? true : false);
    // similarly for all other options in the ContextMenu Component for conditional rendering
        const border = (((whatToShow) === "border") ? true : false);
        const height = (((whatToShow) === "height") ? true : false);
        const width = (((whatToShow) === "width") ? true : false);
        const image = (((whatToShow) === "image") ? true : false);
        const text = (((whatToShow) === "text") ? true : false);
        const { changeTheProperty } = this.props;

        return (
            <>
            {/* this is the conditional rendering according to the dialog box the user want to see according to the property hovered */}
                {backgroundColor &&
                    (<Color
                        changeTheProperty={changeTheProperty}
                        hideContextMenu={hideContextMenu}
                        hideContext={hideContext}
                        hideOtherBackgroundColor={hideOtherBackgroundColor}
                        showOtherBackgroundColor={showOtherBackgroundColor}
                        x={x}
                        y={y}
                        setShowOtherBackgroundColor={setShowOtherBackgroundColor}
                        otherBackgroundColor={otherBackgroundColor}
                        // this is for which css property we need to change(for color)
                        whoseColorToChange="backgroundColor"
                    />)
                }
                {border && <BorderProperties
                    setShowNumber={this.state.number.setShowNumber}
                    setShowStyle={this.state.style.setShowStyle}
                    setShowColor={this.state.color.setShowColor}
                    setShowRadius={this.state.radius.setShowRadius}
                    setShowOtherBackgroundColor={setShowOtherBackgroundColor}
                    x={x}
                    y={y}
                    bdwd={bdwd}
                    bdrd={bdrd}
                    changeTheProperty={changeTheProperty}
                    hideContextMenu={hideContextMenu}
                    hideContext={hideContext}
                    hideOtherBackgroundColor={hideOtherBackgroundColor}
                    hideColor={this.hideColor}
                    showColor={this.showColor}
                    showNumber={this.showNumber}
                    hideNumber={this.hideNumber}

                    hideRadius={this.hideRadius}
                    showRadius={this.showRadius}
                    showStyle={this.showStyle}
                    hideStyle={this.hideStyle}

                    hideOtherBackgroundColor={hideOtherBackgroundColor}
                    showOtherBackgroundColor={showOtherBackgroundColor}
                />}
                {
                    height &&
                    <Number
                        changeTheProperty={changeTheProperty}
                        x={x}
                        y={y}
                        hideContextMenu={hideContextMenu}
                        hideContext={hideContext}
                        def={ht}
                        TypeOfWidthToBeChanged="height" />

                }
                {
                    width &&
                    <Number
                        changeTheProperty={changeTheProperty}
                        def={wd}
                        x={x}
                        y={y}
                        hideContextMenu={hideContextMenu}
                        hideContext={hideContext}
                        TypeOfWidthToBeChanged="width" />

                }
                {
                    image && <TextInput
                        whoseText="backgroundImage"
                        hideContextMenu={hideContextMenu}
                        hideContext={hideContext}
                        hideOtherBackgroundColor={hideOtherBackgroundColor}
                        hideStyle={this.hideStyle}
                        changeTheProperty={changeTheProperty}
                        x={122.8}
                        y={180}
                    />
                }
                {
                    text &&
                    <TextProperties
                        setShowNumber={this.state.number.setShowNumber}
                        setShowStyle={this.state.style.setShowStyle}
                        setShowColor={this.state.color.setShowColor}
                        changingDivId={changingDivId}
                        setShowOtherBackgroundColor={setShowOtherBackgroundColor}
                        x={x}
                        y={y}
                        styleArray={["Cursive", "Serif", "Monospace", "Fantasy"]}
                        heading="Text Properties"
                        changeTheProperty={changeTheProperty}
                        hideContextMenu={hideContextMenu}
                        hideContext={hideContext}
                        hideOtherBackgroundColor={hideOtherBackgroundColor}
                        hideColor={this.hideColor}
                        showColor={this.showColor}
                        showNumber={this.showNumber}
                        hideNumber={this.hideNumber}

                        hideRadius={this.hideRadius}
                        showRadius={this.showRadius}
                        showStyle={this.showStyle}
                        hideStyle={this.hideStyle}

                        hideOtherBackgroundColor={hideOtherBackgroundColor}
                        showOtherBackgroundColor={showOtherBackgroundColor} />
                }
            </>
        );
    }

}

export default ContextMenu;