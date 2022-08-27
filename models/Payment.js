import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  detailsId: {
    type: String,
    required: true,
  },
  instalment: {
    type: String,
    required: true,
    default: null,
  },
  amount: {
    type: Number,
    required: true,
  },
  admissionFee: {
    type: Number,
    default: 0,
  },
  tutionFee: {
    type: Number,
    default: 0,
  },

  diningCharge: {
    type: Number,
    default: 0,
  },
  hairCutting: {
    type: Number,
    default: 0,
  },
  cablerOyaserManCharge: {
    type: Number,
    default: 0,
  },
  religiousCharge: {
    type: Number,
    default: 0,
  },
  newspaperMagazineCharge: {
    type: Number,
    default: 0,
  },
  establishMaintainCharge: {
    type: Number,
    default: 0,
  },
  supervisionCharge: {
    type: Number,
    default: 0,
  },
  gameSportCharge: {
    type: Number,
    default: 0,
  },
  yearlyCeremony: {
    type: Number,
    default: 0,
  },
  cadetNightCharge: {
    type: Number,
    default: 0,
  },
  classBag: {
    type: Number,
    default: 0,
  },
  educationalTour: {
    type: Number,
    default: 0,
  },
  crodhingDabing: {
    type: Number,
    default: 0,
  },
  meritimeCharge: {
    type: Number,
    default: 0,
  },
  aboutExam: {
    type: Number,
    default: 0,
  },
  passingOut: {
    type: Number,
    default: 0,
  },

  retuenable: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
});
const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
