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
        const getInstalmentInfo = await Instalment.findOne(
          { instalment: req.body.instalment },
          { createdAt: 0, __v: 0, _id: 0 }
        );

        if (getInstalmentInfo.amount === req.body.amount) {
          const newPayment = new Payment({
            studentId: req.body.studentId,
            detailsId: req.body.studentId,
            instalment: getInstalmentInfo.instalment,
            admissionFee: getInstalmentInfo.admissionFee,
            tutionFee: getInstalmentInfo.tutionFee,
            diningCharge: getInstalmentInfo.diningCharge,
            hairCutting: getInstalmentInfo.hairCutting,
            cablerOyaserManCharge: getInstalmentInfo.cablerOyaserManCharge,
            religiousCharge: getInstalmentInfo.religiousCharge,
            newspaperMagazineCharge: getInstalmentInfo.newspaperMagazineCharge,
            establishMaintainCharge: getInstalmentInfo.establishMaintainCharge,
            supervisionCharge: getInstalmentInfo.supervisionCharge,
            gameSportCharge: getInstalmentInfo.gameSportCharge,
            yearlyCeremony: getInstalmentInfo.yearlyCeremony,
            cadetNightCharge: getInstalmentInfo.cadetNightCharge,
            classBag: getInstalmentInfo.classBag,
            educationalTour: getInstalmentInfo.educationalTour,
            abroadEducationalTours: getInstalmentInfo.abroadEducationalTours,
            crodhingDabing: getInstalmentInfo.crodhingDabing,
            meritimeCharge: getInstalmentInfo.meritimeCharge,
            aboutExam: getInstalmentInfo.aboutExam,
            passingOut: getInstalmentInfo.passingOut,
            retuenable: getInstalmentInfo.retuenable,
            amount: Number(getInstalmentInfo.amount),
          });
          await newPayment.save();
          res.send("Payment Added successfully");
        } else {
          res.send(
            `You need to pay ${getInstalmentInfo.amount} tk for ${getInstalmentInfo.instalment} semester `
          );
        }
      } else {
        res.send(`Student ID not exist.Please add before make a payment`);
      }
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
