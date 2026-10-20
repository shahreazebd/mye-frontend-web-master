import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Authentication forms built using the components.",
};

export default function TermsAndCondition() {
  return (
    <section className="pages container mb-24 mt-16">
      <h1 className="text-center">
        <strong>Terms and Conditions</strong>
      </h1>

      <p>Last updated September 26, {new Date().getFullYear()}</p>
      {/* <h1>Our Service</h1>
      <ol>
        <li>
          Manage Your eCommerce is a Platform (“Service”) provided by Evident BD Limited
          (“Manage Your eCommerce”, “us”, “our” or “we”) to you as our customer (“you” and
          “your”).
        </li>
        <li>
          These Terms and Conditions (“Terms and Conditions”) apply to the order by you
          and supply of services by us to you (“Contract”). We reserve the right to amend
          these Terms and Conditions at any time. You should refer to the Terms and
          Conditions on our website from time to time.
        </li>
        <li>
          Use of this Service and Additional Services introduced by Manage Your eCommerce
          and contained within the Manage Your eCommerce application constitutes
          acceptance by you of these Terms and Conditions and any amended Terms and
          Conditions that may be published.
        </li>
      </ol> */}
      <h1>Eligibility</h1>
      <ol>
        <li>
          You must be a minimum age of 18 to register for and use the Service. By
          registering and using the Service you warrant that you are 18 years or older and
          understand your obligations under these Terms and Conditions.
        </li>
      </ol>
      <h1>Registration and Account Integrity</h1>
      <ol>
        <li>
          As part of the registration process, you will need to create an account
          including a username and password. It is your responsibility to ensure that the
          information you provide is accurate, not misleading and relates to you. You
          cannot create an account or username and password using the names and
          information of another person or use words that are the trademarks or the
          property of another party (including ours) or are vulgar, obscene or in any
          other way inappropriate. We reserve the right with or without notice to suspend
          or terminate any account breach.
        </li>
        <li>
          Where we provide an organisation with several user licences for the Service
          these must be adhered to. User licences cannot be shared between users. A breach
          of this clause will result in the termination of accounts and/or all accounts
          provided to the organisation.
        </li>
        <li>
          If for any reason you suspect that your username and password have been
          disclosed to or obtained by another party you should contact us immediately.
          Please note that we never contact users requesting them to confirm their
          username and password or other details.
        </li>
      </ol>
      <h1>Pricing, Plans and Features</h1>
      <ol>
        <li>
          For current pricing and plans please see the pricing page located on our
          website.
        </li>
        <li>
          We reserve the right to change pricing, plans and the features offered at any
          time and without notice to you.
        </li>
        <li>
          We reserve the right, in our sole discretion, to charge for our subscription
          plans and features and to adjust any pricing associated with or incurred during
          the use of the Service, or any components thereof.&nbsp;
        </li>
      </ol>
      <h1>Payment and Credit Control</h1>
      <ol>
        <li>All Services are billed monthly in advance.</li>
        <li>
          If you upgrade from a free or trial account you will be immediately charged for
          the full account or accounts. Where you have a Monthly account your monthly
          payment will be due from that date each month onwards.
        </li>
        <li>
          Where the Service has been paid for 12 months in advance, (where this option is
          offered by us) payment will be taken in full on each anniversary (unless the
          account holder has requested to cancel before this date).
        </li>
        <li>
          It is a condition of use that a valid debit or credit card is provided at all
          times for your account or accounts to remain active.
        </li>
        <li>
          Where a credit or debit card payment request is made by us and is declined by
          your card company or bank (for whatever reason) access to your account or
          accounts may be suspended immediately until a valid payment has been processed
          and a valid credit or debit card is associated with your account or accounts.
        </li>
      </ol>
      <h1>Cancellation</h1>
      <ol>
        <li>
          You can cancel your Manage Your eCommerce subscription and give us 30 days’
          notice by completing the cancellation form, which can be obtained by sending an
          email to support@manageyourecommerce.com.&nbsp;
        </li>
        <li>
          <em>
            Please note that the cancellation process will not be triggered until we
            receive notification.)
          </em>
        </li>
        <li>
          Cancellation by any other means, including (but not limited to) telephone call,
          fax, text or live chat is not valid.
        </li>
        <li>
          No refunds will be provided for remaining unused days under a Monthly account or
          Annual account.
        </li>
        <li>
          Annual cancellations within the first 12 months will need to continue paying
          until the 12 months have expired. [No refund will be offered for days remaining
          in a Monthly cancellation].
        </li>
      </ol>
      <h1>Upgrading or Downgrading Accounts</h1>
      <ol>
        <li>
          Users can upgrade or downgrade their plans and the Services offered at any time.
        </li>
        <li>
          When an account is downgraded the applicable user will be responsible for all
          the data within the account and any loss of data caused by the downgrading and
          removal of any Service within the account connected to the downgrade.
        </li>
        <li>
          Users should backup and download account data before requesting a downgrade in
          Service.
        </li>
        <li>
          No refunds will be offered for downgraded Monthly accounts that have been
          downgraded before the monthly charge is due on the account. The new lower
          monthly charge will be automatically applied on the usual date of the monthly
          charge.
        </li>
        <li>
          Where an account is upgraded, the new higher monthly charge will be
          automatically applied on the next usual date of the monthly charge.
        </li>
        <li>
          In the case of Annual accounts (where offered), no refund will be offered for
          all complete remaining months of the Service where the user downgrades the
          account. No refund will be offered for days remaining in the month of the
          downgrade.
        </li>
        <li>
          Where an Annual account is upgraded the increased charge will be applied
          immediately to the account for the additional amount due until the anniversary
          date.
        </li>
      </ol>
      <h1>Trial and Offer Periods</h1>
      <ol>
        <li>
          Trial or offer periods are offered at our sole discretion and are subject to
          withdrawal at any time and without notice.
        </li>
        <li>
          Only one person may use a single free or trial account, the account cannot be
          shared amongst multiple individuals.
        </li>
        <li>
          These Terms and Conditions apply to all accounts, including trial or offer
          period accounts.
        </li>
      </ol>
      <h1>Technical Support</h1>
      <ol>
        <li>
          Technical support is provided via email and other means as we decide to provide
          a proper Service to users.
        </li>
        <li>
          We reserve the right not to provide technical support Services to free or trial
          account users or any user if we deem the request unreasonable.
        </li>
      </ol>
      <h1>Specific Service Rules</h1>
      <ol>
        <li>As a user you agree not to do any of the following but not limited to;</li>
        <ol>
          <li>
            Abuse, harass, threaten, stalk, defame or in any way seek to violate the
            rights of Manage Your eCommerce, another user of the service or a third party.
          </li>
          <li>
            Publish or seek to distribute any material or information that is unlawful,
            harmful, obscene, indecent, libellous, profane, defamatory, racist, or in any
            other way inappropriate or objectionable.
          </li>
          <li>
            Use or harvest data provided by other users in a way that they would object
            to.
          </li>
          <li>
            Encourage illegal activity or activity that violates the rights of other
            Service users or third parties, whether individuals or organisations.
          </li>
          <li>
            Supply or post content calculated to deliberately mislead other users or third
            parties, including content falsely made to appear from or be endorsed by us.
          </li>
          <li>
            To pose as another user, third party or organisation employee to obtain user
            or third party information.
          </li>
          <li>
            To transmit or transfer any viruses, trojans, worms or any other malicious
            programs or code intended to spy on, gain control over, disrupt, destroy or in
            any other way impair any computer hardware or any other equipment.
          </li>
          <li>
            Attempt to gain access to our servers or other equipment to disrupt, impair,
            overload or otherwise hinder or compromise the safety, security or privacy of
            any of the Services provided by or relied upon by us and users.
          </li>
          <li>
            Reframe or repurpose the Service or any content on it, remove, obscure or
            block any notices (and advertising as applicable) provided by us on the
            Service.
          </li>
          <li>
            Load or provide access to content on the Service or link to other content from
            the Service, which infringes the trademark, patent, trade secret or any other
            proprietary right of a third party or infringes any intellectual property law.
          </li>
          <li>
            Send junk or spam email or emails or posts promoting pyramid schemes, chain
            letters or any other activity that invites users and others to participate in
            wasting their time and/or money.
          </li>
          <li>
            Use any robot, spider, scraper or other technical means to access the Service
            or any content on the Service.
          </li>
        </ol>
        <li>
          A breach of these Terms and Conditions by sending any unsolicited bulk email,
          (spam) or any other bulk communications will cause harm to us and to the
          Service. Such harm is difficult to quantify and as such you agree to pay us the
          sum of £50 for every individual email or other communication sent to a user or
          third party.
        </li>
        <li>
          The above list (10.1) is not intended to be exhaustive, We reserve the right to
          remove (without notice) any content and suspend or terminate (without notice)
          the account of any user who in our sole judgement is in breach of these Terms
          and Conditions.
        </li>
      </ol>
      <h1>Intellectual Property Rights</h1>
      <ol>
        <li>All intellectual property rights (“</li>
        <li>
          <strong>IP Rights</strong>: For the avoidance of doubt, IP Rights include
          patents, rights to inventions, copyright and related rights, moral rights,
          trademarks and service marks, business names and domain names, rights in get-up,
          goodwill and the right to sue for passing off, rights in designs, rights in
          computer software, database rights, rights to use, and protect the
          confidentiality of, confidential information (including know-how and trade
          secrets) and all other intellectual property rights, in each case whether
          registered or unregistered and including all applications and rights to apply
          for and be granted, renewals or extensions of, and rights to claim priority
          from, such rights and all similar or equivalent rights or forms of protection
          which subsist or will subsist now or in the future in any part of the world.
        </li>
        <li>
          We agree to grant you a fully paid-up, worldwide, non-exclusive, royalty-free
          licence during the term of your use of the Service to copy the deliverables
          specified in your order to receive and use the Services and such deliverables in
          your business.
        </li>
        <li>
          You warrant and undertake to us that you may not sub-license, assign or
          otherwise transfer the rights granted.
        </li>
      </ol>
      <h1>Content Ownership</h1>
      <ol>
        <li>
          As a user, you retain all ownership rights to content provided by you. You agree
          to grant us a fully paid-up, non-exclusive, royalty-free, non-transferable
          licence to copy and modify any materials provided by you to us for the term of
          the Contract to provide the Services to you
        </li>
        <li>
          You warrant that any content provided by you does not belong to a third party
          whose rights have been violated by the content being posted onto the Service.
          Furthermore, if any content is owned by a third party you agree to pay all
          royalties, fines and settlements owed to that party, without seeking any
          contribution from us.
        </li>
      </ol>
      <h1>Copyrighted Material</h1>
      <ol>
        <li>
          We do not condone or encourage in any way the posting of copyrighted or
          proprietary content or information by any users who are not the legal owners of
          such content.
        </li>
        <li>
          Where notified of such breaches by the owner of such content we will remove the
          content from the Service as soon as practicable. But only where we can
          reasonably ascertain the true owner of such content.
        </li>
        <li>
          If as the owner of such content, you believe that your rights have been
          infringed you should contact us as soon as possible and provide all relevant
          information in writing.
        </li>
      </ol>
      <h1>Content Monitoring</h1>
      <ol>
        <li>
          Users can freely add content to the Service. We do not monitor or assume any
          responsibility for content posted onto the Service. If at any time we decide to
          monitor the Service on any occasion it does not mean that we assume
          responsibility for removing any content or the conduct of any users at the time
          or in the future.
        </li>
      </ol>
      <h1>Termination</h1>
      <ol>
        <li>
          We may terminate your user account and all content and materials associated with
          it at any time when these Terms and Conditions have been breached. Such
          termination can be without notice. As a user, you can choose to terminate your
          account at any time (subject to any payment plan entered into) and are free to
          remove any content you have created on termination.
        </li>
        <li>
          Various clauses within these Terms and Conditions are designed to survive and
          continue after termination, including (but not limited to) clauses 11 and 18.
        </li>
      </ol>
      <h1>Access and Backups</h1>
      <ol>
        <li>
          We take all reasonable steps to ensure that the Service is available and
          functioning fully at all times. However, we do not accept any responsibility for
          “downtime” or poor performance of our servers or infrastructure, or where the
          Service is unavailable for any other reason, whether within or outside our
          direct control.
        </li>
        <li>
          You are solely responsible for backing up any content or data entered into the
          Service by you. We strongly recommend that you regularly and completely backup
          all of your content and data on the Service.
        </li>
      </ol>
      <h1>Disclaimer</h1>
      <ol>
        <li>
          We are not responsible for the accuracy of any content on the Service, nor any
          advertisements placed on the Service.
        </li>
        <li>
          We are not responsible for any links to third-party websites from the Service
          and the inclusion of any link does not imply an endorsement of a third-party
          website or Service by us.
        </li>
      </ol>
      <h1>Limitation of Liability</h1>
      <ol>
        <li>
          Subject to Clause 18.2, our total liability to you arising under or in
          connection with the Contract, whether in contract, tort (including negligence),
          breach of statutory duty, or otherwise, will be limited to 75% of the total
          amount paid to us for the Services during the 12 months before the date on which
          the relevant liability was notified to us.
        </li>
        <li>
          Nothing in the Contract limits any liability which cannot legally be limited,
          including liability for:
        </li>
        <ol>
          <li>death or personal injury caused by negligence;</li>
          <li>fraud or fraudulent misrepresentation; and</li>
          <li>
            breach of the terms implied by section 2 of the Supply of Goods and Services
            Act 1982 (title and quiet possession).
          </li>
        </ol>
        <li>
          Subject to Clause 18.2, we will not be liable to you, whether in contract, tort
          (including negligence), for breach of statutory duty, or otherwise, arising
          under or in connection with the Contract for:
        </li>
        <ol>
          <li>loss of profits;</li>
          <li>loss of sales or business;</li>
          <li>loss of agreements or contracts;</li>
          <li>loss of use or corruption of software, data or information;]</li>
          <li>loss of or damage to goodwill; and]</li>
          <li>any indirect or consequential loss.</li>
        </ol>
        <li>
          Unless you notify us that you intend to claim in respect of an event within the
          notice period, we shall have no liability for that event. The notice period for
          an event shall start on the day on which you became, or ought reasonably to have
          become, aware of you having grounds to claim in respect of the event and shall
          expire 2 months from that date. The notice must be in writing and must identify
          the event and the grounds for the claim in reasonable detail.
        </li>
      </ol>
      <h1>Indemnity</h1>
      <ol>
        <li>
          You agree to indemnify and hold us and our subsidiaries, affiliates and partners
          and their respective officers and employees harmless from any loss, fines, fees,
          liability or claim made by any third party arising from your breach of these
          Terms and Conditions whilst using the Service or any other Service provided by
          us.
        </li>
      </ol>
      <h1>Severability</h1>
      <ol>
        <li>
          The foregoing paragraphs, sub-paragraphs and clauses of these Terms and
          Conditions shall be read and constructed independently of each other. Should any
          part of this agreement or its paragraphs, sub-paragraphs or clauses be found
          invalid it shall not affect the remaining paragraphs, sub-paragraphs and
          clauses.
        </li>
      </ol>
      <h1>Waiver</h1>
      <ol>
        <li>
          Failure by us to enforce any accrued rights under these Terms and Conditions is
          not to be taken as or deemed to be a waiver of those rights unless we
          acknowledge the waiver in writing.
        </li>
      </ol>
      <h1>Jurisdiction</h1>
      <ol>
        <li>
          These Terms and Conditions shall be interpreted, construed and enforced
          following English law and shall be subject to the exclusive jurisdiction of the
          English Courts.
        </li>
      </ol>
      <p>More Information</p>
      <p>
        Hopefully, this has made things clearer for you. As mentioned earlier, if there is
        anything you are unsure about regarding the policies or terms stated here, please
        don’t hesitate to contact us at hello@manageyourecommerce.com
      </p>
    </section>
  );
}
