const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname , '../public' );
const viewsPath =  path.join(__dirname, '../templates/views');
const partialsPath =  path.join(__dirname, '../templates/partials');

app.set('views', viewsPath);
app.set('view engine' , 'ejs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/',(req,res) => {
    res.render('index' ,{
        loc : "WEATHER FORECAST",
    })
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

app.listen(port , () => {
    console.log('SERVER IS UP ON PORT '+ port);
})

