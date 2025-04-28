import { connectDB } from '../helpers/db.js';

export const insert = async()=>{
  const client = await connectDB();
  const makers = client.collection('makers');
  const data = [
      { code: "1", name: 'Asus' },
      { code: "2", name: 'Lenovo' },
      { code: "3", name: 'Hewlett-Packard' },
      { code: "4", name: 'Samsung' },
      { code: "5", name: 'Seagate' },
      { code: "6", name: 'Crucial' },
      { code: "7", name: 'Gigabyte' },
      { code: "8", name: 'Huawei' },
      { code: "9", name: 'Xiaomi' }
  ];    
  try {
      let res = await makers.insertMany(data);
      console.log("Datos de los fabricantes insertados");
      console.log(res);
      
  } catch ({writeErrors, ...error}) {
      const { 
          errInfo: {details:{schemaRulesNotSatisfied}}
      } = writeErrors[0].err;
      console.log(schemaRulesNotSatisfied[0]);
  } finally {
      await client.close();
      console.log("maker data connection closed");
  }
}