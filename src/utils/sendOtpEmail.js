import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  pool: true,
  maxConnections: 3,
  maxMessages: 100,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOtpEmail = async (email, otp) => {
  const start = Date.now();

  try {
    await transporter.sendMail({
      from: `"Foodie" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your Foodie Account",

      // Don't wait for external images/resources.
      // The email itself will still load the logo when opened.
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Foodie Verification</title>
</head>

<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
<tr>
<td align="center">

<table width="620" cellpadding="0" cellspacing="0"
style="
max-width:620px;
background:#111111;
border:1px solid #2d2d2d;
border-radius:18px;
overflow:hidden;
">

<tr>
<td align="center" style="padding:45px 30px 25px;">

<img
src="https://raw.githubusercontent.com/MohdAyaanAnsari/Foodie_Photos/refs/heads/main/about/about.png"
alt="Foodie"
width="240"
style="display:block;border:0;max-width:240px;"
>

</td>
</tr>

<tr>
<td align="center" style="padding:0 40px;">

<h1
style="
margin:0;
color:#ffffff;
font-size:30px;
font-weight:700;
letter-spacing:1px;
">
Welcome to Foodie
</h1>

<p
style="
margin:18px 0 0;
color:#bdbdbd;
font-size:16px;
line-height:28px;
">
Use the verification code below to securely verify your identity.
</p>

</td>
</tr>

<tr>
<td align="center" style="padding:40px;">

<table cellpadding="0" cellspacing="0">
<tr>
<td
style="
background:#b8860b;
padding:2px;
border-radius:14px;
">

<table cellpadding="0" cellspacing="0">
<tr>
<td
style="
background:#0d0d0d;
padding:18px 42px;
border-radius:12px;
">

<span
style="
font-size:42px;
font-weight:700;
letter-spacing:12px;
color:#F5D27A;
">
${otp}
</span>

</td>
</tr>
</table>

</td>
</tr>
</table>

</td>
</tr>

<tr>
<td align="center" style="padding:0 40px;">

<p
style="
margin:0;
color:#d0d0d0;
font-size:15px;
line-height:28px;
">
This verification code is valid for
<b style="color:#F5D27A;">5 minutes</b>.
</p>

<p
style="
margin:18px 0 0;
color:#7f7f7f;
font-size:14px;
line-height:24px;
">
If you didn't request this code,
you can safely ignore this email.
</p>

</td>
</tr>

<tr>
<td style="padding:45px 40px 30px;">

<hr style="border:none;border-top:1px solid #2d2d2d;">

<p
style="
margin:30px 0 0;
text-align:center;
font-size:13px;
color:#8d8d8d;
letter-spacing:2px;
">
TASTE THE TRADITION
</p>

<p
style="
margin:12px 0 0;
text-align:center;
font-size:12px;
color:#666;
">
© ${new Date().getFullYear()} Foodie.
All Rights Reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
      `,
    });

    console.log(`OTP email sent to ${email} in ${Date.now() - start}ms`);
  } catch (error) {
    console.error("OTP email error:", error);
    throw new Error("Failed to send OTP email");
  }
};