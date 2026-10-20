import { Metadata } from "next";

export const metadata: Metadata = {
  // title: "Privacy Policy - Evident BD Ltd",
  title: "Privacy Policy",
  description:
    // "Privacy Policy outlining data collection, usage, and protection measures by Evident BD Ltd.",
    "Privacy Policy outlining data collection, usage, and protection measures.",
};

export default function PrivacyPolicy() {
  return (
    <section className="pages container mb-24 mt-16">
      <h1 className="text-center">
        <strong>Privacy Policy</strong>
      </h1>

      <p>
        <strong>Last Updated:</strong> September 26, {new Date().getFullYear()}
      </p>
      <h3>1. Introduction</h3>
      <p>
        This Privacy Policy outlines how Manage Your eCommerce
        {/* Evident BD Ltd (&ldquo;we,&rdquo;
        &ldquo;us,&rdquo; &ldquo;our&rdquo;) */}
        collects, uses, shares, and safeguards personal data through the Manage Your
        eCommerce platforms and services. We are committed to respecting and protecting
        your privacy in compliance with data protection regulations across the EU, UK, and
        USA, including the requirements set forth by Amazon, eBay, and other marketplaces.
      </p>
      {/* <p>
        Evident BD Ltd is based in the United Kingdom, with its registered office at{" "}
        <strong>620 London Road, Grays, RM20 3HX, United Kingdom</strong>. The company
        registration number in the UK is <strong>13017375</strong>. We are registered with
        the UK Information Commissionerʼs Office (ICO) as a data controller under
        registration number <strong>ZB546717</strong>.
      </p> */}
      <h3>2. Scope</h3>
      <p>
        This policy applies to all users of Manage Your eCommerce platforms, including
        individual customers and business users. It encompasses data collected directly or
        indirectly via our platforms, products, and integrations with third-party
        services, including Amazon and eBay.
      </p>
      <h3>3. Categories of Data We Collect</h3>
      <p>
        We collect, process, and store various types of personal data to provide, improve,
        and personalise our services. Data collected is based on our legitimate business
        interests, contractual obligations, and legal compliance.
      </p>
      <h5>3.1 Identity and Contact Data</h5>
      <ul>
        <li>Names (first and last) and titles of customers and their employees.</li>
        <li>Email addresses, business details, and invoicing information.</li>
        <li>Banking details for transaction processing.</li>
      </ul>
      <p>
        <strong>Lawful Basis:</strong> Contract
      </p>
      <h5>3.2 Transaction Data</h5>
      <ul>
        <li>Information about payments to and from users.</li>
        <li>Details of products and services purchased.</li>
      </ul>
      <p>
        <strong>Lawful Basis:</strong> Contract
      </p>
      <h5>3.3 Profile Data</h5>
      <ul>
        <li>Username, password, and account preferences.</li>
      </ul>
      <p>
        <strong>Lawful Basis:</strong> Contract
      </p>
      <h5>3.4 Technical Data</h5>
      <ul>
        <li>IP addresses, login locations, and device information.</li>
        <li>
          Information on system performance and activity to monitor product integrity.
        </li>
      </ul>
      <p>
        <strong>Lawful Basis:</strong> Legitimate Interest
      </p>
      <h5>3.5 Marketing Data</h5>
      <ul>
        <li>Business contact information for promotional communications.</li>
      </ul>
      <p>
        <strong>Lawful Basis:</strong> Legitimate Interest
      </p>
      <h3>4. Purpose for Collection</h3>
      <p>The data we collect is essential for:</p>
      <ul>
        <li>Delivering Manage Your eCommerce products and services to businesses.</li>
        <li>
          Ensuring system security, efficient performance, and service improvements.
        </li>
        <li>
          Informing customers of product updates, new features, or additional services
          that could benefit their businesses.
        </li>
        <li>
          Maintaining compliance with legal obligations for audit and regulatory purposes.
        </li>
      </ul>
      <h3>5. Data Sharing and Third-Party Access</h3>
      <p>
        We may share user data with select third parties only when necessary to provide
        services or fulfill legal obligations.
      </p>
      <h5>5.1 Service Providers</h5>
      <p>
        Manage Your eCommerce collaborates with third-party providers, who may access or
        process personal data under strict confidentiality and data protection agreements.
        These providers include:
      </p>
      <ul>
        <li>
          <strong>CRM Platforms</strong> for customer management.
        </li>
        <li>
          <strong>Cloud Hosting Services</strong> for data storage and processing.
        </li>
        <li>
          <strong>Technical Support Providers</strong> to resolve service issues.
        </li>
        <li>
          <strong>Payment Processors</strong> to handle transactions.
        </li>
        <li>
          <strong>Marketing and Analytics Providers</strong> for promotional outreach and
          product analytics.
        </li>
      </ul>
      <h5>
        5.2 Internal Sharing Within
        {/* Evident BD Ltd */}
      </h5>
      <p>
        Data may be shared within
        {/* Evident BD Ltd */}
        departments for:
      </p>
      <ul>
        <li>Customer support and technical assistance.</li>
        <li>Quality testing and improvement of services.</li>
        <li>Identifying and providing cross-sell and upsell opportunities.</li>
      </ul>
      <h5>5.3 Compliance with Legal and Regulatory Authorities</h5>
      <p>
        We may disclose data to authorities as required by law or to comply with requests
        from law enforcement or regulatory bodies, including:
      </p>
      <ul>
        <li>
          <strong>Anti-Fraud and Security Checks</strong> in compliance with Amazon, eBay,
          and other marketplace requirements.
        </li>
        <li>
          <strong>Legal Obligations</strong> such as audit, accounting, and tax
          obligations.
        </li>
      </ul>
      <h3>6. Data Retention and Disposal</h3>
      <p>
        We retain data only as long as necessary to fulfill the purposes for which it was
        collected, and in compliance with applicable legal and accounting requirements.
      </p>
      <h5>6.1 Retention Period</h5>
      <ul>
        <li>
          <strong>Customer Data</strong>: Retained for six years following the end of the
          customer contract to comply with audit and tax regulations.
        </li>
        <li>
          <strong>Marketing Data</strong>: Retained until unsubscribed or after the
          contract ends; contact data is then added to a &ldquo;do not contact&rdquo;
          list.
        </li>
        <li>
          <strong>Anonymised Data</strong>: May be retained indefinitely for statistical
          or research purposes.
        </li>
      </ul>
      <h5>6.2 Secure Disposal</h5>
      <p>
        Data is securely deleted or anonymised once it is no longer required. Physical
        media is disposed of through certified e-waste vendors following{" "}
        <strong>NIST SP 800-88</strong> guidelines for secure data destruction.
      </p>
      <h3>7. Your Rights Over Your Data</h3>
      <p>
        Depending on your location and applicable laws, you have certain rights regarding
        your personal data:
      </p>
      <h5>7.1 UK and EU Residents</h5>
      <ul>
        <li>
          <strong>Right to Be Informed</strong>: Receive information on how personal data
          is collected and used.
        </li>
        <li>
          <strong>Right of Access</strong>: Request access to personal data we hold about
          you.
        </li>
        <li>
          <strong>Right to Rectification</strong>: Correct inaccuracies in personal data.
        </li>
        <li>
          <strong>Right to Erasure</strong>: Request deletion of personal data, subject to
          legal obligations.
        </li>
        <li>
          <strong>Right to Object</strong>: Object to data processing based on legitimate
          interests.
        </li>
        <li>
          <strong>Right to Restrict Processing</strong>: Request temporary suspension of
          data processing.
        </li>
      </ul>
      <h5>7.2 US Residents</h5>
      <p>
        Your rights vary by state. California, Colorado, Connecticut, Iowa, Utah, and
        Virginia residents have rights including:
      </p>
      <ul>
        <li>
          <strong>Right to Access</strong>: Request details of personal data collected in
          the last 12 months.
        </li>
        <li>
          <strong>Right to Delete</strong>: Request data deletion with certain exceptions.
        </li>
        <li>
          <strong>Right to Correct</strong>: Correct inaccurate personal data.
        </li>
        <li>
          <strong>Right to Opt-Out</strong>: Opt-out of data sale and targeted
          advertising.
        </li>
      </ul>
      <p>
        For rights requests or queries, contact our Data Protection Officer at{" "}
        <a href="mailto:data.protection@manageyourecommerce.com">
          {" "}
          data.protection@manageyourecommerce.com{" "}
        </a>
      </p>
      <h3>8. Cookies and Third-Party Links</h3>
      <p>
        Manage Your eCommerce uses cookies to enhance user experience and collect data on
        usage patterns. Cookies help us:
      </p>
      <ul>
        <li>
          <strong>Optimise Service Delivery</strong>: Enable smooth navigation and
          functionality within our platforms.
        </li>
        <li>
          <strong>Analytics</strong>: Track usage statistics and improve service
          performance.
        </li>
      </ul>
      <p>
        We use only non-essential cookies with user consent. Links to third-party websites
        may appear on our platform; however, we do not control these sites and are not
        responsible for their privacy practices.
      </p>
      <h3>9. Data Security</h3>
      <p>
        We employ industry-leading methods to secure your data and comply with Amazon and
        eBay security requirements:
      </p>
      <ul>
        <li>
          <strong>Encryption</strong>: AES-256 encryption for all sensitive data.
        </li>
        <li>
          <strong>Multi-Factor Authentication (MFA)</strong>: Required for account access.
        </li>
        <li>
          <strong>Access Controls</strong>: Role-based access and regular audits.
        </li>
        <li>
          <strong>Data Minimisation</strong>: Collect and retain only necessary data for
          service provision.
        </li>
        <li>
          <strong>Endpoint Protection</strong>: Anti-malware tools and regular monitoring
          to prevent data breaches.
        </li>
      </ul>
      <h3>10. Compliance and Accountability</h3>
      <p></p>
      <h5>10.1 Data Processor Obligations</h5>
      <p>
        When acting as a data processor for our customers (e.g., processing end-customer
        data), we adhere to Amazon and eBay data processing standards. For additional
        assurance, customers may request a Data Processing Agreement (DPA) by contacting
        us.
      </p>
      <h5>10.2 Audits and Reviews</h5>
      <p>
        We regularly audit our data processing practices, internal access control, and
        data protection measures to ensure compliance. An annual review of this policy is
        conducted to reflect any regulatory changes.
      </p>
      <h3>11. Queries and Complaints</h3>
      <p>
        If you have questions or concerns regarding our data practices, please contact our
        Data Protection Officer at{" "}
        <strong>
          <a href="mailto:data.protection@manageyourecommerce.com">
            {" "}
            data.protection@manageyourecommerce.com
          </a>
        </strong>
        . UK residents may also submit complaints to the <strong>ICO</strong> via{" "}
        <a href="https://ico.org.uk/make-a-complaint">
          {" "}
          https://ico.org.uk/make-a-complaint{" "}
        </a>{" "}
        .
      </p>
    </section>
  );
}
