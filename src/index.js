
const port = 3000;
const {app} = require(`./config/config`)


//Routes
app.use(require('./routes/routes')); 
//start the server
app.listen(port, () => {
  console.log(`soap to rest app listening at http://localhost:${port}`);
});