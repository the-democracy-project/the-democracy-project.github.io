function democracyEngine() {

// if (userEdits == true)
// {
  this.setup = function() {

    textFont(helvFont);
    let canvas = createCanvas(windowWidth * .8, windowHeight * .8);
    canvas.parent('vote');
    dWidth = width;
    dHeight = height;
    background(bColor);

    // let fs = fullscreen();
    // fullscreen(!fs);
  }

  this.draw = function() {

    rot += 0.5;

    currentCongLogic();
  }

  this.enter = function() {
    document.getElementById("top").style.display = "none";
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "none";
    document.getElementById("page5").style.display = "none";
    document.getElementById("slider-value").style.display = "none";
    document.getElementById("vote").style.display = "block";
    currentCongLogic();

  }

  //Logic below is setup for current congressional configuration
  //May want to wrap this in a case state or the like so users can define different logic
  //if the user has input variables use those instead of the Global declaration
  function currentCongLogic() {

    // Logic for House
    if (bodyCount == 0) {

      // Setup variables first time we pass through the first body
      if (count < 1 && count1 < 1 && count2 < 1) {
        test = 0;
        print('bodyCount = ')
        print(bodyCount);
        background(color(bColor));

        //maps stress index onto percentage effecting yay/nay vote.
        stressMap = map(stress, stressLow, stressHigh, 0, 2);
        print('Voter Stress = ' + stressMap);

        stressPlanetMap = map(stressPlanet, stressPlanetLow, stressPlanetHigh, 0, 2);
        print('Planet Stress = ' + stressPlanetMap)

        //create a stress offset that will effect congress' likelyhood of passing legislation to create change
        stressOffset = (stressPlanetMap + stressMap) / 2;

        // Set number of voting memebers
        numCon = numHouse;
        bodyLabel = 'HOUSE OF REPRESENTATIVES';

        //Set Demographics for each body
        numDem = round(numCon * perDemHouse);
        numRep = round(numCon * perRepHouse);
        numWild = round(numCon * perIndHouse);


        offSet = dWidth / (numBodies);

        //Figure out how big to draw the circles and how far to space them out
        skip = floor(.97 * (sqrt((offSet) * dHeight / numCon)));
        print('Skip = ' + skip); //testing
        x = skip / 2;
        y = skip / 2;
      }
    }

    //Logic for Senate
    if (bodyCount == 1) {
      strokeWeight(10);
      translate(offSet * bodyCount, 0);

      if (endBody == 1) {
        resetCount();
        endBody = 0;
      }

      // Setup variables first time we pass through a new body
      if (count < 1 && count1 < 1 && count2 < 1) {
        test = 0;
        print('bodyCount = ')
        print(bodyCount);

        ///Set number of voting memebers
        numCon = numSenate;
        bodyLabel = 'SENATE';

        //Set Demographics for each body
        numDem = round(numCon * perDemSenate);
        numRep = round(numCon * perRepSenate);
        numWild = round(numCon * perIndSenate);


        //Figure out how big to draw the circles and how far to space them out
        skip = floor(.97 * (sqrt(offSet * dHeight / numCon)));
        print('Skip = ' + skip); //testing
        x = skip / 2;
        y = skip / 2;

        print('Count = ' + count); //fortesting
        print('Count1 = ' + count1); //fortesting
        print('Count2 = ' + count2); //fortesting
      }

    }

    //AB logic for VP if Senate needs a tiebreaker
    if (bodyCount == 2) {
      print("votingBodyCounts[1][0]= " + votingBodyCounts[1][0] + "votingBodyCounts[1][1] = " + votingBodyCounts[1][1]);



      // if (votingBodyCounts[1][0] == votingBodyCounts[1][1] && vpVote == true) {
      //   vpVote = true;
      // } else {
      //   vpVote = false;
      // }

      strokeWeight(10);
      translate(offSet * bodyCount, 0);

      if (endBody == 1) {
        resetCount();
        endBody = 0;
      }
      // Setup variables first time we pass through a new body
      if (count < 1 && count1 < 1 && count2 < 1) {
        test = 0;
        print('bodyCount = ')
        print(bodyCount);

        ///Set number of voting memebers
        numCon = numVP;
        bodyLabel = 'VICE PRESIDENT';

        //Set Demographics for each body
        numDem = round(numCon * perDemVP);
        numRep = round(numCon * perRepVP);
        numWild = round(numCon * perIndVP);

        //Figure out how big to draw the circles and how far to space them out
        skip = floor(.97 * (sqrt(offSet * dHeight / numCon)));
        print('Skip = ' + skip); //testing
        x = skip / 2;
        y = skip / 2;
      }
    }

    //Logic for President
    if (bodyCount == 3) {
      strokeWeight(10);
      translate(offSet * (bodyCount), 0);

      if (endBody == 1) {
        resetCount();
        endBody = 0;
      }

      // Setup variables first time we pass through a new body
      if (count < 1 && count1 < 1 && count2 < 1) {
        test = 0;
        print('bodyCount = ')
        print(bodyCount);

        // Set number of voting memebers
        numCon = numPres;
        bodyLabel = 'PRESIDENT';

        //Set Demographics for each body
        numDem = round(numCon * perDemPres);
        numRep = round(numCon * perRepPres);
        numWild = round(numCon * perIndPres);


        //Figure out how big to draw the circles and how far to space them out
        skip = floor(.97 * (sqrt(offSet * dHeight / numCon)));
        print('Skip = ' + skip); //testing
        x = skip / 2;
        y = skip / 2;
      }
    }

    // Need to make sure we are not over our number of congressional body numCon and readjusts skip if too big

    if (count < numCon - 1 && count1 < 1) {

      rotLoadImage();
      testSize();
      count++;
      // print('Count = ' + count); //fortesting
    } else if (count >= numCon - 1) {

      bodyVote();
      count1++;
      //print ('Count1 = ' + count1); //fortesting
      //print ('skip * Y = ' + (yCountT * skip));
    }
  }

  //resets counts when passing to new body
  function resetCount() {

    print('Resetting count');
    count = 0;
    count1 = 0;
    count2 = 0;
    countR = 0;
    xCount = 1;
    yCount = 1;
    yCountT = 1;
    moveArrow = 0;
  }
  //This function tests to see if the circles are being drawn off screen based on first pass of calculations
  function testSize() {
    for (i = 0; i < 1; i++) {
      if ((y += skip) >= dHeight - (skip / 2)) {
        y = skip / 2;
        yCountT++;
        if ((x += skip) >= offSet - (skip / 2)) x = skip / 2;
        xCount++;
        //print('Y count = ' + yCount); // prints to consolde for testing
      }
    }
  }

  //loading image function
  function rotLoadImage() {

    push();
    rectMode(CORNER);
    noStroke();
    fill(bColor);

    translate(offSet / 2, dHeight / 2);
    rectMode(CENTER);
    rect(0, 0, 160, 160);
    rotate(PI / 180 * rot);
    imageMode(CENTER);
    image(loadingImage, 0, 0, 150, 150);
    //AB: small square to cover rotating image after
    if (count == numCon - 2) {
      rect(0, 0, 160, 160);
    }
    pop();



  }

  //Shows result of the vote
  function bodyVote() {
    fill(map(count1, 0, numCon, 0, 255));
    // reset variables if first pass thorugh function
    if (count1 < 1) {
      resetDraw();
      test = 1;
    }
    if (count1 < numCon) {

      //AB for gradient from white to blue
      // if (tranVal > 0) {
      //     tranVal -= .3;
      // }

      stopVoteLogic();

      drawRect();
      // Once all of votes have been cast display the total for each body
      if (count1 == numCon - 1) {
        resultLogic();
      }
    }
  }

  function resetDraw() {
    if (yCountT * skip >= offSet) {
      skip = offSet / (1.025 * xCount);
    }
    noStroke();
    fill(bColor);
    tranVal = 255;
    rectMode(CORNER);

    //AB: removed this rect b/c it covers vp or president during logic
    // rect(0, 0, offSet, dHeight);

    x = skip / 2;
    y = skip / 2;
    yay = 0;
    nay = 0;
    xCount = 1;
    yCount = 1;
    endBody = 0;
  }

  //AB function to store yay and nay votes into array
  function storeBodyVotes() {
    votingBodyCounts[bodyCount] = [yay, nay];
    let currentBodyYay = votingBodyCounts[bodyCount][0];
    let currentBodyNay = votingBodyCounts[bodyCount][1];


    //AB for error checking
    // print(bodyLabel + " yay votes: " + currentBodyYay + " nay votes: " + currentBodyNay);

  }

  function drawRect() {
    let noVoteBool = false;
    var valAdjust = 75;
    var currentTransVal = 0;
    var currentPartyNum = 0;

    if (test == 1) {
      countR = count1;
    } else if (test == 2) {
      countR = count2;
    }

    diam = skip * .8;
    stopVoteChange();
    //Democrat is Voting
    if (countR < numDem) {
      currentTransVal = tranVal - currentPartyNum * valAdjust;


      let vote = random(0, 1);
      //    //print vote info to console for testing
      //    print('Vote =' + vote);//for testing
      //    print ('stress offset ' + stressOffset);//for testing
      //    var voteDemTest = demYaythresh*stressOffset; //for testing
      //    print('vote dem offset' + voteDemTest);//for testing

      if (vote <= demYaythresh * stressOffset) {
        noVoteBool = false;
        yay++;
      } else {
        noVoteBool = true;
        nay++;
      }

    }
    //Independent is Voting
    else if (countR >= numDem && countR < numDem + numWild) {
      currentPartyNum = partyNum + 1;
      currentTransVal = tranVal - currentPartyNum * valAdjust;


      let vote = random(0, 1);

      //    //print vote info to console for testing
      //    print('Vote =' + vote);//for testing
      //    print ('stress offset ' + stressOffset);//for testing
      //    var voteRepTest = repYaythresh*stressOffset; //for testing
      //    print('vote Rep offset' + voteRepTest);//for testing

      //is random number greater than threshold for yes?
      if (vote <= repYaythresh * stressOffset) {
        noVoteBool = false;
        yay++;
      } else {
        noVoteBool = true;
        nay++;
      }

    }
    //Republican is Voting
    else {
      currentPartyNum = partyNum + 2;
      currentTransVal = tranVal - currentPartyNum * valAdjust;
      let vote = random(0, 1);
      //print('Vote =' + vote); //testing
      if (vote <= indYaythresh * stressOffset) {
        noVoteBool = false;
        yay++;
      } else {
        noVoteBool = true;
        nay++;
      }
      //made for just two bodies
      // if (stopVoteCount == 2) {
      //     resultLogic();
      // }
    }
    //AB: finding problem with x's
    // print("body #: " + bodyCount + " No Vote Bool: " + noVoteBool);

    // Square is Drawn for Each Vote
    rectMode(CENTER);

    if (bodyLabel == 'VICE PRESIDENT') {
      // y = y + skip;
      if (vpVote == false) {
        stroke(255, 100);
        noFill();
        strokeWeight(3);
      }
      //ab for error checking
      // print('drawing VP square at' + x + " " + y);
    }

    // if (bodyCount == 1) {
    //   // simulate vp tiebreaker vote
    //   yay = 50;
    //   nay = 50;
    // }


    //creates a different shade for each voting party
    if (stopVoteBool == false) {
      noStroke();
      fill(255, currentTransVal);
    }
    rect(x, y, diam, diam, diam / 8);
    //creates the x on squares that are "no votes"
    if (noVoteBool == true && stopVoteBool == false) {
      fill(bColor);
      textSize(diam + 3);
      textAlign(CENTER, CENTER);
      textFont('Arial');
      text("x", x, y);
    }


    if ((y += skip) >= dHeight - (skip / 2)) {
      y = skip / 2;
      yCount++;
      //print('Y count = ' + yCount);
      if ((x += skip) >= offSet - (skip / 2)) x = skip / 2;
      xCount++;
      //print('Y count = ' + yCount); // prints to consolde for testing
    }
    storeBodyVotes();
  }

  //Diplays Voting Results
  // Jonathan wants this next to president?
  // OR windowWidth/bodies + 1 seperate column

  function stopVoteChange() {
    if (stopVoteBool == true) {
      stopVoteArr[bodyCount] = true;
      stroke(255, 100);
      noFill();
      strokeWeight(3);
      // stopVoteBool == false;
    } else {
      fill(bColor);
      noStroke();
      stopVoteArr[bodyCount] = false;

    }
  }

  //AB this is the logic in which changes the votiing body's squares to outlines when no vote is required
  function stopVoteLogic() {
    //AB if the vp vote is not needed, no vote is necessary
    if (bodyCount == 2 && vpVote == false) {
      stopVoteBool = true;
      stopVoteCount++;
    }
    //if the vp votes and it's a NO, then bill dies
    else if (vpVote == true && bodyPass[2] === false) {
      stopVoteBool = true;
      stopVoteCount++;
    }
    //AB if the first or second body is not a pass,  bill dies thus preventing other bodies to vote
    else if (bodyPass[0] === false || bodyPass[1] === false) {
      stopVoteBool = true;
      stopVoteCount++;
    } else {
      stopVoteBool = false;
    }
  }

  function resultLogic() {

    //padding & offsets for text display
    votePadX = dWidth / 4;
    votePadY = dHeight / 4;
    voteOutcomePosY = votePadY * 3;

    // If voting body == 1 and yay == 50%
    // then vice president votes

    if (yay >= numCon * superThresh) {
      // text('BILL PASSES ' + bodyLabel + ' WITH supermajority', votePadX, votePadY, offSet - votePadX, dHeight - votePadY);
      bodyPass[bodyCount] = true;
      superThreshIndex[bodyCount] = true;
      //AB logic if senate initiates tie breaker
    } else if (yay == numCon * perPass && bodyLabel == "SENATE") {
      bodyPass[bodyCount] = true;
      vpVote = true;
    } else if (yay > numCon * perPass) {
      // text('BILL PASSES ' + bodyLabel, votePadX, votePadY, offSet, dHeight);
      bodyPass[bodyCount] = true;
      superThreshIndex[bodyCount] = false;
    } else {
      // text('BILL DOES NOT PASS ' + bodyLabel, votePadX, votePadY, offSet, dHeight);
      bodyPass[bodyCount] = false;
      superThreshIndex[bodyCount] = false;
    }


    //ab removed for VP Logics and blank square
    // } else if (bodyPass[0] === false || bodyPass[1] === false && bodyCount >= 2) {
    //     bodyCount = numBodies-1;
    // }

    //Adds one to the count of how many bodies have voted and enters into user input state (buttons) if the vote is done.

    if (bodyCount < numBodies) {
      nextBody();
      print("new body count: " + bodyCount);
    }

    //AB removed for VP logic and blank square
    // } else if (bodyPass[0] === true && bodyPass[1] === true) {
    //     nextBody();
    // }

    if (bodyCount >= numBodies) {
      finalDisplay();

      print('Final Stage');
    }
    endBody = 1;
  }

  //angelabelle test function
  function finalDisplay() {

    let currentBodyLabel;

    let columnAmount = numBodies;
    let rowAmount = 4;

    let padY = 20;
    let padX = 10;
    let dispW = (dWidth / columnAmount);
    let dispH = (dHeight / rowAmount);

    let dispX = 0 + padX;
    let dispY = 0 + padY;

    var resBColor = color(0, 0, 0);
    let decisionText = "";
    //column 1 to be yay/nay votes
    //column 2 to be body votes
    textFont(helvFont);

    if (bodyCount == numBodies) {
      setTimeout(function() {
        document.body.style.backgroundColor = "black";
        userInput();

        textAlign(LEFT, TOP);
        fill(color("#faf4d3"));
        noStroke();
        rectMode(CORNER);
        resBColor.setAlpha(200);
        fill(resBColor);
        rect(0, 0, dWidth, dHeight);
        textStyle(NORMAL);


        //NEED TO CHANGE LATER FOR MORE THAN 3 BODIES
        for (let i = 0; i < numBodies; i++) {
          fill(255);
          if (i == 0) {
            currentBodyLabel = 'HOUSE';
          } else if (i == 1) {
            currentBodyLabel = 'SENATE';
          } else if (i == 2) {
            currentBodyLabel = 'VICE PRESIDENT';
          } else if (i == 3) {
            // print("I AM IN PRESIDENT b4 LOGIC");
            currentBodyLabel = 'PRESIDENT';
          }

          //yay and nay votes for each voting body
          //y = the i*dispW

          if (i < votingBodyCounts.length) {

            print("i = " + i + " and current body label = " + currentBodyLabel);

            if (currentBodyLabel == 'PRESIDENT') {
              textSize(23);
              text(currentBodyLabel, (i) * dispW + padX, padY, dispW, dispH);
              textAlign(LEFT);

              if (stopVoteArr[i] == false) {
                textSize(20);
                text("\n\nVOTES \n", (i) * dispW + padX, padY, dispW, dispH);
                textSize(16);
                text("\n\n\n\nYES: " + votingBodyCounts[i][0] + "\nNO: " + votingBodyCounts[i][1] + "\n ", (i) * dispW + padX, padY, dispW, dispH);


                // print("President: \n\n\n\nYES: " + votingBodyCounts[3][0] + "\nNO: " + votingBodyCounts[3][1]);
                //president veto/super

                if (bodyPass[0] === true && bodyPass[1] === true && bodyPass[3] === false) {
                  if (superThreshIndex[0] === true && superThreshIndex[1] === true) {
                    text('\nVETO OVERRIDEN BY supermajority IN ALL HOUSES', (i) * dispW + padX, dHeight / 4, dispW, dispH);
                  } else {
                    text('\nPRESIDENT VETOS BILL IS NOT APPROVED ', (i) * dispW + padX, dHeight / 4, dispW, dispH);
                  }
                } else if (bodyPass[i] == true &&
                  superThreshIndex[0] == false ||
                  superThreshIndex[1] == false) {
                  text('\nBILL IS APPROVED', (i) * dispW + padX, dHeight / 4, dispW, dispH);
                } else if (bodyPass[i] == false) {
                  text('\nBILL IS NOT APPROVED ', (i) * dispW + padX, dHeight / 4, dispW, dispH);
                }
              } else {
                textSize(16);
                if (bodyPass[0] == false || bodyPass[1] == false) {
                  // dispY = dispY + (dHeight / 5);
                  text('\n\nBILL IS NOT APPROVED BY ALL HOUSES NO PRESIDENTIAL VOTE', (i) * dispW + padX, padY, dispW, dispH);
                } else {
                  text('\n\nDOES NOT VOTE', (i) * dispW + padX, padY, dispW, dispH);
                }
              }

            } else if (currentBodyLabel == 'VICE PRESIDENT') {
              textSize(23);
              text(currentBodyLabel, i * dispW + padX, padY, dispW, dispH);
              if (stopVoteArr[i] == false && vpVote == true) {
                textSize(20);
                text("\n\nVOTES \n", i * dispW + padX, padY, dispW, dispH);
                textSize(16);
                text("\n\n\n\nYES: " + votingBodyCounts[i][0] + "\nNO: " + votingBodyCounts[i][1] + "\n ", i * dispW + padX, padY, dispW, dispH);

                if (bodyPass[0] == false || bodyPass[1] == false) {
                  text('\n\n\nBILL IS NOT APPROVED BY ALL HOUSES NO VP VOTE', i * dispW + padX, (dHeight / 4), dispW, dispH);
                } else if (bodyPass[0] == true && bodyPass[1] == true && vpVote == true) {
                  if (bodyPass[i] == false) {
                    text('\nBILL IS NOT APPROVED', (i) * dispW + padX, dHeight / 4, dispW, dispH);
                  } else if (bodyPass[i] == true) {
                    text('\nBILL IS APPROVED', (i) * dispW + padX, dHeight / 4, dispW, dispH);
                  }
                }

              } else {
                textSize(16);
                text('\n\nDOES NOT VOTE', i * dispW + padX, padY, dispW, dispH);
              }

            } else {
              textSize(23);
              text(currentBodyLabel, i * dispW + padX, padY, dispW, dispH);
              if (stopVoteArr[i] == false) {
                textSize(20);
                text("\n\nVOTES \n", i * dispW + padX, padY, dispW, dispH);
                textSize(16);
                text("\n\n\n\nYES: " + votingBodyCounts[i][0] + "\nNO: " + votingBodyCounts[i][1] + "\n ", i * dispW + padX, padY, dispW, dispH);
                // superthresh
                if (bodyPass[i] == true && superThreshIndex[i] == true) {
                  text('\nBILL IS APPROVED WITH SUPERMAJORITY', i * dispW + padX, dHeight / 4, dispW, dispH);
                } else if (currentBodyLabel == 'SENATE' && bodyPass[0] == true && bodyPass[1] == true && vpVote == true) {
                  text('\nTIE BREAKER VOTE INITIATED', i * dispW + padX, dHeight / 4, dispW, dispH);
                } else if (bodyPass[i] == false) {
                  text('\nBILL IS NOT APPROVED', i * dispW + padX, dHeight / 4, dispW, dispH);
                } else if (bodyPass[i] == true && superThreshIndex[i] == false) {
                  text('\nBILL IS APPROVED', i * dispW + padX, dHeight / 4, dispW, dispH);
                }
              } else {
                textSize(16);
                text('\n\nDOES NOT VOTE', i * dispW + padX, padY, dispW, dispH);
              }
            }


          }

          //regular pass
          if (bodyPass[0] === true && bodyPass[1] === true && vpVote == true && bodyPass[2] == false) {
            decisionText = "DECISION: BILL DOES NOT BECOME A LAW DUE TO TIE BREAKER VOTE BY VP";
          } else if (bodyPass[0] === true && bodyPass[1] === true && bodyPass[3] === true) {
            decisionText = "DECISION: BILL BECOMES A LAW";

          } else if (bodyPass[0] === true && bodyPass[1] === true && bodyPass[3] === false) {
            if (superThreshIndex[0] === true && superThreshIndex[1] === true) {
              decisionText = "DECISION: BILL BECOMES A LAW BY SUPERMAJORITY";

            } else {
              decisionText = "DECISION: BILL DOES NOT BECOME A LAW DUE TO PRESIDENTIAL VETO";

            }
          } else if (bodyPass[0] == false || bodyPass[1] == false) {
            dispY = dispY + (dHeight / 5);

            decisionText = "DECISION: BILL DOES NOT BECOME A LAW";

          }
          changeText(decisionText);
        };

      }, 3000);

    }

  }

  function changeText(text) {
    document.getElementById("result").innerHTML = text;
  }


  function nextBody() {
    bodyCount++;
  }

  //Once Bill Pass result has been calculated users can enter in their own variables to reconfigure congress or recalculate the vote with the same parameters
  function userInput() {

    bodyCount = numBodies;
    buttonReC = createButton('RESET');

    buttonReC.id('button-re');

    buttonReC.position(windowWidth - buttonReC.width - 20, windowHeight - 45);
    buttonReC.mousePressed(userRecount);

    buttonRC = createButton('RECONFIGURE CONGRESS');

    buttonRC.id('button-re');

    buttonRC.position(windowWidth - buttonRC.width - buttonReC.width - 20, windowHeight - 45);
    buttonRC.mousePressed(nextScene);

  }

  //Reloads the page if user would like to reset values
  function userRecount() {
    location.reload();
    //reset();
  }


  function userVars() {
    //AB added this here for less confusion for the user
    buttonRC.remove();
    // background(0);
    changeText(" ");

    buttonIV = createButton('Recalculate');
    buttonIV.id('button-re');

    buttonIV.position(windowWidth - buttonIV.width - buttonReC.width - buttonRC.width - 20, windowHeight - 45);
    buttonIV.mousePressed(inputVar);
  }

// }

// else {
//   this.setup = function() {
//
//     textFont(helvFont);
//     let canvas = createCanvas(windowWidth * .8, windowHeight * .8);
//     canvas.parent('vote');
//     dWidth = width;
//     dHeight = height;
//     background(bColor);
//
//     // let fs = fullscreen();
//     // fullscreen(!fs);
//   }
//
//   this.draw = function() {
//
//     rot += 0.5;
//
//     currentCongLogic();
//   }
//
//   this.enter = function() {
//     document.getElementById("top").style.display = "none";
//     document.getElementById("page1").style.display = "none";
//     document.getElementById("page2").style.display = "none";
//     document.getElementById("page3").style.display = "none";
//     document.getElementById("page4").style.display = "none";
//     document.getElementById("page5").style.display = "none";
//     document.getElementById("slider-value").style.display = "none";
//     document.getElementById("vote").style.display = "block";
//     currentCongLogic();
//
//   }
//
//   function currentCongLogic() {
//
//     // Logic for House
//     if (bodyCount == 0) {
//
//       // Setup variables first time we pass through the first body
//       if (count < 1 && count1 < 1 && count2 < 1) {
//         test = 0;
//         print('bodyCount = ')
//         print(bodyCount);
//         background(color(bColor));
//
//         //maps stress index onto percentage effecting yay/nay vote.
//         stressMap = map(stress, stressLow, stressHigh, 0, 2);
//         print('Voter Stress = ' + stressMap);
//
//         stressPlanetMap = map(stressPlanet, stressPlanetLow, stressPlanetHigh, 0, 2);
//         print('Planet Stress = ' + stressPlanetMap)
//
//         //create a stress offset that will effect congress' likelyhood of passing legislation to create change
//         stressOffset = (stressPlanetMap + stressMap) / 2;
//
//         // Set number of voting memebers
//         numCon = numHouse;
//         bodyLabel = 'HOUSE OF REPRESENTATIVES';
//
//         //Set Demographics for each body
//         numDem = round(numCon * perDemHouse);
//         numRep = round(numCon * perRepHouse);
//         numWild = round(numCon * perIndHouse);
//
//
//         offSet = dWidth / (numBodies - 1);
//
//         //Figure out how big to draw the circles and how far to space them out
//         skip = floor(.97 * (sqrt((offSet) * dHeight / numCon)));
//         print('Skip = ' + skip); //testing
//         x = skip / 2;
//         y = skip / 2;
//       }
//     }
//
//     //Logic for Senate
//     if (bodyCount == 1) {
//       strokeWeight(10);
//       translate(offSet * bodyCount, 0);
//
//       if (endBody == 1) {
//         resetCount();
//         endBody = 0;
//       }
//
//       // Setup variables first time we pass through a new body
//       if (count < 1 && count1 < 1 && count2 < 1) {
//         test = 0;
//         print('bodyCount = ')
//         print(bodyCount);
//
//         ///Set number of voting memebers
//         numCon = numSenate;
//         bodyLabel = 'SENATE';
//
//         //Set Demographics for each body
//         numDem = round(numCon * perDemSenate);
//         numRep = round(numCon * perRepSenate);
//         numWild = round(numCon * perIndSenate);
//
//
//         //Figure out how big to draw the circles and how far to space them out
//         skip = floor(.97 * (sqrt(offSet * dHeight / numCon)));
//         print('Skip = ' + skip); //testing
//         x = skip / 2;
//         y = skip / 2;
//
//         print('Count = ' + count); //fortesting
//         print('Count1 = ' + count1); //fortesting
//         print('Count2 = ' + count2); //fortesting
//       }
//
//     }
//
//     //AB logic for VP if Senate needs a tiebreaker
//     if (bodyCount == 2) {
//       print("votingBodyCounts[1][0]= " + votingBodyCounts[1][0] + "votingBodyCounts[1][1] = " + votingBodyCounts[1][1]);
//
//
//
//       // if (votingBodyCounts[1][0] == votingBodyCounts[1][1] && vpVote == true) {
//       //   vpVote = true;
//       // } else {
//       //   vpVote = false;
//       // }
//
//       strokeWeight(10);
//       translate(offSet * bodyCount, 0);
//
//       if (endBody == 1) {
//         resetCount();
//         endBody = 0;
//       }
//       // Setup variables first time we pass through a new body
//       if (count < 1 && count1 < 1 && count2 < 1) {
//         test = 0;
//         print('bodyCount = ')
//         print(bodyCount);
//
//         ///Set number of voting memebers
//         numCon = numVP;
//         bodyLabel = 'VICE PRESIDENT';
//
//         //Set Demographics for each body
//         numDem = round(numCon * perDemPres);
//         numRep = round(numCon * perRepPres);
//         numWild = round(numCon * perIndPres);
//
//         //Figure out how big to draw the circles and how far to space them out
//         skip = floor(.65 * (sqrt(offSet * dHeight / numCon)));
//         print('Skip = ' + skip); //testing
//         x = skip / 2;
//         y = skip / 2;
//       }
//     }
//
//     //Logic for President
//     if (bodyCount == 3) {
//       strokeWeight(10);
//       translate(offSet * (bodyCount - 1), 0);
//
//       if (endBody == 1) {
//         resetCount();
//         endBody = 0;
//       }
//
//       // Setup variables first time we pass through a new body
//       if (count < 1 && count1 < 1 && count2 < 1) {
//         test = 0;
//         print('bodyCount = ')
//         print(bodyCount);
//
//         // Set number of voting memebers
//         numCon = numPres;
//         bodyLabel = 'PRESIDENT';
//
//         //Set Demographics for each body
//         numDem = round(numCon * perDemPres);
//         numRep = round(numCon * perRepPres);
//         numWild = round(numCon * perIndPres);
//
//
//         //Figure out how big to draw the circles and how far to space them out
//         skip = floor(.65 * (sqrt(offSet * dHeight / numCon)));
//         print('Skip = ' + skip); //testing
//         x = skip / 2;
//         y = skip / 2;
//       }
//     }
//
//     // Need to make sure we are not over our number of congressional body numCon and readjusts skip if too big
//
//     if (count < numCon - 1 && count1 < 1) {
//
//       rotLoadImage();
//       testSize();
//       count++;
//       // print('Count = ' + count); //fortesting
//     } else if (count >= numCon - 1) {
//
//       bodyVote();
//       count1++;
//       //print ('Count1 = ' + count1); //fortesting
//       //print ('skip * Y = ' + (yCountT * skip));
//     }
//   }
//
//   //resets counts when passing to new body
//   function resetCount() {
//
//     print('Resetting count');
//     count = 0;
//     count1 = 0;
//     count2 = 0;
//     countR = 0;
//     xCount = 1;
//     yCount = 1;
//     yCountT = 1;
//     moveArrow = 0;
//   }
//   //This function tests to see if the circles are being drawn off screen based on first pass of calculations
//   function testSize() {
//     for (i = 0; i < 1; i++) {
//       if ((y += skip) >= dHeight - (skip / 2)) {
//         y = skip / 2;
//         yCountT++;
//         if ((x += skip) >= offSet - (skip / 2)) x = skip / 2;
//         xCount++;
//         //print('Y count = ' + yCount); // prints to consolde for testing
//       }
//     }
//   }
//
//   //loading image function
//   function rotLoadImage() {
//
//     push();
//     rectMode(CORNER);
//     noStroke();
//     fill(bColor);
//
//     translate(offSet / 2, dHeight / 2);
//     rectMode(CENTER);
//     rect(0, 0, 160, 160);
//     rotate(PI / 180 * rot);
//     imageMode(CENTER);
//     image(loadingImage, 0, 0, 150, 150);
//     //AB: small square to cover rotating image after
//     if (count == numCon - 2) {
//       rect(0, 0, 160, 160);
//     }
//     pop();
//
//
//
//   }
//
//   //Shows result of the vote
//   function bodyVote() {
//     fill(map(count1, 0, numCon, 0, 255));
//     // reset variables if first pass thorugh function
//     if (count1 < 1) {
//       resetDraw();
//       test = 1;
//     }
//     if (count1 < numCon) {
//
//       //AB for gradient from white to blue
//       // if (tranVal > 0) {
//       //     tranVal -= .3;
//       // }
//
//       stopVoteLogic();
//
//       drawRect();
//       // Once all of votes have been cast display the total for each body
//       if (count1 == numCon - 1) {
//         resultLogic();
//       }
//     }
//   }
//
//   function resetDraw() {
//     if (yCountT * skip >= offSet) {
//       skip = offSet / (1.025 * xCount);
//     }
//     noStroke();
//     fill(bColor);
//     tranVal = 255;
//     rectMode(CORNER);
//
//     //AB: removed this rect b/c it covers vp or president during logic
//     // rect(0, 0, offSet, dHeight);
//
//     x = skip / 2;
//     y = skip / 2;
//     yay = 0;
//     nay = 0;
//     xCount = 1;
//     yCount = 1;
//     endBody = 0;
//   }
//
//   //AB function to store yay and nay votes into array
//   function storeBodyVotes() {
//     votingBodyCounts[bodyCount] = [yay, nay];
//     let currentBodyYay = votingBodyCounts[bodyCount][0];
//     let currentBodyNay = votingBodyCounts[bodyCount][1];
//
//
//     //AB for error checking
//     // print(bodyLabel + " yay votes: " + currentBodyYay + " nay votes: " + currentBodyNay);
//
//   }
//
//   function drawRect() {
//     let noVoteBool = false;
//     var valAdjust = 75;
//     var currentTransVal = 0;
//     var currentPartyNum = 0;
//
//     if (test == 1) {
//       countR = count1;
//     } else if (test == 2) {
//       countR = count2;
//     }
//
//     diam = skip * .8;
//     stopVoteChange();
//     //Democrat is Voting
//     if (countR < numDem) {
//       currentTransVal = tranVal - currentPartyNum * valAdjust;
//
//
//       let vote = random(0, 1);
//       //    //print vote info to console for testing
//       //    print('Vote =' + vote);//for testing
//       //    print ('stress offset ' + stressOffset);//for testing
//       //    var voteDemTest = demYaythresh*stressOffset; //for testing
//       //    print('vote dem offset' + voteDemTest);//for testing
//
//       if (vote <= demYaythresh * stressOffset) {
//         noVoteBool = false;
//         yay++;
//       } else {
//         noVoteBool = true;
//         nay++;
//       }
//
//     }
//     //Independent is Voting
//     else if (countR >= numDem && countR < numDem + numWild) {
//       currentPartyNum = partyNum + 1;
//       currentTransVal = tranVal - currentPartyNum * valAdjust;
//
//
//       let vote = random(0, 1);
//
//       //    //print vote info to console for testing
//       //    print('Vote =' + vote);//for testing
//       //    print ('stress offset ' + stressOffset);//for testing
//       //    var voteRepTest = repYaythresh*stressOffset; //for testing
//       //    print('vote Rep offset' + voteRepTest);//for testing
//
//       //is random number greater than threshold for yes?
//       if (vote <= repYaythresh * stressOffset) {
//         noVoteBool = false;
//         yay++;
//       } else {
//         noVoteBool = true;
//         nay++;
//       }
//
//     }
//     //Republican is Voting
//     else {
//       currentPartyNum = partyNum + 2;
//       currentTransVal = tranVal - currentPartyNum * valAdjust;
//       let vote = random(0, 1);
//       //print('Vote =' + vote); //testing
//       if (vote <= indYaythresh * stressOffset) {
//         noVoteBool = false;
//         yay++;
//       } else {
//         noVoteBool = true;
//         nay++;
//       }
//       //made for just two bodies
//       // if (stopVoteCount == 2) {
//       //     resultLogic();
//       // }
//     }
//     //AB: finding problem with x's
//     // print("body #: " + bodyCount + " No Vote Bool: " + noVoteBool);
//
//     // Square is Drawn for Each Vote
//     rectMode(CENTER);
//
//     if (bodyLabel == 'VICE PRESIDENT') {
//       y = y + skip;
//       if (vpVote == false) {
//         stroke(255, 100);
//         noFill();
//         strokeWeight(3);
//       }
//       //ab for error checking
//       // print('drawing VP square at' + x + " " + y);
//     }
//
//     if (bodyCount == 1) {
//       // simulate vp vote
//       yay = 50;
//       nay = 50;
//     }
//
//
//     //creates a different shade for each voting party
//     if (stopVoteBool == false) {
//       noStroke();
//       fill(255, currentTransVal);
//     }
//     rect(x, y, diam, diam, diam / 8);
//     //creates the x on squares that are "no votes"
//     if (noVoteBool == true && stopVoteBool == false) {
//       fill(bColor);
//       textSize(diam + 3);
//       textAlign(CENTER, CENTER);
//       textFont('Arial');
//       text("x", x, y);
//     }
//
//
//     if ((y += skip) >= dHeight - (skip / 2)) {
//       y = skip / 2;
//       yCount++;
//       //print('Y count = ' + yCount);
//       if ((x += skip) >= offSet - (skip / 2)) x = skip / 2;
//       xCount++;
//       //print('Y count = ' + yCount); // prints to consolde for testing
//     }
//     storeBodyVotes();
//   }
//
//   //Diplays Voting Results
//   // Jonathan wants this next to president?
//   // OR windowWidth/bodies + 1 seperate column
//
//   function stopVoteChange() {
//     if (stopVoteBool == true) {
//       stopVoteArr[bodyCount] = true;
//       stroke(255, 100);
//       noFill();
//       strokeWeight(3);
//       // stopVoteBool == false;
//     } else {
//       fill(bColor);
//       noStroke();
//       stopVoteArr[bodyCount] = false;
//
//     }
//   }
//
//   //AB this is the logic in which changes the votiing body's squares to outlines when no vote is required
//   function stopVoteLogic() {
//     //AB if the vp vote is not needed, no vote is necessary
//     if (bodyCount == 2 && vpVote == false) {
//       stopVoteBool = true;
//       stopVoteCount++;
//     }
//     //if the vp votes and it's a NO, then bill dies
//     else if (vpVote == true && bodyPass[2] === false) {
//       stopVoteBool = true;
//       stopVoteCount++;
//     }
//     //AB if the first or second body is not a pass,  bill dies thus preventing other bodies to vote
//     else if (bodyPass[0] === false || bodyPass[1] === false) {
//       stopVoteBool = true;
//       stopVoteCount++;
//     } else {
//       stopVoteBool = false;
//     }
//   }
//
//   function resultLogic() {
//
//     //padding & offsets for text display
//     votePadX = dWidth / 4;
//     votePadY = dHeight / 4;
//     voteOutcomePosY = votePadY * 3;
//
//     // If voting body == 1 and yay == 50%
//     // then vice president votes
//
//     if (yay >= numCon * superThresh) {
//       // text('BILL PASSES ' + bodyLabel + ' WITH supermajority', votePadX, votePadY, offSet - votePadX, dHeight - votePadY);
//       bodyPass[bodyCount] = true;
//       superThreshIndex[bodyCount] = true;
//     } else if (yay > numCon / 2) {
//       // text('BILL PASSES ' + bodyLabel, votePadX, votePadY, offSet, dHeight);
//       bodyPass[bodyCount] = true;
//       superThreshIndex[bodyCount] = false;
//     } else if (yay == numCon / 2 && bodyLabel == "SENATE") {
//       bodyPass[bodyCount] = true;
//       vpVote = true;
//     } else {
//       // text('BILL DOES NOT PASS ' + bodyLabel, votePadX, votePadY, offSet, dHeight);
//       bodyPass[bodyCount] = false;
//       superThreshIndex[bodyCount] = false;
//     }
//
//
//     //ab removed for VP Logics and blank square
//     // } else if (bodyPass[0] === false || bodyPass[1] === false && bodyCount >= 2) {
//     //     bodyCount = numBodies-1;
//     // }
//
//     //Adds one to the count of how many bodies have voted and enters into user input state (buttons) if the vote is done.
//
//     if (bodyCount < numBodies) {
//       nextBody();
//       print("new body count: " + bodyCount);
//     }
//
//     //AB removed for VP logic and blank square
//     // } else if (bodyPass[0] === true && bodyPass[1] === true) {
//     //     nextBody();
//     // }
//
//     if (bodyCount >= numBodies) {
//       finalDisplay();
//       userInput();
//       print('Final Stage');
//     }
//     endBody = 1;
//   }
//
//   //angelabelle test function
//   function finalDisplay() {
//
//
//
//     let currentBodyLabel;
//
//     let columnAmount = numBodies - 1;
//     let rowAmount = 4;
//
//     let padY = 20;
//     let padX = 10;
//     let dispW = (dWidth / columnAmount);
//     let dispH = (dHeight / rowAmount);
//
//     let dispX = 0 + padX;
//     let dispY = 0 + padY;
//
//     var resBColor = color(0, 0, 0);
//     let decisionText = "";
//     //column 1 to be yay/nay votes
//     //column 2 to be body votes
//     textFont(helvFont);
//
//     if (bodyCount == numBodies) {
//       setTimeout(function() {
//         document.body.style.backgroundColor = "black";
//
//
//         textAlign(LEFT, TOP);
//         fill(color("#faf4d3"));
//         noStroke();
//         rectMode(CORNER);
//         resBColor.setAlpha(200);
//         fill(resBColor);
//         rect(0, 0, dWidth, dHeight);
//         textStyle(NORMAL);
//
//
//         //NEED TO CHANGE LATER FOR MORE THAN 3 BODIES
//         for (let i = 0; i < numBodies; i++) {
//           fill(255);
//           if (i == 0) {
//             currentBodyLabel = 'HOUSE';
//           } else if (i == 1) {
//             currentBodyLabel = 'SENATE';
//           } else if (i == 2) {
//             currentBodyLabel = 'VICE PRESIDENT';
//           } else if (i == 3) {
//             // print("I AM IN PRESIDENT b4 LOGIC");
//             currentBodyLabel = 'PRESIDENT';
//           }
//
//           //yay and nay votes for each voting body
//           //y = the i*dispW
//
//           if (i < votingBodyCounts.length) {
//
//             print("i = " + i + " and current body label = " + currentBodyLabel);
//
//             if (currentBodyLabel == 'PRESIDENT') {
//               textSize(23);
//               text(currentBodyLabel, (i - 1) * dispW + padX, padY, dispW, dispH);
//               textAlign(LEFT);
//
//               if (stopVoteArr[i] == false) {
//                 textSize(20);
//                 text("\n\nVOTES \n", (i - 1) * dispW + padX, padY, dispW, dispH);
//                 textSize(16);
//                 text("\n\n\n\nYES: " + votingBodyCounts[i][0] + "\nNO: " + votingBodyCounts[i][1] + "\n ", (i - 1) * dispW + padX, padY, dispW, dispH);
//
//
//                 // print("President: \n\n\n\nYES: " + votingBodyCounts[3][0] + "\nNO: " + votingBodyCounts[3][1]);
//                 //president veto/super
//
//                 if (bodyPass[0] === true && bodyPass[1] === true && bodyPass[3] === false) {
//                   if (superThreshIndex[0] === true && superThreshIndex[1] === true) {
//                     text('\nVETO OVERRIDEN BY supermajority IN ALL HOUSES', (i - 1) * dispW + padX, dHeight / 4, dispW, dispH);
//                   } else {
//                     text('\nPRESIDENT VETOS BILL IS NOT APPROVED ', (i - 1) * dispW + padX, dHeight / 4, dispW, dispH);
//                   }
//                 } else if (bodyPass[i] == true &&
//                   superThreshIndex[0] == false ||
//                   superThreshIndex[1] == false) {
//                   text('\nBILL IS APPROVED', (i - 1) * dispW + padX, dHeight / 4, dispW, dispH);
//                 } else if (bodyPass[i] == false) {
//                   text('\nBILL IS NOT APPROVED ', (i - 1) * dispW + padX, dHeight / 4, dispW, dispH);
//                 }
//               } else {
//                 textSize(16);
//                 if (bodyPass[0] == false || bodyPass[1] == false) {
//                   // dispY = dispY + (dHeight / 5);
//                   text('\n\nBILL IS NOT APPROVED BY ALL HOUSES NO PRESIDENTIAL VOTE', (i - 1) * dispW + padX, padY, dispW, dispH);
//                 } else {
//                   text('\n\nDOES NOT VOTE', (i - 1) * dispW + padX, padY, dispW, dispH);
//                 }
//               }
//
//             } else if (currentBodyLabel == 'VICE PRESIDENT') {
//               textSize(23);
//               text(currentBodyLabel, i * dispW + padX, dHeight / 2, dispW, dispH);
//               if (stopVoteArr[i] == false && vpVote == true) {
//                 textSize(20);
//                 text("\n\nVOTES \n", i * dispW + padX, dHeight / 2, dispW, dispH);
//                 textSize(16);
//                 text("\n\n\n\nYES: " + votingBodyCounts[i][0] + "\nNO: " + votingBodyCounts[i][1] + "\n ", i * dispW + padX, dHeight / 2, dispW, dispH);
//
//                 if (bodyPass[0] == false || bodyPass[1] == false) {
//                   text('\n\n\nBILL IS NOT APPROVED BY ALL HOUSES NO VP VOTE', i * dispW + padX, dHeight * (3 / 4), dispW, dispH);
//                 } else if (bodyPass[0] == true && bodyPass[1] == true && vpVote == true) {
//                   if (bodyPass[i] == false) {
//                     text('\nBILL IS NOT APPROVED', (i) * dispW + padX, dHeight * (3 / 4), dispW, dispH);
//                   } else if (bodyPass[i] == true) {
//                     text('\nBILL IS APPROVED', (i) * dispW + padX, dHeight * (3 / 4), dispW, dispH);
//                   }
//                 }
//
//               } else {
//                 textSize(16);
//                 text('\n\nDOES NOT VOTE', i * dispW + padX, dHeight / 2, dispW, dispH);
//               }
//
//             } else {
//               textSize(23);
//               text(currentBodyLabel, i * dispW + padX, padY, dispW, dispH);
//               if (stopVoteArr[i] == false) {
//                 textSize(20);
//                 text("\n\nVOTES \n", i * dispW + padX, padY, dispW, dispH);
//                 textSize(16);
//                 text("\n\n\n\nYES: " + votingBodyCounts[i][0] + "\nNO: " + votingBodyCounts[i][1] + "\n ", i * dispW + padX, padY, dispW, dispH);
//                 // superthresh
//                 if (bodyPass[i] == true && superThreshIndex[i] == true) {
//                   text('\nBILL IS APPROVED WITH SUPERMAJORITY', i * dispW + padX, dHeight / 4, dispW, dispH);
//                 } else if (currentBodyLabel == 'SENATE' && bodyPass[0] == true && bodyPass[1] == true && vpVote == true) {
//                   text('\nTIE BREAKER VOTE INITIATED', i * dispW + padX, dHeight / 4, dispW, dispH);
//                 } else if (bodyPass[i] == false) {
//                   text('\nBILL IS NOT APPROVED', i * dispW + padX, dHeight / 4, dispW, dispH);
//                 } else if (bodyPass[i] == true && superThreshIndex[i] == false) {
//                   text('\nBILL IS APPROVED', i * dispW + padX, dHeight / 4, dispW, dispH);
//                 }
//               } else {
//                 textSize(16);
//                 text('\n\nDOES NOT VOTE', i * dispW + padX, padY, dispW, dispH);
//               }
//             }
//
//
//           }
//
//           //regular pass
//           if (bodyPass[0] === true && bodyPass[1] === true && vpVote == true && bodyPass[2] == false) {
//             decisionText = "DECISION: BILL DOES NOT BECOME A LAW DUE TO TIE BREAKER VOTE BY VP";
//           } else if (bodyPass[0] === true && bodyPass[1] === true && bodyPass[3] === true) {
//             decisionText = "DECISION: BILL BECOMES A LAW";
//
//           } else if (bodyPass[0] === true && bodyPass[1] === true && bodyPass[3] === false) {
//             if (superThreshIndex[0] === true && superThreshIndex[1] === true) {
//               decisionText = "DECISION: BILL BECOMES A LAW BY SUPERMAJORITY";
//
//             } else {
//               decisionText = "DECISION: BILL DOES NOT BECOME A LAW DUE TO PRESIDENTIAL VETO";
//
//             }
//           } else if (bodyPass[0] == false || bodyPass[1] == false) {
//             dispY = dispY + (dHeight / 5);
//
//             decisionText = "DECISION: BILL DOES NOT BECOME A LAW";
//
//           }
//           changeText(decisionText);
//         };
//
//       }, 2000);
//
//     }
//
//   }
//
//   function changeText(text) {
//     document.getElementById("result").innerHTML = text;
//   }
//
//
//   function nextBody() {
//     bodyCount++;
//   }
//
//   //Once Bill Pass result has been calculated users can enter in their own variables to reconfigure congress or recalculate the vote with the same parameters
//   function userInput() {
//
//     bodyCount = numBodies;
//     buttonReC = createButton('RESET');
//
//     buttonReC.id('button-re');
//
//     buttonReC.position(windowWidth - buttonReC.width - 20, windowHeight - 45);
//     buttonReC.mousePressed(userRecount);
//
//     buttonRC = createButton('RECONFIGURE CONGRESS');
//
//     buttonRC.id('button-re');
//
//     buttonRC.position(windowWidth - buttonRC.width - buttonReC.width - 20, windowHeight - 45);
//     buttonRC.mousePressed(nextScene);
//
//   }
//
//   //Reloads the page if user would like to reset values
//   function userRecount() {
//     location.reload();
//     //reset();
//   }
//
//
//   function userVars() {
//     //AB added this here for less confusion for the user
//     buttonRC.remove();
//     userEdits = true;
//     background(0);
//     changeText(" ");
//
//     //AB's custom fucntions to create user configuration sliders.
//     sliders();
//     textBox();
//     textLabel();
//
//     // var inputPaddingY = 50;
//     // var inputPaddingX = 20;
//     // var i = 1;
//     // var textSizeV = 20;
//     //
//     // textSize(textSizeV);
//     // textAlign(LEFT, TOP);
//     //
//     // //Number voting members in each voting body
//     // userNumHouse = createInput(numHouse);
//     // userNumHouse.position(inputPaddingX, inputPaddingY * i);
//     // userNumHouse.size(60);
//     //
//     // text('Number total voting members in the House', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4) + ((windowHeight - dHeight) / 2));
//     // i++;
//     //
//     // userNumSenate = createInput(numSenate);
//     // userNumSenate.position(inputPaddingX, inputPaddingY * i);
//     // text('Number total voting members in the Senate', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // userNumPres = createInput(numPres);
//     // userNumPres.position(inputPaddingX, inputPaddingY * i);
//     // text('Number of Presidents', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // //Demographics of House as decimal percentages 1 = 100%
//     // userPerDemHouse = createInput(perDemHouse);
//     // userPerDemHouse.position(inputPaddingX, inputPaddingY * i);
//     // text('Percentage of Democrats in the House', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // userPerRepHouse = createInput(perRepHouse);
//     // userPerRepHouse.position(inputPaddingX, inputPaddingY * i);
//     // text('Percentage of Republicans in the House', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // userPerIndHouse = createInput(perIndHouse);
//     // userPerIndHouse.position(inputPaddingX, inputPaddingY * i);
//     // text('Percentage of Third Parties in the House', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // //Demographics of Senate as decimal percentages 1 = 100%
//     // userPerDemSenate = createInput(perDemSenate);
//     // userPerDemSenate.position(inputPaddingX, inputPaddingY * i);
//     // text('Percentage of Democrats in the Senate', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // userPerRepSenate = createInput(perRepSenate);
//     // userPerRepSenate.position(inputPaddingX, inputPaddingY * i);
//     // text('Percentage of Republicans in the Senate', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // userPerIndSenate = createInput(perIndSenate);
//     // userPerIndSenate.position(inputPaddingX, inputPaddingY * i);
//     // text('Percentage of Independents in the Senate', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // //Demographics of President as decimal percentages 1 = 100%
//     // userPerDemPres = createInput(perDemPres);
//     // userPerDemPres.position(inputPaddingX, inputPaddingY * i);
//     // text('Precentage of Democratic Presidents', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // userPerRepPres = createInput(perRepPres);
//     // userPerRepPres.position(inputPaddingX, inputPaddingY * i);
//     // text('Precentage of Republican Presidents', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // userPerIndPres = createInput(perIndPres);
//     // userPerIndPres.position(inputPaddingX, inputPaddingY * i);
//     // text('Precentage of Independent Presidents', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // //Historical Likelihood of party affiliation & likelihood of 'yay' vote for Democratic representative
//     // userDemYaythresh = createInput(demYaythresh);
//     // userDemYaythresh.position(inputPaddingX, inputPaddingY * i);
//     // text('Historical likelyhood of a Democratic Yay vote on any given bill', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // //Historical Likelihood of party affiliation & likelihood of 'yay' vote for Republican representative
//     // userRepYaythresh = createInput(repYaythresh);
//     // userRepYaythresh.position(inputPaddingX, inputPaddingY * i);
//     // text('Historical likelyhood of a Republican Yay vote on any given bill', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // //Historical Likelihood of party affiliation & likelihood of 'yay' vote for Independent representative
//     // userIndYaythresh = createInput(indYaythresh);
//     // userIndYaythresh.position(inputPaddingX, inputPaddingY * i);
//     // text('Historical likelyhood of an Independent Yay vote on any given bill', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // //supermajority Cutoff for override of presidential veto
//     // userSuperThresh = createInput(superThresh);
//     // userSuperThresh.position(inputPaddingX, inputPaddingY * i);
//     // text('Precentage of yay votes to be considered a Supermajority', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // ////How Many Voting Bodies (house, senate, president = 3) *for V2 - see TODO at top
//     // //userNumBodies =  createInput(numBodies);
//     // //userNumBodies.position(inputPaddingX , inputPaddingY * i);
//     // //text('How many voting bodies - including President', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV/4));
//     // //i++;
//     //
//     // //Your Stress Value
//     // userStressSensorval = createInput(stressSensorval);
//     // userStressSensorval.position(inputPaddingX, inputPaddingY * i);
//     // text('How stressed are you on a scale of 1-10?  1 = bliss state. 5 = healthy amount of stress. 10 = very stressed ', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//     //
//     // //Planet's Stress Value
//     // userStressPlanet = createInput(stressPlanet);
//     // userStressPlanet.position(inputPaddingX, inputPaddingY * i);
//     // text('How stressed is the planet on a scale of 1-10?  1 = perfect harmony. 5 = healthy amount of dynamic stress. 10 = very stressed ', inputPaddingX + userNumHouse.width + 10, inputPaddingY * i - (textSizeV / 4));
//     // i++;
//
//     buttonIV = createButton('Recalculate');
//     buttonIV.id('button-re');
//
//     buttonIV.position(windowWidth - buttonIV.width - buttonReC.width - buttonRC.width - 20, windowHeight - 45);
//     buttonIV.mousePressed(inputVar);
//   }
//
//   function checkValue(inputText, bodyTextBox, bodyCurrentValue) {
//     this.inputText = inputText;
//     this.bodyTextBox = bodyTextBox;
//     this.bodyCurrentValue = bodyCurrentValue;
//
//     if (this.inputText != this.bodyCurrentValue) {
//       updateValue(this.bodyTextBox, this.inputText);
//     }
//     this.bodyCurrentValue = this.inputText;
//     return this.bodyCurrentValue;
//   }
//
//   function updateValue(textbox, value) {
//     this.x = textbox.x;
//     this.y = textbox.y;
//     this.width = textbox.width;
//     this.textbox = textbox;
//     this.value = value;
//
//     this.textbox = createInput(this.value);
//     this.textbox.position(this.x, this.y);
//     this.textbox.class('input-copies');
//   }
//
//   function textBox() {
//
//     userNumHouse = createInput(userNumHouseText);
//     userNumHouse.position(userPaddingX + userNumHouseSlider.x + userNumHouseSlider.width, userNumHouseSlider.y);
//
//     userNumSenate = createInput(userNumSenateText);
//     userNumSenate.position(userPaddingX + userNumSenateSlider.x + userNumSenateSlider.width, userNumSenateSlider.y);
//
//     userNumPres = createInput(userNumPresText);
//     userNumPres.position(userPaddingX + userNumPresSlider.x + userNumPresSlider.width, userNumPresSlider.y);
//
//   }
//
//   function textLabel() {
//     textSize(15);
//     textAlign(LEFT);
//     fill(255);
//
//     houseLabel = createElement('p', 'Number total voting members in the House');
//     houseLabel.class('group-labels');
//     houseLabel.position(userNumHouse.x + userNumHouse.width + userPaddingX, userNumHouseSlider.y - 15);
//
//     senateLabel = createElement('p', 'Number total voting members in the Senate');
//     senateLabel.class('group-labels');
//     senateLabel.position(userNumSenate.x + userNumSenate.width + userPaddingX, userNumSenateSlider.y - 15);
//
//     presLabel = createElement('p', 'Number total Presidents');
//     presLabel.class('group-labels');
//     presLabel.position(userNumPres.x + userNumPres.width + userPaddingX, userNumPresSlider.y - 15);
//   }
//
//
//   function sliders() {
//     var i = 0;
//     var initialY = 100;
//
//     userNumHouseSlider = createSlider(0, 500, numHouse);
//
//     userNumHouseSlider.position(userInputX, initialY + (userInputY * i));
//     console.log("house y: " + userNumHouseSlider.y);
//     i++;
//
//     userNumSenateSlider = createSlider(0, 500, numSenate);
//     userNumSenateSlider.position(userInputX, initialY + (userInputY * i));
//     console.log("Senate y: " + userNumSenateSlider.y);
//     i++;
//
//     userNumPresSlider = createSlider(1, 1, numPres);
//     userNumPresSlider.position(userInputX, initialY + (userInputY * i));
//     console.log("Pres y: " + userNumPresSlider.y);
//     i++;
//
//   }
//
//
//   //User Input Values for Congressional Reconfiguration
//   function inputVar() {
//
//     //Number voting members
//     numHouse = userNumHouseSlider.value();
//     numSenate = userNumSenateSlider.value();
//     numPres = userNumPresSlider.value();
//
//     // //Demographics of House as decimal percentages 1 = 100%
//     // perDemHouse = userPerDemHouse.value();
//     // perRepHouse = userPerRepHouse.value();
//     // perIndHouse = userPerIndHouse.value();
//     //
//     // //Demographics of Senate as decimal percentages 1 = 100%
//     // perDemSenate = userPerDemSenate.value();
//     // perRepSenate = userPerRepSenate.value();
//     // perIndSenate = userPerIndSenate.value();
//     //
//     // //Demographics of President as decimal percentages 1 = 100%
//     // perDemPres = userPerDemPres.value();
//     // perRepPres = userPerRepPres.value();
//     // perIndPres = userPerIndPres.value();
//     //
//     // //Historical Likelihood of party affiliation & likelihood of 'yay' vote
//     // repYaythresh = userRepYaythresh.value();
//     // demYaythresh = userDemYaythresh.value();
//     // indYaythresh = userIndYaythresh.value();
//     //
//     // //supermajority Cutoff for override of presidential veto
//     // superThresh = userSuperThresh.value();
//     //
//     // //How Many Voting Bodies (house, senate, president = 3) *for V2 - see TODO at top
//     // //numBodies = userNumBodies.value();
//     //
//     // //Your Stress Value
//     // stressSensorval = userStressSensorval.value();
//     //
//     // //Planets Stress Value
//     // stressPlanet = userStressPlanet.value();
//
//     bodyCount = 0;
//     resetCount();
//     resetDraw();
//     superThreshIndex = [];
//     bodyPass = [];
//
//     removeField();
//   }
//
//
//   function removeField() {
//     buttonReC.remove();
//     // buttonRC.remove();
//     buttonIV.remove();
//
//
//     var inputCopies = document.getElementsByClassName('input-copies');
//     inpLength = inputCopies.length;
//     while (inpLength--) {
//       inputCopies[inpLength].remove();
//     };
//
//     var textBodyLabel = document.getElementsByClassName('group-labels');
//     tLength = textBodyLabel.length;
//     while (tLength--) {
//       textBodyLabel[tLength].remove();
//     };
//
//
//     userNumHouse.remove();
//     userNumSenate.remove();
//     userNumPres.remove();
//
//     userNumHouseSlider.remove();
//     userNumPresSlider.remove();
//     userNumSenateSlider.remove();
//
//
//
//
//     // userPerDemHouse.remove();
//     // userPerRepHouse.remove();
//     // userPerIndHouse.remove();
//     // userPerDemSenate.remove();
//     // userPerRepSenate.remove();
//     // userPerIndSenate.remove();
//     // userPerDemPres.remove();
//     // userPerRepPres.remove();
//     // userPerIndPres.remove();
//     // userDemYaythresh.remove();
//     // userRepYaythresh.remove();
//     // userIndYaythresh.remove();
//     // userSuperThresh.remove();
//     // userStressSensorval.remove();
//     // userStressPlanet.remove();
//     //userNumBodies.remove();
//
//   }
//
//
//
// }



}


