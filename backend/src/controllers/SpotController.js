const Spot = require('../models/Spot')
const User = require('../models/User')


module.exports ={
  async store(req, res ) {
    const {filename} = req.file;
    const { techs, price, company} = req.body;
    const { user_id} = req.headers;

    const user = await User.findById(user_id)

    if(!user) {
      return res.status(400).json({message:"User does not exist"})
    }

    const spot = await Spot.create({
      user:user_id,
      thumbnail:filename,
      techs:techs.split(',').map(tech => tech.trim()),
      price,
      company
    })

    return res.json(spot)
  }
}