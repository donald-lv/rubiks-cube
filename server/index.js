
const express = require("express");
const app = express();

const cors = require("cors");

const pool = require("./db");
const port = 5000;

app.use(express.json());
app.use(cors());

// ROUTES
// get leaderboard submissions
app.get('/leaderboard', async (req, res) => {
    try {
        const get = await pool.query("SELECT * FROM time_submissions ORDER BY (end_time - start_time)");
        res.json(get);

        const { rows } = get;

        console.log("GET at '/leaderboard': all entries gotten:");
        console.log(rows);
        
    } catch(err) {
        res.status(400);
        console.error("GET at '/leaderboard' error message: \n" + err.message);
    }
});

// post a submission
app.post('/leaderboard', async (req, res) => {
    try {
        const { start_time, end_time, user_name, move_count } = req.body;

        const post = await pool.query("INSERT INTO time_submissions (start_time, end_time, user_name) VALUES ($1, $2, $3);", 
                                      [ start_time, end_time, user_name ]);
        // INSERT INTO time_submissions (start_time, end_time) VALUES ('01-01-2022 00:00:00', '02-01-2022 00:00:01');

        res.json(post);
        console.log("POST at '/leaderboard': submission entered");
        
    } catch(err) {
        res.status(400);
        console.error("POST at '/leaderboard' error message: \n" + err.message);
    }
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
