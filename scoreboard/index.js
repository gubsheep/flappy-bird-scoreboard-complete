var db = firebase.firestore();

const board = document.querySelector('#board')

function showScoreboard() {
  // clear all children
  var child = board.lastElementChild
  while (child) {
    board.removeChild(child)
    child = board.lastElementChild
  }

  // get and display scores
  var headerRowDiv = document.createElement("div");
  var headerRowText = document.createTextNode("name: score");
  headerRowDiv.appendChild(headerRowText)
  board.appendChild(headerRowDiv)

  var scoresRef = db.collection("scores")

  scoresRef.orderBy("score", "desc").get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        var data = doc.data()

        var scoreEntryDiv = document.createElement("div");
        var scoreEntryText = document.createTextNode(`${data.name}: ${data.score}`);
        scoreEntryDiv.appendChild(scoreEntryText)
        board.appendChild(scoreEntryDiv)
      });
    }).then(function() {
      console.log("got all scores")
  })

  console.log("haven't gotten all scores yet!")
}

function setupListeners() {
  var scoresRef = db.collection("scores")
  scoresRef.onSnapshot(function(querySnapshot) {
    showScoreboard()
  });
}

setupListeners()
// showScoreboard()