import Payment from "../../../models/Payment.js";
import Instalment from "../../../models/Instalment.js";
import Student from "../../../models/Student.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
import { isAuth, isBankUser } from "../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.use(isBankUser);
handler.post(async (req, res, next) => {
  try {
    await connectMongo();
    const check = await Payment.findOne({
      studentId: req.body.studentId,
      instalment: req.body.instalment,
    });
    if (check) {
      res.send(`This student already made payment for selected semester`);
    } else {
      const exist = await Student.findOne({ studentID: req.body.studentId });
      if (exist) {
        const instalment = await Instalment.findOne(
          { instalment: req.body.instalment },
          { instalment: 0, createdAt: 0, __v: 0, _id: 0 }
        );

        const newPayment = new Payment({
          studentId: req.body.studentId,
          detailsId: req.body.studentId,
          instalment: req.body.instalment,
          admissionFee: instalment.admissionFee,
          tutionFee: instalment.tutionFee,
          diningCharge: instalment.diningCharge,
          hairCutting: instalment.hairCutting,
          cablerOyaserManCharge: instalment.cablerOyaserManCharge,
          religiousCharge: instalment.religiousCharge,
          newspaperMagazineCharge: instalment.newspaperMagazineCharge,
          establishMaintainCharge: instalment.establishMaintainCharge,
          supervisionCharge: instalment.supervisionCharge,
          gameSportCharge: instalment.gameSportCharge,
          yearlyCeremony: instalment.yearlyCeremony,
          cadetNightCharge: instalment.cablerOyaserManCharge,
          classBag: instalment.classBag,
          educationalTour: instalment.educationalTour,
          abroadEducationalTours: instalment.abroadEducationalTours,
          crodhingDabing: instalment.crodhingDabing,
          meritimeCharge: instalment.meritimeCharge,
          aboutExam: instalment.aboutExam,
          passingOut: instalment.passingOut,
          retuenable: instalment.retuenable,
          amount: Number(req.body.amount),
        });
        await newPayment.save();
        res.send("Payment Added successfully");
      } else {
        res.send(`Student ID not exist.Please add before make a payment`);
      }
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
