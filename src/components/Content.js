// This is the Component which has the divs made by the user
import React from 'react';
import Div from './Div';
import Context from './Context';//this is the Component where we have the list of propertirs the the user can change 

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // this array contains the data of all the divs made by the user
            childivs: [],
            // this is the new div which the user currently wan't to change
            newdiv: {},
            // this is the data about dialogbox that will appear on the right click of any div
            context:{
                // this is the boolean value on whether the user wan't to show the dialog box or not
                setShowContext:false,
                // these are the coordinates of this dialog box
                x:0,
                y:0
            },
            otherBackgroundColor:{
              setShowOtherBackgroundColor:false,
              x:0,
              y:0,
            },
            // this is the data of dialog box that will  appear on the hover of any property
            contextMenu:{
                // this is the boolean variable on whether the user wan't to show the dialog box or not
                setShowContextMenu:false,
                // these are the coordinates of that dialog box
                x:0,
                y:0,
                // this is about the dialog box which the user wan't according to the property hovered by him
                whatToShow:""
            },
           
            // this is the id of the div which the user wan't to change(id which is there in the divs data(not the html element id))
            changingDivId:"",
            // this is the data about when the user whant's to change the position of 
            // a block (for moving the user need to first click on the m button on the top left corner 
            // of the div whose position he want's to chnge and then click any where where he want's to take
            // that div,as soon as he will click at some other position the block will move over there)
            positionChanging:{
                // this boolean value is for whether the user has started changing the position of any div
                // or not as accordingly we need to change the code in the addlast function which is called 
                // on the mouse up event in the content because by deafult on mouseup event a new div 
                // appears but we need to change in this situation(conditionally)
              setShow:false,
            //   these are the coordinates which the user clicks on the first click on the M button
                initialX:0,
                initialY:0
            }
        }
    }
// this is the componentDidMount function which is called only once(at starting) whenever the user makes a new Component
    componentDidMount() {
        var header=document.getElementById('header');
        var footer=document.getElementById('footer');
        var content=document.getElementById('content');
     
        // adding the required event Listeners
        // adding the alert if the user tries to start dragging inside the Header
        header.addEventListener('mousedown', e => {
           window.alert("Please start dragging below Header");
        });
        // // adding the alert if the user tries to end dragging inside the Header
        header.addEventListener('mouseup', e => {
            window.alert("Please end dragging below Header");
         });
        // adding the alert if the user tries to start dragging inside the Footer
         footer.addEventListener('mousedown', e => {
            window.alert("Please start dragging above Footer");
         });
        // adding the alert if the user tries to end dragging inside the Footer
         footer.addEventListener('mouseup', e => {
             window.alert("Please drag above Footer");
          });
        // adding the drag start and drag end event listeners to the Content Componet
        content.addEventListener('mousedown', this.addMouseDown);

        content.addEventListener('mouseup', this.addMouseUp);
    // Here we are stopping the propagation of mousedown and mouseover eventlistener so that 
    // we can apply the respective links (UpdateProfile and Logout)
       const UpdateProfileLink=document.getElementById("UpdateProfileLink");
       UpdateProfileLink.addEventListener("mousedown",(e)=>{
           e.stopPropagation();
       });
       UpdateProfileLink.addEventListener("mouseup",(e)=>{
        e.stopPropagation();
      });

      const logOutButton=document.getElementById("logOutButton");
      logOutButton.addEventListener("mousedown",(e)=>{
          e.stopPropagation();
      });
      logOutButton.addEventListener("mouseup",(e)=>{
       e.stopPropagation();
     });

    }
// this function is called from the div when the user does the mousedown operation on the M in
// the div here we have just does the changes that we have started chaning the position of
// a particular div aand saving the coordinates of the first click
    startPositionChanging=(x,y)=>{
        // console.log("we have changed here the strting position");
        this.setState({           
        positionChanging:{
            // changing it to true that the changing has been started
         setShow:true,
         initialX:x,
         initialY:y
        }
    });
    }
    // this function is called in the addlast function when we have done the click again to 
    // change the position of the div