function sLegislative() {


  this.setup = function() {
    textSize(15);
    noStroke();


  }

  this.enter = function() {
    // noCursor();
    console.log("1st Slider Page");
    document.getElementById("page1").style.display = "block";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "none";
    document.getElementById("page5").style.display = "none";
    document.getElementById("slider-value").style.display = "block";
    document.getElementById("vote").style.display = "none";
    // let millisecond;
    //
    // if (millisecond == 1000) {
    //   mgr.showScene(main);
    // }

    background(bColor);
    document.body.style.backgroundColor = bColor;
    buttonRC.remove();
    // background(0);
    changeText(" ");

    sliders();
    button();
    // document.getElementById("top").style.display = "FIRST SLIDER";
    // document.getElementById("bottom").innerHTML = "";
    document.getElementById("top").style.display = "block";
    document.getElementById("top").innerHTML = "HOW MANY MEMBERS VOTING ON LEGISLATION?";


  }

  this.draw = function() {

  }

  function changeText(text) {
    document.getElementById("result").innerHTML = text;
  }

  function sliders() {
    // NOui slider slides
    console.log("user edits boool: " + userEdits);
    if (userEdits == true) {
      sliderVals();

    } else {
      createSlider();
      sliderVals();
    }

    function createSlider() {
      var range = document.getElementById('slider1');
      noUiSlider.create(slider1, {
        start: [250],
        range: {
          'min': [0],
          'max': [500]
        },
        cssPrefix: 'noUi-',
        tooltips: true,
        pips: {
          mode: 'range',
          density: 'range',
        },
        step: 1,
        format: wNumb({
          decimals: 0
        })
      });
      var range = document.getElementById('slider2');
      noUiSlider.create(slider2, {
        start: [250],
        range: {
          'min': [0],
          'max': [500]
        },
        cssPrefix: 'noUi-',
        tooltips: true,
        pips: {
          mode: 'range',
          density: 'range',
        },
        step: 1,
        format: wNumb({
          decimals: 0
        })
      });
      var range = document.getElementById('slider3');
      noUiSlider.create(slider3, {
        start: [3],
        range: {
          'min': [0],
          'max': [500]
        },
        cssPrefix: 'noUi-',
        tooltips: true,
        pips: {
          mode: 'range',
          density: 'range',
        },
        step: 1,
        format: wNumb({
          decimals: 0
        })
      });

      var range = document.getElementById('slider4');
      noUiSlider.create(slider4, {
        start: [3],
        range: {
          'min': [0],
          'max': [500]
        },
        cssPrefix: 'noUi-',
        tooltips: true,
        pips: {
          mode: 'range',
          density: 'range',
        },
        step: 1,
        format: wNumb({
          decimals: 0
        })
      });
    }


    function sliderVals() {
      //connecting values to html, each tab value is stored in an array
      var rangeSliderValueElement = document.getElementById('slider-value');

      slider1.noUiSlider.on('update', function(values, handle) {
        userNumHouse = values[0]
        rangeSliderValueElement.innerHTML = userNumHouse + " " + userNumSenate + " " + userNumPres + " " + userNumVP;
      });
      slider2.noUiSlider.on('update', function(values, handle) {
        userNumSenate = values[0];
        rangeSliderValueElement.innerHTML = userNumHouse + " " + userNumSenate + " " + userNumPres + " " + userNumVP;
      });
      slider3.noUiSlider.on('update', function(values, handle) {
        userNumPres = values[0];
        rangeSliderValueElement.innerHTML = userNumHouse + " " + userNumSenate + " " + userNumPres + " " + userNumVP;
      });
      slider4.noUiSlider.on('update', function(values, handle) {
        userNumVP = values[0];
        rangeSliderValueElement.innerHTML = userNumHouse + " " + userNumSenate + " " + userNumPres + " " + userNumVP;
      });
    }
  }

  function button() {
    var sidePad = 20;
    // backButton = createButton('BACK')
    // backButton.id("back-btn");
    // backButton.position((windowWidth / 2) - (backButton.width / 2), dHeight - 80);
    // backButton.mousePressed(lastScene);

    nextButton = createButton('NEXT');
    nextButton.id("configure-btn");
    nextButton.position((windowWidth / 2) - (nextButton.width / 2), dHeight - 80);
    nextButton.mousePressed(nextScene);
  }
}


