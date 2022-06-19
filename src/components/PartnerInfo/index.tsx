import desktop from "./PartnerInfo@desktop";
import touchPhone from "./PartnerInfo@touch-phone";
import withPlatform from "../../hocs/withPlatform";

export default withPlatform({desktop: desktop, 'touch-phone': touchPhone});
