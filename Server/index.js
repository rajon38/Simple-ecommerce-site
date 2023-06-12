const app = require('./app');

const port = 8070;

app.listen(port,function (){
    console.log(`Server Running on port ${port}`);
});