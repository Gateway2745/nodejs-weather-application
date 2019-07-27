const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname , '../public' );
const viewsPath =  path.join(__dirname, '../templates/views');
const partialsPath =  path.join(__dirname, '../templates/partials');

app.set('views', viewsPath);
app.set('view engine' , 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/',(req,res) => {
    res.render('index' ,{
        title:"Home Page",
        loc : "bangalore",
    })
})

app.get('/about' , (req,res) => {
    res.render('about' , {
        title : "about page!",
        name : "rohit",
    });
})

app.get('/weather' , (req,res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error:"please enter an address",
        });
    }
    geocode(address , (error ,info) => {
        if(error){
            return res.send({
                error,
            });
        }
        forecast(info.latitude , info.longitude , (error, data) => {
            if(error){
                return res.send({
                    error,
                });
            }
            res.send({
                forecast:data,
                address:info.location,
            })   
        }) 
    })
    
})

app.get('/help' , (req,res) => {
    res.render('help' , {
        msg : " This is the great help page!!",
        title : "this is where you get help!!",
    })
})

app.listen(8000 , () => {
    console.log('SERVER IS UP');
})