function sParties() {

  this.setup = function() {

  }
  this.enter = function() {
    console.log("2nd Slider Page");
    document.getElementById("top").style.display = "block";
    document.getElementById("top").innerHTML = "NUMBER OF POLITICAL PARTIES";
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "block";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "none";
    document.getElementById("page5").style.display = "none";
    sliders();
    // button();
  }
  this.draw = function() {
    // imageMode(CENTER);
    // image(blueHydrangea, width / 6, 50, 100, 100);
  }

  function sliders() {
    if (userEdits == true) {
      sliderVals();
    } else {
      createSlider();
      sliderVals();
    }

    function createSlider()
    {
      var range = document.getElementById('slider5');

      noUiSlider.create(slider5, {
        start: [3],
        range: {
          'min': [3],
          'max': [3]
        },
        cssPrefix: 'noUi-',
        tooltips: true,
        pips: {
          mode: 'range',
          density: 'range',
        },
        step: 1,
        format: wNumb({
          decimals: 0
        })
      });
    }





     function sliderVals()
    {
      var toolTip = slider5.querySelectorAll('.noUi-tooltip');
      var classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];

      for (var i = 0; i < toolTip.length; i++) {
        toolTip[i].classList.add(classes[i]);
      }

      //connecting values to html, each tab value is stored in an array
      var rangeSliderValueElement = document.getElementById('slider-value');

      slider5.noUiSlider.on('update', function(values, handle) {
        userNumParties = values[0];
        rangeSliderValueElement.innerHTML = userNumParties;
      });
    }
  }
}

