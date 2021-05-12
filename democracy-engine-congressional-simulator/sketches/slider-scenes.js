function democracyEngine() {
  console.log("democracy userEdits: " + userEdits);
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
    document.getElementById("page6").style.display = "none";
    document.getElementById("slider-value").style.display = "none";
    document.getElementById("vote").style.display = "block";
    document.getElementById("slider-disp").style.display = "none";
    dispButton();

  }

  //Logic below is setup for current congressional configuration
  //May want to wrap this in a case state or the like so users can define different logic
  //if the user has input variables use those instead of the Global declaration
  function dispButton() {
      var dispBtn;
      dispBtn = createButton('?');
      dispBtn.id("disp-btn");
      // dispBtn.position(19, 19);
      dispBtn.mousePressed(dispResult);

  }

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
    console.log("body pass yay: " + yay + "body pass cutoff: " + numCon * perPass);
    console.log("body pass yay: " + yay + "body superthresh cutoff: " + numCon * superThresh);
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
    let padX = 20;
    let dispW = (dWidth / columnAmount);
    let dispH = (dHeight / rowAmount);

    let dispX = 0 + padX;
    let dispY = 0 + padY;

    var resBColor = color(0, 0, 0);
    let decisionText = "";
    //column 1 to be yay/nay votes
    //column 2 to be body votes
    textFont(helvFont);

    console.log("body pass: " + bodyPass);

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
            currentBodyLabel = 'LEGISLATIVE CHAMBER 1';
          } else if (i == 1) {
            currentBodyLabel = 'LEGISLATIVE CHAMBER 2';
          } else if (i == 2) {
            currentBodyLabel = 'VICE PRESIDENCY';
          } else if (i == 3) {
            // print("I AM IN PRESIDENT b4 LOGIC");
            currentBodyLabel = 'PRESIDENCY';
          }

          //yay and nay votes for each voting body
          //y = the i*dispW

          if (i < votingBodyCounts.length) {

            print("i = " + i + " and current body label = " + currentBodyLabel);

            if (currentBodyLabel == 'PRESIDENCY') {
              textSize(23);
              text(currentBodyLabel, (i) * dispW + padX, padY, dispW, dispH);
              textAlign(LEFT);

              if (stopVoteArr[i] == false) {
                textSize(20);
                text("\n\n\nVOTES \n", (i) * dispW + padX, padY, dispW, dispH);
                textSize(16);
                text("\n\n\n\n\nYES: " + votingBodyCounts[i][0] + "\nNO: " + votingBodyCounts[i][1] + "\n ", (i) * dispW + padX, padY, dispW, dispH);


                // print("President: \n\n\n\nYES: " + votingBodyCounts[3][0] + "\nNO: " + votingBodyCounts[3][1]);
                //president veto/super

                if (bodyPass[0] === true && bodyPass[1] === true && bodyPass[3] === false) {
                  if (superThreshIndex[0] === true && superThreshIndex[1] === true) {
                    text('\n\n\nVETO OVERRIDE BY SUPERMAJORITY IN ALL LEGISLATIVE CHAMBERS', (i) * dispW + padX, dHeight / 4, dispW, dispH);
                  } else {
                    text('\n\n\nPRESIDENTIAL VETO: BILL IS NOT APPROVED', (i) * dispW + padX, dHeight / 4, dispW, dispH);
                  }
                } else if (bodyPass[i] == true &&
                  superThreshIndex[0] == false ||
                  superThreshIndex[1] == false) {
                  text('\n\n\nBILL IS APPROVED', (i) * dispW + padX, dHeight / 4, dispW, dispH);
                } else if (bodyPass[i] == false) {
                  text('\n\n\nBILL IS NOT APPROVED ', (i) * dispW + padX, dHeight / 4, dispW, dispH);
                }
              } else {
                textSize(16);
                if (bodyPass[0] == false || bodyPass[1] == false) {
                  // dispY = dispY + (dHeight / 5);
                  text('\n\n\nBILL IS NOT APPROVED BY ALL CHAMBERS: PRESIDENT DOES NOT VOTE', (i) * dispW + padX, padY, dispW, dispH);
                } else {
                  textSize(20);
                  text('\n\n\nDOES NOT VOTE', (i) * dispW + padX, padY, dispW, dispH);
                }
              }

            } else if (currentBodyLabel == 'VICE PRESIDENCY') {
              textSize(23);
              text(currentBodyLabel, i * dispW + padX, padY, dispW, dispH);
              if (stopVoteArr[i] == false && vpVote == true) {
                textSize(20);
                text("\n\n\nVOTES \n", i * dispW + padX, padY, dispW, dispH);
                textSize(16);
                text("\n\n\n\n\nYES: " + votingBodyCounts[i][0] + "\nNO: " + votingBodyCounts[i][1] + "\n ", i * dispW + padX, padY, dispW, dispH);

                if (bodyPass[0] == false || bodyPass[1] == false) {
                  text('\n\n\nBILL IS NOT APPROVED BY ALL CHAMBERS: NO VICE PRESIDENTIAL VOTE', i * dispW + padX, (dHeight / 4), dispW, dispH);
                } else if (bodyPass[0] == true && bodyPass[1] == true && vpVote == true) {
                  if (bodyPass[i] == false) {
                    text('\n\n\nBILL IS NOT APPROVED', (i) * dispW + padX, dHeight / 4, dispW, dispH);
                  } else if (bodyPass[i] == true) {
                    text('\n\n\nBILL IS APPROVED', (i) * dispW + padX, dHeight / 4, dispW, dispH);
                  }
                }

              } else {
                textSize(20);
                text('\n\n\nDOES NOT VOTE', i * dispW + padX, padY, dispW, dispH);
              }

            } else {
              textSize(23);
              text(currentBodyLabel, i * dispW + padX, padY, dispW, dispH);
              if (stopVoteArr[i] == false) {
                textSize(20);
                text("\n\n\nVOTES \n", i * dispW + padX, padY, dispW, dispH);
                textSize(16);
                text("\n\n\n\n\nYES: " + votingBodyCounts[i][0] + "\n" + "NO: " + votingBodyCounts[i][1] + "\n ", i * dispW + padX, padY, dispW, dispH);
                // superthresh
                if (bodyPass[i] == true && superThreshIndex[i] == true) {
                  text('\n\n\nBILL IS APPROVED WITH SUPERMAJORITY', i * dispW + padX, dHeight / 4, dispW, dispH);
                } else if (currentBodyLabel == 'SENATE' && bodyPass[0] == true && bodyPass[1] == true && vpVote == true) {
                  text('\n\n\nTIE-BREAKER VOTE INITIATED', i * dispW + padX, dHeight / 4, dispW, dispH);
                } else if (bodyPass[i] == false) {
                  text('\n\n\nBILL IS NOT APPROVED', i * dispW + padX, dHeight / 4, dispW, dispH);
                } else if (bodyPass[i] == true && superThreshIndex[i] == false) {
                  text('\n\n\nBILL IS APPROVED', i * dispW + padX, dHeight / 4, dispW, dispH);
                }
              } else {
                textSize(20);
                text('\n\n\nDOES NOT VOTE', i * dispW + padX, padY, dispW, dispH);
              }
            }


          }

          //regular pass
          if (bodyPass[0] === true && bodyPass[1] === true && vpVote == true && bodyPass[2] == false) {
            decisionText = "DECISION: BILL DOES NOT BECOME LAW DUE TO TIE-BREAKER VOTE BY VICE PRESIDENT";
          } else if (bodyPass[0] === true && bodyPass[1] === true && bodyPass[3] === true) {
            decisionText = "DECISION: BILL BECOMES LAW";

          } else if (bodyPass[0] === true && bodyPass[1] === true && bodyPass[3] === false) {
            if (superThreshIndex[0] === true && superThreshIndex[1] === true) {
              decisionText = "DECISION: BILL BECOMES LAW BY SUPERMAJORITY";

            } else {
              decisionText = "DECISION: BILL DOES NOT BECOME LAW DUE TO PRESIDENTIAL VETO";

            }
          } else if (bodyPass[0] == false || bodyPass[1] == false) {
            dispY = dispY + (dHeight / 5);

            decisionText = "DECISION: BILL DOES NOT BECOMES LAW";

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
    buttonRes = createButton('RESET');

    buttonRes.id('res-btn');

    buttonRes.position(windowWidth - buttonRes.width - 20, windowHeight - 45);
    buttonRes.mousePressed(userRecount);

    buttonRC = createButton('RECONFIGURE CONGRESS');

    buttonRC.id('rec-btn');

    buttonRC.position(windowWidth - buttonRC.width - buttonRes.width - 20, windowHeight - 45);
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
  }
}


