// It is the Footer of our App
import React from 'react';

class Footer extends React.Component {
    
    componentDidMount(){
    //   this is the save button in the footer as when it will be clicked all the cross buttons
    // and M(move) buttons will disappear 
    // here the feature is like after saving the user will not be able to move the div
    // but if he want's to delete this div can be done as once the user has saved he may want to 
    // delete some divs (also properties can be changed after saving from ContextMenu)
        let save=document.getElementById("save");
        // removing the propagation of mousedown and mouseup from the save button which are 
        // comming from the footer
        save.addEventListener("mousedown",(e)=>{
         e.stopPropagation();
        });
        save.addEventListener("mouseup",(e)=>{
            e.stopPropagation();
           });
        // adding a new click listener for saving on click
           save.addEventListener("click",()=>{
            // console.log("yoyo");
            const crosses=document.getElementsByClassName("t");
            for(let cross of crosses){
                // added the display None class dynamically so that they must be removed from the DOM
               cross.classList.add("displayNone");
            } 
          
           });
    }
 
    render() {
       
        return(
            
         <div id="footer">
         <div>
         <h1 id="save" >Save</h1>
         </div>
         </div>

        );
    }
}

export default Footer;