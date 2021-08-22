import React from 'react';
// This TextInput Component can be used where we need to take at max one line as input from the user
class TextInput extends React.Component{
    constructor(props){
        super(props);
        // again the text typed by the user is in state so that the componenet automatically re-renders on the change of state

        this.state={
            text:""
        }
    }
     componentDidMount(){
        const {changeTheProperty, hideContextMenu,
            hideContext, 
            hideOtherBackgroundColor,
            hideStyle,whoseText}=this.props;
            // again these inherited event listeners need to be removed so that user can click on 
            // text area and start typing or else after the click every dialog box will hide as 
            // hiding function of all the dialog boxes are called on the onclick on the Content Component
            const textInput=document.getElementById("textInput");
            textInput.addEventListener("mousedown",(e)=>{
             e.stopPropagation();
            });
            textInput.addEventListener("mouseup",(e)=>{
                e.stopPropagation();
             });
            //  here added the click listener on the ok button so that the changes should 
            // appear on the click of ok button
         const ok=document.getElementById("textOk");
         ok.addEventListener("click",()=>{
            let str=this.state.text;
            // as it is not necessary that the user will use this component only for the 
            // text input of the url of an image we can use it at any place where we need to
            // take input text from the user(at max one line,if greater is required then
            // we can user TextArea Component respectively)
            if(whoseText==="backgroundImage"){
                str="url('"+str+"')";
            }
            // in whose text we bring the css property to be changed
            changeTheProperty(whoseText,str);
            hideStyle();
            hideContext();
            hideContextMenu();
            hideOtherBackgroundColor();
         });
     }
    render(){
        const {whoseText,x,y}=this.props;
        const style={
            position:"absolute",
            left:x+"px",
            top:y+"px",
            display:"flex",
            flexDirection:"column"
        }
        return (
            <div style={style}id="textInput">
                {/* heading of the dialog box is given dynamic and it is coming in the props */}
               <div><strong className="title">{whoseText}</strong></div>
               <div><input type="text" onChange={(e)=>{
                   this.setState({
                     text:e.target.value
                   })
               }}/></div> 
               <div id="textOk">ok</div>
            </div>
        )
    }
}

export default TextInput;