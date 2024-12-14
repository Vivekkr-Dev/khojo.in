import { connect } from "mongoose";

const connectDb = async (url:string) => {
  return connect(url);
};

export default connectDb;