function democracyEngine0() {

  console.log("democracy userEdits: " + userEdits);
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
    document.getElementById("page6").style.display = "none";
    document.getElementById("slider-value").style.display = "none";
    document.getElementById("vote").style.display = "block";
    document.getElementById("slider-disp").style.display = "none";
    currentCongLogic();

  }

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


        offSet = dWidth / (numBodies - 1);

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
        numDem = round(numCon * perDemPres);
        numRep = round(numCon * perRepPres);
        numWild = round(numCon * perIndPres);

        //Figure out how big to draw the circles and how far to space them out
        skip = floor(.65 * (sqrt(offSet * dHeight / numCon)));
        print('Skip = ' + skip); //testing
        x = skip / 2;
        y = skip / 2;
      }
    }

    //Logic for President
    if (bodyCount == 3) {
      strokeWeight(10);
      translate(offSet * (bodyCount - 1), 0);

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
        skip = floor(.65 * (sqrt(offSet * dHeight / numCon)));
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
      y = y + skip;
      if (vpVote == false) {
        stroke(255, 100);
        noFill();
        strokeWeight(3);
      }
      //ab for error checking
      // print('drawing VP square at' + x + " " + y);
    }

    // if (bodyCount == 1) {
    //   // simulate vp vote after tie
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
    } else if (yay > numCon / 2) {
      // text('BILL PASSES ' + bodyLabel, votePadX, votePadY, offSet, dHeight);
      bodyPass[bodyCount] = true;
      superThreshIndex[bodyCount] = false;
    } else if (yay == numCon / 2 && bodyLabel == "SENATE") {
      bodyPass[bodyCount] = true;
      vpVote = true;
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

  function finalDisplay() {

    let currentBodyLabel;

    let columnAmount = numBodies - 1;
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

    console.log("body pass: " + bodyPass);

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
            currentBodyLabel = 'VICE PRESIDENCY';
          } else if (i == 3) {
            // print("I AM IN PRESIDENT b4 LOGIC");
            currentBodyLabel = 'PRESIDENCY';
          }

          //yay and nay votes for each voting body
          //y = the i*dispW

          if (i < votingBodyCounts.length) {

            print("i = " + i + " and current body label = " + currentBodyLabel);

            if (currentBodyLabel == 'PRESIDENCY') {
              textSize(23);
              text(currentBodyLabel, (i - 1) * dispW + padX, padY, dispW, dispH);
              textAlign(LEFT);

              if (stopVoteArr[i] == false) {
                textSize(20);
                text("\n\nVOTES \n", (i - 1) * dispW + padX, padY, dispW, dispH);
                textSize(16);
                text("\n\n\n\nYES: " + votingBodyCounts[i][0] + "\nNO: " + votingBodyCounts[i][1] + "\n ", (i - 1) * dispW + padX, padY, dispW, dispH);


                // print("President: \n\n\n\nYES: " + votingBodyCounts[3][0] + "\nNO: " + votingBodyCounts[3][1]);
                //president veto/super

                if (bodyPass[0] === true && bodyPass[1] === true && bodyPass[3] === false) {
                  if (superThreshIndex[0] === true && superThreshIndex[1] === true) {
                    text('\nVETO OVERRIDE BY SUPERMAJORITY IN ALL LEGISLATIVE CHAMBERS', (i - 1) * dispW + padX, dHeight / 4, dispW, dispH);
                  } else {
                    text('\nPRESIDENTIAL VETO: BILL IS NOT APPROVED ', (i - 1) * dispW + padX, dHeight / 4, dispW, dispH);
                  }
                } else if (bodyPass[i] == true &&
                  superThreshIndex[0] == false ||
                  superThreshIndex[1] == false) {
                  text('\nBILL IS APPROVED', (i - 1) * dispW + padX, dHeight / 4, dispW, dispH);
                } else if (bodyPass[i] == false) {
                  text('\nBILL IS NOT APPROVED ', (i - 1) * dispW + padX, dHeight / 4, dispW, dispH);
                }
              } else {

                if (bodyPass[0] == false || bodyPass[1] == false) {
                  textSize(16);
                  text('\n\nBILL IS NOT APPROVED BY ALL CHAMBERS: PRESIDENT DOES NOT VOTE', (i - 1) * dispW + padX, padY, dispW, dispH);
                } else {
                  textSize(20);
                  text('\n\nDOES NOT VOTE', (i - 1) * dispW + padX, padY, dispW, dispH);
                }
              }

            } else if (currentBodyLabel == 'VICE PRESIDENCY') {
              textSize(23);
              text(currentBodyLabel, i * dispW + padX, dHeight / 2, dispW, dispH);
              if (stopVoteArr[i] == false && vpVote == true) {
                textSize(20);
                text("\n\nVOTES \n", i * dispW + padX, dHeight / 2, dispW, dispH);
                textSize(16);
                text("\n\n\n\nYES: " + votingBodyCounts[i][0] + "\nNO: " + votingBodyCounts[i][1] + "\n ", i * dispW + padX, dHeight / 2, dispW, dispH);

                if (bodyPass[0] == false || bodyPass[1] == false) {
                  text('\n\n\nBILL IS NOT APPROVED BY ALL CHAMBERS: NO VICE PRESIDENTIAL VOTE', i * dispW + padX, dHeight * (3 / 4), dispW, dispH);
                } else if (bodyPass[0] == true && bodyPass[1] == true && vpVote == true) {
                  if (bodyPass[i] == false) {
                    text('\nBILL IS NOT APPROVED', (i) * dispW + padX, dHeight * (3 / 4), dispW, dispH);
                  } else if (bodyPass[i] == true) {
                    text('\nBILL IS APPROVED', (i) * dispW + padX, dHeight * (3 / 4), dispW, dispH);
                  }
                }

              } else {
                textSize(20);
                text('\n\nDOES NOT VOTE', i * dispW + padX, dHeight / 2, dispW, dispH);
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
                  text('\nTIE-BREAKER VOTE INITIATED', i * dispW + padX, dHeight / 4, dispW, dispH);
                } else if (bodyPass[i] == false) {
                  text('\nBILL IS NOT APPROVED', i * dispW + padX, dHeight / 4, dispW, dispH);
                } else if (bodyPass[i] == true && superThreshIndex[i] == false) {
                  text('\nBILL IS APPROVED', i * dispW + padX, dHeight / 4, dispW, dispH);
                }
              } else {
                textSize(20);
                text('\n\nDOES NOT VOTE', i * dispW + padX, padY, dispW, dispH);
              }
            }


          }

          //regular pass
          if (bodyPass[0] === true && bodyPass[1] === true && vpVote == true && bodyPass[2] == false) {
            decisionText = "DECISION: BILL DOES NOT BECOME LAW DUE TO TIE-BREAKER VOTE BY VICE PRESIDENT";
          } else if (bodyPass[0] === true && bodyPass[1] === true && bodyPass[3] === true) {
            decisionText = "DECISION: BILL BECOMES LAW";

          } else if (bodyPass[0] === true && bodyPass[1] === true && bodyPass[3] === false) {
            if (superThreshIndex[0] === true && superThreshIndex[1] === true) {
              decisionText = "DECISION: BILL BECOMES LAW BY SUPERMAJORITY";

            } else {
              decisionText = "DECISION: BILL DOES NOT BECOME LAW DUE TO PRESIDENTIAL VETO";

            }
          } else if (bodyPass[0] == false || bodyPass[1] == false) {
            dispY = dispY + (dHeight / 5);

            decisionText = "DECISION: BILL DOES NOT BECOME LAW";

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
    buttonRes = createButton('RESET');

    buttonRes.id('res-btn');

    buttonRes.position(windowWidth - buttonRes.width - 20, windowHeight - 45);
    buttonRes.mousePressed(userRecount);

    buttonRC = createButton('RECONFIGURE CONGRESS');

    buttonRC.id('rec-btn');

    buttonRC.position(windowWidth - buttonRC.width - buttonRes.width - 20, windowHeight - 45);
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

    buttonIV = createButton('RECALCULATE VOTE');
    buttonIV.id('button-re');

    buttonIV.position(windowWidth - buttonIV.width - buttonRes.width - buttonRC.width - 20, windowHeight - 45);
    buttonIV.mousePressed(inputVar);
  }

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
    document.getElementById("page6").style.display = "none";
    document.getElementById("slider-value").style.display = "block";
    document.getElementById("vote").style.display = "none";
    document.getElementById("slider-disp").style.display = "none";
    if(userEdits == true)
    {
      document.getElementById("disp-btn").style.display = "none";
      document.getElementById("rec-btn").style.display = "none";
    }
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
    document.getElementById("top").style.display = "block";
    document.getElementById("top").innerHTML = "NUMBER OF VOTING MEMBERS";


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
        userNumVP = values[0];
        rangeSliderValueElement.innerHTML = userNumHouse + " " + userNumSenate + " " + userNumPres + " " + userNumVP;
      });
      slider4.noUiSlider.on('update', function(values, handle) {
        userNumPres = values[0];
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
    nextButton.id("next-btn");
    // nextButton.position((windowWidth / 2) - (nextButton.width / 2), dHeight - 50);
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
    document.getElementById("page6").style.display = "none";
    document.getElementById("slider-value").style.display = "block";
    document.getElementById("vote").style.display = "none";
    document.getElementById("slider-disp").style.display = "none";
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

    function createSlider() {
      var range = document.getElementById('slider5');

      noUiSlider.create(slider5, {
        start: [2],
        range: {
          'min': [1],
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





    function sliderVals() {
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
        //if there is only one party, then 100% of the members are that party
        if (userNumParties <= 1)
        {

          userPerHouseBody = [];
          userPerSenateBody = [];
          userPerPresBody = [];
          userPerVPBody = [];
          userPerHouseBody[0] = 1.0;
          userPerSenateBody[0] = 1.0;
          userPerPresBody[0] = 1.0;
          userPerVPBody[0] = 1.0;
          userNumParties = parseInt(userNumParties);
          onePartyBool = true;
        }

      });
    }
  }
}

function sMembers() {



  this.setup = function() {}

  this.enter = function() {
    console.log("3rd Slider Page");
    document.getElementById("top").innerHTML = "NUMBER OF VOTING MEMBERS AFFILIATED WITH EACH POLITICAL PARTY";
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "block";
    document.getElementById("page4").style.display = "none";
    document.getElementById("page5").style.display = "none";
    document.getElementById("page6").style.display = "none";
    document.getElementById("slider-value").style.display = "block";
    document.getElementById("vote").style.display = "none";
    document.getElementById("slider-disp").style.display = "none";
    // cursor();
    sliders();

  }
  this.draw = function() {

  }

  function sliders() {

    if (userEdits == true) {
      if (onePartyBool == true) {
        createSlider();
        onePartyBool = false;
      }
      sliderVals();
    } else {
      createSlider();
      sliderVals();
    }

    function createSlider() {
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


        for (var i = 0; i < userNumParties - 1; i++) {
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
        console.log(userNumParties);

        for (var i = 0; i < userNumParties - 1; i++) {
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

      noUiSlider.create(slider9, {
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



    }


    function sliderVals() {
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

      var rangeSliderValueElement = document.getElementById('slider-value');

      if (userNumParties > 1) {
        //connecting values to html, each tab value is stored in an array

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
            housePercentage = userPerHouseBody[i] / userNumHouse;
            housePercentage = roundNum(housePercentage, 3);
            userPerHouseBody[i] = housePercentage;
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
            senPercentage = userPerSenateBody[i] / userNumSenate;
            senPercentage = roundNum(senPercentage, 3);
            userPerSenateBody[i] = senPercentage;
          }


          rangeSliderValueElement.innerHTML = userPerHouseBody + "<br>" + userPerSenateBody + "<br>" + userPerPresBody + "<br>" + userPerVPBody;
        });


        userPerVPBody = [];
        slider8.noUiSlider.on('update', function(values, handle) {
          for (var i = 0; i <= values.length; i++) {
            if (i == 0) {
              userPerVPBody[i] = values[i];
            } else if (i == values.length) {
              userPerVPBody[i] = userNumVP - values[i - 1];
            } else {
              userPerVPBody[i] = values[i] - values[i - 1];
            }
            vpPercentage = userPerVPBody[i] / userNumVP;
            vpPercentage = roundNum(vpPercentage, 3);
            userPerVPBody[i] = vpPercentage;
          }

          rangeSliderValueElement.innerHTML = userPerHouseBody + "<br>" + userPerSenateBody + "<br>" + userPerPresBody + "<br>" + userPerVPBody;
        });

        userPerPresBody = [];
        slider9.noUiSlider.on('update', function(values, handle) {
          for (var i = 0; i <= values.length; i++) {
            if (i == 0) {
              userPerPresBody[i] = values[i];
            } else if (i == values.length) {
              userPerPresBody[i] = userNumPres - values[i - 1];
            } else {
              userPerPresBody[i] = values[i] - values[i - 1];
            }
            presPercentage = userPerPresBody[i] / userNumPres;
            presPercentage = roundNum(presPercentage, 3);
            userPerPresBody[i] = presPercentage;
          }

          rangeSliderValueElement.innerHTML = userPerHouseBody + "<br>" + userPerSenateBody + "<br>" + userPerPresBody + "<br>" + userPerVPBody;
        });
      }
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
    document.getElementById("top").innerHTML = "PERCENTAGE OF VOTES REQUIRED FOR APPROVAL OF BILL BY EACH LEGISLATIVE CHAMBER";
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "block";
    document.getElementById("page5").style.display = "none";
    document.getElementById("page6").style.display = "none";
    document.getElementById("slider-value").style.display = "block";
    document.getElementById("vote").style.display = "none";
    document.getElementById("slider-disp").style.display = "none";
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
    function createSlider() {
      noUiSlider.create(slider10, {
        start: [50],
        range: {
          'min': [0],
          'max': [100]
        },
        cssPrefix: 'noUi-',
        tooltips: true,
        pips: {
          mode: 'range',
          density: 'range',
        },
        step: 10,
        format: wNumb({
          decimals: 0,
          suffix: '%'
        })
      });

      noUiSlider.create(slider11, {
        start: [50],
        range: {
          'min': [0],
          'max': [100]
        },
        cssPrefix: 'noUi-',
        tooltips: true,
        pips: {
          mode: 'range',
          density: 'range',
        },
        step: 10,
        format: wNumb({
          decimals: 0,
          suffix: '%'
        })
      });
    }


    function sliderVals() {
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
    document.getElementById("top").innerHTML = "PROBABILITY OF AN AFFIRMATIVE VOTE BY A PARTY MEMBER";
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "none";
    document.getElementById("page5").style.display = "block";
    document.getElementById("page6").style.display = "none";
    document.getElementById("slider-disp").style.display = "none";


    sliders();



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

    function createSlider() {
      noUiSlider.create(slider12, {
        start: [50],
        range: {
          'min': [0],
          'max': [100]
        },
        cssPrefix: 'noUi-',
        tooltips: true,
        pips: {
          mode: 'range',
          density: 'range',
        },
        step: 10,
        format: wNumb({
          decimals: 0,
          suffix: '%'
        })
      });

      noUiSlider.create(slider13, {
        start: [50],
        range: {
          'min': [0],
          'max': [100]
        },
        cssPrefix: 'noUi-',
        tooltips: true,
        pips: {
          mode: 'range',
          density: 'range',
        },
        step: 10,
        format: wNumb({
          decimals: 0,
          suffix: '%'
        })
      });

      noUiSlider.create(slider14, {
        start: [50],
        range: {
          'min': [0],
          'max': [100]
        },
        cssPrefix: 'noUi-',
        tooltips: true,
        pips: {
          mode: 'range',
          density: 'range',
        },
        step: 10,
        format: wNumb({
          decimals: 0,
          suffix: '%'
        })
      });

    }

    function sliderVals() {
      //connecting values to html, each tab value is stored in an array
      var rangeSliderValueElement = document.getElementById('slider-value');


      userRepYaythresh = "";
      userDemYaythresh = "";
      userIndYaythresh = "";

      slider12.noUiSlider.on('update', function(values, handle) {
        userDemYaythresh = values[0];
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

function sResults() {

  this.setup = function() {

  }

  this.enter = function() {

    console.log("user result page");
    document.getElementById("top").innerHTML = "DEMOCRACY ENGINE SIMULATOR INPUTS";
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "none";
    document.getElementById("page5").style.display = "none";
    document.getElementById("page6").style.display = "block";
    document.getElementById("slider-value").style.display = "none";
    document.getElementById("vote").style.display = "none";
    document.getElementById("slider-disp").style.display = "block";
    nextButton.remove();

    buttonIV = createButton('RECALCULATE VOTE');
    buttonIV.id('rec-btn');

    buttonIV.position(windowWidth - buttonIV.width - buttonRes.width - buttonRC.width - 20, windowHeight - 45);
    buttonIV.mousePressed(inputVar);

  }

  this.draw = function() {

    if (userNumParties == 2) {
      userPerHouseBody[2] = 0.0;
      userPerSenateBody[2] = 0.0;
      userPerVPBody[2] = 0.0;
      userPerPresBody[2] = 0.0;
    }
    else if (userNumParties == 1) {
      userPerHouseBody[1] = 0.0;
      userPerHouseBody[2] = 0.0;
      userPerSenateBody[1] = 0.0;
      userPerSenateBody[2] = 0.0;
      userPerVPBody[1] = 0.0;
      userPerVPBody[2] = 0.0;
      userPerPresBody[1] = 0.0;
      userPerPresBody[2] = 0.0;
    }

    userOutputText = document.getElementById('slider-disp');


    userOutputText.innerHTML =
      "<div id = 'column1'><h3>First Legislative Chamber</h3>" +
      "Voting Members: " + userNumHouse +
      "<br>Members in Political Party 1: " + Math.round(userPerHouseBody[0] * userNumHouse) +
      "<br>Members in Political Party 2: " + Math.round(userPerHouseBody[1] * userNumHouse) +
      "<br>Members in Political Party 3: " + Math.round(userPerHouseBody[2] * userNumHouse) +
      "<h3>Second Legislative Chamber</h3>" +
      "Voting Members: " + userNumSenate +
      "<br>Members in Political Party 1: " + Math.round(userPerSenateBody[0] * userNumSenate) +
      "<br>Members in Political Party 2: " + Math.round(userPerSenateBody[1] * userNumSenate) +
      "<br>Members in Political Party 3: " + Math.round(userPerSenateBody[2] * userNumSenate) +
      "<h3>Vice Presidency</h3>" +
      "Voting Members: " + userNumVP +
      "<br>Members in Political Party 1: " + Math.round(userPerPresBody[0] * userNumVP) +
      "<br>Members in Political Party 2: " + Math.round(userPerPresBody[1] * userNumVP) +
      "<br>Members in Political Party 3: " + Math.round(userPerPresBody[2] * userNumVP) + "</div>" +
      "<div id = 'column2'><h3>Presidency</h3>" +
      "Voting Members: " + userNumPres +
      "<br>Members in Political Party 1: " + Math.round(userPerVPBody[0] * userNumPres) +
      "<br>Members in Political Party 2: " + Math.round(userPerVPBody[1] * userNumPres) +
      "<br>Members in Political Party 3: " + Math.round(userPerVPBody[2] * userNumPres) +
      "<h3>Likelihood of 'yay' vote: </h3>" +
      "Political Party 1: " + userRepYaythresh +
      "<br>Political Party 2: " + userDemYaythresh +
      "<br>Political Party 3: " + userIndYaythresh +
      "<h3>Percentage of votes required for approval of bill</h3>" +
      "Approval by majority: " + userBodyPass +
      "<br> Approval by supermajority: " + userSuperThresh + "</div>";
  }


  // //supermajority Cutoff for override of presidential veto
  // userSuperThresh;
  //
  // userBodyPass;

}

function sDisplay() {

  this.setup = function() {

  }

  this.enter = function() {

    console.log("user display page");
    document.getElementById("top").innerHTML = "DEMOCRACY ENGINE SIMULATOR INPUT DISPLAY";
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "none";
    document.getElementById("page5").style.display = "none";
    document.getElementById("page6").style.display = "block";
    document.getElementById("slider-value").style.display = "none";
    document.getElementById("vote").style.display = "none";
    document.getElementById("slider-disp").style.display = "block";
  }

  this.draw = function() {
    userOutputText.innerHTML =
      "<div id = 'column1'><h3>First Legislative Chamber</h3>" +
      "Voting Members: " + userNumHouse +
      "<br>Members in Political Party 1: " + Math.round(userPerHouseBody[0] * userNumHouse) +
      "<br>Members in Political Party 2: " + Math.round(userPerHouseBody[1] * userNumHouse) +
      "<br>Members in Political Party 3: " + Math.round(userPerHouseBody[2] * userNumHouse) +
      "<h3>Second Legislative Chamber</h3>" +
      "Voting Members: " + userNumSenate +
      "<br>Members in Political Party 1: " + Math.round(userPerSenateBody[0] * userNumSenate) +
      "<br>Members in Political Party 2: " + Math.round(userPerSenateBody[1] * userNumSenate) +
      "<br>Members in Political Party 3: " + Math.round(userPerSenateBody[2] * userNumSenate) +
      "<h3>Vice Presidency</h3>" +
      "Voting Members: " + userNumVP +
      "<br>Members in Political Party 1: " + Math.round(userPerPresBody[0] * userNumVP) +
      "<br>Members in Political Party 2: " + Math.round(userPerPresBody[1] * userNumVP) +
      "<br>Members in Political Party 3: " + Math.round(userPerPresBody[2] * userNumVP) + "</div>" +
      "<div id = 'column2'><h3>Presidency</h3>" +
      "Voting Members: " + userNumPres +
      "<br>Members in Political Party 1: " + Math.round(userPerVPBody[0] * userNumPres) +
      "<br>Members in Political Party 2: " + Math.round(userPerVPBody[1] * userNumPres) +
      "<br>Members in Political Party 3: " + Math.round(userPerVPBody[2] * userNumPres) +
      "<h3>Likelihood of 'yay' vote: </h3>" +
      "Political Party 1: " + userRepYaythresh +
      "<br>Political Party 2: " + userDemYaythresh +
      "<br>Political Party 3: " + userIndYaythresh +
      "<h3>Percentage of votes required for approval of bill</h3>" +
      "Approval by majority: " + userBodyPass +
      "<br> Approval by supermajority: " + userSuperThresh + "</div>";
  }


  // //supermajority Cutoff for override of presidential veto
  // userSuperThresh;
  //
  // userBodyPass;

}
