import Student from "../../../models/Student.js";
import Payment from "../../../models/Payment.js";
import nextConnect from "next-connect";
import moment from "moment";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    //get student
    const studentInfo = await Student.findOne(
      {
        studentID: req.query.id,
      },
      { createdAt: 0, __v: 0, _id: 0 }
    );

    if (studentInfo) {
      //get payment
      const instalment1 = await Payment.findOne(
        {
          studentId: studentInfo.studentID,
          instalment: "1st",
        },
        { instalment: 1, amount: 1, createdAt: 1, _id: 0 }
      );
      const instalment2 = await Payment.findOne(
        {
          studentId: studentInfo.studentID,
          instalment: "2nd",
        },
        { instalment: 1, amount: 1, createdAt: 1, _id: 0 }
      );
      const instalment3 = await Payment.findOne(
        {
          studentId: studentInfo.studentID,
          instalment: "3rd",
        },
        { instalment: 1, amount: 1, createdAt: 1, _id: 0 }
      );
      const instalment4 = await Payment.findOne(
        {
          studentId: studentInfo.studentID,
          instalment: "4th",
        },
        { instalment: 1, amount: 1, createdAt: 1, _id: 0 }
      );

      const studentDetails = {
        studentID: studentInfo.studentID,
        name: studentInfo.name,
        batch: studentInfo.batch,
        email: studentInfo.email,
        paymentInfo: {
          "1st_instalment": {
            Status: instalment1 ? "Completed" : "Not Completed",
            Amount: instalment1 ? instalment1.amount : null,
            dateOfPayment: instalment1
              ? moment(instalment1.createdAt).format("MM Do YY")
              : null,
          },
          "2nd_instalment": {
            Status: instalment2 ? "Completed" : "Not Completed",
            Amount: instalment2 ? instalment1.amount : null,
            dateOfPayment: instalment2
              ? moment(instalment1.createdAt).format("MM Do YY")
              : null,
          },
          "3rd_instalment": {
            Status: instalment3 ? "Completed" : "Not Completed",
            Amount: instalment3 ? instalment1.amount : null,
            dateOfPayment: instalment3
              ? moment(instalment1.createdAt).format("MM Do YY")
              : null,
          },
          "4th_instalment": {
            Status: instalment4 ? "Completed" : "Not Completed",
            Amount: instalment4 ? instalment1.amount : null,
            dateOfPayment: instalment4
              ? moment(instalment1.createdAt).format("DD-MM-YY")
              : null,
          },
        },
      };
      res.send(studentDetails);
    } else {
      res.send("Sorry, no student found with this id");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
