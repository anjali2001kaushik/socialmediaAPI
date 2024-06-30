import mongoose from 'mongoose';
export const dbConnectionLoad = ()=>{
const promise = mongoose.connect(process.env.DB_URL);
return promise;
}
export default mongoose;
