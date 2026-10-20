import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter, Youtube } from "lucide-react";

export default function MainFooter() {
  return (
    <footer className="footer bg-footer pt-20 text-footer-foreground lg:pt-[300px]">
      <div className="container items-center">
        <div className="grid grid-cols-2 gap-12 border-b border-background pb-10 lg:grid-cols-5">
          <div className="col-span-2">
            <Image src="/logos/mye.svg" alt="mye" width={78} height={32} />
            <p className="mt-10 w-4/6 text-base">
              MYE is a user-friendly eCommerce management company offering inventory and
              order management, including Smart SKU mapping, for easy business operations.
            </p>
          </div>

          <div>
            <h6 className="mb-4">Company</h6>

            <ul>
              <li className="mb-4">
                <Link href="/about">About</Link>
              </li>

              <li className="mb-4">
                <Link href="/pricing">Pricing</Link>
              </li>

              <li className="mb-4">
                <Link href="/features">Features</Link>
              </li>

              <li className="mb-4">
                <Link href="/integrations">Integrations</Link>
              </li>

              <li className="mb-4">
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* <div>
            <h6 className="mb-4">Why MYE</h6>

            <ul>
              <li className="mb-4">
                <Link href="/about">About</Link>
              </li>

              <li className="mb-4">
                <Link href="/about">Pricing</Link>
              </li>

              <li className="mb-4">
                <Link href="/about">Success Stories</Link>
              </li>

              <li className="mb-4">
                <Link href="/about">Book a Demo</Link>
              </li>

              <li className="mb-4">
                <Link href="/about">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="mb-4">Integration</h6>

            <ul>
              <li className="mb-4">
                <Link href="/about">About</Link>
              </li>

              <li className="mb-4">
                <Link href="/about">Pricing</Link>
              </li>

              <li className="mb-4">
                <Link href="/about">Success Stories</Link>
              </li>

              <li className="mb-4">
                <Link href="/about">Book a Demo</Link>
              </li>

              <li className="mb-4">
                <Link href="/about">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="mb-4">Resources</h6>

            <ul>
              <li className="mb-4">
                <Link href="/about">About</Link>
              </li>

              <li className="mb-4">
                <Link href="/about">Pricing</Link>
              </li>

              <li className="mb-4">
                <Link href="/about">Success Stories</Link>
              </li>

              <li className="mb-4">
                <Link href="/about">Book a Demo</Link>
              </li>

              <li className="mb-4">
                <Link href="/about">Contact Us</Link>
              </li>
            </ul>
          </div> */}

          <div>
            <h6 className="mb-4">Compliance Policies</h6>

            <ul>
              <li className="mb-4">
                <Link href="/terms-and-conditions">Terms and Conditions</Link>
              </li>

              <li className="mb-4">
                <Link href="/privacy-notice">Privacy Notice</Link>
              </li>

              <li className="mb-4">
                <Link href="/data-processing-addendum">Data Processing Addendum</Link>
              </li>

              <li className="mb-4">
                <Link href="/row-saas-agreement">ROW SaaS Agreement</Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="mb-4"></h6>

            <ul className="mt-12">
              <li className="mb-4">
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="mb-4">
                <Link href="/cookie-policy">Cookie Policy</Link>
              </li>

              <li className="mb-4">
                <Link href="/security-and-reliability">Security and Reliability</Link>
              </li>

              <li className="mb-4">
                <Link href="/data-protection-policy">Data Protection Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center py-10 lg:grid-cols-2">
          {/* <div className="flex items-center gap-4">
            <iframe
              className="size-24 border-none"
              src="https://registry.blockmarktech.com/certificates/559e25d1-6f08-47e0-ac40-64af93eb1b68/widget/?tooltip_position=none&theme=transparent&hover=t"
            ></iframe>

            <div>
              <p className="text-xs">
                Manage Your eCommerce is Designed, Developed and Maintained by Evident BD
                Ltd.
                <br />
                Evident BD Ltd is Registered in England and Wales with Reg No 13017375.
              </p>
              <p className="mt-2 text-xs">
                Evident BD Ltd is registered as a data controller with the UK Information
                <br />
                Commissioner’s Office (ICO) under the registration number ZB546717.
              </p>

              <p className="mt-2 text-sm">&copy; {new Date().getFullYear()} MYE </p>
            </div>
          </div> */}
          <div className="mx-auto flex lg:mx-0 lg:justify-end">
            Follow us:
            <ul className="ml-4 flex justify-center space-x-8 lg:space-x-3">
              <li>
                <a
                  href="https://twitter.com/ManageCommerce"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Twitter />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/showcase/manage-your-ecommerce"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@manageyourecommerce6558"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Youtube />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
