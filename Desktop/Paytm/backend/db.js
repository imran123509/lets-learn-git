const mongoose =require('mongoose');


var uri = "mongodb://127.0.0.1:27017/paytm";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String
  });
  const User=mongoose.model('User', UserSchema)

  const AccountSchema=new mongoose.Schema({
       userId: {
          type: mongoose.Schema.Types.ObjectId,  // refrence to user model
          ref: 'User',
          required: true
       },
      Balance: {
         type: Number,
          required: true
       }
  });

  const Account=mongoose.model('Account', AccountSchema)


module.exports={
    User,
    Account,
}


