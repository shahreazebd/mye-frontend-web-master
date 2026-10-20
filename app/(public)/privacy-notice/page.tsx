import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "Authentication forms built using the components.",
};

export default function PrivacyNotice() {
  return (
    <section className="pages container mb-24 mt-16">
      <h1 className="text-center">
        <strong>Product Privacy Notice</strong>
      </h1>

      <p>Last updated September 26, {new Date().getFullYear()}</p>
      <h1>Manage Your eCommerce Product Privacy Notice</h1>
      <p>
        <span>
          Our privacy notice lets you know how we look after your personal information
          when you are a Manage Your eCommerce Customer. If you are in the USA, this
          notice is also our Privacy Policy as required by some state privacy laws.&nbsp;
        </span>
      </p>
      <p>
        <span>
          We have consciously kept it short and sweet as we want this notice or policy
          (whatever you want to call it) to be accessible. We know that not many of you
          will take the time to read it, but for those that do, this notice or policy
          contains the information you have a legal right to know.&nbsp;
        </span>
      </p>
      <p>
        <span>
          European, UK, and US privacy laws are complicated and there is a lot to fit in,
          so we tried to make this as relevant as possible. This does not mean we don’t
          take the security and privacy of your information seriously, we really do, and
          we would be happy to tell you all the controls we have in place, just not here.
          You can find out more information on privacy and security controls that we have
          in place to protect your customer’s data (where we are acting as your data
          processor, not as data controller) on your product dashboard.
        </span>
      </p>
      <h2>Who we are</h2>
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
      {/* <p>
        <span>
          Evident BD Ltd Limited is based in the UK, our registered office is at 620
          London Road, Grays, RM20 3HX, United Kingdom and our company registration number
          in the UK is 13017375.
        </span>
      </p> */}
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
      <h2>Categories of data we collect on &amp; a lawful basis</h2>
      <p>
        <span>
          We collect the following information from you when you are a Manage Your
          eCommerce customer only:
        </span>
      </p>
      <ul>
        <li>
          Identity data and contact data include you and your employee’s first name, last
          names and titles, email addresses, details about your business, invoicing
          information and banking details,
          <strong className="pl-2">Lawful Basis:</strong>
          Contract&nbsp;
        </li>
        <li>
          Transaction data includes details about payments to and from you and details of
          products and services you have purchased from us,
          <strong className="pl-2">Lawful Basis:</strong>
          Contract&nbsp;
        </li>
        <li>
          Profile data includes your username and password
          <strong className="pl-2">Lawful Basis:</strong>
          Contract&nbsp;
        </li>
        <li>
          Technical data includes customer IP address and where customers log in from
          using the product<strong className="pl-2">Lawful Basis:</strong>
          Legitimate Interest&nbsp;
        </li>
        <li>
          You and your employees’ business contact details for marketing purposes,
          <strong className="pl-2">Lawful Basis</strong>: Legitimate Interest&nbsp;
        </li>
      </ul>
      <p>
        <span>
          Our Legitimate Interest means the interest of our business in conducting and
          managing our business, by ensuring our products are running effectively and
          securely, monitoring technical performance, and continuously improving our
          product and your experience in using our e-commerce platforms, growing our
          business by informing you of other Manage Your eCommerce products and services
          and product updates we think might benefit your business.&nbsp;
        </span>
      </p>
      <ol>
        <li>
          <h3>Purpose for collection</h3>
        </li>
      </ol>
      <p>
        <span>We collect this information so we can:&nbsp;</span>
      </p>
      <ul>
        <li>Provide you and your business with the Manage Your eCommerce services.</li>
        <li>
          Ensure our platform and services are operating securely and efficiently identify
          service improvements, check and monitor user activity, and identify performance
          issues.&nbsp;
        </li>
      </ul>
      <ol>
        <li>
          <h3>Who do we share data with</h3>
        </li>
      </ol>
      <p>
        <span>
          In some circumstances, we may need to share your data with third-party service
          providers who may have access to your personal information to perform certain
          functions or may host your personal information as part of a “cloud-based”
          solution used by Manage Your eCommerce such as:
        </span>
      </p>
      <ul>
        <li>Our customer relationship management platform provider;&nbsp;</li>
        <li>Our website support and hosting services providers;</li>
        <li>Our user experience video provider;</li>
        <li>Our Chatbot provider;&nbsp;</li>
        <li>Our Telephony provider;</li>
        <li>
          IT providers such as our cloud hosting provider, support ticketing provider,
          email providers;
        </li>
        <li>
          Professional advisers including lawyers, bankers, auditors, and insurers based
          in the USA, UK and Estonia;
        </li>
        <li>Marketing and PR providers.</li>
      </ul>
      <p>
        <span>
          {/* Data may be shared within our Evident BD Ltd in the UK. Evident BD Ltd
          specializes in eCommerce software and products. */}
          Your data may be shared to provide technical support, quality testing, support
          with customer development projects, identification of cross-sell and upsell
          opportunities and answer your queries about Manage Your eCommerce products or
          other services.
        </span>
      </p>
      <ol>
        <li>
          <h3>How long we keep your data for</h3>
        </li>
      </ol>
      <p>
        <span>
          We will only retain your data for as long as necessary to fulfil the purposes we
          collected it for, including to satisfy any legal, accounting, or reporting
          requirements. Our Customer data (
        </span>
        <span>
          <em>not your customer data</em>
        </span>
        <span>
          ) will be held for as long as we need to comply with audit, accountancy and tax
          rules, in most cases this is 6 years following the end of your contract with us.
        </span>
      </p>
      <p>
        <span>
          If you tell us that you no longer wish to receive such communications, your data
          will be removed from our marketing lists (but will be added to a “do not
          contact” list).
        </span>
      </p>
      <p>
        <span>
          In some circumstances, we may anonymize your data (so that it can no longer be
          associated with you) for research or statistical purposes in which case we may
          use this information indefinitely without further notice to you.
        </span>
      </p>
      <ol>
        <li>
          <h3>Your rights over your data</h3>
        </li>
      </ol>
      <h5>UK and EU residents’ rights&nbsp;</h5>
      <ul>
        <li>
          The right to be informed about the collection and use of your personal data.
          This is the intention of this privacy notice.&nbsp;
        </li>
        <li>
          Request access to your personal information (commonly known as a “data subject
          access request”). This enables you to receive a copy of the personal information
          we hold about you and to check that we are lawfully processing it.&nbsp;
        </li>
        <li>
          Request rectification of the personal information that we hold about you. This
          enables you to have any incomplete or inaccurate information we hold about you
          corrected.&nbsp;
        </li>
        <li>
          Request the erasure of your personal information. This enables you to ask us to
          delete or remove personal information where there is no good reason for us
          continuing to process it. You also have the right to ask us to delete or remove
          your personal information where you have exercised your right to object to
          processing.&nbsp;
        </li>
        <li>
          Object to processing of your personal information where we are relying on a
          legitimate interest and there is something about your situation which makes you
          want to object to processing on this ground.&nbsp;
        </li>
        <li>
          Request the restriction of processing of your personal information. This enables
          you to ask us to suspend the processing of personal information about you.&nbsp;
        </li>
      </ul>
      <p>
        <span>
          If you would like to exercise any of these rights, please contact our Data
          Protection Officer at
        </span>
        <span>
          <em>data.protection@manageyourecommerce.com</em>
        </span>
      </p>
      <h5>US residents’ rights&nbsp;</h5>
      <p>
        <span>
          Your rights over your data will depend on which state you live in.&nbsp;
        </span>
      </p>
      <p>
        <span>
          If you live in California, Colorado, Connecticut, Iowa, Utah, or Virginia, you
          have the following rights over your consumer data: (Please note the definition
          of consumer data varies from state to state. As our services are targeted at
          business customers, only California business owners and residents are likely to
          be considered consumer data: other states will be considered on a case-by-case
          basis):
        </span>
      </p>
      <ul>
        <li>
          Right to Know/ Access. You have the right to request information on, the
          personal information we collected about you in the last 12 months, including the
          categories of personal information, the categories of sources from which your
          personal information was collected, the business or commercial purpose for
          collecting, selling, or sharing your personal information, the categories of
          third parties to whom we disclosed your personal information to, and the
          specific pieces of personal information we have collected about you;&nbsp;
        </li>
        <li>
          Right to Delete. (Excluding Utah) You have the right to request that we delete
          Personal Data that we have collected from you, subject to certain
          exceptions.&nbsp;&nbsp;
        </li>
        <li>
          Right to Correct. (Excluding Iowa and Utah) You have a right to request that we
          correct inaccurate Personal Data that we maintain on you.&nbsp;&nbsp;
        </li>
        <li>
          Right to Opt-Out. (Excluding Iowa) You have the right to opt out of the sale of
          your Personal Data. However please note that we do not sell your Personal
          Data.&nbsp;&nbsp;
        </li>
        <li>
          Right to Opt-Out of Targeted Advertising and Profiling You have a right to opt
          out of targeted advertising and profiling (excluding Utah and Iowa). You can do
          this through the cookie banner on our website or by emailing us.
        </li>
        <li>
          Right to No Discrimination (California only). You have the right not to receive
          discriminatory treatment by us just because you exercised any of your privacy
          rights such as charging a different price or providing a different level of
          service. This right extends to employees, applicants, and independent
          contractors.
        </li>
      </ul>
      <p>
        <span>
          If you would like to exercise any of these rights please contact our Data
          Protection Officer at
        </span>
        <span>data.protection@manageyourecommerce.com</span>
        <span>
          or you can write to us at Data Protection Officer, 620 London Road, Grays, RM20
          3HX, UK.&nbsp;
        </span>
      </p>
      <p>
        <span>
          Where your state laws allow for a right of appeal if you are not satisfied with
          the initial response to your rights requests, you should contact
        </span>
        <span>data.protection@manageyourecommerce.com</span>
        <span>
          and our Group Data Protection Officer will review how your request was dealt
          with.&nbsp;
        </span>
      </p>
      <p>
        <span>
          Texas, Florida, Oregon, Montana, Tennessee, and Indiana all have privacy laws
          coming into force in the coming years which will provide individuals with some
          of the rights listed above.&nbsp;
        </span>
      </p>
      <ol>
        <li>
          <h3>Cookies and Third-Party websites</h3>
        </li>
      </ol>
      <p>
        <span>
          As you interact with our product, we may automatically collect technical data
          about your equipment, browsing actions and patterns. We collect this personal
          data by using cookies and other similar technologies. Our products use cookies
          to distinguish you from other users. This helps us to provide you with a more
          relevant and meaningful digital experience when you use our product.&nbsp;
        </span>
      </p>
      <p>
        <span>
          A cookie is a small file of letters and numbers that we store on your browser or
          the hard drive of your computer. We only use (and store) non-essential cookies
          on your computer’s browser or hard drive if you provide your consent. These
          cookies deliver relevant content to you and measure or understand the
          effectiveness of our product usage, data analytics cookies are used to improve
          the efficacy of our product, services, customer relationships and product
          experience.
        </span>
      </p>
      <p>
        <span>
          Our product may include links to third-party websites, plug-ins and
          applications. Clicking on those links or enabling those connections may allow
          third parties to collect or share data about you. We do not control these
          third-party websites and are not responsible for their privacy statements.
        </span>
      </p>
      <ol>
        <li>
          <h3>Queries and complaints</h3>
        </li>
      </ol>
      <p>
        <span>You can contact our Data Protection Officer at</span>
        <span>data.protection@manageyourecommerce.com</span>
        <span>
          at any time if you have any concerns or questions regarding the way your
          personal data is treated or handled.
        </span>
      </p>
      <p>
        <span>
          If you are a UK Resident you also have the right to make a complaint at any time
          to the Information Commissioner Office
        </span>
        <span>https://ico.org.uk/make-a-complaint/</span>
        <span>
          . However, we would appreciate the chance to deal with your concerns before, so
          please get in touch with us first.
        </span>
      </p>
      <ol>
        <li>
          <h3>Manage Your eCommerce as a ‘Data Processor’&nbsp;</h3>
        </li>
      </ol>
      <p>
        <span>
          We provide E-Commerce platforms which provide automated inventory and order
          management software, shipping and warehouse management and stock forecasting, to
          you, our business customers, to make sure your business can deliver a seamless
          service to your customers.&nbsp;
        </span>
      </p>
      <p>
        <span>To do this we act as what is known as a ‘</span>
        <span>
          <em>data processor</em>
        </span>
        <span>’, or if you are in California, a ‘</span>
        <span>
          <em>service provider</em>
        </span>
        <span>’ or ‘</span>
        <span>
          <em>contractor’</em>
        </span>
        <span>
          , for your customer’s personal data. The data that we process for you will vary
          depending on the integrations, products and services, and any customization you
          have. However, typically, as a data processor or service provider we process the
          following personal data for our customers’ customers: Your customer’s name,
          email address, phone number, address, username and/or user ID, transaction
          history, and order notes.&nbsp;
        </span>
      </p>
      <p>
        <span>
          European, UK and most State privacy laws require that you have a contract in
          place with data processors or service providers: these contracts are usually
          called Data Processing Agreements. If you would like a copy of the Data
          Processing Agreement covering the Manage Your eCommerce platforms or products or
          you have any questions or require assurances about our responsibilities and
          accountabilities as a data processor please, contact
        </span>
        <span>data.protection@manageyourecommerce.com</span>
        <span>
          and we would be happy to provide you with a copy or respond to your
          enquiries.&nbsp;
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
