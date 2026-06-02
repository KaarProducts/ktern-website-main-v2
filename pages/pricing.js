import Image from "next/image";
import Link from "next/link";
import Layout from "../component/Layout";
import { NextSeo } from "next-seo";
import { BreadcrumbJsonLd } from "next-seo";
import { LogoJsonLd } from "next-seo";
import { SocialProfileJsonLd } from "next-seo";

import React, { useState, useRef, useEffect } from "react";
import { isPlainObject } from "lodash";
import Carousel from "react-multi-carousel";
import FAQ from "../component/faq";
import BreadCrumb from "../component/breadcrumb";
import Event, {
  resolve_interest_score,
  resolve_stream_score,
} from "../component/page_event";
import Markdown from "markdown-to-jsx";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Pricing({ data, h_data, f_data }) {
  // Generate card IDs dynamically from the data
  const generateCardId = (title) => {
    if (!title) return 'Product_Title';
    return title
      .toLowerCase()
      .replace(/^digital\s+/i, '') // Remove "Digital" prefix
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, ''); // Remove special characters
  };

  // Initialize selected cards state dynamically from data
  const initializeSelectedCards = () => {
    const initialState = {};
    data.PricingCard?.forEach((card) => {
      if (card?.StreamTitle) {
        const cardId = generateCardId(card.StreamTitle);
        initialState[cardId] = true; // All cards selected by default
      }
    });
    return initialState;
  };

  const [selectedCards, setSelectedCards] = useState(initializeSelectedCards());

  const breadcrumb = [];
  data.PageSEO.BreadCrumb.map((dt) => {
    breadcrumb.push({ position: dt.position, name: dt.name, item: dt.item });
  });

  // Amplitude Tracking onClick
  function onClick(data) {
    Event(data);
  }

  // Calculate total price based on selected cards
  const calculateTotal = () => {
    let total = 0;
    data.PricingCard?.forEach((card) => {
      if (card?.StreamTitle) {
        const cardId = generateCardId(card.StreamTitle);
        if (selectedCards[cardId]) {
          total += parseInt(card.Price) || 0;
        }
      }
    });
    return total;
  };

  // Toggle card selection
  const toggleCard = (cardId, streamName) => {
    setSelectedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // Select all cards
  const selectAllCards = () => {
    const allSelected = {};
    data.PricingCard?.forEach((card) => {
      if (card?.StreamTitle) {
        const cardId = generateCardId(card.StreamTitle);
        allSelected[cardId] = true;
      }
    });
    setSelectedCards(allSelected);
  };

  // Update border colors on mount and when selection changes
  useEffect(() => {
    Object.keys(selectedCards).forEach(cardId => {
      if (process.browser && document.getElementById(cardId)) {
        document.getElementById(cardId).style.borderColor =
          selectedCards[cardId] ? "blue" : "gray";
      }
    });
  }, [selectedCards]);

  const faq = [];
  data.FAQSection.map((dt) => {
    faq.push({ questionName: dt.Question, acceptedAnswerText: dt.Answer });
  });

  // Render individual pricing card
  const renderPricingCard = (cardData, index) => {
    if (!cardData?.StreamTitle) return null;
    const cardId = generateCardId(cardData.StreamTitle);
    const isSelected = selectedCards[cardId];
    const streamName = cardData.StreamTitle.toLowerCase().replace("digital ", "").replace(" ", "-");

    return (
      <div key={`card-${cardId}-${index}`} className="w-full max-w-3xl mb-3">
        <div
          id={cardId}
          className="relative flex flex-col justify-between h-full p-6 overflow-hidden border rounded-lg"
        >
          {isSelected && (
            <span className="absolute top-0 right-0 px-3 py-0 text-xs tracking-widest text-white bg-blue-600 rounded-bl">
              Selected
            </span>
          )}
          <details className="">
            <summary className="cursor-pointer">
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between items-start">
                  <div className="flex flex-row">
                    {cardData.StreamLogoURL && (
                      <span className="flex w-10 h-8 mb-3 mr-0 bg-transparent rounded-lg">
                        <Image
                          priority
                          src={cardData.StreamLogoURL}
                          alt={cardData.StreamTitle || 'Stream logo'}
                          height={40}
                          width={30}
                        />
                      </span>
                    )}
                    <h2 className="mb-1 pr-2 card-heading">
                      {cardData.StreamTitle}
                    </h2>
                  </div>

                  <div className="flex flex-arrow flex-shrink-0">
                    <button
                      className="inline-flex items-center justify-center mr-2 px-4 py-2 hyperlink text-gray-600 whitespace-no-wrap bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none h-10"
                      onClick={() => {
                        toggleCard(cardId, streamName);
                        onClick({
                          stream_score: resolve_stream_score(isSelected ? "none" : streamName),
                          event_name: "Button Click",
                          section_name: `${cardData.StreamTitle} Section`,
                          page_source: `${data.PageSEO.PageTitle}`,
                          label: isSelected ? "Unselect" : "Select",
                        });
                      }}
                    >
                      {isSelected ? "Unselect" : "Select"}
                    </button>
                    <div id="arrow" className="mt-2"></div>
                  </div>
                </div>
                {cardData.Price && (
                  <h1 className="flex items-center pb-0 card-heading text-gray-900 border-gray-200">
                    {cardData.Price.includes('/') ? (
                      <>
                        <span>{cardData.Price.split('/')[0]}</span>
                        <span className="ml-1 text-lg font-normal text-gray-500">/{cardData.Price.split('/')[1]}</span>
                      </>
                    ) : (
                      <span>{cardData.Price}</span>
                    )}
                  </h1>
                )}
                {cardData.StreamDescription && (
                  <p className="mt-3 card-subheading pb-4 text-gray-500">
                    {cardData.StreamDescription}
                  </p>
                )}
              </div>
            </summary>

            {/* <div className="border-t pt-5 mb-4">
              <div className="flex flex-row justify-between">
                <h2 className="mb-3 text-lg font-bold">Bots</h2>
              </div>
              {cardData.Bots.map((dt, idx) => (
                <div
                  key={`bot-${cardId}-${idx}`}
                  className="inline-flex items-center mb-2 mr-2 card-subheading bg-secondary px-3 py-1 bg-white text-black rounded-full"
                >
                  {dt.listItem}
                </div>
              ))}
            </div> */}

            {(cardData.KeyFeatures?.length > 0 || cardData.Values?.length > 0) && (
              <div className={`flex pt-5 mb-6 pb-2 gap-6 ${cardData.StreamDescription ? 'border-t' : ''} ${cardData.ContinuousValue?.length > 0 || cardData.AdditionalInfo?.length > 0 ? 'border-b' : ''}`}>
                {cardData.KeyFeatures?.length > 0 && (
                  <div className="justify-between w-1/2">
                    <h2 className="mb-3 text-lg font-bold">Key Features</h2>
                    {cardData.KeyFeatures.map((dt, idx) => (
                      <Link key={`feature-${cardId}-${idx}`} href={dt.PageUrl || '#'}>
                        <a
                          onClick={() => {
                            onClick({
                              stream_score: resolve_stream_score(streamName),
                              event_name: "Link Click",
                              section_name: `${cardData.StreamTitle}-Key Features Section`,
                              page_source: `${data.PageSEO.PageTitle}`,
                              label: `${dt.listItem}`,
                            });
                          }}
                          className="flex items-center mb-2 text-gray-600 card-subheading"
                        >
                          <svg
                            className="w-5 h-5 mr-1 text-black"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          {dt.listItem}
                        </a>
                      </Link>
                    ))}
                  </div>
                )}
                {cardData.Values?.length > 0 && (
                  <div className="justify-between w-1/2">
                    <h2 className="mb-3 text-lg font-bold">Values</h2>
                    {cardData.Values.map((dt, idx) => (
                      <p
                        key={`value-${cardId}-${idx}`}
                        className="flex items-center mb-2 text-gray-600 card-subheading"
                      >
                        <svg
                          className="w-5 h-5 mr-1 text-black"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {dt.listItem}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {cardData.ContinuousValue?.length > 0 && (
              <div className={`pb-4 ${cardData.AdditionalInfo?.length > 0 ? 'border-b' : ''}`}>
                <div className="flex flex-row justify-between">
                  <h2 className="mb-1 text-lg font-bold">Continuous Value</h2>
                </div>
                {cardData.ContinuousValue.map((item, idx) => (
                  <p
                    key={`continuous-${cardId}-${idx}`}
                    className="flex items-center mb-2 text-gray-600 card-subheading"
                  >
                    {item.listItem}
                  </p>
                ))}
              </div>
            )}

            {cardData.AdditionalInfo?.length > 0 && (
              <div className={`mt-6 pb-4 ${cardData.ExtraText ? 'border-b' : ''}`}>
                <div className="flex flex-row justify-between">
                  <h2 className="mb-1 text-lg font-bold">Additional Info</h2>
                </div>
                {cardData.AdditionalInfo.map((item, idx) => (
                  <p
                    key={`additional-${cardId}-${idx}`}
                    className="flex items-center mb-2 text-gray-600 card-subheading"
                  >
                    <span className="inline-flex items-center justify-center flex-shrink-0 w-4 h-4 mr-2 text-white bg-white rounded-full">
                      <Image
                        priority
                        src="https://static.thenounproject.com/png/925249-200.png"
                        alt=""
                        width={150}
                        height={150}
                      />
                    </span>
                    {item.listItem}
                  </p>
                ))}
              </div>
            )}

            {cardData.ExtraText && (
              <div className="w-full border-t pt-3">
                <p className="mt-3 text-xs text-center text-gray-500">
                  {cardData.ExtraText}
                </p>
              </div>
            )}
          </details>
        </div>
      </div>
    );
  };

  // Render summary card item
  const renderSummaryCard = (cardData, index, prefix = '') => {
    if (!cardData?.StreamTitle) return null;
    const cardId = generateCardId(cardData.StreamTitle);
    const isSelected = selectedCards[cardId];

    if (!isSelected) return null;

    return (
      <div key={`${prefix}-summary-${cardId}-${index}`} className="flex py-2 pl-5 pr-0 mb-4 bg-white rounded-lg overflow-hidden flex-row justify-between">
        <div className="flex items-center flex-1 min-w-0 mr-2">
          {cardData.StreamLogoURL && (
            <span className="flex items-center justify-center w-8 h-8 mr-3 bg-transparent rounded-lg flex-shrink-0">
              <Image
                priority
                src={cardData.StreamLogoURL}
                alt={cardData.StreamTitle || 'Stream logo'}
                height={30}
                width={30}
              />
            </span>
          )}
          <h2 className="mb-1 card-subheading truncate">
            {cardData.StreamTitle}
          </h2>
        </div>
        <div className="flex-shrink-0">
          <button
            className="inline-flex items-center justify-center mr-2 px-4 py-1 hyperlink text-gray-600 whitespace-no-wrap bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none"
            onClick={() => toggleCard(cardId, cardData.StreamTitle?.toLowerCase().replace("digital ", "").replace(" ", "-") || "")}
          >
            Unselect
          </button>
        </div>
      </div>
    );
  };

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
            href: "https://ktern-public-files.s3.us-east-1.amazonaws.com/website/icons/favicon.ico",
          },
          {
            rel: "apple-touch-icon",
            href: "https://ktern-public-files.s3.us-east-1.amazonaws.com/website/icons/apple-touch-icon-76x76.png",
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

      <Layout h_data={h_data} f_data={f_data}>
        {/* Cards Section with Calculator */}
        <section className="text-gray-700">
          <div className="container px-5 pt-32 pb-4 mx-auto">
            <div className="flex flex-col w-full mb-8 text-center">
              <BreadCrumb color="black" b_data={breadcrumb} />
              <div className="relative mt-4 z-10 max-w-3xl px-12 mx-auto space-y-5 text-center lg:px-0">
                <h1 className="heading">{data.PageHeader.header}</h1>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cards Column */}
              <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(110vh)' }}>
                <div className="flex flex-col items-center">
                  {data.PricingCard?.filter(cardData => cardData?.StreamTitle).map((cardData, index) =>
                    renderPricingCard(cardData, index)
                  )}
                </div>
              </div>

              {/* Calculator Column */}
              <div className="w-full lg:w-96 flex-shrink-0">
                <div className="flex flex-col border border-gray-600 background rounded-lg" style={{ maxHeight: 'calc(110vh)' }}>
                  <div className="relative flex flex-col p-6">
                    <div className="flex">
                      <div className="w-1/2">
                        <h2 className="mb-1 card-heading text-white">
                          Selected Products
                        </h2>
                      </div>
                      <div
                        className="w-1/2 p-2 border-2 text-center mb-14 rounded-lg cursor-pointer text-white justify-center flex items-center"
                        onClick={selectAllCards}
                      >
                        Select all
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto px-6">
                    {data.PricingCard?.filter(cardData => cardData?.StreamTitle).map((cardData, index) =>
                      renderSummaryCard(cardData, index)
                    )}
                  </div>
                  <div className="p-6">
                    <Markdown
                      options={{
                        overrides: {
                          p: {
                            props: {
                              className: "text-white text-md text-justify",
                            },
                          },
                          strong: {
                            props: {
                              className: "",
                            },
                          },
                          a: {
                            props: {
                              className:
                                "text-blue-500 text-justify hover:underline",
                            },
                          },
                        },
                      }}
                      className="text-white mb-2"
                    >
                      {data.PricingTerms}
                    </Markdown>
                    <div className="w-full">
                      <Link href="/contact">
                        <a
                          onClick={() => {
                            onClick({
                              stream_score: resolve_stream_score("none"),
                              event_name: "Button Click",
                              section_name: "Pricing Contact Section",
                              page_source: `${data.PageSEO.PageTitle}`,
                              label: `Contact Sales`,
                            });
                          }}
                          className="inline-flex items-center button justify-center w-full px-4 py-3 bg-black text-white button whitespace-no-wrap border-2 border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:text-black focus:outline-none focus:shadow-none"
                        >
                          Contact Sales
                          <div className="w-4 h-4 ml-2 relative">
                            <Image
                              priority
                              layout="fill"
                              src="/down-arrow-svgrepo-com.svg"
                              alt="down arrow"
                            />
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer logos Section */}
        <section className="overflow-hidden text-gray-700">
          <div className="px-4 py-10">
            <div className="container px-4 mx-auto">
              <h2 className="text-center text-gray-500 section-heading sm:sm-section-heading">
                {data.LogoSectionTitle}
              </h2>
            </div>
            <Carousel className="bots flex px-8" responsive={responsive}>
              {data.LogoSectionContent.map((dt, idx) => (
                <div key={`logo-${idx}`} className="p-3 bots-card flex-row">
                  <Image
                    priority
                    className="w-auto lg:w-100"
                    src={dt.imageURL}
                    alt={dt.imageDescription}
                    width={dt.width}
                    height={dt.height}
                    layout="responsive"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </section>
        <FAQ data={data.FAQSection} title={data.FAQTitle} />
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  let res = await fetch("https://strapi.ktern.com/pricing", {
    method: "get",
  });
  let data = await res.json();

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
      data: data,
      h_data: h_data,
      f_data: f_data,
    },
  };
};