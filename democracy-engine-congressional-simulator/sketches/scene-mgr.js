var mgr;

let dWidth, dHeight;
let nextButton;
var buttonRC, buttonRes, dispBtn, buttonRecal;

var userNumHouse;
var userPerHouseBody;
var userNumSenate;
var userPerSenateBody;
var userNumPres;
var userPerPresBody;
var userNumVP;
var userPerVPBody;
var userNumParties;
var prevUserNumParties;
var userEditCount = 0;
var onePartyBool = true;

var userNumHouseRan;
var userNumSenateRan;
var userNumPresRan;
var userNumVPRan;
var userNumHouseConn;

var userBodyPass;
var userSuperThresh;

var userRepYaythresh;
var userDemYaythresh;
var userIndYaythresh;


//V1 TO DO
//Work on Diplay Text Design (transparen overlay)
//Resize User input boxes
//GUI for User input?

//TO DO - These require a configuration of the Logic. A potential future project. The code will be made available via Github
// Allow users to change the number of decision-making units:
// Allow users to change the configuration and logical interdependencies of decision-making units:
// see: https://docs.google.com/document/d/118letZLbFm9D3QhtOtrdhQvJU4OJxYWr6OiAuUlJTjA/edit?usp=sharing

// Defaults based on 116th Congress (2019 - 2021) as of 8/7/2020

// Senate (2019-2021)
// Majority Party: Republican (53 seats)
// Minority Party: Democrat (45 seats)
// Other Parties: 2 Independents (both caucus with the Democrats)
// Total Seats: 100
// https://pressgallery.house.gov/member-data/party-breakdown

// House
// 198 Republicans
// 232 Democrats
// 1 Libertarian
// 4 * Vacancies
// https://pressgallery.house.gov/member-data/party-breakdown


//Global Variables

//******These Can be Changed by User*********

//Voter Stress Variables
//assumes a stress level 0-10, stress level 5 is neither stressed nor not stressed and does not change likelihood of yay/nay vote.  Change stressLow & stressHigh to reflect sensor values.  
var stressSensorval = 5; //connect this to sensor reading
var stressLow = 0; //change this to the low stress minimum
var stressHigh = 10; //change this to the low stress masimum

//Planet Stress Variables
//assumes a stress level 0-10, stress level 5 is neither stressed nor not stressed and does not change likelihood of yay/nay vote.  Change stressLow & stressHigh to reflect sensor values.  
var stressPlanet = 5; //connect this to sensor reading
var stressPlanetLow = 0; //change this to the low stress minimum
var stressPlanetHigh = 10; //change this to the low stress masimum

//Offset of combined stress levels that will increase likelyhood of yes vote on any given bill (state change)
var stressOffset;

//Number voting members
var numHouse = 435;
var numSenate = 100;
var numPres = 1;
var numVP = 1;

//Demographics of House as decimal percentages 1 = 100%
var perDemHouse = 0.5333;
var perRepHouse = 0.4551;
var perIndHouse = 0.0115;

//Demographics of Senate as decimal percentages 1 = 100%
var perDemSenate = 0.45;
var perRepSenate = 0.53;
var perIndSenate = 0.02;

//Demographics of President as decimal percentages 1 = 100%
var perDemPres = 0.0;
var perRepPres = 1.0;
var perIndPres = 0.0;

var perDemVP = 0.0;
var perRepVP = 1.0;
var perIndVP = 0.0;

var housePercentage, senPercentage, vpPercentage, presPercentage;

//supermajority Cutoff for override of presidential veto
var superThresh = 0.67;

var perPass = .5;

//Historical Likelihood of party affiliation & likelihood of 'yay' vote
var repYaythresh = 0.3;
var demYaythresh = 0.7;
var indYaythresh = 0.5;

//How Many Voting Bodies (house, senate, president = 3) *see to DO at top of code
var numBodies = 4;
//var defNumBody;//delete?

//******These are NOT user determined*********

//We will use these in the setup function to map the sensor value to stress index
var stress = stressSensorval;
var stressMap;
var stressPlanetMap;

//which body is voting
var bodyCount = 0;
let bodyPass = [];

//The number of voting memebers for each body
var numCon;

