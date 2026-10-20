import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Protection Policy",
  description: "Authentication forms built using the components.",
};

export default function DataProtectionPolicy() {
  return (
    <section className="pages container mb-24 mt-16">
      <h1 className="text-center">
        <strong>Data Protection Policy</strong>
      </h1>
      <p>Last updated September 26, {new Date().getFullYear()}</p>
      <h1>Overview</h1>
      <p>
        <span>
          Manage Your eCommerce (’we’, ’us’, ’our’) takes data protection seriously. This
          policy sets out how we seek to protect personal data and ensure all data
          processing complies with applicable data protection laws.
        </span>
      </p>
      <h1>Who We Are</h1>
      <p>
        <span>Our trading name is</span>
        <span>
          <em>Manage Your eCommerce</em>
        </span>
        <span>
          – that is what our eCommerce platforms, products and website are known by and
          the name our customers know us by.
          {/* Our Manage Your eCommerce platforms are owned
          and operated by Evident BD Limited.&nbsp; */}
        </span>
      </p>
      <p>
        {/* <span>
          Evident BD Ltd Limited is based in the UK, our registered office is at 620
          London Road, Grays, RM20 3HX, United Kingdom and our company registration number
          in the UK is 13017375.
        </span> */}
      </p>
      <p>
        <span>
          We are bound by applicable data protection laws in the EU, UK, and USA for the
          handling and collection of your data.&nbsp;
        </span>
      </p>
      <p>
        <span>
          We are registered as a data controller with the UK Information Commissioner’s
          Office (ICO) under the registration number ZB546717.
        </span>
      </p>
      <h1>Data Protection Officer</h1>
      <p>
        <span>
          Our Data Protection Officer oversees compliance with this policy. Contact them
          at:
        </span>
      </p>
      <p>
        <span>Email:</span>
        <span>data.protection@manageyourecommerce.com</span>
      </p>
      <h1>Personal Data We Process</h1>
      <p>
        <span>
          We process personal data provided to us by customers and visitors who use our
          services. This includes identity, contact, transactional and communications
          data.
        </span>
      </p>
      <p>
        <span>
          As a processor, we also process data on behalf of our customers. This includes
          orders, accounts and other ecommerce data belonging to their customers.
        </span>
      </p>
      <h1>Protecting Personal Data</h1>
      <p>
        <span>
          We utilise appropriate technical and organisational controls to protect data,
          including:
        </span>
      </p>
      <ul>
        <li>Encryption of data at rest and in transit</li>
        <li>Access controls and authentication</li>
        <li>Employee data security training</li>
        <li>Data minimization strategies</li>
        <li>PCI DSS compliance for payment data</li>
      </ul>
      <h1>Retention Periods</h1>
      <p>
        <span>
          We retain personal data as long as required to provide our services or meet
          legal obligations. Retention periods vary based on the type of data.
        </span>
      </p>
      <h1>Data Subject Rights</h1>
      <p>
        <span>
          Data subjects have certain rights over their personal data. These include rights
          of access, rectification, erasure, restriction of processing, data portability
          and objections to processing. Contact our Data Protection Officer to make
          requests.
        </span>
      </p>
      <h1>Legal Basis for Data Processing</h1>
      <p>
        <span>
          Our legal bases for processing personal data include consent, contractual
          necessity and our legitimate business interests. We only process special
          category data with explicit consent.
        </span>
      </p>
      <h1>Disclosure to Third Parties</h1>
      <p>
        <span>
          We disclose data to third parties only as necessary to provide our services,
          comply with legal obligations or obtain professional advice. Third parties must
          agree to process data according to our instructions and data protection laws.
        </span>
      </p>
      <h1>Complaints and Questions</h1>
      <p>
        <span>
          Please contact our Data Protection Officer with any queries or complaints about
          our data processing practices. You also have a right to lodge a complaint with
          your local supervisory authority.
        </span>
      </p>
      <h1>International Data Transfers</h1>
      <p>
        <span>
          We utilise Standard Contractual Clauses and other valid transfer mechanisms when
          transferring personal data internationally outside the UK/EEA, to ensure
          adequate data protection controls.
        </span>
      </p>
      <h1>Record Keeping</h1>
      <p>
        <span>
          We maintain internal records of data processing activities for demonstration of
          compliance with regulations. Records include processing purposes, data sharing
          and retention policies.
        </span>
      </p>
      <h1>Data Protection by Design</h1>
      <p>
        <span>
          We employ a Data Protection by Design approach when developing products and
          services, assessing data privacy risks early and designing features to prevent
          or mitigate potential impacts.
        </span>
      </p>
      <h1>Data Protection Impact Assessments</h1>
      <p>
        <span>
          We conduct assessments of high-risk data processing to identify and address
          privacy risks. Assessments evaluate necessity and proportionality, risks to
          rights and freedoms and measures to mitigate risks.
        </span>
      </p>
      <h1>Breach Notification</h1>
      <p>
        <span>
          We follow all applicable data breach notification laws. In the event of a
          qualifying data breach affecting EU or UK data subjects, we will notify
          supervisory authorities within 72 hours and affected data subjects without undue
          delay.
        </span>
      </p>
      <h1>Cookie Usage</h1>
      <p>
        <span>
          We use strictly necessary and functional cookies to deliver our online services.
          Analytics cookies help us understand interactions with our website. All cookies
          require the user’s consent before placement. Our Cookie Policy contains more
          details.
        </span>
      </p>
      <h1>Direct Marketing</h1>
      <p>
        <span>
          As permitted by law, we may contact individuals by email and other channels with
          updates about our products and services that may interest them. Every marketing
          message contains instructions on opting out from future communications.
        </span>
      </p>
      <h1>Protecting Special Categories of Personal Data</h1>
      <p>
        <span>
          We implement additional security protections when processing any special
          categories of personal data, such as health, biometric or religious data. These
          enhanced measures ensure compliance with legal obligations for sensitive data.
        </span>
      </p>
      <h1>Data Minimization</h1>
      <p>
        <span>
          We collect only the minimum amount of personal data necessary to deliver our
          services. Data collection is adequate, relevant and limited to fulfil stated
          purposes.
        </span>
      </p>
      <h1>Joint Controller Arrangements</h1>
      <p>
        <span>
          In situations where we jointly determine means and purposes of processing with
          another controller, we define our respective responsibilities for complying with
          data protection obligations through formal arrangements.
        </span>
      </p>
      <h1>Supplier Oversight</h1>
      <p>
        <span>
          We conduct information security assessments on third-party suppliers that may
          process personal data in order to continually evaluate whether their security
          controls are in line with legal requirements and our policies.
        </span>
      </p>
      <h1>Status of UK Data Post Brexit</h1>
      <p>
        <span>
          We recognize that the personal data of UK data subjects will continue receiving
          the UK GDPR standards of data protection, as provided by the Data Protection,
          Privacy and Electronic Communications Regulations. Our policy is to continue
          applying EU GDPR principles to UK data.
        </span>
      </p>
      <h1>Direct Marketing Consent Withdrawal</h1>
      <p>
        <span>
          Data subjects retain the right to withdraw consent for direct marketing
          communications at any time. Withdrawing consent for marketing will not affect
          your ability to use our core services. Users can withdraw consent by clicking
          unsubscribe links or contacting us directly.
        </span>
      </p>
      <p>
        <span>More Information</span>
      </p>
      <p>
        <span>
          Hopefully, this has made things clearer for you. As mentioned earlier, if there
          is anything you are unsure about regarding the policies or terms stated here,
          please don’t hesitate to contact us at hello@manageyourecommerce.com
        </span>
      </p>
    </section>
  );
}