changeThePosition=(diffX,diffY)=>{
    // console.log("here we reached the chnge the position function");
    // console.log("diffx=",diffX,"diffy=",diffY);
    // taking out the id of the div whose position need to be changed
  const id=this.state.changingDivId;
//   taking out only the div to be changed 
  let newArr=this.state.childivs.filter((item)=>item.id===id);
//   this is because when all the divs have been removed so their will be no chaningDivId
  if(newArr.length===0){
      return;
  }
  const changingDiv=newArr[0];
//  taking out the index of the div from the childivs
  const index=this.state.childivs.indexOf(changingDiv);
//   taking out its vertical and horizontal positions which are currently
  const{vertical,horizontal}=changingDiv;
//   console.log(typeof(vertical));
//   console.log(typeof(diffX));
//  console.log("before changingDiv=",changingDiv);
// just added the difference in the coordinates which are comming from the addlast function
  changingDiv.vertical=parseInt(vertical)+diffY+"";
  changingDiv.horizontal=parseInt(horizontal)+diffX+"";
//   console.log("After changingDiv=",changingDiv);
// done the changes in the state via setState so taht the changes should appear everywhere
  newArr=this.state.childivs;
  newArr[index]=changingDiv;
  this.setState({
  childivs:newArr
  });
}
// this is the function of changing about the contextMenu dialog box according to the hoverng done in the context Compnent
// called from the context Component
changeWhatToShow=(property)=>{
    const contextMenu=this.state.contextMenu;
    // changing the value of what to show and adding it in the state respectively 
    contextMenu.whatToShow=property;
   this.setState({
    contextMenu:contextMenu
   }); 
}
// this is to change the div which the user wan'ts to change currently according to where the user has done rightclick
// called from the Div
changeTheChangingDiv=(id)=>{
    // console.log("we have changed the id");
    // changing the id of the changing div in the state
  this.setState({
      changingDivId:id
  });
}
// this is the function for changing the value of a particular property according to the chosen by user
// called from ContextMenu Component
changeTheProperty=(property,value)=>{
    //  console.log("property=",property,"value=",value);
    const changingDivId=this.state.changingDivId;
    // made an array with only the div which need to be changed
    const newArray=this.state.childivs.filter((div)=>div.id===changingDivId);
    // taking out the zerroth element from the array which is the required div to be changed
    const changingDiv=newArray[0];
    // copy of array inside the state
    const array=this.state.childivs;
    // taking out the index of the div element from the state array
    const index=array.indexOf(changingDiv);
   //doing the changes in the div as said by the user 
   if(array[index].styles[property]!=undefined){
    array[index].styles[property]=value;
   }else{
       array[index][property]=value;
   }
//    console.log(array[index].height);
//   doing the changes in the state so that they automatically occur on the page
    this.setState({
        childivs:array
    });
}
// this is the function which is called when the user starts dragging
  addfirst = ( horizontal,vertical) => {
    //   console.log("vertical=",vertical,"horizontal=",horizontal);
    //   here we save the vertical and horizontal coordinates of the div which the user has started to make
    // and doing the changes in the newDiv where we store the data of the every new div which the user wan'ts to add in its App
        this.setState({
            newdiv: {
                vertical: vertical,
                horizontal: horizontal
            }
        })
    }
