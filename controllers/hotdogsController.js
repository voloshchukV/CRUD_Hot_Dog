const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Hotdogs = mongoose.model('Hotdogs');

router.get('/', (req, res)=>{
    res.render("hotdogs/addOrEdit", {
        viewTitle: "Insert Hot Dog"
    });
});

router.post('/', (req, res) => {
    if (req.body._id =='')
    insertRecord(req,res);
    else
    updateRecord(req,res);
});

function insertRecord(req, res) {
    var hotdogs = new Hotdogs();
    hotdogs.Title = req.body.Title;
    hotdogs.Length  = req.body.Length;
    hotdogs.Weight = req.body.Weight;
    hotdogs.save((err,doc) =>{
        if (!err)
            res.redirect('hotdogs/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("hotdogs/addOrEdit", {
                    viewTitle: "Insert Hot Dog",
                    hotdogs: req.body
                });
            }
            else {
                console.log('Error during record insertion : ' + err);  
            }

        }
    });
}

function updateRecord(req,res) {
    Hotdogs.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err) {res.redirect('hotdogs/list');}

        else {
            if (err.name == 'ValidationError'){
                handleValidationError(err. reg.body);
                res.render("hotdogs/assOrEdit", {
                    veiwTitle: 'Update Hot Dog',
                    hotdogs: req.body
                });
            }
            else
                console.log('Error during recording update : '+err);
        }
    });
}
router.get('/list', (req,res) => {
        Hotdogs.find((err, docs) =>{
        if (!err) {
        res.render("hotdogs/list", {
                list:docs
            });
        }
        else{
            console.log('Error in retrieving Hot dog list :' + err);
        }
    });
});

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path) {
            case 'Title':
                body['TitleError']=err.errors[field].message;
                break;
            default:
                break;

        }
    }

}

router.get('/:id', (req, res)=>{
    Hotdogs.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("hotdogs/addOrEdit", {
                viewTitle: "Update Hot Dog",
                hotdogs: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Hotdogs.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/hotdogs/list');
         }
         else { console.log('Error in Hot dog delete :' + err);}
    });
});
module.exports = router;