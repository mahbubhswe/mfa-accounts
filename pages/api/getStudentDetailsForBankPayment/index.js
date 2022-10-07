import Student from "../../../models/Student.js";
import Payment from "../../../models/Payment.js";
import nextConnect from "next-connect";
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
      const payment = await Payment.find(
        {
          studentId: studentInfo.studentID,
        },
        { studentId: 0, detailsId: 0, createdAt: 0, __v: 0, _id: 0 }
      );

      const studentDetails = {
        studentID: studentInfo.studentID,
        name: studentInfo.name,
        batch: studentInfo.batch,
        email: studentInfo.email,
        paymentInfo: payment,
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
