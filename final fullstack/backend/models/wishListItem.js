const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    eventID: { type: String, required: true }
  });
  
  const WishlistItem = mongoose.model('WishlistItem', wishlistSchema);



  module.exports=WishlistItem