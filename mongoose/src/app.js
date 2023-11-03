

const mongoose = require("mongoose");

// Connection create and a new database create....
mongoose
  .connect("mongodb://127.0.0.1:27017/codeabhishek", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connection Successful......");
  })
  .catch((err) => {
    console.error("Connection Error:", err);
  });

// SCHEMA DEFINE....
const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: String,
  used: String,
  video: Number,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
});

// Now we Create a MODEL...
const Playlist = mongoose.model("Playlist", playlistSchema);

// Example of creating a new playlist
const insertDocument = async () => {
  try {
    const reactPlaylist = new Playlist({
      name: "React JS",
      type: "FrontEnd",
      used: "as a frame work",
      video: 79,
      active: true
    })

    const nodePlaylist = new Playlist({
      name: "Node JS",
      type: "BackEnd",
      used: "as a server work",
      video: 64,
      active: true
    })                                   /* THIS IS THE WAY OF INSERT MULTIPLE DOCUMENTS IN A COLLECTIONS */
    const expressPlaylist = new Playlist({
      name: "Express JS",
      type: "BackEnd",
      used: "connect with Database",
      video: 51,
      active: true
    })
    const mongoosePlaylist = new Playlist({
      name: "MongoDB",
      type: "BackEnd",
      used: "as a Database",
      video: 45,
      active: true
    })
    const jsPlaylist = new Playlist({
      name: "JavaScript",
      type: "FrontEnd",
      used: "as logic building",
      video: 99,
      active: true
    })
    const pythonPlaylist = new Playlist({
      name: "Python",
      type: "Backend",
      used: "for API create",
      video: 10.,
      active: true
    })

    // Save the new playlist to the database

    const result = await Playlist.insertMany([reactPlaylist, nodePlaylist, expressPlaylist, mongoosePlaylist, jsPlaylist, pythonPlaylist])   // ACCESS ALL THE DOCUMENTS IN A ARRAY FORMAT 

    console.log(result)
  }
  catch (err) {
    console.error(err)
  }
}

// insertDocument();        //Comment out this call function

/* GET DOCUMENT OR READ DOCUMENT OR QUARING DOCUMENTS IN MONGOOSE  */

const readDocument = async () => {
  try {
    // const result=await Playlist.find({type:"FrontEnd"});   /* This is for query purpose  */

    // const result = await Playlist.find({ type: { $in: ["FrontEnd"] } })  

    const result = await Playlist.find({ $or: [{ type: "Backend" }, {}] })  /* or operator , all the other operator are use same as $or */

      .select({ name: 1 })  
      
      // .count() /* It will not print the documents details, it will print the number of document only */ 

      //  .sort({name:1})  /* sorting the items in Accending order */
       .sort({name:-1})  /* sorting the items in Deccending order */
    console.log(result)
  }
  catch (err) {
    console.error(err)
  }
}


readDocument();

