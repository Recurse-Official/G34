import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
const app = express();
app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt=`
parse the transaction message and reply in the format:
"transactionID,credit,amount,category,date,2ndParty"
Where:
"transactionID" is the RefNo, transactionId
"credit" is true if we got money false if we gave money
"amount" is the amount of money transacted in
"category" is the category of transaction: (grocery, etc.)
"date" is the date of transaction in the format DD-MM-YYYY
"2ndParty" is the other person involved in transaction
Message Starts From the next line:
If you cant discern a field reliably give "null"
`

const message = "Dear UPI user A/C X8147 debited by 20.0 on date 20Nov24 trf to CMR ENGINEERING Refno 432554849988. If not u? call 1800111109. -SBI"
const result = await model.generateContent(prompt+message);
console.log(result.response.text());
