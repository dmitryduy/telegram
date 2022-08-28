import withPlatform from '../../hocs/withPlatform';

import desktop from './PartnerInfo@desktop';
import touchPhone from './PartnerInfo@touch-phone';

export default withPlatform({desktop, 'touch-phone': touchPhone});
