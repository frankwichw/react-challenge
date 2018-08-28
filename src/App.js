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
      images: null,
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

        // Set array to the images state
        this.setState({
          images: result
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

    // Before moving "largeDiv", check the positions it will take up
    // Loop through them and find out if there is 
    // (a) anything in that div, and (b) find an empty spot for them
    for (let i = 0; i < 4; i++) {
      // Get current div item by ID
      let currentItem = document.getElementById(coveredPositions[i]);
      // If the currentItem has children
      // And the child is not the same as the one that was clicked on
      if (currentItem.childNodes.length > 1 && currentItem.childNodes != buttonClickEvent.target) {
        console.log(i + " " + currentItem.childNodes);
      }
      console.log(document.getElementById(coveredPositions[i].childNodes));
      console.log(document.getElementById(coveredPositions[i]).innerHTML);
    }

    // Append large div to top left div
    // let imgToBeMoved = document.getElementById(buttonClickEvent.target.id);
    // document.getElementById("top5").appendChild(imgToBeMoved);


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
            { this.state && this.state.images &&
              <Image 
                url={this.state.images[0].urls.small}
                id="imageTop1"
                width="200%"
                height="400px"
                imageOnClick={this.handleClick}
              />
            }
          </GridBox>
          <GridBox 
            id="top2"
          >
            {/* Starts empty */}
          </GridBox>
          <GridBox 
            id="top3"
          >
            { this.state && this.state.images &&
              <Image 
                url={this.state.images[1].urls.small}
                id="imageTop3"
                imageOnClick={this.handleClick}
              />
            }
          </GridBox>
          <GridBox 
            id="top4"
          >
            { this.state && this.state.images &&
              <Image 
                url={this.state.images[2].urls.small}
                id="imageTop4"
                imageOnClick={this.handleClick}
              />
            }
          </GridBox>
          <GridBox 
            id="top5"
          >
            { this.state && this.state.images &&
              <Image 
                url={this.state.images[3].urls.small}
                id="imageTop5"
                imageOnClick={this.handleClick}
              />
            }
          </GridBox>
          <GridBox 
            id="top6"
          >
            { this.state && this.state.images &&
              <Image 
                url={this.state.images[4].urls.small}
                id="imageTop6"
                imageOnClick={this.handleClick}
              />
            }
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
            { this.state && this.state.images &&
              <Image 
                url={this.state.images[5].urls.small}
                id="imageBottom3"
                imageOnClick={this.handleClick}
              />
            }
          </GridBox>
          <GridBox 
            id="bottom4"
          >
            { this.state && this.state.images &&
              <Image 
                url={this.state.images[6].urls.small}
                id="imageBottom4"
                imageOnClick={this.handleClick}
              />
            }
          </GridBox>
          <GridBox 
            id="bottom5"
          >
            { this.state && this.state.images &&
              <Image 
                url={this.state.images[7].urls.small}
                id="imageBottom5"
                imageOnClick={this.handleClick}
              />
            }
          </GridBox>
          <GridBox 
            id="bottom6"
          >
            { this.state && this.state.images &&
              <Image 
                url={this.state.images[8].urls.small}
                id="imageBottom6"
                imageOnClick={this.handleClick}
              />
            }
          </GridBox>
        </div>

      </div>
    );
  }
}

export default App;
