import { paystack } from "../utils/paystack.js";
import { User } from "../models/index.js";
import NotFoundError from "../errors/NotFoundError.js";


// get Banks
export const getBanks = async () => {
  const response = await paystack.get("/bank?country=nigeria");

  return response.data.data.map((bank) => ({
    name: bank.name,
    code: bank.code,
  }));
};


// verify Account

export const verifyAccount = async (
  organizerId,
  data
) => {
  const user = await User.findByPk(organizerId);

  if (!user) {
    throw new NotFoundError("Organizer not found.");
  }

  const response = await paystack.get(
    `/bank/resolve?account_number=${data.accountNumber}&bank_code=${data.bankCode}`
  );

  const account = response.data.data;
console.log(response.data.data);
  const banks = await paystack.get("/bank?country=nigeria");

const selectedBank = banks.data.data.find(
  (bank) => bank.code === data.bankCode
);

user.bankName = selectedBank ? selectedBank.name : null;

  user.bankCode = data.bankCode;
  // user.bankName = account.bank_name;
  user.accountNumber = account.account_number;
  user.accountName = account.account_name;

  await user.save();

  console.log(user.bankName);
  
  return {
  accountName: account.account_name,
  accountNumber: account.account_number,
  bankName: user.bankName,
  bankCode: data.bankCode,
};
};



// create Subaccount

export const createSubaccount = async (
  organizerId
) => {
  const user = await User.findByPk(organizerId);

  if (!user) {
    throw new NotFoundError("Organizer not found.");
  }

  if (!user.accountNumber || !user.bankCode) {
    throw new BadRequestError(
      "Verify your bank account first."
    );
  }

  const response = await paystack.post(
    "/subaccount",
    {
      business_name: `${user.firstName} ${user.lastName}`,
      settlement_bank: user.bankCode,
      account_number: user.accountNumber,
      percentage_charge: Number(process.env.PLATFORM_COMMISSION || 5),
    }
  );

  user.paystackSubaccountCode =
    response.data.data.subaccount_code;

  user.paymentSetupCompleted = true;

  await user.save();

  return {
    subaccountCode: user.paystackSubaccountCode,
    accountName: user.accountName,
    bankName: user.bankName,
  };
};


// get My Payment Setup

export const getMyPaymentSetup = async (
  organizerId
) => {
  const user = await User.findByPk(organizerId);

  if (!user) {
    throw new NotFoundError("Organizer not found.");
  }

  return {
    paymentSetupCompleted:
      user.paymentSetupCompleted,

    bankName: user.bankName,

    accountName: user.accountName,

    accountNumber: user.accountNumber,

    bankCode: user.bankCode,

    subaccountCode:
      user.paystackSubaccountCode,
  };
};