function sMembers() {



  this.setup = function() {}

  this.enter = function() {
    console.log("3rd Slider Page");
    document.getElementById("top").innerHTML = "How many members of the legislative body will be assigned to each party?";
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "block";
    document.getElementById("page4").style.display = "none";
    document.getElementById("page5").style.display = "none";
    // cursor();
    sliders();

  }
  this.draw = function() {

  }

  function sliders() {

    if (userEdits == true) {
      sliderVals();
    } else {
      createSlider();
      sliderVals();
    }

    function createSlider()
    {
      // NOui slider slides

      var range = document.getElementById('slider6');
      var range = document.getElementById('slider7');
      var range = document.getElementById('slider8');
      var range = document.getElementById('slider9');

      userNumHouse = parseInt(userNumHouse);
      userNumPres = parseInt(userNumPres);
      userNumVP = parseInt(userNumPres);
      userNumSenate = parseInt(userNumSenate);
      userNumParties = parseInt(userNumParties);
      userNumHouseRan = [];
      userNumSenateRan = [];
      userNumPresRan = [];
      userNumVPRan = [];


      // if (userEdits == true) {
      //   sliderVals();
      //
      // } else {
      //   createSlider();
      //   sliderVals();
      // }

      // userNumHouseConn = [];
      for (var i = 0; i < userNumParties - 1; i++) {
        userNumHouseRan[i] = Math.ceil(Math.random() * userNumHouse)
        if (i > 0) {
          for (var j = 0; j < userNumHouseRan.length - 1; j++) {
            if (userNumHouseRan[i] == userNumHouseRan[j]) {
              userNumHouseRan[i] = parseInt(Math.ceil(Math.random() * userNumHouse));
            }
          }
        }
        // console.log("random house num: " + userNumHouseRan[i]);
      }
      userNumHouseRan.sort((a, b) => a - b);
      console.log(userNumHouseRan);

      // userNumHouseConn = JSON.parse(userNumHouseConn);

      for (var i = 0; i < userNumParties - 1; i++) {
        userNumSenateRan[i] = Math.ceil(Math.random() * userNumSenate)
        if (i > 0) {
          for (var j = 0; j < userNumSenateRan.length - 1; j++) {
            if (userNumSenateRan[i] == userNumSenateRan[j]) {
              userNumSenateRan[i] = parseInt(Math.ceil(Math.random() * userNumSenate));
            }
          }
        }
        // console.log("random house num: " + userNumSenateRan[i]);
      }
      userNumSenateRan.sort((a, b) => a - b);
      console.log(userNumSenateRan);


      for (var i = 0; i < userNumPres - 1; i++) {
        userNumPresRan[i] = Math.ceil(Math.random() * userNumPres)
        if (i > 0) {
          for (var j = 0; j < userNumPresRan.length - 1; j++) {
            if (userNumPresRan[i] == userNumPresRan[j]) {
              userNumPresRan[i] = parseInt(Math.ceil(Math.random() * userNumPres));
            }
          }
        }
        // console.log("random house num: " + userNumSenateRan[i]);
      }
      userNumPresRan.sort((a, b) => a - b);
      console.log(userNumPresRan);

      for (var i = 0; i < userNumVP - 1; i++) {
        userNumVPRan[i] = Math.ceil(Math.random() * userNumVP)
        if (i > 0) {
          for (var j = 0; j < userNumVPRan.length - 1; j++) {
            if (userNumVPRan[i] == userNumVPRan[j]) {
              userNumVPRan[i] = parseInt(Math.ceil(Math.random() * userNumVP));
            }
          }
        }
        // console.log("random house num: " + userNumSenateRan[i]);
      }
      userNumVPRan.sort((a, b) => a - b);
      console.log(userNumVPRan);

      noUiSlider.create(slider6, {
        start: userNumHouseRan,
        range: {
          'min': [1],
          'max': [userNumHouse]
        },
        // connect: [true, true, true, true,true,true],
        cssPrefix: 'noUi-',
        tooltips: false,
        pips: {
          mode: 'range',
          density: 'range',
        },
        step: 1,
        format: wNumb({
          decimals: 0
        })
      });

      noUiSlider.create(slider7, {
        start: userNumSenateRan,
        range: {
          'min': [1],
          'max': [userNumSenate]
        },
        cssPrefix: 'noUi-',
        tooltips: false,
        pips: {
          mode: 'range',
          density: 'range',
        },
        step: 1,
        format: wNumb({
          decimals: 0
        })
      });

      noUiSlider.create(slider8, {
        start: userNumPresRan,
        range: {
          'min': [1],
          'max': [userNumPres]
        },
        cssPrefix: 'noUi-',
        tooltips: false,
        pips: {
          mode: 'range',
          density: 'range',
        },
        step: 1,
        format: wNumb({
          decimals: 0
        })
      });

      noUiSlider.create(slider9, {
        start: userNumVPRan,
        range: {
          'min': [1],
          'max': [userNumVP]
        },
        cssPrefix: 'noUi-',
        tooltips: false,
        pips: {
          mode: 'range',
          density: 'range',
        },
        step: 1,
        format: wNumb({
          decimals: 0
        })
      });

    }


function sliderVals()
{
  var toolTip6 = slider6.querySelectorAll('.noUi-tooltip');
  var toolTip7 = slider7.querySelectorAll('.noUi-tooltip');
  var toolTip8 = slider8.querySelectorAll('.noUi-tooltip');
  var toolTip9 = slider9.querySelectorAll('.noUi-tooltip');

  var classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];

  for (var i = 0; i < toolTip6.length; i++) {
    toolTip6[i].classList.add(classes[i]);

  }
  for (var i = 0; i < toolTip7.length; i++) {
    toolTip7[i].classList.add(classes[i]);

  }

  for (var i = 0; i < toolTip8.length; i++) {
    toolTip8[i].classList.add(classes[i]);
  }

  for (var i = 0; i < toolTip9.length; i++) {
    toolTip9[i].classList.add(classes[i]);
  }

  //connecting values to html, each tab value is stored in an array
  var rangeSliderValueElement = document.getElementById('slider-value');
  userPerHouseBody = [];
  slider6.noUiSlider.on('update', function(values, handle) {
    for (var i = 0; i <= values.length; i++) {
      if (i == 0) {
        userPerHouseBody[i] = values[i];
      } else if (i == values.length) {
        userPerHouseBody[i] = userNumHouse - values[i - 1];
      } else {
        userPerHouseBody[i] = values[i] - values[i - 1];
      }
      var toPercentage = userPerHouseBody[i] / userNumHouse;
      toPercentage = roundNum(toPercentage, 2);
      userPerHouseBody[i] = toPercentage;
    }
    rangeSliderValueElement.innerHTML = userPerHouseBody + "<br>" + userPerSenateBody + "<br>" + userPerPresBody + "<br>" + userPerVPBody;
  });

  userPerSenateBody = [];
  slider7.noUiSlider.on('update', function(values, handle) {
    for (var i = 0; i <= values.length; i++) {
      if (i == 0) {
        userPerSenateBody[i] = values[i];
      } else if (i == values.length) {
        userPerSenateBody[i] = userNumSenate - values[i - 1];
      } else {
        userPerSenateBody[i] = values[i] - values[i - 1];
      }
      var senPercentage = userPerSenateBody[i] / userNumSenate;
      senPercentage = roundNum(senPercentage, 2);
      userPerSenateBody[i] = senPercentage;
    }


    rangeSliderValueElement.innerHTML = userPerHouseBody + "<br>" + userPerSenateBody + "<br>" + userPerPresBody + "<br>" + userPerVPBody;
  });

  userPerPresBody = [];
  slider8.noUiSlider.on('update', function(values, handle) {
    for (var i = 0; i <= values.length; i++) {
      if (i == 0) {
        userPerPresBody[i] = values[i];
      } else if (i == values.length) {
        userPerPresBody[i] = userNumPres - values[i - 1];
      } else {
        userPerPresBody[i] = values[i] - values[i - 1];
      }
      var presPercentage = userPerPresBody[i] / userNumPres;
      presPercentage = roundNum(presPercentage, 2);
      userPerPresBody[i] = presPercentage;
    }

    rangeSliderValueElement.innerHTML = userPerHouseBody + "<br>" + userPerSenateBody + "<br>" + userPerPresBody + "<br>" + userPerVPBody;
  });

  userPerVPBody = [];
  slider9.noUiSlider.on('update', function(values, handle) {
    for (var i = 0; i <= values.length; i++) {
      if (i == 0) {
        userPerVPBody[i] = values[i];
      } else if (i == values.length) {
        userPerVPBody[i] = userNumVP - values[i - 1];
      } else {
        userPerVPBody[i] = values[i] - values[i - 1];
      }
      var vpPercentage = userPerVPBody[i] / userNumVP;
      vpPercentage = roundNum(vpPercentage, 2);
      userPerVPBody[i] = vpPercentage;
    }

    rangeSliderValueElement.innerHTML = userPerHouseBody + "<br>" + userPerSenateBody + "<br>" + userPerPresBody + "<br>" + userPerVPBody;
  });

}

  }


}


