// shared.js — Corporate Slate palette, icon helper, shadow factory
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

const C = {
  navy:"1C3557", iceBlue:"5B8DB8", pale:"D4E4F0",
  white:"FFFFFF", offWhite:"F3F6F9", accent:"3A7DC9",
  teal:"4A7FA8", mid:"2E5073", text:"1E2D3D",
  muted:"7A90A8", green:"3A7E6E", steel:"8096B0",
  red:"B03040", amber:"B87820",
  roleA:"2D6A8A", roleB:"3A7DC9", roleC:"3A7E6E",
};

const shadow = () => ({ type:"outer", color:"000000", blur:8, offset:3, angle:135, opacity:0.13 });

async function icon(Component, color="#FFFFFF", size=256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Component, { color, size:String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

module.exports = { C, shadow, icon };
