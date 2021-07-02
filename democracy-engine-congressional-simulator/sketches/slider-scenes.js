//democracy simulater, connected to user values
function democracyEngineUser() {
  console.log("democracy userEdits: " + userEdits);
  this.setup = function() {

    textFont(helvFont);
    dWidth = windowWidth * .8;
    dHeight = windowHeight * .8;
    let canvas = createCanvas(dWidth, dHeight);
    let canvasDiv = document.getElementById('vote');
    canvas.parent(canvasDiv);
    background(bColor);
    // dispButton();
    // let fs = fullscreen();
    // fullscreen(!fs);

  }



  this.enter = function() {
    //redraws canvas with new width and height when user simulator restarts
    if (reconfigBool == true) {
      // windowResized();
      dWidth = windowWidth * .8;
      dHeight = windowHeight * .8;
      canvas = createCanvas(dWidth, dHeight);
      let canvasDiv = document.getElementById('vote');
      canvas.parent(canvasDiv);
      reconfigBool = false;
    }

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
    document.getElementById("sim-info").style.display = "none";

    console.log(mgr.isCurrent(democracyEngineUser));

  }

  this.draw = function() {

    rot += 0.5;

    currentCongLogic();
  }

  //Logic below is setup for user congressional configuration
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
    //AB: small circle to cover rotating image after
    if (count == numCon - 2) {
      ellipse(0, 0, 160, 160);
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

  //Function to store yay and nay votes into array
  function storeBodyVotes() {
    votingBodyCounts[bodyCount] = [yay, nay];
    let currentBodyYay = votingBodyCounts[bodyCount][0];
    let currentBodyNay = votingBodyCounts[bodyCount][1];


    //AB for error checking
    // print(bodyLabel + " yay votes: " + currentBodyYay + " nay votes: " + currentBodyNay);

  }

  //Draws all votes as squares
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
    else if (countR >= numDem && countR < numDem + numRep) {
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

  //appearance of squares changes to outlines when no vote is required
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

  //Stop vote logic before changing appearance
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

  //Logic for all the final results
  function resultLogic() {

    //padding & offsets for text display
    votePadX = dWidth / 4;
    votePadY = dHeight / 4;
    voteOutcomePosY = votePadY * 3;

    // If voting body == 1 and yay == 50%
    // then vice president votes
    // console.log("body pass yay: " + yay + "body pass cutoff: " + numCon * perPass);
    // console.log(numCon + " " + perPass);
    // console.log("body pass yay: " + yay + "body superthresh cutoff: " + numCon * superThresh);
    // console.log(numCon + " " + superThresh);

    if (yay >= numCon * superThresh) {

      bodyPass[bodyCount] = true;
      superThreshIndex[bodyCount] = true;
      //AB logic if senate initiates tie breaker
    } else if (yay == numCon * perPass && bodyLabel == "SENATE") {
      bodyPass[bodyCount] = true;
      vpVote = true;
    } else if (yay > numCon * perPass) {
      bodyPass[bodyCount] = true;
      superThreshIndex[bodyCount] = false;
    } else {
      bodyPass[bodyCount] = false;
      superThreshIndex[bodyCount] = false;
    }
    //Adds one to the count of how many bodies have voted and enters into user input state (buttons) if the vote is done.
    if (bodyCount < numBodies) {
      nextBody();
      print("new body count: " + bodyCount);
    }

    if (bodyCount >= numBodies) {
      finalDisplay();
      print('Final Stage');
    }
    endBody = 1;
  }

  //Display of the final reults
  function finalDisplay() {

    let currentBodyLabel;

    let columnAmount = numBodies;
    let rowAmount = 4;

    let padY = 20;
    let padX = 20;
    let dispW = (dWidth / columnAmount);
    let dispH = dHeight;

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
              textSize(22);
              text(currentBodyLabel, (i) * dispW + padX, padY, dispW, dispH);
              textAlign(LEFT);

              if (stopVoteArr[i] == false) {
                textSize(20);
                text("\n\n\nVOTES \n", (i) * dispW + padX, padY, dispW, dispH);
                textSize(16);
                text("\n\n\n\n\nYES: " + votingBodyCounts[i][0] + "\nNO: " + votingBodyCounts[i][1] + "\n ", (i) * dispW + padX, padY);


                // print("President: \n\n\n\nYES: " + votingBodyCounts[3][0] + "\nNO: " + votingBodyCounts[3][1]);
                //president veto/super

                if (bodyPass[0] === true && bodyPass[1] === true && bodyPass[3] === false) {
                  textSize(16);
                  if (superThreshIndex[0] === true && superThreshIndex[1] === true) {
                    text('\n\n\nVETO OVERRIDE BY SUPERMAJORITY IN ALL LEGISLATIVE CHAMBERS', (i) * dispW + padX, dHeight / 4, dispW - padX, dispH);
                  } else {
                    text('\n\n\nPRESIDENTIAL VETO: BILL IS NOT APPROVED', (i) * dispW + padX, dHeight / 4, dispW - padX, dispH);
                  }
                } else if (bodyPass[i] == true &&
                  superThreshIndex[0] == false ||
                  superThreshIndex[1] == false) {
                  text('\n\n\nBILL IS APPROVED', (i) * dispW + padX, dHeight / 4, dispW - padX, dispH);
                } else if (bodyPass[i] == false) {
                  text('\n\n\nBILL IS NOT APPROVED ', (i) * dispW + padX, dHeight / 4, dispW - padX, dispH);
                }
              } else {
                textSize(16);
                if (bodyPass[0] == false || bodyPass[1] == false) {
                  // dispY = dispY + (dHeight / 5);
                  text('\n\n\n\nBILL IS NOT APPROVED BY ALL CHAMBERS: PRESIDENT DOES NOT VOTE', (i) * dispW + padX, padY, dispW - padX, dispH);
                } else {
                  textSize(20);
                  text('\n\n\n\nDOES NOT VOTE', (i) * dispW + padX, padY, dispW - padX, dispH);
                }
              }

            } else if (currentBodyLabel == 'VICE PRESIDENCY') {
              textSize(22);
              text(currentBodyLabel, i * dispW + padX, padY, dispW, dispH);
              if (stopVoteArr[i] == false && vpVote == true) {
                textSize(20);
                text("\n\n\nVOTES \n", i * dispW + padX, padY, dispW, dispH);
                textSize(16);
                text("\n\n\n\n\nYES: " + votingBodyCounts[i][0] + "\nNO: " + votingBodyCounts[i][1] + "\n ", i * dispW + padX, padY);

                if (bodyPass[0] == false || bodyPass[1] == false) {
                  textSize(16);
                  text('\n\n\n\nBILL IS NOT APPROVED BY ALL CHAMBERS: NO VICE PRESIDENTIAL VOTE', i * dispW + padX, (dHeight / 4), dispW - padX, dispH);
                } else if (bodyPass[0] == true && bodyPass[1] == true && vpVote == true) {
                  if (bodyPass[i] == false) {
                    text('\n\n\nBILL IS NOT APPROVED', (i) * dispW + padX, dHeight / 4, dispW - padX, dispH);
                  } else if (bodyPass[i] == true) {
                    text('\n\n\nBILL IS APPROVED', (i) * dispW + padX, dHeight / 4, dispW - padX, dispH);
                  }
                }

              } else {
                textSize(20);
                text('\n\n\nDOES NOT VOTE', i * dispW + padX, padY, dispW - padX, dispH);
              }

            } else {
              textSize(22);
              text(currentBodyLabel, i * dispW + padX, padY, dispW - padX, dispH);
              if (stopVoteArr[i] == false) {
                textSize(20);
                text("\n\n\nVOTES \n", i * dispW + padX, padY, dispW - padX, dispH);
                textSize(16);
                text("\n\n\n\n\nYES: " + votingBodyCounts[i][0] + "\nNO: " + votingBodyCounts[i][1] + "\n ", i * dispW + padX, padY);
                // superthresh
                if (bodyPass[i] == true && superThreshIndex[i] == true) {
                  text('\n\n\nBILL IS APPROVED WITH SUPERMAJORITY', i * dispW + padX, dHeight / 4, dispW - padX, dispH);
                } else if (currentBodyLabel == 'SENATE' && bodyPass[0] == true && bodyPass[1] == true && vpVote == true) {
                  text('\n\n\nTIE-BREAKER VOTE INITIATED', i * dispW + padX, dHeight / 4, dispW - padX, dispH);
                } else if (bodyPass[i] == false) {
                  text('\n\n\nBILL IS NOT APPROVED', i * dispW + padX, dHeight / 4, dispW - padX, dispH);
                } else if (bodyPass[i] == true && superThreshIndex[i] == false) {
                  text('\n\n\nBILL IS APPROVED', i * dispW + padX, dHeight / 4, dispW - padX, dispH);
                }
              } else {
                textSize(20);
                text('\n\n\nDOES NOT VOTE', i * dispW + padX, padY, dispW - padX, dispH);
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

  function nextBody() {
    bodyCount++;
  }

  //Once Bill Pass result has been calculated users can enter in their own variables to reconfigure congress or recalculate the vote with the same parameters
  function userInput() {

    recalBtn = createButton('RECALCULATE VOTE');
    recalBtn.id('recal-btn');
    recalBtn.class('buttons');
    recalBtn.mousePressed(inputVar);

    buttonRC = createButton('RECONFIGURE GOVERNMENT');
    buttonRC.id('rec-btn');
    buttonRC.class('buttons');
    buttonRC.mousePressed(nextScene);

    buttonRes = createButton('RUN DEFAULT SETTINGS');
    buttonRes.id('res-btn');
    buttonRes.class('buttons');
    buttonRes.mousePressed(userRecount);

    emailBtn = createButton('EMAIL YOUR RESULTS');
    emailBtn.id('email-btn');
    emailBtn.class('buttons');
    emailBtn.mousePressed(emailFunc);

    let buttonDiv = document.getElementById('button-div');
    emailBtn.parent(buttonDiv);
    buttonRC.parent(buttonDiv);
    buttonRes.parent(buttonDiv);
    recalBtn.parent(buttonDiv);

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

//original democracy simulater, connected to current values of 117th congress
function democracyEngineOrigin() {

  console.log("democracy userEdits: " + userEdits);

  this.setup = function() {
    textFont(helvFont);
    dWidth = windowWidth * .8;
    dHeight = windowHeight * .8;
    let canvas = createCanvas(dWidth, dHeight);
    let canvasDiv = document.getElementById('vote');
    canvas.parent(canvasDiv);

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

  this.draw = function() {

    rot += 0.5;

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

    //Logic for VP if Senate needs a tiebreaker
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

    // Makes sure we are not over our number of congressional body numCon and readjusts skip if too big
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
    // rectMode(CORNER);
    noStroke();
    fill(bColor);

    translate(offSet / 2, dHeight / 2);
    ellipseMode(CENTER);
    ellipse(0, 0, 160, 160);
    rotate(PI / 180 * rot);
    imageMode(CENTER);
    image(loadingImage, 0, 0, 150, 150);
    //AB: small square to cover rotating image after
    if (count == numCon - 2) {
      ellipse(0, 0, 160, 160);
    }
    pop();



  }

  //Start the body vote
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

  //Stores yay and nay votes into array
  function storeBodyVotes() {
    votingBodyCounts[bodyCount] = [yay, nay];
    let currentBodyYay = votingBodyCounts[bodyCount][0];
    let currentBodyNay = votingBodyCounts[bodyCount][1];


    //AB for error checking
    // print(bodyLabel + " yay votes: " + currentBodyYay + " nay votes: " + currentBodyNay);

  }

  //Diplays Voting Results
  function drawRect() {
    // Square is Drawn for Each Vote
    rectMode(CENTER);
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

  //specific logic for VP and Pres vote boxes stacked
    if (bodyLabel == 'VICE PRESIDENT') {
      y = y + (skip*.9);
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

  //Logic in which changes the voting body's squares to outlines when no vote is required
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

  //Determines the voting outcome of the voting results
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

  //Displays the voting results
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
              textSize(22);
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
                    text('\nVETO OVERRIDE BY SUPERMAJORITY IN ALL LEGISLATIVE CHAMBERS', (i - 1) * dispW + padX, dHeight / 4, dispW - padX, dispH);
                  } else {
                    text('\nPRESIDENTIAL VETO: BILL IS NOT APPROVED ', (i - 1) * dispW + padX, dHeight / 4, dispW - padX, dispH);
                  }
                } else if (bodyPass[i] == true &&
                  superThreshIndex[0] == false ||
                  superThreshIndex[1] == false) {
                  text('\nBILL IS APPROVED', (i - 1) * dispW + padX, dHeight / 4, dispW - padX, dispH);
                } else if (bodyPass[i] == false) {
                  text('\nBILL IS NOT APPROVED ', (i - 1) * dispW + padX, dHeight / 4, dispW - padX, dispH);
                }
              } else {

                if (bodyPass[0] == false || bodyPass[1] == false) {
                  textSize(16);
                  text('\n\nBILL IS NOT APPROVED BY ALL CHAMBERS: PRESIDENT DOES NOT VOTE', (i - 1) * dispW + padX, padY, dispW - padX, dispH);
                } else {
                  textSize(20);
                  text('\n\nDOES NOT VOTE', (i - 1) * dispW + padX, padY, dispW - padX, dispH);
                }
              }

            } else if (currentBodyLabel == 'VICE PRESIDENCY') {
              textSize(22);
              text(currentBodyLabel, i * dispW + padX, dHeight / 2, dispW, dispH);
              if (stopVoteArr[i] == false && vpVote == true) {
                textSize(20);
                text("\n\nVOTES \n", i * dispW + padX, dHeight / 2, dispW, dispH);
                textSize(16);
                text("\n\n\n\nYES: " + votingBodyCounts[i][0] + "\nNO: " + votingBodyCounts[i][1] + "\n ", i * dispW + padX, dHeight / 2, dispW - padX, dispH);

                if (bodyPass[0] == false || bodyPass[1] == false) {
                  text('\n\n\nBILL IS NOT APPROVED BY ALL CHAMBERS: NO VICE PRESIDENTIAL VOTE', i * dispW + padX, dHeight * (3 / 4), dispW - padX, dispH);
                } else if (bodyPass[0] == true && bodyPass[1] == true && vpVote == true) {
                  if (bodyPass[i] == false) {
                    text('\nBILL IS NOT APPROVED', (i) * dispW + padX, dHeight * (3 / 4), dispW - padX, dispH);
                  } else if (bodyPass[i] == true) {
                    text('\nBILL IS APPROVED', (i) * dispW + padX, dHeight * (3 / 4), dispW - padX, dispH);
                  }
                }

              } else {
                textSize(20);
                text('\n\nDOES NOT VOTE', i * dispW + padX, dHeight / 2, dispW - padX, dispH);
              }

            } else {
              textSize(22);
              text(currentBodyLabel, i * dispW + padX, padY, dispW - padX, dispH);
              if (stopVoteArr[i] == false) {
                textSize(20);
                text("\n\nVOTES \n", i * dispW + padX, padY, dispW - padX, dispH);
                textSize(16);
                text("\n\n\n\nYES: " + votingBodyCounts[i][0] + "\nNO: " + votingBodyCounts[i][1] + "\n ", i * dispW + padX, padY, dispW, dispH);
                // superthresh
                if (bodyPass[i] == true && superThreshIndex[i] == true) {
                  text('\nBILL IS APPROVED WITH SUPERMAJORITY', i * dispW + padX, dHeight / 4, dispW - padX, dispH);
                } else if (currentBodyLabel == 'SENATE' && bodyPass[0] == true && bodyPass[1] == true && vpVote == true) {
                  text('\nTIE-BREAKER VOTE INITIATED', i * dispW + padX, dHeight / 4, dispW - padX, dispH);
                } else if (bodyPass[i] == false) {
                  text('\nBILL IS NOT APPROVED', i * dispW + padX, dHeight / 4, dispW - padX, dispH);
                } else if (bodyPass[i] == true && superThreshIndex[i] == false) {
                  text('\nBILL IS APPROVED', i * dispW + padX, dHeight / 4, dispW - padX, dispH);
                }
              } else {
                textSize(20);
                text('\n\nDOES NOT VOTE', i * dispW + padX, padY, dispW - padX, dispH);
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

  //changes the text on the HTML body for final voting decision
  function changeText(text) {
    document.getElementById("result").innerHTML = text;
  }


  function nextBody() {
    bodyCount++;
  }

  //Once Bill Pass result has been calculated users can enter in their own variables to reconfigure congress or recalculate the vote with the same parameters
  function userInput() {

    bodyCount = numBodies;

    buttonDef = createButton('DISPLAY DEFAULT SETTINGS');
    buttonDef.id('def-btn');
    buttonDef.mousePressed(defResult);

    buttonRes = createButton('RECALCULATE VOTE');
    buttonRes.id('res-btn');
    buttonRes.mousePressed(userRecount);

    buttonRC = createButton('RECONFIGURE GOVERNMENT');
    buttonRC.id('rec-btn');
    buttonRC.mousePressed(nextScene);

    let buttonDiv = document.getElementById('button-div');
    buttonRC.parent(buttonDiv);
    buttonRes.parent(buttonDiv);
    buttonDef.parent(buttonDiv);
    // buttonDiv.center("horizontal");
  }

  //Reloads the page if user would like to reset values
  function userRecount() {
    location.reload();
    //reset();
  }


}

//user input page for for amount of members in each legislative body
function sLegislative() {

  var slider1 = document.getElementById('slider1');
  var slider2 = document.getElementById('slider2');
  var slider3 = document.getElementById('slider3');
  var slider4 = document.getElementById('slider4');
  var curNumHouse = parseInt(numHouse);
  var curNumSen = parseInt(numSenate);
  var curNumVP = parseInt(numVP);
  var curNumPres = parseInt(numPres);


  this.setup = function() {
    textSize(15);
    noStroke();

  }

  this.enter = function() {

    console.log("1st Slider Page");
    document.getElementById("page1").style.display = "block";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "none";
    document.getElementById("page5").style.display = "none";
    document.getElementById("page6").style.display = "none";
    document.getElementById("slider-value").style.display = "none";
    document.getElementById("vote").style.display = "none";
    document.getElementById("slider-disp").style.display = "none";

    background(bColor);
    document.body.style.backgroundColor = bColor;
    buttonRC.remove();
    buttonRes.remove();
    buttonDef.remove();
    if (userEdits == true) {
      dispBtn.remove();
      recalBtn.remove();
      emailBtn.remove();
    }

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
    console.log("user edits boool: " + userEdits);
    if (userEdits == true) {
      sliderVals();

    } else {
      createSlider();
      sliderVals();
    }

    function createSlider() {

      noUiSlider.create(slider1, {
        start: curNumHouse,
        range: {
          'min': [1],
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

      noUiSlider.create(slider2, {
        start: curNumSen,
        range: {
          'min': [1],
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

      noUiSlider.create(slider3, {
        start: curNumVP,
        range: {
          'min': [1],
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


      noUiSlider.create(slider4, {
        start: curNumPres,
        range: {
          'min': [1],
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


    // COME BACK HERE FOR CODE REVIEW

    function sliderVals() {
      //connecting values to html, each tab value is stored in an array
      // var rangeSliderValueElement = document.getElementById('slider-value');

      slider1.noUiSlider.on('update', function(values, handle) {
        userNumHouse = values[0]
        // rangeSliderValueElement.innerHTML = userNumHouse + " " + userNumSenate + " " + userNumPres + " " + userNumVP;
      });
      slider2.noUiSlider.on('update', function(values, handle) {
        userNumSenate = values[0];
        // rangeSliderValueElement.innerHTML = userNumHouse + " " + userNumSenate + " " + userNumPres + " " + userNumVP;
      });
      slider3.noUiSlider.on('update', function(values, handle) {
        userNumVP = values[0];
        // rangeSliderValueElement.innerHTML = userNumHouse + " " + userNumSenate + " " + userNumPres + " " + userNumVP;
      });
      slider4.noUiSlider.on('update', function(values, handle) {
        userNumPres = values[0];
        // rangeSliderValueElement.innerHTML = userNumHouse + " " + userNumSenate + " " + userNumPres + " " + userNumVP;
      });

    }
  }

  function button() {
    var sidePad = 20;

    nextButton = createButton('NEXT');
    nextButton.id("next-btn");
    //position of next button is handled in css
    nextButton.mousePressed(nextScene);
  }
}

//user input page for number of parties, current maximum of 3
function sParties() {
  var slider5 = document.getElementById('slider5');

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
    document.getElementById("slider-value").style.display = "none";
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
      // if (userNumParties == parseInt(1)) {
      //   userEditCount += 1;
      //   console.log("one party count: " + userEditCount);
      // }
    }

    function createSlider() {


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
      // var rangeSliderValueElement = document.getElementById('slider-value');

      slider5.noUiSlider.on('update', function(values, handle) {
        userNumParties = values[0];
        // rangeSliderValueElement.innerHTML = userNumParties;
        if (userNumParties <= 1) {
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

//user input page for number of members in each party
function sMembers() {

  var slider6 = document.getElementById('slider6');
  var slider7 = document.getElementById('slider7');
  var slider8 = document.getElementById('slider8');
  var slider9 = document.getElementById('slider9');

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

  function mouseOver(slider, value) {

    slider.onmouseover = logMouseOver;
    slider.onmouseout = logMouseOut;

    function logMouseOver() {
      value.style.display = "block";
    }

    function logMouseOut() {
      value.style.display = "none";
    }
  }

  function sliders() {
    if (userEdits == true) {
      //when user chooses 1 party the first time, no sliders get created.
      //The second round needs to create the sliders.
      console.log("User Edit Count: " + userEditCount + " One Party Chosen Previously?: " + onePartyBool);
      if (userEditCount == 1 && onePartyBool == true) {
        createSlider();
        // sliderVals();
      }
      // makes it possible to choose different number of parties each time around
      else {
        slider6.noUiSlider.destroy();
        slider7.noUiSlider.destroy();
        slider8.noUiSlider.destroy();
        slider9.noUiSlider.destroy();
        createSlider();
      }
      sliderVals();
    } else {
      createSlider();
      sliderVals();
    }

    function createSlider() {
      // NOui slider
      userNumHouse = parseInt(userNumHouse);
      userNumPres = parseInt(userNumPres);
      userNumVP = parseInt(userNumVP);
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
          'min': [0],
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
          'min': [0],
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
          'min': [0],
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
          'min': [0],
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

      var handle6 = slider6.querySelectorAll('.noUi-handle');
      var handle7 = slider7.querySelectorAll('.noUi-handle');
      var handle8 = slider8.querySelectorAll('.noUi-handle');
      var handle9 = slider9.querySelectorAll('.noUi-handle');

      var value1 = document.getElementById('value-1');
      var value2 = document.getElementById('value-2');
      var value3 = document.getElementById('value-3');
      var value4 = document.getElementById('value-4');

      // var rangeSliderValueElement = document.getElementById('slider-value');

      var classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];

      for (var i = 0; i < handle6.length; i++) {
        handle6[i].classList.add(classes[i]);

      }
      for (var i = 0; i < handle7.length; i++) {
        handle7[i].classList.add(classes[i]);

      }

      for (var i = 0; i < handle8.length; i++) {
        handle8[i].classList.add(classes[i]);
      }

      for (var i = 0; i < handle9.length; i++) {
        handle9[i].classList.add(classes[i]);
      }



      if (userNumParties > 1) {
        //connecting values to html, each tab value is stored in an array

        userPerHouseBody = [];
        var numPerHouseBody = [];
        slider6.noUiSlider.on('update', function(values, handle) {
          for (var i = 0; i <= values.length; i++) {
            if (i == 0) {
              userPerHouseBody[i] = values[i];
            } else if (i == values.length) {
              userPerHouseBody[i] = userNumHouse - values[i - 1];
            } else {
              userPerHouseBody[i] = values[i] - values[i - 1];
            }
            numPerHouseBody[i] = userPerHouseBody[i];
            housePercentage = userPerHouseBody[i] / userNumHouse;
            housePercentage = roundNum(housePercentage, 2);
            userPerHouseBody[i] = housePercentage;
          }
          console.log();


          // made for up to three political parties
          if (userPerHouseBody.length == 3) {
            value1.innerHTML = "Party A: " + numPerHouseBody[0] + " Party B: " + numPerHouseBody[1] + " Party C: " + numPerHouseBody[2];
          } else if (userPerHouseBody.length == 2) {
            // rangeSliderValueElement.innerHTML = userPerHouseBody[0] + " " + userPerHouseBody[1];
            value1.innerHTML = "Party A: " + numPerHouseBody[0] + " Party B: " + numPerHouseBody[1];
          } else {
            value1.innerHTML = "Party A: " + numPerHouseBody[0];
          }
          mouseOver(slider6, value1);
        });

        userPerSenateBody = [];
        var numPerSenateBody = [];
        slider7.noUiSlider.on('update', function(values, handle) {
          for (var i = 0; i <= values.length; i++) {
            if (i == 0) {
              userPerSenateBody[i] = values[i];
            } else if (i == values.length) {
              userPerSenateBody[i] = userNumSenate - values[i - 1];
            } else {
              userPerSenateBody[i] = values[i] - values[i - 1];
            }
            numPerSenateBody[i] = userPerSenateBody[i];
            senPercentage = userPerSenateBody[i] / userNumSenate;
            senPercentage = roundNum(senPercentage, 2);
            userPerSenateBody[i] = senPercentage;
          }

          //made for up to three political parties
          if (userPerSenateBody.length == 3) {
            value2.innerHTML = "Party A: " + numPerSenateBody[0] + " Party B: " + numPerSenateBody[1] + " Party C: " + numPerSenateBody[2];
          } else if (userPerSenateBody.length == 2) {
            value2.innerHTML = "Party A: " + numPerSenateBody[0] + " Party B: " + numPerSenateBody[1];
          } else {
            value2.innerHTML = "Party A: " + numPerSenateBody[0];
          }
          mouseOver(slider7, value2);
        });


        userPerVPBody = [];
        var numPerVPBody = [];
        slider8.noUiSlider.on('update', function(values, handle) {
          for (var i = 0; i <= values.length; i++) {
            if (i == 0) {
              userPerVPBody[i] = values[i];
            } else if (i == values.length) {
              userPerVPBody[i] = userNumVP - values[i - 1];
            } else {
              userPerVPBody[i] = values[i] - values[i - 1];
            }
            numPerVPBody[i] = userPerVPBody[i];
            vpPercentage = userPerVPBody[i] / userNumVP;
            vpPercentage = roundNum(vpPercentage, 2);
            userPerVPBody[i] = vpPercentage;
          }


          if (userPerVPBody.length == 3) {
            value3.innerHTML = "Party A: " + numPerVPBody[0] + " Party B: " + numPerVPBody[1] + " Party C: " + numPerVPBody[2];
          } else if (userPerVPBody.length == 2) {
            value3.innerHTML = "Party A: " + numPerVPBody[0] + " Party B: " + numPerVPBody[1];
          } else {
            value3.innerHTML = "Party A: " + numPerVPBody[0];
          }
          mouseOver(slider8, value3);


        });

        userPerPresBody = [];
        var numPerPresBody = [];
        slider9.noUiSlider.on('update', function(values, handle) {
          for (var i = 0; i <= values.length; i++) {
            if (i == 0) {
              userPerPresBody[i] = values[i];
            } else if (i == values.length) {
              userPerPresBody[i] = userNumPres - values[i - 1];
            } else {
              userPerPresBody[i] = values[i] - values[i - 1];
            }
            numPerPresBody[i] = userPerPresBody[i];
            presPercentage = userPerPresBody[i] / userNumPres;
            presPercentage = roundNum(presPercentage, 2);
            userPerPresBody[i] = presPercentage;
          }
          if (userPerPresBody.length == 3) {
            value4.innerHTML = "Party A: " + numPerPresBody[0] + " Party B: " + numPerPresBody[1] + " Party C: " + numPerPresBody[2];
          } else if (userPerPresBody.length == 2) {
            value4.innerHTML = "Party A: " + numPerPresBody[0] + " Party B: " + numPerPresBody[1];
          } else {
            value4.innerHTML = "Party A: " + numPerPresBody[0];
          }
          mouseOver(slider9, value4);

        });
      }
    }
  }
}

//user input page for percentage of votes required for bill approval
function sBodyPass() {

  var currSuperThresh = parseFloat(superThresh * 100);
  var currPerPass = parseFloat(perPass * 100);

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
    document.getElementById("slider-value").style.display = "none";
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
        start: currPerPass,
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
        step: 1,
        format: wNumb({
          decimals: 0,
          suffix: '%'
        })
      });

      noUiSlider.create(slider11, {
        start: currSuperThresh,
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
        step: 1,
        format: wNumb({
          decimals: 0,
          suffix: '%'
        })
      });
    }


    function sliderVals() {
      //connecting values to html, each tab value is stored in an array
      // var rangeSliderValueElement = document.getElementById('slider-value');

      userBodyPass = "";
      userSuperThresh = "";

      slider10.noUiSlider.on('update', function(values, handle) {
        userBodyPass = values[0]
        // rangeSliderValueElement.innerHTML = userBodyPass + " " + userSuperThresh;

      });
      slider11.noUiSlider.on('update', function(values, handle) {
        userSuperThresh = values[0];
        // rangeSliderValueElement.innerHTML = userBodyPass + " " + userSuperThresh;

      });

    }


  }

}

//user input page for probabily of a yes vote
function sYesVotes() {
  var curDemYaythresh = parseInt(demYaythresh * 100);
  var curRepYaythresh = parseInt(repYaythresh * 100);
  var curIndYaythresh = parseInt(indYaythresh * 100);

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
    document.getElementById("slider-value").style.display = "none";
    checkParties();
    sliders();

  }

  this.draw = function() {}


  function checkParties() {
    if (userNumParties == 1) {
      document.getElementById("slider12").style.display = "block";
      document.getElementById("slider13").style.display = "none";
      document.getElementById("slider14").style.display = "none";

    } else if (userNumParties == 2) {
      document.getElementById("slider12").style.display = "block";
      document.getElementById("slider13").style.display = "block";
      document.getElementById("slider14").style.display = "none";
    } else {
      document.getElementById("slider12").style.display = "block";
      document.getElementById("slider13").style.display = "block";
      document.getElementById("slider14").style.display = "block";

    }
  }

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
        start: curDemYaythresh,
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
        step: 1,
        format: wNumb({
          decimals: 0,
          suffix: '%'
        })
      });

      noUiSlider.create(slider13, {
        start: curRepYaythresh,
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
        step: 1,
        format: wNumb({
          decimals: 0,
          suffix: '%'
        })
      });

      noUiSlider.create(slider14, {
        start: curIndYaythresh,
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
        step: 1,
        format: wNumb({
          decimals: 0,
          suffix: '%'
        })
      });

    }

    function sliderVals() {
      //connecting values to html, each tab value is stored in an array
      // var rangeSliderValueElement = document.getElementById('slider-value');

      userDemYaythresh = "";
      userRepYaythresh = "";
      userIndYaythresh = "";

      slider12.noUiSlider.on('update', function(values, handle) {
        userDemYaythresh = values[0];
        // rangeSliderValueElement.innerHTML = userDemYaythresh + " " + userRepYaythresh + " " + userIndYaythresh;

      });
      if (userNumParties >= 2) {
        slider13.noUiSlider.on('update', function(values, handle) {
          userRepYaythresh = values[0];
          // rangeSliderValueElement.innerHTML = userDemYaythresh + " " + userRepYaythresh + " " + userIndYaythresh;

        });
      } else {
        userRepYaythresh = 0 + "%";
      }

      if (userNumParties == 3) {
        slider14.noUiSlider.on('update', function(values, handle) {
          userIndYaythresh = values[0];
          // rangeSliderValueElement.innerHTML = userDemYaythresh + " " + userRepYaythresh + " " + userIndYaythresh;

        });
      } else {
        userIndYaythresh = 0 + "%";
      }


    }

  }


}

//page showing all of user inputs
function sResults() {

  this.setup = function() {

    userOutputText = document.getElementById('slider-disp');

  }

  this.enter = function() {
    userEditCount++;
    console.log("user edit count: " + userEditCount);
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
    document.getElementById("sim-info").style.display = "none";
    if (userNumParties == 2) {
      userPerHouseBody[2] = 0.0;
      userPerSenateBody[2] = 0.0;
      userPerVPBody[2] = 0.0;
      userPerPresBody[2] = 0.0;
    } else if (userNumParties == 1) {
      userPerHouseBody[1] = 0.0;
      userPerHouseBody[2] = 0.0;
      userPerSenateBody[1] = 0.0;
      userPerSenateBody[2] = 0.0;
      userPerVPBody[1] = 0.0;
      userPerVPBody[2] = 0.0;
      userPerPresBody[1] = 0.0;
      userPerPresBody[2] = 0.0;
    }
    inputTxt();
  }

  this.draw = function() {

  }

  function inputTxt() {

    userOutputText.innerHTML =
      "<div><h3>First Legislative Chamber</h3>" +
      "<p>Voting Members: " + userNumHouse +
      "<br>Members in Political Party A: " + Math.round(userPerHouseBody[0] * userNumHouse) +
      "<br>Members in Political Party B: " + Math.round(userPerHouseBody[1] * userNumHouse) +
      "<br>Members in Political Party C: " + Math.round(userPerHouseBody[2] * userNumHouse) +
      "</p><h3>Second Legislative Chamber</h3>" +
      "<p>Voting Members: " + userNumSenate +
      "<br>Members in Political Party A: " + Math.round(userPerSenateBody[0] * userNumSenate) +
      "<br>Members in Political Party B: " + Math.round(userPerSenateBody[1] * userNumSenate) +
      "<br>Members in Political Party C: " + Math.round(userPerSenateBody[2] * userNumSenate) +
      "</p><h3>Vice Presidency</h3>" +
      "<p>Voting Members: " + userNumVP +
      "<br>Members in Political Party A: " + Math.round(userPerPresBody[0] * userNumVP) +
      "<br>Members in Political Party B: " + Math.round(userPerPresBody[1] * userNumVP) +
      "<br>Members in Political Party C: " + Math.round(userPerPresBody[2] * userNumVP) +
      "</p><h3>Presidency</h3>" +
      "<p>Voting Members: " + userNumPres +
      "<br>Members in Political Party A: " + Math.round(userPerVPBody[0] * userNumPres) +
      "<br>Members in Political Party B: " + Math.round(userPerVPBody[1] * userNumPres) +
      "<br>Members in Political Party C: " + Math.round(userPerVPBody[2] * userNumPres) +
      "</p><h3>Likelihood of Yes Vote: </h3>" +
      "<p>Political Party A: " + userDemYaythresh +
      "<br>Political Party B: " + userRepYaythresh +
      "<br>Political Party C: " + userIndYaythresh +
      "</p><h3>Percentage of votes required for approval of bill</h3>" +
      "<p>Approval By Majority: " + userBodyPass +
      "<br> Approval By Supermajority: " + userSuperThresh + "</div></p>";

    if (userEditCount >= 2) {
      nextButton.remove();
      recalBtn = createButton('RECALCULATE VOTE');
      recalBtn.id('recal-btn');
      recalBtn.class('buttons');
      let buttonDiv = document.getElementById('button-div');
      recalBtn.parent(buttonDiv);

      // recalBtn.position(windowWidth - recalBtn.width - buttonRes.width - buttonRC.width - 20, windowHeight - 45);
      recalBtn.mousePressed(inputVar);
    }
  }




  // //supermajority Cutoff for override of presidential veto
  // userSuperThresh;
  //
  // userBodyPass;

}

//explanation text before user goes back into simulator
function sInfo() {

  this.setup = function() {
    simInfoText = document.getElementById('sim-info');
  }

  this.enter = function() {
    console.log("simulator info page");
    document.getElementById("top").innerHTML = " ";
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "none";
    document.getElementById("page5").style.display = "none";
    document.getElementById("page6").style.display = "none";
    document.getElementById("slider-value").style.display = "none";
    document.getElementById("vote").style.display = "none";
    document.getElementById("slider-disp").style.display = "none";
    document.getElementById("sim-info").style.display = "block";
    nextButton.remove();
    inputTxt();
    var delayInMilliseconds = 13000; //15 seconds

    setTimeout(function() {
      inputVar();
    }, delayInMilliseconds);


  }

  this.draw = function() {

  }

  function inputTxt() {
    simInfoText.innerHTML = "<div id='page-container'><div id='content-wrap'><div class='body-text'><p>The simulator will now run through one legislative cycle with the provided inputs. The user will then have the option of running the simulator through additional legislative cycles with the same values or changing the parameters by clicking on the 'Reconfigure Government' button.</p></div></div></div>";

  }


}

//display of user inputs while in simulator
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
    document.getElementById("sim-info").style.display = "none";
    inputTxt();
  }

  this.draw = function() {


  }

  function inputTxt() {
    userOutputText.innerHTML =
      "<div><h3>First Legislative Chamber</h3>" +
      "<p>Voting Members: " + userNumHouse +
      "<br>Members in Political Party A: " + Math.round(userPerHouseBody[0] * userNumHouse) +
      "<br>Members in Political Party B: " + Math.round(userPerHouseBody[1] * userNumHouse) +
      "<br>Members in Political Party C: " + Math.round(userPerHouseBody[2] * userNumHouse) +
      "</p><h3>Second Legislative Chamber</h3>" +
      "<p>Voting Members: " + userNumSenate +
      "<br>Members in Political Party A: " + Math.round(userPerSenateBody[0] * userNumSenate) +
      "<br>Members in Political Party B: " + Math.round(userPerSenateBody[1] * userNumSenate) +
      "<br>Members in Political Party C: " + Math.round(userPerSenateBody[2] * userNumSenate) +
      "</p><h3>Vice Presidency</h3>" +
      "<p>Voting Members: " + userNumVP +
      "<br>Members in Political Party A: " + Math.round(userPerPresBody[0] * userNumVP) +
      "<br>Members in Political Party B: " + Math.round(userPerPresBody[1] * userNumVP) +
      "<br>Members in Political Party C: " + Math.round(userPerPresBody[2] * userNumVP) +
      "</p><h3>Presidency</h3>" +
      "<p>Voting Members: " + userNumPres +
      "<br>Members in Political Party A: " + Math.round(userPerVPBody[0] * userNumPres) +
      "<br>Members in Political Party B: " + Math.round(userPerVPBody[1] * userNumPres) +
      "<br>Members in Political Party C: " + Math.round(userPerVPBody[2] * userNumPres) +
      "</p><h3>Likelihood of Yes Vote: </h3>" +
      "<p>Political Party A: " + userDemYaythresh +
      "<br>Political Party B: " + userRepYaythresh +
      "<br>Political Party C: " + userIndYaythresh +
      "</p><h3>Percentage of votes required for approval of bill</h3>" +
      "<p>Approval By Majority: " + userBodyPass +
      "<br> Approval By Supermajority: " + userSuperThresh + "</div></p>";
  }


  // //supermajority Cutoff for override of presidential veto
  // userSuperThresh;
  //
  // userBodyPass;

}

//shows default congress settings at end of original simulator
function sDefault() {

  this.setup = function() {
    userOutputText = document.getElementById('slider-disp');
  }

  this.enter = function() {

    console.log("default settings display page");
    document.getElementById("top").innerHTML = " ";
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "none";
    document.getElementById("page5").style.display = "none";
    document.getElementById("page6").style.display = "none";
    document.getElementById("slider-value").style.display = "none";
    document.getElementById("vote").style.display = "none";
    document.getElementById("slider-disp").style.display = "block";
    document.getElementById("sim-info").style.display = "none";
    inputTxt();
  }

  this.draw = function() {


  }

  function inputTxt() {
    userOutputText.innerHTML =
      "<div><h3>House</h3>" +
      "<p>Voting Members: " + numHouse +
      "<br>Members in Democrat Party: " + Math.round(perDemHouse * numHouse) +
      "<br>Members in Independent Party: " + Math.round(perIndHouse * numHouse) +
      "<br>Members in Republican Party: " + Math.round(perRepHouse * numHouse) +
      "</p><h3>Senate</h3>" +
      "<p>Voting Members: " + numSenate +
      "<br>Members in Democrat Party: " + Math.round(perDemSenate * numSenate) +
      "<br>Members in Independent Party: " + Math.round(perIndSenate * numSenate) +
      "<br>Members in Republican Party: " + Math.round(perRepSenate * numSenate) +
      "</p><h3>Vice Presidency</h3>" +
      "<p>Voting Members: " + numVP +
      "<br>Members in Democrat Party: " + Math.round(perDemVP * numVP) +
      "<br>Members in Independent Party: " + Math.round(perIndVP * numVP) +
      "<br>Members in Republican Party: " + Math.round(perRepVP * numVP) +
      "</p><h3>Presidency</h3>" +
      "<p>Voting Members: " + numPres +
      "<br>Members in Democrat Party: " + Math.round(perDemPres * numPres) +
      "<br>Members in Independent Party: " + Math.round(perIndPres * numPres) +
      "<br>Members in Republican Party: " + Math.round(perRepPres * numPres) +
      "</p><h3>Likelihood of Yes Vote: </h3>" +
      "<p>Democrat Party: " + demYaythresh +
      "<br>Independent Party: " + indYaythresh +
      "<br>Republican Party: " + repYaythresh +
      "</p><h3>Percentage of votes required for approval of bill</h3>" +
      "<p>Approval By Majority: " + perPass +
      "<br> Approval By Supermajority: " + superThresh + "</p></div>";
  }


}
