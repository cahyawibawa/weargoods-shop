import swell from "@/lib/swell";
import { BASE_URL } from "@/constants";
export const getCurrentUser = () => swell.account.get();

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const loginSuccessful = await swell.account.login(email, password);
  if (loginSuccessful) {
    // Login successful
    return;
  } else {
    // Login failed
    throw new Error("Incorrect email or password");
  }
};

export const createUser = (input: swell.Account) => swell.account.create(input);

export const logoutUser = () => swell.account.logout();

export const updateAccount = (input: swell.Account) =>
  swell.account.update(input);

// export const sendPasswordResetEmail = async (
//   email: string,
//   resetKey: string
// ) => {
//   const resetUrl = `${BASE_URL}/signin/reset-password/step-2?key=${resetKey}`;

//   try {
//     await swell.account.recover({
//       email: email,
//       reset_url: resetUrl,
//     });
//     console.log("Password reset email sent successfully");
//   } catch (error) {
//     console.error("Failed to send password reset email:", error);
//   }
// };

// export const resetPassword = async (resetKey: string, password: string) => {
//   try {
//     await swell.account.recover({
//       password: password,
//       reset_key: resetKey,
//     });
//     console.log("Password reset successfully");
//   } catch (error) {
//     console.error("Failed to reset password:", error);
//     throw error; // re-throw the error to handle it in the form submission
//   }
// };
