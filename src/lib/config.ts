/*
	Static configuration settings for use around the apps
*/

const configBase = {
  siteName: "Nick Frostbutter",
  twitter: "nickfrosty",
  domain: "nick.af",
};

const configDev = {
  ...configBase,
  BASE_URL: "http://localhost:3000",
  apiUrl: "http://localhost:3000/api",
};

const vercelURL = `https://${
  process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL || "nick.af"
}`;

const configProd = {
  ...configBase,
  BASE_URL: vercelURL || "https://nick.af",
  apiUrl: `${vercelURL}/api`,
};

// const config = configProd;
const config = process?.env?.NODE_ENV === "production" ? configProd : configDev;

// export { config };
export default config;