//   this is the function which will be called when the user ends dragging 
    addlast = (x, y) => {
        // console.log(this.state.newdiv);
        // console.log("x=",x,"y=",y);

   
// this if block is when the user has ended changing the positon and has now clicked somewhere in the
// content to change the position of the div to their respectively. 
     if(this.state.positionChanging.setShow===true){
        // console.log("here we are  in the if block for changing the position");
         const {initialX,initialY}=this.state.positionChanging;
        //  console.log("x=",x,"y=",y);
        //  console.log("ininitialX=",initialX,"initialY=",initialY,"in addlast function");
        //  console.log("here we called the change the position function to change the cordinates");
        // taken out the difference from the past added coordinates and passed the differences
        // in both x and y axis in changeThePosition function
        const diffX=x-initialX;
        const diffY=y-initialY;
         this.changeThePosition(diffX,diffY);
        //  here ended the chnage the position event as may be nextime user starts to drag a div 
        // or starts to chnage the position
         this.setState({
             positionChanging:{
                 setShow:false
             }
         });
         return;
     }
        const { vertical, horizontal } = this.state.newdiv;
        // this.state.newdiv=null;
        // these are the width and height as calculated according to the drag ending
        // x and y are the ending drag coordinates
        const wd = Math.abs(x - horizontal);
        const ht = Math.abs(y - vertical);
        // this is because if the user tries to make a very short div ,we shall not allow him
        if(ht<15||wd<15){
            return;
        }
        // leftmost horixontal coordinate from the left
        const newHor=Math.min(horizontal,x);
        //  leftmost vertical coordinate from the top
        const newVer=Math.min(vertical,y);
        // id which is given to seaparate all the divs(this id is not the html element id but only the id given in the data) 
        const id=""+vertical+horizontal+wd+ht;
        // this is the neww array with the changes 
        const newarr = this.state.childivs;
        // this is the new div data
        const newobj = {
            vertical: newVer + "",
            horizontal: newHor + "",
            height: ht + "px",
            width: wd + "px",
            id:id+"",
            child:[],
            parent:{},
            // by default styles are given to the div but it can be changed by the user accordingly
            styles:{
                backgroundColor:"rgba("+(ht%254)+
                ","+(wd%254)+
                ","+((vertical+horizontal)%254)+
                ",0.6)" ,
            
                borderStyle:"solid",
                borderWidth:"5px",
                borderColor:'black',
                borderRadius:"10px",
                backgroundImage:'url("")',
                fontSize:"20px",
                fontFamily:"cursive",
                color:"white"                
            }
        }
        // this is to add the direct parent to the data of a particular div (immediate parent as seen by the user)
        newobj.parent= this.addItInItsParent(vertical,horizontal,newobj).parent;
        // here we push the new div in the new array as we made which is changed in the state in the next line
        newarr.push(newobj);

        this.setState({
            childivs: newarr,
            
        });
    }
// Not used but can be used in future
// this function will return the id of the div according to the coordinates as passed in x and y
   getIdOFParent=(x,y)=>{

    const {childivs}=this.state;

    const filteredArray=childivs.filter((parent)=>{
        const parentvertical=parseInt(parent.vertical);
        const parenthorizontal=parseInt(parent.horizontal);
        const parentheight=parseInt(parent.height);
        const parentwidth=parseInt(parent.width);
       return (parentvertical<y&&
       parenthorizontal<x&&
       (y<parentvertical+parentheight)&&
       (x<parenthorizontal+parentwidth))
       });
   
       if(filteredArray.length>0){
        let directParent=filteredArray[0];
         filteredArray.map((parent)=>{
           if(((parseInt(parent.height))<(parseInt(directParent.height)))){
            directParent=parent;
           }
         });        
      }
    }

// this is to add the immediate parent and the immediate child 
// called from the addLast function so that every div when added shoul be added with its direct parent and also it
// must be added in the div as child where it is direct child
   addItInItsParent=(vertical,horizontal,newobj)=>{
   
    const {childivs}=this.state;
//    filtring the array according to those who can be the direct parent of this div
// after this filtring we will get all the parents of a div (here we can also get the grand parents as parents)
    const filteredArray=childivs.filter((parent)=>{
   
        const parentvertical=parseInt(parent.vertical);
        const parenthorizontal=parseInt(parent.horizontal);
        const parentheight=parseInt(parent.height);
        const parentwidth=parseInt(parent.width);
//  here i have made the condition so that we shall get all the parents of a particular div
       return (parentvertical<vertical&&
       parenthorizontal<horizontal&&
       (vertical<parentvertical+parentheight)&&
       (horizontal<parenthorizontal+parentwidth))
    });
//  this condition has been applied because there can be divs who doesn't have the direct parent as div but the have the 
// direct parent as the content Component which is the ultimate parent of every div  
  if(filteredArray.length>0){
    //   here we have just assigned it and changed according to that div which is the smallest which will be the direct 
    // parent for the new div respectively
   let directParent=filteredArray[0];
    filteredArray.map((parent)=>{
        // this is the calculation of the area of the div which can be the direct parent but the smallest one will be the direct parent respectively
      if(((parseInt(parent.height)*parseInt(parent.width))<(parseInt(directParent.height)*parseInt(directParent.width)))){
       directParent=parent;
      }
    });
    // finding out the index of that direct parent form the state array
    const index=childivs.indexOf(directParent);
    // adding its parent in its parent property in its data as we have found it
    newobj.parent=directParent;
    // pushing it also as a new object in the state array
    childivs[index].child.push(newobj);
    this.setState({
        childivs:childivs
    })
    // returning this new object from here because we need to also add the parent in the addLast function where it will 
    // be added in the state array as a new div
    return newobj;
 }
//  by default also just passed it even if it is an empty object so that error does'nt come
    return newobj;
    } 
