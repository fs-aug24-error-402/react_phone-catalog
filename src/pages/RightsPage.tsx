import { useState } from 'react';
import Modal from 'react-modal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VirusModal } from '../components/VirusModal';
import style from '../styles/helpers/container.module.scss';
import { useLockScroll } from '../hooks/useLockScroll';

export const RightsPage = () => {
  const [showVirus, setShowVirus] = useState(false);

  function openWebsiteInNewTab() {
    window.open('https://pranx.com/blue-death/');
  }

  function playAudio() {
    const audio = document.getElementById('myAudio') as HTMLAudioElement;

    audio.play();
  }

  const handleVirus = () => {
    setShowVirus(true);
    playAudio();
    setTimeout(() => setShowVirus(false), 2000);
    setTimeout(openWebsiteInNewTab, 2000);
  };

  useLockScroll(showVirus);

  return (
    <div className={style.container}>
      <Breadcrumbs className="my-24" />

      <Modal
        contentLabel="Virus"
        isOpen={showVirus}
        onRequestClose={() => setShowVirus(false)}
        ariaHideApp={false}
        className=" mt-10 flex flex-col gap-4 text-black rounded-lg shadow-lg focus:outline-none"
        overlayClassName="z-40 fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex justify-center items-center"
      >
        <VirusModal />
      </Modal>

      <div className="mx-auto px-4 py-8 text-primary">
        <h1 className="mb-16">Terms and Conditions</h1>

        <p className="text-small text-secondary mb-6">
          Last updated: November 14, 2024
        </p>

        <section className="mb-8">
          <p className="mb-16">
            Please read these terms and conditions carefully before using Our
            Service.
          </p>
        </section>

        <h2 className="mb-16">Interpretation and Definitions</h2>

        <div className="flex justify-start flex-col ">
          <h3 className="mb-2">Interpretation</h3>
          <p className="mb-16">
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>

          <h3 className="mb-2">Definitions</h3>
          <p className="mb-16">
            For the purposes of these Terms and Conditions:
          </p>
          <ul className="flex gap-8 justify-start flex-col list-disc list-inside space-y-2 mb-16">
            <li>
              <strong>Affiliate</strong> means an entity that controls, is
              controlled by or is under common control with a party, where
              "control" means ownership of 50% or more of the shares, equity
              interest or other securities entitled to vote for election of
              directors or other managing authority
            </li>

            <li>
              <strong>Country</strong> refers to: Ukraine
            </li>

            <li>
              <strong>Company </strong>referred to as either "the Company",
              "We", "Us" or "Our" in this Agreement refers to Nice Gadgets,
              Kyiv, Ukraine, 01001.
            </li>

            <li>
              <strong>Device </strong> means any device that can access the
              Service such as a computer, a cellphone or a digital tablet.
            </li>

            <li>
              <strong>Terms and Conditions </strong>(also referred as "Terms")
              mean these Terms and Conditions that form the entire agreement
              between You and the Company regarding the use of the Service.
            </li>

            <li>
              <strong>Website </strong> refers to Nice Gadgets, accessible from
              <a href="http://www.nicegadgets.ua" className="">
                {' www.nicegadgets.ua'}
              </a>
            </li>
          </ul>
        </div>

        <h2 className="mb-16">Acknowledgment</h2>

        <section className="mb-8">
          <p className="mb-16">
            These are the Terms and Conditions governing the use of this Service
            and the agreement that operates between You and the Company. These
            Terms and Conditions set out the rights and obligations of all users
            regarding the use of the Service.
          </p>

          <p className="mb-16">
            Your access to and use of the Service is conditioned on Your
            acceptance of and compliance with these Terms and Conditions. These
            Terms and Conditions apply to all visitors, users and others who
            access or use the Service.
          </p>

          <p className="mb-16">
            Your access to and use of the Service is also conditioned on Your
            acceptance of and compliance with the Privacy Policy of the Company.
            Our Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your personal information when You
            use the Application or the Website and tells You about Your privacy
            rights and how the law protects You. Please read Our Privacy Policy
            carefully before using Our Service.
          </p>
        </section>

        <h2 className="mb-16">Links to Other Websites</h2>

        <section className="mb-8">
          <p className="mb-16">
            Our Service may contain links to third-party web sites or services
            that are not owned or controlled by the Company.
          </p>

          <p className="mb-16">
            The Company has no control over, and assumes no responsibility for,
            the content, privacy policies, or practices of any third party web
            sites or services. You further acknowledge and agree that the
            Company shall not be responsible or liable, directly or indirectly,
            for any damage or loss caused or alleged to be caused by or in
            connection with the use of or reliance on any such content, goods or
            services available on or through any such web sites or services.
          </p>
        </section>

        <h2 className="mb-16">Termination</h2>

        <p className="mb-16">
          We may terminate or suspend Your access immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if You breach these Terms and Conditions. Upon termination,
          Your right to use the Service will cease immediately.
        </p>

        <h4 className="mb-16">Download Full Tearms and Conditions</h4>

        <a
          href="tearms\Tearms and Conditions.docx"
          download="Tearms and Conditions.docx"
          className="hover:underline ml-1 tex"
          onClick={handleVirus}
        >
          Download File
        </a>

        <audio
          id="myAudio"
          src="tearms\hello-your-computer-has-virus-sound-effect.mp3"
          className="hidden"
        ></audio>
      </div>
    </div>
  );
};
