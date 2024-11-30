import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
const app = express();
app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt=`
parse the transaction message and reply in the format:
"transactionID,credit,amount,category,time,date,2ndParty"
Where:
"transactionID" is the RefNo, transactionId
"credit" is Credit if we got money Debit if we gave money
"amount" is the amount of money transacted in
"category" is the category of transaction: (grocery, etc.)
"time" is the time of transaction in the format HH:MM:SS
"date" is the date of transaction in the format DD-MM-YYYY
"2ndParty" is the other person involved in transaction
Message Starts From the next line:
If you cant discern a field reliably give "null"
`
app.post("/", async (req, res)=>{
  const { messages } = req.body;
  let parsedMessages = [];
  for (let message of messages){
    console.log("yes");
    const reply = await model.generateContent(prompt+message);
    const tempArray = reply.response.text().trim().split(',');
    const parsedMessage = {
      "ID" : tempArray[0],
      "Type" : tempArray[1],
      "Amount" : Number(tempArray[2]),
      "Category" : tempArray[3],
      "Time" : tempArray[4],
      "Date" : tempArray[5],
      "2ndParty" : tempArray[6]
    };
    parsedMessages.push(parsedMessage);
  }
  console.log(parsedMessages);
  res.json({
    parsedMessages
  });
});

const port = 1800
app.listen(port, () => {
  console.log("Listening on ", port);
});