//  this is the function which listens to the mouse dowm event Listener when the user starts dragging
// it is called when we are adding the event listener to the Content Component in componentDidMount
    addMouseDown=(e)=>{
        // these are the starting coordinates of the new div
            const x = e.pageX;
            const y = e.pageY;
            // console.log("the mouse down coordinates are " + "x=" + x + " and y=" + y);
            // this function is called to add the starting coordinates in the state 
            // which will be required in the addlast function to add the new div
            this.addfirst(x, y);
            // these functions are made to hide context and contextMenu as the user makes the mouse down event
            this.hideContext();
            this.hideContextMenu();
            this.hideOtherBackgroundColor();
    }
    // this function is to add the mouse up event Listener
    addMouseUp=(e)=>{
        // these are the ending coordinates of the new div 
        const x = e.pageX;
        const y = e.pageY;
        // console.log("the mouse up coordinates are " + "x=" + x + " and y=" + y);
        // now we have called the addLast function as we have got both the coordinates as one pair is here and the other
        // pair has been stored in the state as done during the addMouse down event
        this.addlast(x, y);
        // these are calle to hide the context and contextMenu 
        // this.hideContext();
        // this.hideContextMenu();

    }

 
    
//   this is to show the Context(dialog box of the properties) when the user right clicks on a particular div 
    showContext=(x,y)=>{
        // just changing the boolean variable so that,but conditional rendring the Context Component is visible to the user
     this.setState({
         context:{
             setShowContext:true,
             x:x,
             y:y
         }
     });
    }
//   this is to show the ContextMenu(dialog box of the values which can be assigned to aparticular property)
//  when the user hover on the properties 
    showContextMenu=(x,y)=>{
// this function is called from the Context Component and the x and y which are passed here are after the 
// calculation of where does the ContextMenu Component should ocuur according to the hovering of the properties by the user 
// just changing the boolean variable so that,but conditional rendring the ContextMenu Component is visible to the user       
     this.setState({
         contextMenu:{
             setShowContextMenu:true,
             x:x,
             y:y
         }
     });
    }
    // function for showing the OtherBackgroundColor Component 
    showOtherBackgroundColor=(x,y)=>{
    
        this.setState({
            otherBackgroundColor:{
            setShowOtherBackgroundColor:true,
            x:x,
            y:y
            }
        })
    }
      // function for hiding the OtherBackgroundColor Component 
    hideOtherBackgroundColor=()=>{
        this.setState({
            otherBackgroundColor:{
                setShowOtherBackgroundColor:false
            }
        })
    }

// this function is to hide the Context component 
    hideContext=(x,y)=>{

        this.setState({
            context:{
                // this is the boolean variable on whether the user want's to show the contextMenu Component or not
                // so changed acoording to false so that it is hidden from the user now as done via conditional rendring
                setShowContext:false,
            }
        })
    }
// this function is to hide the context Menu Componet
    hideContextMenu=(x,y)=>{
        this.setState({
            contextMenu:{
                setShowContextMenu:false,
            }
        })
    }
// this function is to remove a particular div from the Content when the user clicks on the cross at the top right 
// corner of every div
removeDiv=(id)=>{
//   here we get the id in function of the div to be removed(not the html element id)
    const {childivs}=this.state;
    this.hideContextMenu();
    this.hideContext();
    // in set state we get the previous state by default
    this.setState((prevState)=>{
    return {
     // this is to filter the state array according to it is left with all those divs whose id is not equal to this id
        childivs:prevState.childivs.filter((obj)=>obj.id!==id)
    }
   });
  }

