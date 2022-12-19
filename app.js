

// panngil module
const express = require("express");

// initialize app
const app = express();
// input body di postman
app.use(express.json());
// input body, form data, urlenconded di postman
app.use(express.urlencoded({extended:true}));
// registering routes
app.use(require("./app/routes"));

// registering error handler
app.use(require("./app/middlewares/errorHandler"));




// running server
app.listen(3001,()=> console.log("server running on port 3001"))