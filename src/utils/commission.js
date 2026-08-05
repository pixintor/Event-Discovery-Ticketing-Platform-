export const calculatePlatformCommission = (
  amount
) => {
  const percentage = Number(
    process.env.PLATFORM_COMMISSION || 5
  );

  return Math.round(
    (Number(amount) * percentage) / 100
  ) * 100;
};