import { ConfigModule } from '@nestjs/config';
import ormConfig from './orm.config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [ormConfig],
});

export default ormConfig();
