import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security and Reliability",
  description: "Authentication forms built using the components.",
};

export default function SecurityandReliability() {
  return (
    <section className="pages container mb-24 mt-16">
      <h1 className="text-center">
        <strong>Security and Reliability</strong>
      </h1>

      <p>Last updated September 26, {new Date().getFullYear()}</p>
      <p>
        <span>
          At Manage Your eCommerce, the security of your data is our top priority. We
          utilise industry-leading protections across our entire infrastructure to keep
          your information safe.
        </span>
      </p>
      <h1>Secure Access</h1>
      <ul>
        <li>Login requires email and password</li>
        <li>Passwords are hashed and salted before encrypted storage</li>
        <li>128-bit SSL encryption between browser and servers</li>
        <li>Role-based access control for data</li>
        <li>Activity logging for audits</li>
      </ul>
      <p>
        <span>
          By leveraging multiple layers of access security, we ensure that only authorised
          users can access accounts and data.
        </span>
      </p>
      <h1>Robust Infrastructure</h1>
      <ul>
        <li className="underline">
          <strong>
            Manage Your eCommerce is hosted on Amazon Web Services, which provides
            extensive scalability, security, and redundancy. It is worth noting that
            renowned companies like Netflix, Adobe, Airbnb, Samsung, and NASA also utilise
            Amazon Web Services.
          </strong>
        </li>
        <li>Auto-scaling horizontally across nodes to manage growing traffic</li>
        <li>Load balancing distributes requests across available servers</li>
        <li>Multiple availability zones prevent downtime risk</li>
        <li>CDN caches assets globally for fast content delivery</li>
      </ul>
      <p>
        <span>
          Our infrastructure is designed for high performance, uptime and security even
          during peaks in traffic.
        </span>
      </p>
      <h1>Data Protection</h1>
      <ul>
        <li>Data ownership remains with you</li>
        <li>Database encryption protects sensitive information</li>
        <li>Hourly backups ensure no data loss</li>
        <li>Data isolation, partitioning and access controls</li>
        <li>Ongoing security audits and patching</li>
      </ul>
      <p>
        <span>
          Comprehensive data security policies safeguard your information at all points.
        </span>
      </p>
      <h1>Ongoing Security</h1>
      <ul>
        <li>Regular external penetration tests</li>
        <li>Pre-release code audits</li>
        <li>DDoS prevention and mitigation</li>
        <li>Kubernetes container orchestration</li>
        <li>Automated monitoring and alerting</li>
      </ul>
      <p>
        <span>
          Our dedicated security team utilises the latest technologies to protect your
          data around the clock.
        </span>
      </p>
      <h1>Dedicated Security Personnel</h1>
      <p>
        <span>
          Our experienced security team monitors protections and threats around the clock.
        </span>
      </p>
      <ul>
        <li>On-call incident response personnel</li>
        <li>Mandatory security awareness training</li>
        <li>Responsible disclosure policy</li>
        <li>Bug bounty program</li>
      </ul>
      <p>
        <span>
          With dedicated internal resources and external partnerships, we stay ahead of
          emerging threats.
        </span>
      </p>
      <h1>Future-Proof Encryption</h1>
      <p>
        <span>
          As computing power increases, encryption must keep pace to stay ahead of
          threats.
        </span>
      </p>
      <ul>
        <li>256-bit AES encryption on stored data</li>
        <li>Rotating encryption keys every 90 days</li>
        <li>Quantum-resistant encryption readiness</li>
      </ul>
      <p>
        <span>
          Our encryption leaves no room for compromise as technologies continue advancing.
          We take every measure to keep your data safe and our system running
          smoothly.&nbsp;
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
