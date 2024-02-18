/*
	Static configuration settings for use around the apps
*/

export const SITE = {
  name: "Nick Frostbutter",
  domain: "nick.af",
  url:
    process.env.NODE_ENV == "development"
      ? "http://localhost:3000"
      : "https://nick.af",
};

export const SOCIAL = {
  twitter: "nickfrosty",
  github: "nickfrosty",
  indiehackers: "nickfrosty",
};

export default SITE;
