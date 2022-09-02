import mongoose from "mongoose";
const instalmentSchema = new mongoose.Schema({
  instalment: {
    type: String,
    required: true,
    default: null,
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
  abroadEducationalTours: {
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
  amount: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
const Instalment =
  mongoose.models.Instalment || mongoose.model("Instalment", instalmentSchema);

export default Instalment;
