import Image from "next/image";

function About3() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container items-center">
        <div>
          <h3 className="mb-8 text-center text-[30px] font-bold lg:block lg:text-[40px]">
            About Manage Your eCommerce
          </h3>
          <h2 className="mb-8 text-center text-[25px] font-bold lg:block lg:text-[30px]">
            Built by Sellers, for Sellers
          </h2>
          <div className="pages mb-4 lg:mb-3">
            <p>
              Manage Your eCommerce was founded by experienced eCommerce sellers who
              struggled with the shortcomings of existing software solutions. Unable to
              find an all-in-one platform suited for modern multi-channel selling, we set
              out to build it ourselves.
            </p>
            <p>
              Our mission is to empower online sellers to deliver exceptional customer
              experiences by providing a unified system to manage orders, inventory,
              logistics, and operations across multiple marketplaces.
            </p>
            <div className="flex w-full items-center justify-center">
              <Image
                src="/images/about/make-life-easier.png"
                alt="make life easier"
                width={552}
                height={466}
              />
            </div>
            <h1>About us</h1>
            <p>
              As a dynamic startup, Manage Your eCommerce
              {/* Evident BD Ltd */}
              has emerged as a pioneering force in the realm of eCommerce management
              solution providers. Our commitment to user-friendly solutions sets us apart,
              offering innovative inventory and order management solutions, including the
              advanced functionality of Smart SKU mapping, return tracking and seamless
              customer communications all in one platform.&nbsp;
            </p>
            <p>
              {/* Manage Your eCommerce is designed, developed and maintained by Evident BD
              Ltd (Reg No 13017375). */}
              With a focus on delivering efficiency and ease of use, our solution Manage
              Your eCommerce empowers small and medium size businesses to navigate the
              complexities of online business operations seamlessly. Trust Manage Your
              eCommerce to be your partner in success as you embark on your
              entrepreneurial journey, providing tailored solutions to propel your
              business towards sustainable growth in the competitive eCommerce landscape.
            </p>
            <h1>Key Values</h1>
            <p>
              As seasoned eCommerce veterans, we built Manage Your eCommerce on key
              principles that guide our product ethos and company culture:
            </p>
            <ul>
              <li>
                <strong>Reliability</strong>- Our platform is engineered for stability,
                uptime and seamless performance. We provide critical infrastructure
                sellers can count on.
              </li>
              <li>
                <strong>Usability</strong>- Sophisticated technology made simple through
                thoughtful UX design. We enable all sellers to access advanced
                capabilities.
              </li>
              <li>
                <strong>Support</strong>- Expert support is integral, not an upsell. Our
                success is aligned with our customers success.
              </li>
              <li>
                <strong>Community</strong>- For us, community extends beyond customers to
                include partners, our local region, and the broader eCommerce ecosystem.
              </li>
            </ul>
            <h1>Our Values</h1>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <ul>
                        <li>Customer Centric</li>
                      </ul>
                    </td>
                    <td>
                      <ul>
                        <li>Simplify</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <ul>
                        <li>Learn and keep curious</li>
                      </ul>
                    </td>
                    <td>
                      <ul>
                        <li>Affordable</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <ul>
                        <li>Value ideas over job titles&nbsp;</li>
                      </ul>
                    </td>
                    <td>
                      <ul>
                        <li>Innovation</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <ul>
                        <li>Passion is our fuel to work harder</li>
                      </ul>
                    </td>
                    <td>
                      <ul>
                        <li>Together</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <ul>
                        <li>Trust in each other’s developments&nbsp;</li>
                      </ul>
                    </td>
                    <td>
                      <ul>
                        <li>Thriving</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h1>Investing Locally</h1>
            <p>
              As a startup, fostering tech and engineering talent locally is a priority.
              We actively collaborate with regional universities to provide student
              placements and workshops. Our team is also passionate about giving back to
              charities and organisations in our community through fundraising initiatives
              and events.
            </p>
            <h1>Join Our Mission</h1>
            <p>
              We’re building the all-in-one commerce operations platform for the modern
              online seller, forged out of our firsthand experience of the industry’s pain
              points. Help us redefine what’s possible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About3;
