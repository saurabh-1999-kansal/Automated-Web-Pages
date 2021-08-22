import React from 'react';
// TextArea Component is can be used where we want to take a paragaraph(text) as input from the user
class TextArea extends React.Component{
    constructor(props){
     super(props);
    //  this is the text as typed by the user in the input field
    // which is changed onChange in the state so that the component re-renders and changes should reflect respectively
     this.state={
         text:""
     }
    }
   componentDidMount(){
    //   here we have stopped the propagation of mousedown and mouseup events which are inherited 
    // from the Content Component as we know that it is necessary for a user to first click on the 
    // input field to type  
       let textArea=document.getElementById("textArea");
       textArea.addEventListener("mousedown",(e)=>{
           e.stopPropagation();
       })
       textArea.addEventListener("mouseup",(e)=>{
        e.stopPropagation();
    })
   }
    render(){
        const {rows,cols,x,y,changingDivId}=this.props;
        const style={
            position:'absolute',
            left:x+"px",
            top:y+"px",
            display:'flex',
            flexDirection:'column'
        }
        return(
            <div style={style} id="textArea">
              <textarea rows={rows} cols={cols} onChange={(e)=>{
                  this.setState({
                      text:e.target.value
                  },
                //   here we have changed the innerhtml in the div in the callback function
                // as callback function is called when the change in state complete
                // and here we are taking the innerhtml from the state
                // and also state is changed whenever there is some change in the textarea field
                  ()=>{
                    let changingDiv=document.querySelector("#div"+changingDivId+" #inner");
                    changingDiv.innerHTML=this.state.text;
                  });                  
              }} />
            </div>
        )
    }
}
export default TextArea;