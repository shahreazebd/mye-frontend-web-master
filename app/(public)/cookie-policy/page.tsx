import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Authentication forms built using the components.",
};

export default function CookiePolicy() {
  return (
    <section className="pages container mb-24 mt-16">
      <h1 className="text-center">
        <strong>Cookie Policy</strong>
      </h1>

      <p>Last updated September 26, {new Date().getFullYear()}</p>
      <p>
        Our website uses cookies to distinguish you from other users of our website. This
        helps us to provide you with a more relevant and meaningful digital experience
        when you browse our website and also allows us to improve our website.
      </p>
      <h1>What are cookies?</h1>
      <p>
        Cookies are small text files that are placed on your computer or device by
        websites that you visit. Websites use cookies to help users navigate efficiently
        and perform certain functions. Cookies that are required for the website to
        operate properly are allowed to be set without your permission. All other cookies
        need to be approved before they can be set in the browser. We only use (and store)
        non-essential cookies on your computer’s browser or hard drive if you provide your
        consent.
      </p>
      <h1>What cookies do we use?</h1>
      <p>
        We use a number of different cookies on our website, including strictly necessary,
        performance, targeting, and functionality cookies.
      </p>
      <p>
        Strictly necessary cookies allow core website functionality such as user login and
        account management. The website cannot be used properly without strictly necessary
        cookies.
      </p>
      <p>
        Performance cookies are used to see how visitors use the website, eg. first and
        third-party analytics cookies. Those cookies cannot be used to directly identify a
        certain visitor.
      </p>
      <p>
        Targeting cookies identify visitors between different websites, eg. content
        partners, and banner networks. Those cookies may be used by companies to build a
        profile of visitor interests or show relevant ads on other websites.
      </p>
      <p>
        Functionality cookies are used to remember visitor information on the website, eg.
        language, timezone, and enhanced content.
      </p>
      <p>You can review the details of each of our cookies below:</p>
      <p>Strictly Necessary:</p>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Company</strong>
              </td>
              <td>
                <strong>Identifier</strong>
              </td>
              <td>
                <strong>Purpose</strong>
              </td>
              <td>
                <strong>Storage Time</strong>
              </td>
            </tr>
            <tr>
              <td>Manage Your eCommerce</td>
              <td>CookieScriptConsent</td>
              <td>
                This cookie is used to store the user’s consent for the usage of cookies
                on the website.
              </td>
              <td>1 month</td>
            </tr>
            <tr>
              <td>Pardot</td>
              <td>visitor_id*</td>
              <td>
                This cookie appends a unique identifier for a website visitor, used for
                tracking purposes in Pardot.
              </td>
              <td>3 years</td>
            </tr>
            <tr>
              <td>Pardot</td>
              <td>visitor_id*-hash</td>
              <td>
                This cookie appends a unique identifier for a website visitor, used for
                tracking purposes in Pardot.
              </td>
              <td>3 years</td>
            </tr>
            <tr>
              <td>CHEQ AI Technologies</td>
              <td>_cq_duid</td>
              <td>
                These cookies are managed by CHEQ AI Technologies. They monitor the
                technical information and use of devices that connect to our website to
                protect it from malicious traffic.
              </td>
              <td>3 months</td>
            </tr>
            <tr>
              <td>CHEQ AI Technologies</td>
              <td>_cq_suid</td>
              <td>
                These cookies are managed by CHEQ AI Technologies. They monitor the
                technical information and use of devices that connect to our website to
                protect it from malicious traffic.
              </td>
              <td>Session</td>
            </tr>
            <tr>
              <td>CHEQ AI Technologies</td>
              <td>_cheq_rti</td>
              <td>
                These cookies are managed by CHEQ AI Technologies. They monitor the
                technical information and use of devices that connect to our website to
                protect it from malicious traffic.
              </td>
              <td>1 year</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Analytics:</p>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Company</strong>
              </td>
              <td>
                <strong>Identifier</strong>
              </td>
              <td>
                <strong>Purpose</strong>
              </td>
              <td>
                <strong>Storage Time</strong>
              </td>
            </tr>
            <tr>
              <td>Google Analytics</td>
              <td>_ga</td>
              <td>Google Analytics cookie to store and count page views.</td>
              <td>1 year</td>
            </tr>
            <tr>
              <td>Google Analytics 4</td>
              <td>_ga_MSCVR6GWX0</td>
              <td>Google Analytics cookie to store and count page views.</td>
              <td>1 year</td>
            </tr>
            <tr>
              <td>Google Analytics</td>
              <td>_ga_ZQ16J8NQKB</td>
              <td>Google Analytics cookie to store and count page views.</td>
              <td>1 year</td>
            </tr>
            <tr>
              <td>Google Analytics</td>
              <td>_gid</td>
              <td>Google Analytics cookie to store and count page views.</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>TikTok</td>
              <td>_tt_enable_cookie</td>
              <td>
                To store and track website activity for TikTok advertising optimisation.
              </td>
              <td>13 months</td>
            </tr>
            <tr>
              <td>Tiktok</td>
              <td>_ttp</td>
              <td>
                To store and track website activity for TikTok advertising optimisation.
              </td>
              <td>13 months</td>
            </tr>
            <tr>
              <td>Bing Ads</td>
              <td>_uetsid</td>
              <td>To store and track visitor information for Bing Ads.</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Bing Ads</td>
              <td>_uetvid</td>
              <td>To store and track visitor information for Bing Ads.</td>
              <td>13 months</td>
            </tr>
            <tr>
              <td>Adroll Pixel</td>
              <td>_adroll_fpc</td>
              <td>To store and track conversions for Adroll.</td>
              <td>1 year</td>
            </tr>
            <tr>
              <td>6sense</td>
              <td>_gd_session</td>
              <td>
                6sense cookie that collects visitor data related to the user’s visit to
                the website, such as number of visits, average time spent on the website
                and which pages have been loaded, for the purpose of serving targeted
                advertisements.
              </td>
              <td>4 hours</td>
            </tr>
            <tr>
              <td>6sense</td>
              <td>_gd_svisitor</td>
              <td>
                6sense cookie that collects visitor data related to the user’s visit to
                the website, such as number of visits, average time spent on the website
                and which pages have been loaded, for the purpose of serving targeted
                advertisements.
              </td>
              <td>1 year</td>
            </tr>
            <tr>
              <td>6sense</td>
              <td>_gd_visitor</td>
              <td>
                6sense cookie that collects visitor data related to the user’s visit to
                the website, such as number of visits, average time spent on the website
                and which pages have been loaded, for the purpose of serving targeted
                advertisements.
              </td>
              <td>1 year</td>
            </tr>
            <tr>
              <td>LinkedIn</td>
              <td>In_or</td>
              <td>LinkedIn insights cookie.</td>
              <td>1 day</td>
            </tr>
            <tr>
              <td>Instapage</td>
              <td>instap-spid.4203</td>
              <td>
                To set the domain_userid – an identifier that identifies a user on the
                particular domain. Used to distinguish if a user’s visit is unique or not
                for Instapage.
              </td>
              <td>2 years</td>
            </tr>
            <tr>
              <td>Instapage</td>
              <td>instap-spses.4203</td>
              <td>To help count visitors’ sessions on the client side for Instapage.</td>
              <td>30 minutes</td>
            </tr>
            <tr>
              <td>Instapage</td>
              <td>instapage-variant-23488101</td>
              <td>Cookie used for A/B testing purposes (Experiments) for Instapage.</td>
              <td>1 year</td>
            </tr>
            <tr>
              <td>Youtube</td>
              <td>YSC</td>
              <td>This cookie is set by YouTube to track views of embedded videos.</td>
              <td>Session</td>
            </tr>
            <tr>
              <td>Youtube</td>
              <td>VISITOR_INFO1_LIVE</td>
              <td>
                This cookie is set by YouTube to keep track of user preferences for
                Youtube videos embedded in sites; it can also determine whether the
                website visitor is using the new or old version of the YouTube interface.
              </td>
              <td>6 months</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Targeting:</p>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Company</strong>
              </td>
              <td>
                <strong>Identifier</strong>
              </td>
              <td>
                <strong>Purpose</strong>
              </td>
              <td>
                <strong>Storage Time</strong>
              </td>
            </tr>
            <tr>
              <td>Facebook Pixel</td>
              <td>_fbp</td>
              <td>
                Used by Facebook to deliver advertising. The cookie contains an encrypted
                Facebook user ID and browser ID. It will receive information from this
                website to better target and optimize advertising.
              </td>
              <td>3 months</td>
            </tr>
            <tr>
              <td>Google Ads Remarketing</td>
              <td>_gcl_au</td>
              <td>To store and track conversions for Google Ads.</td>
              <td>3 months</td>
            </tr>
            <tr>
              <td>Google Ads Remarketing</td>
              <td>_gcl_aw</td>
              <td>To store and track conversions for Google Ads.</td>
              <td>3 months</td>
            </tr>
            <tr>
              <td>DoubleClick (Google) (or is it Adroll?)</td>
              <td>_ar_v4</td>
              <td>
                This cookie is associated with the DoubleClick advertising service from
                Google. Helps with tracking conversion rates for ads.
              </td>
              <td>6 years</td>
            </tr>
            <tr>
              <td>6sense</td>
              <td>_an_uid</td>
              <td>
                This cookie enables 6sense to present the user with relevant content and
                advertisements. The service is provided by third-party advertisement hubs,
                which facilitate real-time bidding for advertisers.
              </td>
              <td>1 month</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>More Information</p>
      <p>
        Hopefully, this has made things clearer for you. As mentioned earlier, if there is
        anything you are unsure about regarding the policies or terms stated here, please
        don’t hesitate to contact us at hello@manageyourecommerce.com
      </p>
    </section>
  );
}
