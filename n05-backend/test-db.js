const db = require('./config/db'); 

db.query('SHOW TABLES', (err, results) => {
    if (err) {
        console.error('Error running query:', err);
    } else {
        console.log('Tables in the database:', results); 
    }
    db.end(); 
});
