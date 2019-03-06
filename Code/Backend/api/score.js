const router = require('express').Router();
const validation = require('../lib/validation');

//schema for required and optional fields for a score object

const scoreSchema = {
  id: { required: true }, //medium int
  playerID: { required: true }, //medium int
  judgeID: { required: true }, //medium int
  score: { required: true }, //Decimal
  event: { required: true }, //varchar
  exhibition: { required: true }, //medium int (1=True/0=False)
  meetID: { required: true } //medium int
};

/*
|-----------------------------------------------
| Get all scores
|-----------------------------------------------
| gets all scores
|
*/
router.get('/', function (req, res, next) {
    // console.log("/team/teams");
    const mysqlPool = req.app.locals.mysqlPool;
    getScores(mysqlPool)
    .then((scores) => {
      if (scores) {
        res.status(200).json(scores);
      } else {
          next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Unable to fetch scores.  Please try again later."
      });
    });
});

function getScores(mysqlPool) {
  return new Promise((resolve, reject) => {
    mysqlPool.query('SELECT * FROM score', function (err, results) {
      // console.log(results);
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

/*
|-----------------------------------------------
| Get scores by meetID
|-----------------------------------------------
| Gets all scores in :meetID
*/

router.get('/meet/:meetID', function (req, res, next) {
    console.log(" -- req.params:", req.params.meetID);
    const mysqlPool = req.app.locals.mysqlPool;
    const meetID = req.params.meetID;
    getScoresByMeetID(meetID, mysqlPool)
    .then((meetID) => {
      if (meetID) {
        res.status(200).json(meetID);
      } else {
          next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Unable to fetch scores from meet with ID: " + id + " Please try again later."
      });
    });
});

function getScoresByMeetID(id, mysqlPool) {
  return new Promise((resolve, reject) => {
    mysqlPool.query('SELECT * FROM score WHERE meetID = ?', [ id ], function (err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

/*
|-----------------------------------------------
| Insert score
|-----------------------------------------------
| Inserts new score (DOESN'T CHECK IF SCORE ALREADY EXISTS)
|
*/

router.post('/', function (req, res, next) {
  const mysqlPool = req.app.locals.mysqlPool;
  data = req.body
  console.log("request: " + data.playerID + data.score)
  if (data && data.playerID && data.judgeID && data.score && data.event && data.exhibition && data.meetID) {
    insertNewScore(req.body, mysqlPool)
      .then((id) => {
        res.status(201).json({
          id: id,
          links: {
            score: '/score/' + id
          }
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: "Error inserting score."
        });
        console.log(err);
      });
  } else {
    res.status(400).json({
      error: "Request needs a JSON body with a name and meetID"
    });
  }

});

function insertNewScore(score, mysqlPool) {
  return new Promise((resolve, reject) => {
    const scoreValues = {
      id: null,
      playerID: score.playerID,
      judgeID: score.judgeID,
      score: score.score,
      event: score.event,
      exhibition: score.exhibition,
      meetID: score.meetID
    };
    /*
    Check if team exists
    */
    mysqlPool.query(
      'INSERT INTO score SET ?',
      scoreValues,
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      }
    );
  });
}


/*
|-----------------------------------------------
| Edit Score
|-----------------------------------------------
| Edit/Update a score with /:scoreID
|
*/

router.put('/:scoreID', function (req, res, next) {
  const mysqlPool = req.app.locals.mysqlPool;
  const id = parseInt(req.params.scoreID);
  if (validation.validateAgainstSchema(req.body, scoreSchema)) {
    replaceScoreByID(id, req.body, mysqlPool)
      .then((updateSuccessful) => {
        if (updateSuccessful) {
          res.status(200).json({
            links: {
              score: `/score/${id}`
            }
          });
        } else {
          next();
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: "Unable to update specified score.  Please try again later."
        });
      });
  } else {
    res.status(400).json({
      error: "Request body is not a valid score object"
    });
  }
});

function replaceScoreByID(id, score, mysqlPool) {
  return new Promise((resolve, reject) => {
    score = validation.extractValidFields(score, scoreSchema);
    mysqlPool.query('UPDATE score SET ? WHERE id = ?', [ score, id ], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result.affectedRows > 0);
      }
    });
  });
}


/*
|-----------------------------------------------
| Delete score by ID
|-----------------------------------------------
| Deletes score with /:scoreID
|
*/

router.delete('/:scoreID', function (req, res, next) {
  const mysqlPool = req.app.locals.mysqlPool;
  const scoreID = parseInt(req.params.scoreID);
  deleteTeamByID(scoreID, mysqlPool)
    .then((deleteSuccessful) => {
      if (deleteSuccessful) {
        res.status(204).end();
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Unable to delete score.  Please try again later."
      });
    });
});

function deleteTeamByID(scoreID, mysqlPool) {
  return new Promise((resolve, reject) => {
    mysqlPool.query('DELETE FROM score WHERE id = ?', [ scoreID ], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result.affectedRows > 0);
      }
    });
  });

}


exports.router = router;
