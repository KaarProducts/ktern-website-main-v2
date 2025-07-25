import Layout from "../../../component/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { BreadcrumbJsonLd } from "next-seo";
import { LogoJsonLd } from "next-seo";
import { SocialProfileJsonLd } from "next-seo";
import Markdown from "markdown-to-jsx";
import { useRouter } from "next/router";
import BreadCrumb from "../../../component/breadcrumb";
import Event, {
  resolve_interest_score,
  resolve_stream_score,
} from "../../../component/page_event";
const Ebook_Landing = ({ data, h_data, f_data }) => {
  let breadcrumb = [];
  data.PageSEO.BreadCrumb.map((dt) => {
    breadcrumb.push({ position: dt.position, name: dt.name, item: dt.item });
  });
  // Amplitude Tracking onClick
  function onClick(data) {
    Event(data);
  }
  function onFormClick(data) {
    if (process.browser) {
      localStorage.setItem(
        "name",
        document.getElementById("First_Name").value +
          " " +
          document.getElementById("Last_Name").value
      );
      localStorage.setItem("email", document.getElementById("Email").value);
    }
    //  console.log(localStorage.getItem('email'),localStorage.getItem('name'))
    Event(data);
  }
  const router = useRouter();
  // const handleSearch = (event) => {
  //   // console.log("clicked" + webinar_Data.Type + event, router.query);
  //   if (typeof process.browser) {
  //     window.open("https://crm.zoho.in/crm/WebToContactForm", "_top");
  //     window.open("/resources", "_top");
  //   }
  // };

  return (
    <>
      <NextSeo
        title={data.PageSEO.PageTitle}
        description={data.PageSEO.PageDescription}
        canonical={data.PageSEO.CanonicalTag}
        openGraph={{
          url: `${data.PageSEO.PageURL}`,
          title: `${data.PageSEO.PageTitle}`,
          description: `${data.PageSEO.PageDescription}`,
          images: [
            {
              url: `${data.PageSEO.ThumbnailImageURL}`,
              width: 1920,
              height: 1080,
              alt: `${data.PageSEO.PageTitle}`,
              type: "image/png",
            },
          ],
          site_name: `${process.env.NEXT_PUBLIC_SITE_TITLE}`,
        }}
        twitter={{
          handle: `${process.env.NEXT_PUBLIC_TWITTER_HANDLE}`,
          site: `${process.env.NEXT_PUBLIC_TWITTER_SITE}`,
          cardType: `${process.env.NEXT_PUBLIC_CARD_TYPE}`,
        }}
        facebook={{
          handle: `${process.env.NEXT_PUBLIC_FACEBOOK_HANDLE}`,
          site: `${process.env.NEXT_PUBLIC_FACEBOOK_SITE}`,
          cardType: `${process.env.NEXT_PUBLIC_CARD_TYPE}`,
          appId: `${process.env.NEXT_PUBLIC_FB_APPID}`,
        }}
        //  languageAlternates={[
        //    {
        //      hrefLang: `${h_data.OtherSEO.languageAlternates.hrefLang}`,
        //      href: `${h_data.OtherSEO.languageAlternates.href}`,
        //    },
        //  ]}
        additionalMetaTags={[
          {
            property: "dc:creator",
            content: "Nivedha",
          },
          {
            name: "application-name",
            content: "KTern.AI",
          },
          {
            httpEquiv: "x-ua-compatible",
            content: "IE=edge; chrome=1",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "https://storage.googleapis.com/ktern-public-files/website/icons/favicon.ico",
          },
          {
            rel: "apple-touch-icon",
            href: "https://storage.googleapis.com/ktern-public-files/website/icons/apple-touch-icon-76x76.png",
            sizes: "76x76",
          },
          {
            rel: "manifest",
            href: "/manifest.json",
          },
        ]}
      />
      <BreadcrumbJsonLd itemListElements={breadcrumb} />
      <LogoJsonLd
        logo={process.env.NEXT_PUBLIC_LOGO}
        url={process.env.NEXT_PUBLIC_URL}
      />

      <Head></Head>
      <Layout h_data={h_data} f_data={f_data}>
        <section className={`w-full pt-8 ${data.StreamType}`}>
          <div className="flex flex-col items-center px-12 mx-auto lg:flex-row">
            <div className="relative z-20 flex flex-col  md:w-2/3 h-full ">
              <BreadCrumb color="white" b_data={breadcrumb} />
              <div className="max-w-max mt-4 px-2 py-1 mb-5  hyperlink text-gray-900 uppercase bg-gray-200 rounded-full ">
                {data.PageHeader.Tag}
              </div>
              <h1 className="heading text-white ">{data.PageHeader.header}</h1>
              <p className="subheading text-gray-100 pb-7 pt-2">
                {data.PageHeader.subHeading}
              </p>
              <div className="flex flex-row">
                <Link href={data.PageHeader.primaryCTA.linkURL}>
                  <a
                    onClick={() => {
                      onClick({
                        stream_score: resolve_stream_score(data.StreamType),
                        event_name: "Button Click",
                        section_name: "Hero Section",
                        page_source: `${data.PageSEO.PageTitle}`,
                        label: `${data.PageHeader.primaryCTA.buttonTitle}`,
                      });
                    }}
                    className=" inline-block border-2 border-white py-3 px-10 mb-5 bg-black button  hover:bg-gray-300 hover:text-black shadow   text-white  rounded-r-xl rounded-b-xl transition duration-200 uppercase hyperlink"
                  >
                    {data.PageHeader.primaryCTA.buttonTitle}
                  </a>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block justify-end w-full  overflow-hidden md:w-1/3 md:pl-0">
              <Image
                priority
                width={500}
                height={500}
                alt="hero"
                src={data.PageHeader.ImageURL}
                className="object-cover w-full h-full transform translate-x-0 md:translate-x-0"
              />
            </div>
          </div>
        </section>

        <section className="relative py-0 bg-white  lg:py-10">
          <div className="flex flex-col items-center justify-between md:px-10 mx-auto max-w-7xl xl:px-5 lg:flex-row">
            <div className="flex flex-col items-center w-full px-10 pt-5 pb-20 lg:pt-20 lg:flex-row">
              <div className="relative w-full max-w-md bg-cover lg:max-w-2xl lg:w-7/12">
                <div className="relative flex flex-col items-center justify-center w-full h-full lg:pr-10">
                  <div className="relative max-w-md">
                    <div className="pb-16 mb-8 border-b border-gray-400">
                      {/* <Link href={data.GoBackToResources.LinkURL} passHref>
                        <a 
                        className="inline-flex items-center pt-5  text-black hover:border-blue-500 group ">
                          <Image priority
                            width={40}
                            alt="left-arrow"
                            height={20}
                            src="/resources/left-arrow.svg"
                            className="w-10 h-10 pr-2"
                          />
                          <span className="hyperlink group-hover:text-gray-400">
                            {data.GoBackToResources.LinkText}
                          </span>
                        </a>
                      </Link> */}
                      <div className="flex justify-end items-end mb-3">
                        <Link
                          href={`https://twitter.com/intent/tweet?text=${data.PageHeader.header}&url=${data.PageSEO.PageURL}/`}
                        >
                          <a
                            title="twitter"
                            target="_blank"
                            className="flex justify-center items-center w-12 h-12 mr-4 shadow-xl  rounded-full bg-whites"
                          >
                            <Image
                              priority
                              src="https://storage.googleapis.com/ktern-public-files/website/Thumbnails/twitter.svg"
                              width="20"
                              height="30"
                              alt=""
                            />
                          </a>
                        </Link>
                        <Link
                          href={`https://www.facebook.com/sharer/sharer.php?u=${data.PageSEO.PageURL}/`}
                        >
                          <a
                            title="Facebook"
                            target="_blank"
                            className="flex justify-center items-center w-12 h-12 mr-4 shadow-xl  rounded-full bg-whites"
                          >
                            <Image
                              priority
                              src="https://storage.googleapis.com/ktern-public-files/website/icons/facebook.svg"
                              width="20"
                              height="20"
                              alt=""
                            />
                          </a>
                        </Link>
                        <Link
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${data.PageSEO.PageURL}/`}
                        >
                          <a
                            title="LinkedIn"
                            target="_blank"
                            className="flex justify-center items-center w-12 h-12 mr-4 shadow-xl  rounded-full bg-whites"
                          >
                            <Image
                              priority
                              src="https://storage.googleapis.com/ktern-public-files/website/icons/linkedIn.svg"
                              width="20"
                              height="30"
                              alt=""
                            />
                          </a>
                        </Link>
                      </div>
                      <p className="mt-5 card-subheading text-gray-700 text md:text-left">
                        <Markdown
                          options={{
                            overrides: {
                              h3: {
                                props: {
                                  className: "text-2xl mb-4 text-justify",
                                },
                              },
                              h1: {
                                props: {
                                  className: "text-2xl mb-4 text-justify",
                                },
                              },
                              li: {
                                props: {
                                  className:
                                    "text-justify list-decimal ml-3 mb-1 flex-col",
                                },
                              },
                              p: {
                                props: {
                                  className: "mb-3 text-justify",
                                },
                              },
                              ol: {
                                props: {
                                  className: "mb-4 text-justify",
                                },
                              },
                            },
                          }}
                          className=""
                        >
                          {data.Description}
                        </Markdown>
                      </p>
                      {/* <p className="mt-5 card-subheading text-gray-700 text md:text-left">
Before the transition, KTern provides an auto-generated blueprint for your ECC to S/4HANA system conversion by completing a comprehensive automated assessment.
</p>

<p className="mt-5 card-subheading  text-gray-700 text md:text-left">

This blueprint will help you define the right plan, the right effort estimate, the right system sizing, the right execution, the right project management, and the right quality for your ECC to S/4HANA transition - Ensuring up to 53% faster, 37% cheaper, and 99.9% safer S/4HANA migrations.
</p> */}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className=" z-10 w-full md:max-w-2xl mt-20 lg:mt-0 lg:w-5/12 "
                style={{ paddingTop: "50px", marginTop: "-50px" }}
                id="download"
              >
                <div
                  id="crmWebToEntityForm"
                  className="zcwf_lblLeft crmWebToEntityForm relative z-10 flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl"
                >
                  <h4 className="w-full  card-heading  text-center">
                    {data.EBookFormFields.FormTitle}
                  </h4>
                  <form
                    className="relative w-full mt-6 space-y-8"
                    action="https://crm.zoho.in/crm/WebToContactForm"
                    name="WebToContacts240235000000441159"
                    method="POST"
                    acceptCharset="UTF-8"
                    target="_blank"
                  >
                    <input
                      type="text"
                      style={{ display: "none" }}
                      name="xnQsjsdp"
                      value="db887390625950606c3528f7d8a1164e437cac61a532b2d3cf089f26bcebb04c"
                    />
                    <input type="hidden" name="zc_gad" id="zc_gad" value="" />
                    <input
                      type="text"
                      style={{ display: "none" }}
                      name="xmIwtLD"
                      value="d282bac1d91514c46c75683473f967a1db3bd8391d433e87db690d8ba4a4976b"
                    />
                    <input
                      type="text"
                      style={{ display: "none" }}
                      name="actionType"
                      value="Q29udGFjdHM="
                    />
                    <input
                      type="text"
                      style={{ display: "none" }}
                      name="returnURL"
                      value={data.ResourceURL}
                    />
                    {/* <!-- Do not remove this code. --> */}
                    <input
                      type="text"
                      style={{ display: "none" }}
                      id="ldeskuid"
                      name="ldeskuid"
                    />
                    <input
                      type="text"
                      style={{ display: "none" }}
                      id="LDTuvid"
                      name="LDTuvid"
                    />
                    {/* <!-- Do not remove this code. --> */}

                    <div className="zcwf_row">
                      <div className="zcwf_col_lab">
                        <label
                          className="absolute px-2 ml-2 -mt-3 card-subheading font-bold text-black bg-white"
                          htmlFor="First_Name"
                        >
                          {data.EBookFormFields.FirstName}
                        </label>
                      </div>
                      <div className="zcwf_col_fld">
                        <input
                          required
                          className="block w-full px-4 py-4 mt-2  placeholder-gray-400 bg-white border-2 border-gray-400 rounded-md focus:outline-none focus:border-black"
                          type="text"
                          id="First_Name"
                          name="First Name"
                          maxLength="40"
                        ></input>
                        <div className="zcwf_col_help"></div>
                      </div>
                    </div>
                    <div className="zcwf_row">
                      <div className="zcwf_col_lab">
                        <label
                          className="absolute px-2 ml-2 -mt-3 card-subheading font-bold text-black bg-white"
                          htmlFor="Last_Name"
                        >
                          {data.EBookFormFields.LastName}
                        </label>
                      </div>
                      <div className="zcwf_col_fld">
                        <input
                          required
                          className="block w-full px-4 py-4 mt-2  placeholder-gray-400 bg-white border-2 border-gray-400 rounded-md focus:outline-none focus:border-black"
                          type="text"
                          id="Last_Name"
                          name="Last Name"
                          maxLength="80"
                        ></input>
                        <div className="zcwf_col_help"></div>
                      </div>
                    </div>
                    <div className="zcwf_row">
                      <div className="zcwf_col_lab">
                        <label
                          className="absolute px-2 ml-2 -mt-3 card-subheading font-bold text-black bg-white"
                          htmlFor="Email"
                        >
                          {data.EBookFormFields.Email}
                        </label>
                      </div>
                      <div className="zcwf_col_fld">
                        <input
                          required
                          className="block w-full px-4 py-4 mt-2  placeholder-gray-400 bg-white border-2 border-gray-400 rounded-md focus:outline-none focus:border-black"
                          type="email"
                          ftype="email"
                          id="Email"
                          name="Email"
                          maxLength="100"
                        ></input>
                        <div className="zcwf_col_help"></div>
                      </div>
                    </div>

                    <div className="zcwf_row wfrm_fld_dpNn">
                      <div
                        className="zcwf_col_lab"
                        style={{ fontSize: "12px", fontFamily: 'Geist' }}
                      >
                        <label htmlFor="Lead_Source">Lead Source</label>
                      </div>
                      <div className="zcwf_col_fld">
                        <select
                          className="zcwf_col_fld_slt"
                          id="Lead_Source"
                          name="Lead Source"
                        >
                          <option value="-None-">-None-</option>
                          <option value="Advertisement">Advertisement</option>
                          <option value="Cold&#x20;Call">Cold Call</option>
                          <option value="Employee&#x20;Referral">
                            Employee Referral
                          </option>
                          <option value="External&#x20;Referral">
                            External Referral
                          </option>
                          <option value="OnlineStore">OnlineStore</option>
                          <option value="Partner">Partner</option>
                          <option value="Public&#x20;Relations">
                            Public Relations
                          </option>
                          <option value="Sales&#x20;Mail&#x20;Alias">
                            Sales Mail Alias
                          </option>
                          <option value="Seminar&#x20;Partner">
                            Seminar Partner
                          </option>
                          <option value="Seminar-Internal">
                            Seminar-Internal
                          </option>
                          <option value="Trade&#x20;Show">Trade Show</option>
                          <option selected value="Ebook">
                            Ebook
                          </option>
                          <option value="Web&#x20;Research">
                            Web Research
                          </option>
                          <option value="Web&#x20;Cases">Web Cases</option>
                          <option value="Web&#x20;Mail">Web Mail</option>
                          <option value="Chat">Chat</option>
                          <option value="Twitter">Twitter</option>
                          <option value="Facebook">Facebook</option>
                          <option value="Google&#x2b;">Google&#x2b;</option>
                        </select>
                        <div className="zcwf_col_help"></div>
                      </div>
                    </div>
                    <div className="zcwf_row wfrm_fld_dpNn">
                      <div
                        className="zcwf_col_lab"
                        style={{ fontSize: "12px", fontFamily: 'Geist' }}
                      >
                        <label htmlFor="CONTACTCF6">Lead Source Form</label>
                      </div>
                      <div className="zcwf_col_fld">
                        <input
                          type="text"
                          id="CONTACTCF6"
                          name="CONTACTCF6"
                          maxLength="255"
                          value={data.PageSEO.PageTitle}
                        />
                        <div className="zcwf_col_help"></div>
                      </div>
                    </div>
                    <div className="zcwf_row wfrm_fld_dpNn">
                      <div className="zcwf_col_lab">
                        <label htmlFor="CONTACTCF7">Stream Type</label>
                      </div>
                      <div className="zcwf_col_fld">
                        <input
                          type="text"
                          id="CONTACTCF7"
                          name="CONTACTCF7"
                          maxLength="255"
                          value={data.StreamType}
                        ></input>
                        <div className="zcwf_col_help"></div>
                      </div>
                    </div>
                    <div className="zcwf_row">
                      <div className="zcwf_col_lab"></div>
                      <div className="zcwf_col_fld">
                        <input
                          onClick={() => {
                            onFormClick({
                              stream_score: resolve_stream_score(
                                data.StreamType
                              ),
                              event_name: "Form Click",
                              section_name: "Download Form Section",
                              page_source: `${data.PageSEO.PageTitle}`,
                              label: `${data.EBookFormFields.SubmitButton}`,
                            });
                          }}
                          type="submit"
                          id="formsubmit"
                          value={data.EBookFormFields.SubmitButton}
                          title="Submit"
                          className="formsubmit cursor-pointer inline-block w-full button px-5 py-4 uppercase hyperlink text-center text-white transition duration-200 bg-black 
                                            rounded-r-xl rounded-b-xl transition duration-200 hover:bg-gray-500 ease"
                        />
                      </div>
                    </div>

                    {/* <!-- Do not remove this --- Analytics Tracking code ends. --> */}
                  </form>
                </div>
                <svg
                  className="hidden md:absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-gray-50 fill-current"
                  viewBox="0 0 91 91"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g stroke="none" strokeWidth="1" fillRule="evenodd">
                    <g fillRule="nonzero">
                      <g>
                        <g>
                          <circle cx="3.261" cy="3.445" r="2.72"></circle>
                          <circle cx="15.296" cy="3.445" r="2.719"></circle>
                          <circle cx="27.333" cy="3.445" r="2.72"></circle>
                          <circle cx="39.369" cy="3.445" r="2.72"></circle>
                          <circle cx="51.405" cy="3.445" r="2.72"></circle>
                          <circle cx="63.441" cy="3.445" r="2.72"></circle>
                          <circle cx="75.479" cy="3.445" r="2.72"></circle>
                          <circle cx="87.514" cy="3.445" r="2.719"></circle>
                        </g>
                        <g transform="translate(0 12)">
                          <circle cx="3.261" cy="3.525" r="2.72"></circle>
                          <circle cx="15.296" cy="3.525" r="2.719"></circle>
                          <circle cx="27.333" cy="3.525" r="2.72"></circle>
                          <circle cx="39.369" cy="3.525" r="2.72"></circle>
                          <circle cx="51.405" cy="3.525" r="2.72"></circle>
                          <circle cx="63.441" cy="3.525" r="2.72"></circle>
                          <circle cx="75.479" cy="3.525" r="2.72"></circle>
                          <circle cx="87.514" cy="3.525" r="2.719"></circle>
                        </g>
                        <g transform="translate(0 24)">
                          <circle cx="3.261" cy="3.605" r="2.72"></circle>
                          <circle cx="15.296" cy="3.605" r="2.719"></circle>
                          <circle cx="27.333" cy="3.605" r="2.72"></circle>
                          <circle cx="39.369" cy="3.605" r="2.72"></circle>
                          <circle cx="51.405" cy="3.605" r="2.72"></circle>
                          <circle cx="63.441" cy="3.605" r="2.72"></circle>
                          <circle cx="75.479" cy="3.605" r="2.72"></circle>
                          <circle cx="87.514" cy="3.605" r="2.719"></circle>
                        </g>
                        <g transform="translate(0 36)">
                          <circle cx="3.261" cy="3.686" r="2.72"></circle>
                          <circle cx="15.296" cy="3.686" r="2.719"></circle>
                          <circle cx="27.333" cy="3.686" r="2.72"></circle>
                          <circle cx="39.369" cy="3.686" r="2.72"></circle>
                          <circle cx="51.405" cy="3.686" r="2.72"></circle>
                          <circle cx="63.441" cy="3.686" r="2.72"></circle>
                          <circle cx="75.479" cy="3.686" r="2.72"></circle>
                          <circle cx="87.514" cy="3.686" r="2.719"></circle>
                        </g>
                        <g transform="translate(0 49)">
                          <circle cx="3.261" cy="2.767" r="2.72"></circle>
                          <circle cx="15.296" cy="2.767" r="2.719"></circle>
                          <circle cx="27.333" cy="2.767" r="2.72"></circle>
                          <circle cx="39.369" cy="2.767" r="2.72"></circle>
                          <circle cx="51.405" cy="2.767" r="2.72"></circle>
                          <circle cx="63.441" cy="2.767" r="2.72"></circle>
                          <circle cx="75.479" cy="2.767" r="2.72"></circle>
                          <circle cx="87.514" cy="2.767" r="2.719"></circle>
                        </g>
                        <g transform="translate(0 61)">
                          <circle cx="3.261" cy="2.846" r="2.72"></circle>
                          <circle cx="15.296" cy="2.846" r="2.719"></circle>
                          <circle cx="27.333" cy="2.846" r="2.72"></circle>
                          <circle cx="39.369" cy="2.846" r="2.72"></circle>
                          <circle cx="51.405" cy="2.846" r="2.72"></circle>
                          <circle cx="63.441" cy="2.846" r="2.72"></circle>
                          <circle cx="75.479" cy="2.846" r="2.72"></circle>
                          <circle cx="87.514" cy="2.846" r="2.719"></circle>
                        </g>
                        <g transform="translate(0 73)">
                          <circle cx="3.261" cy="2.926" r="2.72"></circle>
                          <circle cx="15.296" cy="2.926" r="2.719"></circle>
                          <circle cx="27.333" cy="2.926" r="2.72"></circle>
                          <circle cx="39.369" cy="2.926" r="2.72"></circle>
                          <circle cx="51.405" cy="2.926" r="2.72"></circle>
                          <circle cx="63.441" cy="2.926" r="2.72"></circle>
                          <circle cx="75.479" cy="2.926" r="2.72"></circle>
                          <circle cx="87.514" cy="2.926" r="2.719"></circle>
                        </g>
                        <g transform="translate(0 85)">
                          <circle cx="3.261" cy="3.006" r="2.72"></circle>
                          <circle cx="15.296" cy="3.006" r="2.719"></circle>
                          <circle cx="27.333" cy="3.006" r="2.72"></circle>
                          <circle cx="39.369" cy="3.006" r="2.72"></circle>
                          <circle cx="51.405" cy="3.006" r="2.72"></circle>
                          <circle cx="63.441" cy="3.006" r="2.72"></circle>
                          <circle cx="75.479" cy="3.006" r="2.72"></circle>
                          <circle cx="87.514" cy="3.006" r="2.719"></circle>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <svg
                  className="hidden md:absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-gray-50 fill-current"
                  viewBox="0 0 91 91"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g stroke="none" strokeWidth="1" fillRule="evenodd">
                    <g fillRule="nonzero">
                      <g>
                        <g>
                          <circle cx="3.261" cy="3.445" r="2.72"></circle>
                          <circle cx="15.296" cy="3.445" r="2.719"></circle>
                          <circle cx="27.333" cy="3.445" r="2.72"></circle>
                          <circle cx="39.369" cy="3.445" r="2.72"></circle>
                          <circle cx="51.405" cy="3.445" r="2.72"></circle>
                          <circle cx="63.441" cy="3.445" r="2.72"></circle>
                          <circle cx="75.479" cy="3.445" r="2.72"></circle>
                          <circle cx="87.514" cy="3.445" r="2.719"></circle>
                        </g>
                        <g transform="translate(0 12)">
                          <circle cx="3.261" cy="3.525" r="2.72"></circle>
                          <circle cx="15.296" cy="3.525" r="2.719"></circle>
                          <circle cx="27.333" cy="3.525" r="2.72"></circle>
                          <circle cx="39.369" cy="3.525" r="2.72"></circle>
                          <circle cx="51.405" cy="3.525" r="2.72"></circle>
                          <circle cx="63.441" cy="3.525" r="2.72"></circle>
                          <circle cx="75.479" cy="3.525" r="2.72"></circle>
                          <circle cx="87.514" cy="3.525" r="2.719"></circle>
                        </g>
                        <g transform="translate(0 24)">
                          <circle cx="3.261" cy="3.605" r="2.72"></circle>
                          <circle cx="15.296" cy="3.605" r="2.719"></circle>
                          <circle cx="27.333" cy="3.605" r="2.72"></circle>
                          <circle cx="39.369" cy="3.605" r="2.72"></circle>
                          <circle cx="51.405" cy="3.605" r="2.72"></circle>
                          <circle cx="63.441" cy="3.605" r="2.72"></circle>
                          <circle cx="75.479" cy="3.605" r="2.72"></circle>
                          <circle cx="87.514" cy="3.605" r="2.719"></circle>
                        </g>
                        <g transform="translate(0 36)">
                          <circle cx="3.261" cy="3.686" r="2.72"></circle>
                          <circle cx="15.296" cy="3.686" r="2.719"></circle>
                          <circle cx="27.333" cy="3.686" r="2.72"></circle>
                          <circle cx="39.369" cy="3.686" r="2.72"></circle>
                          <circle cx="51.405" cy="3.686" r="2.72"></circle>
                          <circle cx="63.441" cy="3.686" r="2.72"></circle>
                          <circle cx="75.479" cy="3.686" r="2.72"></circle>
                          <circle cx="87.514" cy="3.686" r="2.719"></circle>
                        </g>
                        <g transform="translate(0 49)">
                          <circle cx="3.261" cy="2.767" r="2.72"></circle>
                          <circle cx="15.296" cy="2.767" r="2.719"></circle>
                          <circle cx="27.333" cy="2.767" r="2.72"></circle>
                          <circle cx="39.369" cy="2.767" r="2.72"></circle>
                          <circle cx="51.405" cy="2.767" r="2.72"></circle>
                          <circle cx="63.441" cy="2.767" r="2.72"></circle>
                          <circle cx="75.479" cy="2.767" r="2.72"></circle>
                          <circle cx="87.514" cy="2.767" r="2.719"></circle>
                        </g>
                        <g transform="translate(0 61)">
                          <circle cx="3.261" cy="2.846" r="2.72"></circle>
                          <circle cx="15.296" cy="2.846" r="2.719"></circle>
                          <circle cx="27.333" cy="2.846" r="2.72"></circle>
                          <circle cx="39.369" cy="2.846" r="2.72"></circle>
                          <circle cx="51.405" cy="2.846" r="2.72"></circle>
                          <circle cx="63.441" cy="2.846" r="2.72"></circle>
                          <circle cx="75.479" cy="2.846" r="2.72"></circle>
                          <circle cx="87.514" cy="2.846" r="2.719"></circle>
                        </g>
                        <g transform="translate(0 73)">
                          <circle cx="3.261" cy="2.926" r="2.72"></circle>
                          <circle cx="15.296" cy="2.926" r="2.719"></circle>
                          <circle cx="27.333" cy="2.926" r="2.72"></circle>
                          <circle cx="39.369" cy="2.926" r="2.72"></circle>
                          <circle cx="51.405" cy="2.926" r="2.72"></circle>
                          <circle cx="63.441" cy="2.926" r="2.72"></circle>
                          <circle cx="75.479" cy="2.926" r="2.72"></circle>
                          <circle cx="87.514" cy="2.926" r="2.719"></circle>
                        </g>
                        <g transform="translate(0 85)">
                          <circle cx="3.261" cy="3.006" r="2.72"></circle>
                          <circle cx="15.296" cy="3.006" r="2.719"></circle>
                          <circle cx="27.333" cy="3.006" r="2.72"></circle>
                          <circle cx="39.369" cy="3.006" r="2.72"></circle>
                          <circle cx="51.405" cy="3.006" r="2.72"></circle>
                          <circle cx="63.441" cy="3.006" r="2.72"></circle>
                          <circle cx="75.479" cy="3.006" r="2.72"></circle>
                          <circle cx="87.514" cy="3.006" r="2.719"></circle>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

// Return a list of possible value for ebook
// export const getStaticPaths = async () => {
//   // dynamic route array values must be acquired here from strapi
//     const data=[{ebook:'definitive-guide-sap-s4hana-assessment'},{ebook:'sap-custom-code-migration-guide'},{ebook:'sap-s4hana-testing-guide'},{ebook:'manage-digital-transformation-effectively'},{ebook:'unlocking-digital-transformation-guide'}]

//     const paths = data.map(index => {
//         return ({
//             params:{ebook:index.ebook}
//         })
//     })
//     return {
//         paths,
//         fallback:true
//     }
// }
// Fetch necessary data for the blog post using params.ebook
export const getServerSideProps = async (ctx) => {
  const ebook = ctx.params.ebook;
  const res = await fetch(`https://strapi.ktern.com/e-books?slug=${ebook}`);
  const data = await res.json();
  if (data[0] == undefined) {
    ctx.res.setHeader("Location", "/404");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  const res1 = await fetch("https://strapi.ktern.com/header", {
    method: "get",
  });
  const h_data = await res1.json();
  const res2 = await fetch("https://strapi.ktern.com/footer", {
    method: "get",
  });
  const f_data = await res2.json();
  return {
    props: {
      data: data[0],
      h_data: h_data,
      f_data: f_data,
    },
  };
};
export default Ebook_Landing;
