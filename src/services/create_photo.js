const fetch = require("node-fetch")

async function viewPhoto({keywords}) {
  const response = await fetch(`https://source.unsplash.com/1600x800/?${keywords}`)
  return response.url
}

module.exports = {
    viewPhoto,
}
