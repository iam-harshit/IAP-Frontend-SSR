import React from 'react';
import Header from '@/Components/common/Header';
import Footer from '@/Components/common/Footer';
import SEO from '@/Components/common/SEO';

const PrivacyPolicy = () => {
  return (
    <div>
      <SEO
        title="Privacy Policy"
        description="Review the Privacy Policy of InspirationApp to understand how we handle your personal data and ensure your privacy while using our platform."
        canonical="https://inspirationapp.org/privacypolicy"
      />
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 h-[45px] xs:h-[55px] xs2:h-[90px] llg:h-[200px] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <h1 className="text-h5 xs2:text-h3  llg:text-h1  font-extrabold text-white">
            Privacy Policy
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="mt-8" id="privacy">
          <h2 className="text-h5 xs2:text-h4 font-semibold mb-3">
            Your Privacy Matters
          </h2>
          <p className="text-caption xs2:text-p">
            At Curious Business Solutions Pvt Ltd, your privacy is our top
            priority. The data you provide is collected solely for the purpose
            of optimizing and analyzing the website to improve your browsing
            experience. This data helps us understand your content preferences,
            resolve any issues or bugs, analyze user behavior, and enhance the
            platform’s overall performance.
          </p>
        </div>

        <div className="mt-8" id="data-collection">
          <h2 className="text-h5 xs2:text-h4 font-semibold mb-3">
            Data We Collect
          </h2>
          <p className="text-caption xs2:text-p">
            The data collected at Inspiration App includes: full name, email
            address, telephone number, internet service provider (ISP), usage
            data, internet protocol (IP) addresses, language preference, device
            information, session duration, scroll-to-page interactions, clicks,
            browser type, country, date, and time zone, mouse movements,
            interaction events, page events, layout details, positional
            information, and the number of clicks.
          </p>

          <h3 className="text-h6 xs2:text-h5 font-bold mt-3 mb-1">
            How We Use This Data
          </h3>
          <p className="text-caption xs2:text-p">
            We use this data to identify trends, administer site data,
            understand user movements, and gather demographic information. This
            data is also used to verify your identity, streamline account
            maintenance, and enhance technical support.
          </p>

          <h3 className="text-h6 xs2:text-h5 font-bold mt-3 mb-1">
            User Data Sharing and Freedom
          </h3>
          <p className="text-caption xs2:text-p">
            Any data freely provided by the user is collected during the website
            usage. Required data requested by the website is essential for
            accessing the services of the website (unless stated otherwise). In
            cases where certain data isn't mandatory, users have the freedom to
            choose whether to share it or not. This will not affect the
            availability or functioning of the services provided by the Website.
          </p>

          <h3 className="text-h6 xs2:text-h5 font-bold mt-3 mb-1">
            Third-Party Personal Data
          </h3>
          <p className="text-caption xs2:text-p">
            Any kind of third-party personal data obtained, published, or shared
            through our platform is the liability of the user involved in such
            an act.
          </p>
        </div>

        <div className="mt-8" id="cookies">
          <h2 className="text-h5 xs2:text-h4 font-semibold mb-3">Cookies</h2>
          <p className="text-caption xs2:text-p">
            Inspiration App uses cookies to collect data such as the visitor's
            preferences, pages visited, and accessed by visitors, etc. This
            helps us enhance the customer experience by understanding page
            insights and topics most looked after, thus improving our webpage.
          </p>

          <p className="text-caption xs2:text-p">
            Web beacons, JavaScript, and cookies technologies used by
            third-party ad networks/servers are employed in their respective ad
            spaces and links, appearing on the Inspiration App community. This
            data is directly sent to the user's browser. In such cases, the
            user's IP address is automatically directed to these files, which
            helps in analyzing the effectiveness of the ad campaign. It also
            measures and displays personalized ad content that the user is most
            likely to engage with on the website.
          </p>

          <p className="text-caption xs2:text-p">
            At Inspiration App, we do not have access to or control over these
            cookies used by third-party advertisers. We recommend that users
            consult and view the respective 'Privacy Policy' and other terms and
            conditions of these third-party ad servers/networks to get detailed
            information about the data being used.
          </p>
        </div>

        <div className="mt-8" id="managing-your-data">
          <h2 className="text-h5 xs2:text-h4 font-semibold mb-3">
            Managing Your Data
          </h2>
          <p className="text-caption xs2:text-p">
            It is the user's responsibility to keep their account information
            updated. You can access and update your personal information through
            the 'Account Settings'. If your account at Inspiration App is
            connected to any third-party services, you can link, unlink, or
            relink these services through the 'Account Settings' option.
          </p>
        </div>

        <div className=" mt-8" id="data-deletion">
          <h2 className="text-h5 xs2:text-h4 font-semibold mb-3">
            Data Deletion / Erasure
          </h2>
          <p className="text-caption xs2:text-p">
            You can request the erasure of your personal information under
            certain jurisdictions. However, we reserve irrefutable rights to the
            data, to some extent. We often retain your personal information as
            required for our legitimate business interests, including but not
            limited to preventing money laundering, fraud detection, fraud
            prevention, enhancing security, or fulfilling other legal
            obligations.
          </p>

          <p className="text-caption xs2:text-p">
            Any information that you've shared with others on our platform will
            persist on the public viewable domain, even after your account at
            Inspiration App has been deleted. However, any attributions of such
            information will be removed. Some duplicate data may persist in our
            database, though it will be unlinked from any personal attributes.
            This is done to ensure the protection of data in the backup system,
            preventing accidental loss or destruction.
          </p>
        </div>

        <div className="mt-8" id="security-and-changes">
          <h2 className="text-h5 xs2:text-h4 font-semibold mb-3">Security</h2>
          <p className="text-caption xs2:text-p">
            Our team is consistently administering and updating executive,
            technical, and real-world security measures to enhance the
            protection of your information against any unauthorized access,
            loss, destruction, or alteration.
          </p>

          <h2 className="text-h5 xs2:text-h4 font-semibold mb-3 mt-4">
            Changes to Privacy Policy
          </h2>
          <p className="text-caption xs2:text-p">
            We reserve the right to amend, alter, change, or modify this Privacy
            Policy at any time and without prior notice, in accordance with the
            applicable/existing law. Any amendment, alteration, change, or
            modification to the Privacy Policy will be posted on our website
            with the label 'Last Updated - Date'. By creating and operating an
            account on our platform, you agree to comply with our updated
            Privacy Policy. If you do not agree, you may cancel your account
            creation or operation.
          </p>
        </div>

        <div className="mt-8" id="contact-us">
          <h2 className="text-h5 xs2:text-h4 font-semibold mb-3">Contact Us</h2>
          <p className="text-caption xs2:text-p mb-2">
            For any complaints or inquiries, contact us at:
          </p>
          <p className="text-caption xs2:text-p">
            <strong>Curious Business Solutions Pvt Ltd</strong>
          </p>
          <p className="text-caption xs2:text-p">
            Sri Krishnakrupa 3rd Cross, Govinapura 3rd Cross, Tiptur 572201,
            Karnataka, India
          </p>
          <p className="text-caption xs2:text-p">
            Email:{' '}
            <a
              href="mailto:support@inspirationapp.org"
              className="text-blue-600 hover:underline"
            >
              support@inspirationapp.org
            </a>
          </p>
          <p className="text-caption xs2:text-p mb-5">
            Phone: <span className="text-blue-600">9353493539</span>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;