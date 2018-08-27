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
      top1: {
        id: "top1",
      },
      top2: {
        id: "top2",
      },
      top3: {
        id: "top3",
      },
      top4: {
        id: "top4",
      },
      top5: {
        id: "top5",
      },
      top6: {
        id: "top6",
      },
      bottom1: {
        id: "bottom1",
      },
      bottom2: {
        id: "bottom2",
      },
      bottom3: {
        id: "bottom3",
      },
      bottom4: {
        id: "bottom4",
      },
      bottom5: {
        id: "bottom5",
      },
      bottom6: {
        id: "bottom6",
      },
      largeDiv: {
        id: "imageTop1"
      },
      // To be filled once ajax call completes
      images: [],
      // Image ids, don't belong in state because they are static
      imageIds: {
        id0: "imageTop1",
        id1: "imageTop2",
        id2: "imageTop3",
        id3: "imageTop4",
        id4: "imageTop5",
        id5: "imageTop6",
        id6: "imageBottom1",
        id7: "imageBottom2",
        id8: "imageBottom3",
        id9: "imageBottom4",
        id10: "imageBottom5",
        id11: "imageBottom6"
      }
    };
  };

  // Invoked immediately after component is mounted
  componentDidMount() {
    // Call to Unsplash to get random image array for image sources
    fetch(`https://api.unsplash.com/?client_id=${APIkey}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            images: result.items
          });
        },
        // Catch any errors
        (error) => {
          this.setState({
            error
          });
        }
      )
    console.log(APIkey);
  };

  // Function to handle when element is clicked on
  handleClick = (e) => {
    // Removes all characters except numbers from ids 
    const columnNumber = e.target.id.replace(/\D/g,'');
    // If/else checks location of clicked div and (former) "largeDiv" to tell it where to place new "largeDiv"
    if (columnNumber < 6 && columnNumber > 1) {
      // call function to handle 
      this.handleMidColumnClick(columnNumber, e);
    } else if (columnNumber == 1) {
      console.log("column number is equal to 1");

      // Shrink former "largeDiv"
      document.getElementById(this.state.largeDiv.id).style.height = "200px";
      document.getElementById(this.state.largeDiv.id).style.width = "100%";

      // Grow new "largeDiv"
      document.getElementById(e.target.id).style.height = "400px";
      document.getElementById(e.target.id).style.width = "200%";

      // Set state to reflect new "largeDiv" (id will always be top)
      // this.setState({largeDiv: {id: e.target.id}});
    } else if (columnNumber == 6) {
      console.log("column number is equal to 6");

      // Shrink former "largeDiv"
      document.getElementById(this.state.largeDiv.id).style.height = "200px";
      document.getElementById(this.state.largeDiv.id).style.width = "100%";

      // Grow new "largeDiv"
      document.getElementById(e.target.id).style.height = "400px";
      document.getElementById(e.target.id).style.width = "200%";

      // Set state to reflect new "largeDiv" (id will always be top - 1)
      // this.setState({largeDiv: {id: e.target.id}});
    }

    // Need to find algorithm to place new image in the top left most empty area so that it won't overflow downwards


    // check id of largeDiv and compare it to the id of the clicked div
    // if it's the same do nothing
    // if it's different, compare to find out whether it is to the right or to the left
    // if it is to the left, figure out whether clicked div is on bottom or top, and therefore which divs will be displaced
    // make last largeDiv smaller, and new largeDiv bigger, updating state to reflect new largeDiv id, and the initial positions so we know how to displace next time
    // append displaced divs
  };

  handleMidColumnClick = (column, buttonClickEvent) => {
    console.log(column);
    console.log("column is greater than 1 and less than 6");

    // Shrink former "largeDiv"
    document.getElementById(this.state.largeDiv.id).style.height = "200px";
    document.getElementById(this.state.largeDiv.id).style.width = "100%";

    // Grow new "largeDiv"
    document.getElementById(buttonClickEvent.target.id).style.height = "400px";
    document.getElementById(buttonClickEvent.target.id).style.width = "200%";

    // Move "largeDiv" to top left location so that it does not overflow the bottom


    // create new ID for image to reflect its new position
    const columnNumber = column -1;
    const newID = "imageTop" + columnNumber; 
    console.log(newID);

    // change 

    // Set state to reflect new "largeDiv" (id will always be top - 1)
    this.setState({largeDiv: {id: newID}});
    console.log("state: " + this.state.largeDiv.id);
  };

  render() {
    return (
      <div className="wrapper">
        <div className="row">
          {/* First row */}
          <GridBox 
            id={this.state.top1.id}
          >
            <Image 
              url='http://www.pngall.com/wp-content/uploads/2016/05/Kitten-PNG-Picture.png'
              id={this.state.imageIds.id0}
              width="200%"
              height="400px"
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id={this.state.top2.id}
          >
            {/* Starts empty */}
          </GridBox>
          <GridBox 
            id={this.state.top3.id}
          >
            <Image 
              url='http://pluspng.com/img-png/kitten-png-kitten-png-transparent-image-900.png'
              id={this.state.imageIds.id2}
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id={this.state.top4.id}
          >
            <Image 
              url='http://newtownsquarevet.com/wp-content/uploads/2017/01/kitten-pounce.png'
              id={this.state.imageIds.id3}
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id={this.state.top5.id}
          >
            <Image 
              url='http://pluspng.com/img-png/kitten-png--243.png'
              id={this.state.imageIds.id4}
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id={this.state.top6.id}
          >
            <Image 
              url='https://banner2.kisspng.com/20180306/ikq/kisspng-abyssinian-kitten-whiskers-abyssinian-cat-5a9f06893fdf90.3366988615203713372616.jpg'
              id={this.state.imageIds.id5}
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id={this.state.bottom1.id}
          >
            {/* Starts empty */}
          </GridBox>
          <GridBox 
            id={this.state.bottom2.id}
          >
            {/* Starts empty */}
          </GridBox>
          <GridBox 
            id={this.state.bottom3.id}
          >
            <Image 
              url='https://pre00.deviantart.net/24c0/th/pre/i/2013/132/0/b/puppy_and_cats_free_png_stock_by_janeeden-d3aa07z.png'
              id={this.state.imageIds.id8}
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id={this.state.bottom4.id}
          >
            <Image 
              url='https://img00.deviantart.net/1c51/i/2013/135/7/4/colourpoint_free_png_cat_stock_by_janeeden-d3azobp.png'
              id={this.state.imageIds.id9}
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id={this.state.bottom5.id}
          >
            <Image 
              url='https://pre00.deviantart.net/261f/th/pre/i/2013/132/e/9/black_and_white_cat_free_png_stock_by_janeeden-d3azpnu.png'
              id={this.state.imageIds.id10}
              imageOnClick={this.handleClick}
            />
          </GridBox>
          <GridBox 
            id={this.state.bottom6.id}
          >
            <Image 
              url='https://clipart.info/images/ccovers/15228525606-cat-png-image-download-picture-kitten.png'
              id={this.state.imageIds.id11}
              imageOnClick={this.handleClick}
            />
          </GridBox>
        </div>

      </div>
    );
  }
}

export default App;
