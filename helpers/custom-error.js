class CustomErr extends Error {
  constructor(status, message) {
    super(message);
    this.statusCode = status;
  }
}

const CustomError = (status, message) => new CustomErr(status, message);

module.exports = CustomError;