//   this function is to get the dimensions like width,height,border-radius
// of the div whre the user has opened the context so that they can be passed in props and 
// shown to the user in the input fields respectively
  getTheChangingDivDimensions=()=>{
    //   just returned by default as at the starting there will be not div so changingDivId will
    // be an empty string
      if(this.state.changingDivId===""){
          return {
              ht:"",
              wd:""
          }
      }
    //   taking out the corresponding dimensions from the state
    // and returning in the object
      const id=this.state.changingDivId;
      let childivs=this.state.childivs;
      childivs=childivs.filter((item)=>item.id==id);
      const Div=childivs[0];
      if(Div===undefined){
        return {
            ht:"",
            wd:""
        }
      }
      const {borderRadius,borderWidth}=Div.styles;
      const obj={
          ht:Div.height,
          wd:Div.width,
          bdwd:borderWidth,
          bdrd:borderRadius
      }

      return obj;
  }
    render() {
        // this is the whole state array with all the divs
        const  childivs  = this.state.childivs;
        // this is whether the user wan'ts to show thw Context Component or not
        const setShowContext=this.state.context.setShowContext;
        // this is whether the user wan'ts to show thw ContextMenu Component or not
        
        const {ht,wd,bdwd,bdrd}=this.getTheChangingDivDimensions();
 
        return (
            // this is the whole Content Component
            <div id="content">
               {/* here we are adding all the divs made by the user in the UI */}
                {childivs.map((item)=>{
                    // here we get the coordinates of that particular div
                  const  {vertical,horizontal,height,width,id}=item;
                //   here we get the values of css properties of that particular div
                  const {backgroundColor,borderWidth,borderStyle,borderColor,
                    borderRadius,backgroundImage,fontFamily,fontSize,color}=item.styles;
                
                return <Div 
                // here we pass the whaole data as props to the div
                vertical={vertical} 
                horizontal={horizontal}
                 height={height}
                 width={width}
                 id={id}
                 removeDiv={this.removeDiv}
                 showContext={this.showContext}
                 hideContext={this.hideContext}
                 backgroundColor={backgroundColor}
                 changeTheChangingDiv={this.changeTheChangingDiv}
                 changeThePosition={this.changeThePosition}
                 startPositionChanging={this.startPositionChanging}
                 borderWidth={borderWidth}
                 borderStyle={borderStyle}
                 borderColor={borderColor}
                 borderRadius={borderRadius}    
                 backgroundImage={backgroundImage}   
                 fontFamily={fontFamily}
                 fontSize={fontSize}
                 color={color}      
                 />
              })
             }
            {/* this is the Context Component which is shown according to the boolean value
            of setShowContext which is changed according to whether the user wan'ts to see the properties Component or not */}
            {setShowContext&& <Context
            // these are the props passe to the Context Component as required 
            x={this.state.context.x}
             y={this.state.context.y}
            // height={}
            //  function to make the contextMenu visible
            // called from Context when the user hovers on a particular property
            ht={ht}
            wd={wd}
            bdwd={bdwd}
            bdrd={bdrd}
            showContextMenu={this.showContextMenu}
            // a function to hide the contextMenu 
            hideContextMenu={this.hideContextMenu}
            hideContext={this.hideContext}
            // a function to chnage the contextMenu according to the property as hovered by the user
            changeWhatToShow={this.changeWhatToShow}
            hideOtherBackgroundColor={this.hideOtherBackgroundColor}
            whatToShow={this.state.contextMenu.whatToShow}
            setShowOtherBackgroundColor={this.state.otherBackgroundColor.setShowOtherBackgroundColor}
            showOtherBackgroundColor={this.showOtherBackgroundColor}
            setShowContextMenu={this.state.contextMenu.setShowContextMenu}
            contextMenu={this.state.contextMenu}
            otherBackgroundColor={this.state.otherBackgroundColor}
            changeTheProperty={this.changeTheProperty}
            changingDivId={this.state.changingDivId}
             /> }             
          
            </div>

        );
    }
}

export default Content;
