// FILE MAIN NOTE:
// - In this file we have the controllers which are the handler functions that go insidde the route.


const getEntries = async (req, res) => {
  res.send('Works, here are all the entries')
}

const createEntry = async (req, res) => {
  res.send('New Entry created')
}

module.exports = { getEntries, createEntry}