function sBodyPass() {


  this.setup = function() {
    textSize(15);
    noStroke();
    dWidth = width;
    dHeight = height;
    // background("#012244");

  }

  this.enter = function() {
    // noCursor();
    console.log("4th Slider Page");
    document.getElementById("top").innerHTML = "WHAT PERCENTAGE OF YES VOTES IS NEEDED FOR A BILL TO PASS IN EACH LEGISLATIVE BODY?";
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "block";
    document.getElementById("page5").style.display = "none";
    // let millisecond;
    //
    // if (millisecond == 1000) {
    //   mgr.showScene(main);
    // }
    sliders();

  }

  this.draw = function() {

  }

  function sliders() {

    if (userEdits == true) {
      sliderVals();
    } else {
      createSlider();
      sliderVals();
    }
    // NOui slider slides
function createSlider()
{
  noUiSlider.create(slider10, {
    start: [.50],
    range: {
      'min': [0],
      'max': [1]
    },
    cssPrefix: 'noUi-',
    tooltips: true,
    pips: {
      mode: 'range',
      density: 'range',
    },
    step: .1,
    format: wNumb({
      decimals: 2
    })
  });

  noUiSlider.create(slider11, {
    start: [.50],
    range: {
      'min': [0],
      'max': [1]
    },
    cssPrefix: 'noUi-',
    tooltips: true,
    pips: {
      mode: 'range',
      density: 'range',
    },
    step: .1,
    format: wNumb({
      decimals: 2,
      // suffix: '%'
    })
  });
}


function sliderVals()
{
  //connecting values to html, each tab value is stored in an array
  var rangeSliderValueElement = document.getElementById('slider-value');

  userBodyPass = "";
  userSuperThresh = "";

  slider10.noUiSlider.on('update', function(values, handle) {
    userBodyPass = values[0]
    rangeSliderValueElement.innerHTML = userBodyPass + " " + userSuperThresh;

  });
  slider11.noUiSlider.on('update', function(values, handle) {
    userSuperThresh = values[0];
    rangeSliderValueElement.innerHTML = userBodyPass + " " + userSuperThresh;

  });

}


  }

}