//initialize tally of votes
var yay = 0;
var nay = 0;
var demNayCount, demYayCount, repNayCount, repYayCount;
var votingBodyCounts = [];
let superThreshIndex = [];

//The count variables are updated every time a circle is drawn
var count = 0;
var count1 = 0;
var count2 = 0;
var countR = 0;

//The yCount variables
var xCount = 1;
var yCount = 1;
var yCountT = 1;

//Determines size of circle & spacing
var skip; //taking the square root of the area of the drawing
var skip2;
// var skipR; strange artifact from Rhonda

//Location Circle is Drawn
var x;
var y;
var x2;
var y2;

//Diameter or circle
var diam;

//Splits the Screen into 'sections' based on number of voting bodies
var offSet;

//test state variable - 0 if untested 1 if tested
var test;

//test state variable - 0 if moving through voting body 1 if all body members have votes
var endBody;

//how many times has the user run the vote in a signle session
var passCount = 0; //artifact from Rhonda

//fortesting
let senateResult;
let houseResult;
let presidentResult;

var bodyLabel;

// colors
var bColor = "#012244";
var pColor = "#3c1b36";

let tranVal = 255;
// let fadeOpac = 255;
var partyNum = 0;
var moveArrow = 0;

var rot = 0;

let mainText;
let headerText;
let subHeaderText;
let simInfoText;
let userOutputText;

//checks for voting bodies and sees if they will actually vote or not
let stopVoteBool = false;
let stopVoteCount = 0;
let stopVoteArr = [];
let vpVote = false;

//loaded assets
let helvFont;
let loadingImage;
let enterImage;

//user inputs are enabled
let userEdits = false;

var userPaddingX = 20;
var userInputY = 20;
var userInputX = 20;



function preload() {
  helvFont = loadFont('/democracy-engine-congressional-simulator/assets/font/HelveticaNeue-Regular.otf');
  loadingImage = loadImage('/democracy-engine-congressional-simulator/assets/gears-icon.png')
  enterImage = loadImage('/democracy-engine-congressional-simulator/assets/asraProgress.png')
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
  mgr = new SceneManager();
  mgr.addScene(democracyEngineOrigin);
  mgr.addScene(democracyEngineUser);
  mgr.addScene(sLegislative);
  mgr.addScene(sParties);
  mgr.addScene(sMembers);
  mgr.addScene(sBodyPass);
  mgr.addScene(sYesVotes);
  mgr.addScene(sResults);
  mgr.addScene(sInfo);
  mgr.addScene(sDisplay);
  mgr.showNextScene();

}

function draw() {
  mgr.draw();
  // background('#012244');
  // textSize(100);
  // text(sliderVal, windowWidth/2, windowHeight/2);

}

function resized() {
  // resetDraw();
  // setup();
  window.location.reload();
  // redraw();
}

function mousePressed() {
  mgr.mousePressed();
}

function nextScene() {
  if (mgr.isCurrent(democracyEngineOrigin)) {
    mgr.showScene(sLegislative);
  } else if (mgr.isCurrent(sLegislative)) {
    mgr.showScene(sParties);
  } else if (mgr.isCurrent(sParties) && userNumParties <= 1) {
    mgr.showScene(sBodyPass);
  } else if (mgr.isCurrent(sParties)) {
    mgr.showScene(sMembers);
  } else if (mgr.isCurrent(sMembers)) {
    mgr.showScene(sBodyPass);
  } else if (mgr.isCurrent(sBodyPass)) {
    mgr.showScene(sYesVotes);
  } else if (mgr.isCurrent(sYesVotes)) {
    mgr.showScene(sResults);
  }  else if (mgr.isCurrent(sResults)) {
    mgr.showScene(sInfo);
  } else if (mgr.isCurrent(sInfo) && userEdits == true) {
    mgr.showScene(democracyEngineUser);
  } else if (mgr.isCurrent(democracyEngineUser)) {
    mgr.showScene(sLegislative);
  }

}

// function lastScene() {
//   if (mgr.isCurrent(sYesVotes)) {
//     mgr.showScene(sBodyPass);
//   } else if (mgr.isCurrent(sBodyPass)) {
//     mgr.showScene(sMembers);
//   } else if (mgr.isCurrent(sMembers)) {
//     mgr.showScene(sLegislative);
//   } else if (mgr.isCurrent(sLegislative)) {}
//
// }

