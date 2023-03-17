import withPlatform from '../../hocs/withPlatform';

import common from './BackgroundPopup@common';

export default withPlatform({desktop: common, 'touch-phone': common});