function sYesVotes() {

  this.setup = function() {

  }

  this.enter = function() {

    console.log("5th slider page");
    document.getElementById("top").innerHTML = "LIKELIHOOD OF A YES VOTE";
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "none";
    document.getElementById("page5").style.display = "block";
    nextButton.remove();

    sliders();

    buttonIV = createButton('Recalculate');
    buttonIV.id('button-re');

    buttonIV.position(windowWidth - buttonIV.width - buttonReC.width - buttonRC.width - 20, windowHeight - 45);
    buttonIV.mousePressed(inputVar);

  }

  this.draw = function() {}



  function sliders() {
    // NOui slider slides


        if (userEdits == true) {
          sliderVals();
        } else {
          createSlider();
          sliderVals();
        }

        function createSlider()
        {
          noUiSlider.create(slider12, {
            start: [.50],
            range: {
              'min': [0],
              'max': [1]
            },
            cssPrefix: 'noUi-',
            tooltips: true,
            pips: {
              mode: 'range',
              density: 'range',
            },
            step: .1,
            format: wNumb({
              decimals: 2
              // suffix: '%'
            })
          });

          noUiSlider.create(slider13, {
            start: [.50],
            range: {
              'min': [0],
              'max': [1]
            },
            cssPrefix: 'noUi-',
            tooltips: true,
            pips: {
              mode: 'range',
              density: 'range',
            },
            step: .1,
            format: wNumb({
              decimals: 2
              // suffix: '%'
            })
          });

          noUiSlider.create(slider14, {
            start: [.50],
            range: {
              'min': [0],
              'max': [1]
            },
            cssPrefix: 'noUi-',
            tooltips: true,
            pips: {
              mode: 'range',
              density: 'range',
            },
            step: .1,
            format: wNumb({
              decimals: 2
              // suffix: '%'
            })
          });

        }

        function sliderVals()
        {
          //connecting values to html, each tab value is stored in an array
          var rangeSliderValueElement = document.getElementById('slider-value');


          userRepYaythresh = "";
          userDemYaythresh = "";
          userIndYaythresh = "";

          slider12.noUiSlider.on('update', function(values, handle) {
            userDemYaythresh = values[0]
            rangeSliderValueElement.innerHTML = userDemYaythresh + " " + userRepYaythresh + " " + userIndYaythresh;

          });
          slider13.noUiSlider.on('update', function(values, handle) {
            userRepYaythresh = values[0];
            rangeSliderValueElement.innerHTML = userDemYaythresh + " " + userRepYaythresh + " " + userIndYaythresh;

          });

          slider14.noUiSlider.on('update', function(values, handle) {
            userIndYaythresh = values[0];
            rangeSliderValueElement.innerHTML = userDemYaythresh + " " + userRepYaythresh + " " + userIndYaythresh;

          });

        }

  }


}