// function keyPressed() {
//   // You can optionaly handle the key press at global level...
//   switch (key) {
//     case '1':
//       mgr.showScene(democracyEngineUser);
//       break;
//     case '2':
//       mgr.showScene(sResults);
//       break;
//     case '3':
//       mgr.showScene(sMembers);
//       break;
//       // case 'space':
//       //     mgr.showScene(main);
//       //     break;
//
//   }
//
//   // ... then dispatch via the SceneManager.
//   mgr.keyPressed();
// }

//might not work for fullscreen
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function button() {
  mgr.showNextScene();
}

function dispResult() {
  if (mgr.isCurrent(sDisplay)) {
    mgr.showScene(democracyEngineUser);
  } else {
    mgr.showScene(sDisplay);
  }
}

//User Input Values for Congressional Reconfiguration
function inputVar() {
  document.body.style.backgroundColor = "#012244";
  changeText(" ");
  if(!document.getElementById('disp-btn')){
          dispButton();
    }
  //Number voting members
  numHouse = userNumHouse;
  numSenate = userNumSenate;
  numPres = userNumPres;
  numVP = userNumVP;


  //Demographics of House as decimal percentages 1 = 100%
  perDemHouse = userPerHouseBody[0];
  perRepHouse = userPerHouseBody[1];
  perIndHouse = userPerHouseBody[2];

  //Demographics of Senate as decimal percentages 1 = 100%
  perDemSenate = userPerSenateBody[0];
  perRepSenate = userPerSenateBody[1];
  perIndSenate = userPerSenateBody[2];

  //Demographics of President as decimal percentages 1 = 100%
  perDemPres = userPerPresBody[0];
  perRepPres = userPerPresBody[1];
  perIndPres = userPerPresBody[2];

  //Demographics of President as decimal percentages
  perDemVP = userPerVPBody[0];
  perRepVP = userPerVPBody[1];
  perIndVP = userPerVPBody[2];

  //Historical Likelihood of party affiliation & likelihood of 'yay' vote
  repYaythresh = parseFloat(userRepYaythresh) / 100.0;
  console.log("rep yay thresh: " + repYaythresh);
  demYaythresh = parseFloat(userDemYaythresh) / 100.0;
  console.log("dem yay thresh: " + demYaythresh);
  indYaythresh = parseFloat(userIndYaythresh) / 100.0;
  console.log("ind yay thresh: " + indYaythresh);

  //supermajority Cutoff for override of presidential veto

  superThresh = parseFloat(userSuperThresh) / 100.0;
  console.log("superThresh: " + superThresh);
  //supermajority in a body

  perPass = parseFloat(userBodyPass) / 100.0;
  console.log("per pass: " + perPass);

  //How Many Voting Bodies (house, senate, president, VP = 4) *for V2 - see TODO at top
  numBodies = 4;



  // //Your Stress Value
  // stressSensorval = userStressSensorval.value();
  //
  // //Planets Stress Value
  // stressPlanet = userStressPlanet.value();

  bodyCount = 0;
  resetCount();
  resetDraw();
  superThreshIndex = [];
  votingBodyCounts = [];
  bodyPass = [];
  removeField();
  // resetSliders();
  userEdits = true;
  mgr.showScene(democracyEngineUser);
}

function dispButton() {
  dispBtn = createButton('USER CONFIGURATIONS');
  dispBtn.id("disp-btn");
  dispBtn.class('buttons');
  let buttonDiv = document.getElementById('button-div');
  dispBtn.parent(buttonDiv);
  // dispBtn.position(19, 19);
  dispBtn.mousePressed(dispResult);
}


function removeField() {
  buttonRes.remove();
  buttonRC.remove();
  buttonRecal.remove();
  nextButton.remove();
}

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

function resetDraw() {
  if (yCountT * skip >= offSet) {
    skip = offSet / (1.025 * xCount);
  }
  noStroke();
  fill(bColor);
  tranVal = 255;
  rectMode(CORNER);

  x = skip / 2;
  y = skip / 2;
  yay = 0;
  nay = 0;
  xCount = 1;
  yCount = 1;
  endBody = 0;
}

function roundNum(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}



function changeText(text) {
  document.getElementById("result").innerHTML = text;
}
