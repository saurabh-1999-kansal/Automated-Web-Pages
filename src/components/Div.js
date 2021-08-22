import React from 'react';

// this is the main Componet of our Project which is the smallest component made by the user
// and also the largest component made by the user(actually every Component)
class Div extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    const { id, showContext, changeTheChangingDiv, startPositionChanging
    } = this.props;
    // here we stop the propagation of mousedown and mouseup which were added in the Content Component
    const btn = document.getElementById(id);
    btn.addEventListener('mousedown', (e) => e.stopPropagation());
    btn.addEventListener('mouseup', (e) => e.stopPropagation());
    // here we take out each div according to its id("this is the html element id which is given by us dynamically
    // which is just a mixture of id which we stored in the data of every Div Component and the string "div" at starting)
    const div = document.getElementById("div" + id);
    // here we add the event listener of showing the Context Component when the user right clicks on a div to change its properties
    div.addEventListener('contextmenu', (e) => {
      // this is bcz chrome also has a default right click event which has options like going to inspect
      e.preventDefault();
      let x = e.clientX;
      let y = e.clientY;
      //  here we change the id of the chnaging div in the state in the Content Component
      changeTheChangingDiv(id);
      // this is so that the context must be visible now 
      showContext(x, y);
    });
    // this is the to move button in the div at the top left corner
    const toMove = document.getElementById("tomove" + id);
    // stopped the propagation of mousedown and mouseup event which started in the content Component
    toMove.addEventListener("mousedown", (e) => {
      e.stopPropagation();
    });

    toMove.addEventListener("mouseup", (e) => {
      e.stopPropagation();
    });
    // added a new event listener on the mouse down event
    toMove.addEventListener("mousedown", (e) => {
      // console.log("started the position changing ", "e.clientX=", e.clientX, "e.clientY=", e.clientY, "in div");
      // changed the div as we need the acess of this changing div id in change the position function
      // made in the Content Component called in the addlast function
      changeTheChangingDiv(id);
      // console.log(e);
      // now started the position changing
      startPositionChanging(e.pageX, e.pageY);
    });

  }

  render() {
    const { height, width, vertical, horizontal, id, removeDiv, backgroundColor, borderWidth,
      borderStyle, borderColor, borderRadius, backgroundImage,
      fontSize, color, fontFamily
    } = this.props;
    // styles given dynamically according the values recieved in props
    const styles = {
      divstyles: {
        height: height,
        // border:"3.5px solid white",
        width: width,
        left: horizontal + "px",
        top: vertical + "px",
        position: "absolute",
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderStyle: borderStyle,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        backgroundImage: backgroundImage,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        fontSize: fontSize,
        fontFamily: fontFamily,
        color: color
      }
    }

    return (
      <div id={"div" + id} className="divClass" style={styles.divstyles}>
        <div id="inner" style={{ textOverflow: "ellipsis", overflow: "hidden", color: "black" }} ></div>
        {/* this is the cross button option given to every div at the top right cornber
            so that if the user has made this div by mistake so he can delete it immediately */}
        <div className="crossOuter" id={id} onClick={(e) => { removeDiv(id) }}><strong className="t cross" style={{ fontSize: "20px", color: "black" }} >X</strong>
        </div>
        <div className="mOuter">
        <div  className="t " id={"tomove" + id}
          style={
            {
              color: "black",
              cursor: "pointer",
              position:"absolute",
              bottom:"0px",
              left:"0px"
            }
          }
        >M</div>
        </div>
      </div>
    );
  }
}

export default Div;
