// Dependencies
import React, { Component } from 'react';
import './App.css';
// Components
import GridBox from './components/GridBox/GridBox.js';
import Image from './components/Image/Image.js';
// API key
const APIkey = `${process.env.REACT_APP_UNSPLASH_API_KEY}`;

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // ID of "largeDiv" which will be changed dependign on which image is large
      largeDivID: "imageTop1",
      // Previous "largeDiv" so we know which image to make smaller
      largeDivPrevious: "imageTop1",
      // To be filled once ajax call completes
      images: [],
    };
  };

  // Invoked immediately after component is mounted
  componentDidMount() {
    // Call to Unsplash to get random image array for image sources
    fetch(`https://api.unsplash.com/photos/curated?per_page=18`, {
      headers: { "Authorization": `Client-ID ${APIkey}`}
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);

        // Set array to the images state
        this.setState({
          images: result
        }, function () {
          console.log("state upon callback: " + this.state.images[0].urls.small);
        });
      },
      // Catch any errors
      (error) => {
        this.setState({
          error
        });
      }
    );
  };

  // Function to handle when element is clicked on
  handleClick = (e) => {
    // Removes all characters except numbers from ids 
    let columnNumber = e.target.parentNode.id.replace(/\D/g,'');

    // Checks location of clicked div "largeDiv" 
    if (columnNumber < 6 && columnNumber > 1) {

      // Call function to handle these columns
      this.handleMidColumnClick(columnNumber, e);

    } else if (columnNumber == 1) {

      // Call function to handle this column
      this.handleLeftColumnClick(e);

    } else if (columnNumber == 6) {

      // Call function to handle this column
      this.handleRightColumnClick(e);

    }

  };

  handleMidColumnClick = (column, buttonClickEvent) => {

    // Shrink former "largeDiv"
    document.getElementById(this.state.largeDivPrevious).style.height = "200px";
    document.getElementById(this.state.largeDivPrevious).style.width = "100%";

    // Grow new "largeDiv"
    document.getElementById(buttonClickEvent.target.id).style.height = "400px";
    document.getElementById(buttonClickEvent.target.id).style.width = "200%";

    // Create new ID for image to reflect its new position
    let columnNumber = column -1;
    let newID = "imageTop" + columnNumber; 
    let previousID = buttonClickEvent.target.id;

    // Move "largeDiv" to top left location so that it does not overflow the bottom
    // Get ids of divs in three positions that will be covered by "largeDiv"
    let positionOne = "top" + column -1;
    let positionTwo = "top" + column;
    let positionThree = "bottom" + columnNumber;
    let positionFour = "bottom" + column;
    // Array of positions
    let coveredPositions = [positionOne, positionTwo, positionThree, positionFour];



    // Change 


    // Set state to reflect new "largeDiv" (id will always be top - 1)
    this.setState({largeDivID: newID, largeDivPrevious: previousID});
  };

  handleLeftColumnClick = (buttonClickEvent) => {

    // Shrink former "largeDiv"
    document.getElementById(this.state.largeDivPrevious).style.height = "200px";
    document.getElementById(this.state.largeDivPrevious).style.width = "100%";

    // Grow new "largeDiv"
    document.getElementById(buttonClickEvent.target.id).style.height = "400px";
    document.getElementById(buttonClickEvent.target.id).style.width = "200%";

    // Move "largeDiv" to top left location so that it does not overflow the bottom
    // Get ids of divs in three positions that will be covered by "largeDiv"
    let coveredPositions = ["top1", "top2", "bottom1", "bottom2"];

    // Change position of div to top left

    // 

    // Create new ID for image to reflect its new position
    let newID = "imageTop1"; 
    let previousID = buttonClickEvent.target.id;

    // Set state to reflect new "largeDiv" (id will always be top - 1)
    this.setState({largeDivID: newID, largeDivPrevious: previousID});

  };

  handleRightColumnClick = (buttonClickEvent) => {

    // Shrink former "largeDiv"
    document.getElementById(this.state.largeDivPrevious).style.height = "200px";
    document.getElementById(this.state.largeDivPrevious).style.width = "100%";

    // Grow new "largeDiv"
    document.getElementById(buttonClickEvent.target.id).style.height = "400px";
    document.getElementById(buttonClickEvent.target.id).style.width = "200%";

    // Move "largeDiv" to top left location so that it does not overflow the bottom
    // Get ids of divs in three positions that will be covered by "largeDiv"
    let coveredPositions = ["top5", "top6", "bottom5", "bottom6"];

    // Create new ID for image to reflect its new position
    let newID = "imageTop5"; 
    let previousID = buttonClickEvent.target.id;

    // Append large div to top left div
    // document.getElementById("top5").innerHTML += document.getElementById(buttonClickEvent.target.id);
    let imgToBeMoved = document.getElementById(buttonClickEvent.target.id);
    document.getElementById("top5").appendChild(imgToBeMoved);


    // Set state to reflect new "largeDiv" (id will always be top - 1)
    this.setState({largeDivID: newID, largeDivPrevious: previousID});
  };

  render() {
    return (
      <div className="wrapper">
        <div className="row">
          {/* First row */}
          <GridBox 
            id="top1"
          >
            <Image 
              url='http://pluspng.com/img-png/kitten-png-kitten-png-transparent-image-900.png'
              id="imageTop1"
              width="200%"
              height="400px"
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id="top2"
          >
            {/* Starts empty */}
          </GridBox>
          <GridBox 
            id="top3"
          >
            <Image 
              url='http://pluspng.com/img-png/kitten-png-kitten-png-transparent-image-900.png'
              id="imageTop3"
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id="top4"
          >
            <Image 
              url='http://newtownsquarevet.com/wp-content/uploads/2017/01/kitten-pounce.png'
              id="imageTop4"
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id="top5"
          >
            <Image 
              url='http://pluspng.com/img-png/kitten-png--243.png'
              id="imageTop5"
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id="top6"
          >
            <Image 
              url='https://banner2.kisspng.com/20180306/ikq/kisspng-abyssinian-kitten-whiskers-abyssinian-cat-5a9f06893fdf90.3366988615203713372616.jpg'
              id="imageTop6"
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id="bottom1"
          >
            {/* Starts empty */}
          </GridBox>
          <GridBox 
            id="bottom2"
          >
            {/* Starts empty */}
          </GridBox>
          <GridBox 
            id="bottom3"
          >
            <Image 
              url='https://pre00.deviantart.net/24c0/th/pre/i/2013/132/0/b/puppy_and_cats_free_png_stock_by_janeeden-d3aa07z.png'
              id="imageBottom3"
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id="bottom4"
          >
            <Image 
              url='https://img00.deviantart.net/1c51/i/2013/135/7/4/colourpoint_free_png_cat_stock_by_janeeden-d3azobp.png'
              id="imageBottom4"
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id="bottom5"
          >
            <Image 
              url='https://pre00.deviantart.net/261f/th/pre/i/2013/132/e/9/black_and_white_cat_free_png_stock_by_janeeden-d3azpnu.png'
              id="imageBottom5"
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id="bottom6"
          >
            <Image 
              url='https://clipart.info/images/ccovers/15228525606-cat-png-image-download-picture-kitten.png'
              id="imageBottom6"
              imageOnClick={this.handleClick}
            />
          </GridBox>
        </div>

      </div>
    );
  }
}

export default App;
