import mongoose from "mongoose";

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log("Connected to mongo database..."))
//   .catch((err) => console.error("Could not connect to mongo database...", err));

const organizationSChema = new mongoose.Schema({
  organization: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  products: [String],
  marketValue: String,
  address: String,
  ceo: String,
  country: String,
  noOfEmployees: Number,
  employees: [String],
});

const Organization = mongoose.model("organization", organizationSChema);
export default Organization;
