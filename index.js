//setUp server's settings
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "./build")));

var cors = require("cors");
const corsOptions = {
  // Allow only requests from this domain
  origin: ["https://dinero-gold.vercel.app"],
};
app.use(cors(corsOptions));

require("dotenv").config();

//setUp server's database
const mongoose = require("mongoose");
const offer = require("./offer");
const proposal = require("./proposal");
const profile = require("./profile");
async function database() {
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("DataBase is running"))
    .catch((err) => {
      console.log("Error " + err);
    });
}

//setUp server's auth
const { auth } = require("express-openid-connect");
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: process.env.URL,
  clientID: process.env.ID,
  issuerBaseURL: process.env.AUTH
};
app.use(auth(config));
app.get("/state", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});
const { requiresAuth } = require("express-openid-connect");
app.get("/auth", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

//WebSite
app.get("/", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  } catch (err) {
    res.send(err);
  }
});
app.get("/about", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  } catch (err) {
    res.send(err);
  }
});
app.get("/contact", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  } catch (err) {
    res.send(err);
  }
});
app.get("/course", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  } catch (err) {
    res.send(err);
  }
});
app.get("/faq", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  } catch (err) {
    res.send(err);
  }
});
app.get("/hire", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  } catch (err) {
    res.send(err);
  }
});
app.get("/profile", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  } catch (err) {
    res.send(err);
  }
});

//employee
app.get("/allrOffers", requiresAuth(), async (req, res) => {
  const offers = await offer.find();
  return res.json(offers);
});
app.get("/myProposal", requiresAuth(), async (req, res) => {
  let query = { creator: req.oidc.user.email };
  const proposals = await proposal.find(query);
  return res.json(proposals);
});
app.post("/newProposal", requiresAuth(), async (req, res) => {
  try {
    const { main, company, offerId } = req.body;
    const newProposal = new proposal({
      main: main,
      date: Date(Date.now.toString()),
      company: company,
      offerId: offerId,
      creator: req.oidc.user.email,
    });
    await newProposal.save();
    res.status(201).json({ message: "Proposal registered successfully" });
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.delete("/deleteProposal/:id", requiresAuth(), async (req, res) => {
  try {
    let id = req.params.id;
    await proposal.findOneAndDelete({ _id: id });
    res.status(201).json({ message: "Proposal deleted successfully" });
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//company
app.get("/myOffers", requiresAuth(), async (req, res) => {
  let query = { creator: req.oidc.user.email };
  const offers = await offer.find(query);
  return res.json(offers);
});
app.post("/newOffer", requiresAuth(), async (req, res) => {
  try {
    const { title, body, date } = req.body;
    const newOffer = new offer({
      title: title,
      body: body,
      date: date,
      creator: req.oidc.user.email,
    });
    await newOffer.save();
    res.json({ message: "Offer registered successfully" });
  } catch {
    res.json({ error: "Internal Server Error" });
  }
});
app.delete("/deleteOffer/:id", requiresAuth(), async (req, res) => {
  try {
    let id = req.params.id;
    await offer.findOneAndDelete({ _id: id });
    res.status(201).json({ message: "Proposal deleted successfully" });
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/myProposalForComapny", requiresAuth(), async (req, res) => {
  let query = { company: req.oidc.user.email };
  const proposals = await proposal.find(query);
  return res.json(proposals);
});
app.put("/putProposal/:id", requiresAuth(), async (req, res) => {
  try {
    let id = req.params.id;
    let content = req.body;
    await proposal
      .findOneAndUpdate({ _id: id }, content, { new: true })
      .then(() => {
        res.json({ message: "Proposal replyed successfully" });
      })
      .catch(() => {
        res.json({ error: "Internal Server Error" });
      });
  } catch {
    res.json({ error: "Internal Server Error" });
  }
});

//profiles
app.post("/newProfile", requiresAuth(), async (req, res) => {
  try {
    const { type, img, name, bio, address } = req.body;
    const newProfile = new profile({
      type: type,
      img: img,
      name: name,
      mail: req.oidc.user.email,
      bio: bio,
      address: address,
    });
    await newProfile.save();
    res.json({ message: "Profile registered successfully" });
  } catch {
    res.json({ error: "Internal Server Error" });
  }
});
app.get("/myProfile", requiresAuth(), async (req, res) => {
  const Profile = await profile.findOne({ mail: req.oidc.user.email });
  if (Profile == null) {
    return res.json({
      name: "None",
      img: "",
      bio: "None",
      type: "employee",
      address: "None",
      mail: "",
    });
  } else {
    return res.json(Profile);
  }
});

app.listen(process.env.URL | process.env.PORT, () => {
  console.log(`Server is running`);
  database();
});
