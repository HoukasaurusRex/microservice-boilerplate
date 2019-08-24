/**
 * Send hello
 * @param {Request} req
 * @param {Response} res
 */
module.exports = async (req, res) => {
  res.statusCode = 200
  res.send('hello!')
}
