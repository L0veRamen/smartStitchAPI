
const Clarifai = require("clarifai");
const app = new Clarifai.App({
    apiKey: "bb8cab3df6e44d83b30e9b606f8d5d7a",
});
//FOOD_MODEL: 'bd367be194cf45149e75f01d59f77ba7',
// Clarifai.FACE_DETECT_MODEL
const handleApiCall = (req,res)=>{
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data =>{
            res.json(data);
        })
        .catch(err=>res.status(400).json("Unable to work with API!!!"))

}

const handleImage =(db) => (req,res)=> {
    const {id} = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err =>
            res.status(400).json('unable to get entries!!!')
        )
}

module.exports = {
    handleImage,handleApiCall
}