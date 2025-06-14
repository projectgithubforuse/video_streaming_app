export const upgradeUser = async (req, res) => {
  const userId = req.userId;
  // Optionally verify paymentId with Razorpay API here
  await User.findByIdAndUpdate(userId, { isPremium: true });
  res.status(200).json({ message: "Upgraded to premium" });
};
// Add route in user.js
//router.post("/upgrade", auth, upgradeUser);