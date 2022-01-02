const {connectDb,Posts } = require('./mongodb');
const logger = require('./serverlog/logger');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

(async () => {
    try {
      await connectDb(process.env.DATABASE_URL);
      logger.info("DB connection successful!");
      let data = await Posts.find({});
      let counter = 0;
      for(let i = 0; i < data.length; i++){
        if(data[i].item.iterations >= 0){
        logger.info(`graphic: [${data[i].item.graphic}] has already an iterations prop => ignore`);
        } else {
            logger.info(`migrate graphic: [${data[i].item.graphic}]`);
            try {
                await Posts.updateOne({ _id: data[i]._id }, { $set: { ['item.iterations']: 0 } });
                counter++;
            } catch(err){
                logger.error(`update graphic [${data[i].item.graphic}] failed with: ${err}`);
            }
        }    
      };
      logger.info(`Migration done [${counter}/${data.length}] updated`)
    } catch (err) {
      logger.error(`DB connection failed: ${err}`);
    }
    process.exit(0);
})();

