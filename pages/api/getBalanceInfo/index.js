import Payment from "../../../models/Payment.js";
import Transaction from "../../../models/Transaction.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    //////////////............payments.............//////////////////
    const paymentsInfo = await Payment.aggregate([
      {
        $group: {
          _id: null,
          admissionFee: { $sum: "$admissionFee" },
          tutionFee: { $sum: "$tutionFee" },
          diningCharge: { $sum: "$diningCharge" },
          hairCutting: { $sum: "$hairCutting" },
          cablerOyaserManCharge: { $sum: "$cablerOyaserManCharge" },
          religiousCharge: { $sum: "$religiousCharge" },
          newspaperMagazineCharge: { $sum: "$newspaperMagazineCharge" },
          establishMaintainCharge: { $sum: "$establishMaintainCharge" },
          supervisionCharge: { $sum: "$supervisionCharge" },
          gameSportCharge: { $sum: "$gameSportCharge" },
          yearlyCeremony: { $sum: "$yearlyCeremony" },
          cadetNightCharge: { $sum: "$cadetNightCharge" },
          classBag: { $sum: "$classBag" },
          educationalTour: { $sum: "$educationalTour" },
          abroadEducationalTours: { $sum: "$abroadEducationalTours" },
          crodhingDabing: { $sum: "$crodhingDabing" },
          meritimeCharge: { $sum: "$meritimeCharge" },
          aboutExam: { $sum: "$aboutExam" },
          passingOut: { $sum: "$passingOut" },
          retuenable: { $sum: "$retuenable" },
        },
      },
    ]);

    //////////////............transactions.............//////////////////
    const transactionsInfo = await Transaction.find({ status: "approved" });
    function getFilteredBalance(str) {
      const filtered = [];
      filtered.push(transactionsInfo.filter((item) => item.sector == str));
      const total = filtered[0].reduce((a, c) => a + c.amount, 0);
      return total;
    }

    const balanceInfo = {
      admissionFee:
        paymentsInfo[0].admissionFee - getFilteredBalance("admissionFee"),
      tutionFee: paymentsInfo[0].tutionFee - getFilteredBalance("tutionFee"),
      diningCharge:
        paymentsInfo[0].diningCharge - getFilteredBalance("diningCharge"),
      hairCutting:
        paymentsInfo[0].hairCutting - getFilteredBalance("hairCutting"),
      cablerOyaserManCharge:
        paymentsInfo[0].cablerOyaserManCharge -
        getFilteredBalance("cablerOyaserManCharge"),
      religiousCharge:
        paymentsInfo[0].religiousCharge - getFilteredBalance("religiousCharge"),
      newspaperMagazineCharge:
        paymentsInfo[0].newspaperMagazineCharge -
        getFilteredBalance("newspaperMagazineCharge"),
      establishMaintainCharge:
        paymentsInfo[0].establishMaintainCharge -
        getFilteredBalance("establishMaintainCharge"),
      supervisionCharge:
        paymentsInfo[0].supervisionCharge -
        getFilteredBalance("supervisionCharge"),
      gameSportCharge:
        paymentsInfo[0].gameSportCharge - getFilteredBalance("gameSportCharge"),
      yearlyCeremony:
        paymentsInfo[0].yearlyCeremony - getFilteredBalance("yearlyCeremony"),
      cadetNightCharge:
        paymentsInfo[0].cadetNightCharge -
        getFilteredBalance("cadetNightCharge"),
      classBag: paymentsInfo[0].classBag - getFilteredBalance("classBag"),
      educationalTour:
        paymentsInfo[0].educationalTour - getFilteredBalance("educationalTour"),
        abroadEducationalTours:
        paymentsInfo[0].abroadEducationalTours - getFilteredBalance("abroadEducationalTours"),
      crodhingDabing:
        paymentsInfo[0].crodhingDabing - getFilteredBalance("crodhingDabing"),
      meritimeCharge:
        paymentsInfo[0].meritimeCharge - getFilteredBalance("meritimeCharge"),
      aboutExam: paymentsInfo[0].aboutExam - getFilteredBalance("aboutExam"),
      passingOut: paymentsInfo[0].passingOut - getFilteredBalance("passingOut"),
      retuenable: paymentsInfo[0].retuenable - getFilteredBalance("retuenable"),
    };

    res.send(balanceInfo);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
