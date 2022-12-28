// Importing the packages ......
const express = require('express')
const app = express()
const path = require('path')

// This line declares the default port value as 3500 or to consider the port running on the server where the app is deployed.
const PORT = process.env.PORT || 3500 

// This line tells the app to use the static files located in the public folder
app.use('/' , express.static(path.join(__dirname , '/public')))

// This line uses a route to display the html page to the user
app.use('/' , require(path.join(__dirname , 'routes' , 'root')))

//This line shows to display the 404 Not found Page if invalid url is detected.
app.all('*' , (req , res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname , 'views' , '404.html'))
    } else if (req.accepts('json')){
        res.json({message : '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

// This line makes the app listen to a specific port (3500 by default)
app.listen(PORT , () => console.log(`Server is running on port ${PORT}`))