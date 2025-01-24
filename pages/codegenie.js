// src/app/components/hero/Hero.tsx
import Layout from "../component/Layout";
cls
export default function Hero() {
    return (
        <Layout h_data={h_data} f_data={f_data}>
      <section className="bg-codegenie-gradient min-h-screen flex items-center justify-center text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Transform Your SAP Landscape
          </h1>
          <p className="text-xl mb-8 text-soft-cyan">
            AI-driven code remediation, extensibility governance, and seamless SAP BTP integration.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-neon-green text-deep-navy px-8 py-3 rounded-lg font-bold hover:bg-[#00CC66] transition">
              Start Free Trial
            </button>
            <button className="border-2 border-electric-blue text-electric-blue px-8 py-3 rounded-lg hover:bg-electric-blue hover:text-deep-navy transition">
              Watch Demo
            </button>
          </div>
          {/* Partner Logos */}
          <div className="mt-16 flex justify-center gap-12 opacity-80">
            <img src="/images/codegenie/sap-btp-logo.svg" className="h-12" alt="SAP BTP" />
            <img src="/images/codegenie/aws-logo.svg" className="h-12" alt="AWS" />
          </div>
        </div>
      </section>
      </Layout>
    );
  }

  export const getStaticProps = async ({ params }) => {
    const res = await fetch(`https://strapi.ktern.com/about-company`, {
      method: "get",
    });
  
    const data = await res.json();
  
    // console.log(data);
    const res1 = await fetch("https://strapi.ktern.com/header", {
      method: "get",
    });
    const h_data = await res1.json();
    const res2 = await fetch("https://strapi.ktern.com/footer", {
      method: "get",
    });
    const f_data = await res2.json();
    const news = await fetch(
      `https://strapi.ktern.com/news-center-pages?_sort=updatedAt:desc&_limit=4`
    );
    const n_data = await news.json();
    // console.log(n_data)
    return {
      props: {
        data: data,
        h_data: h_data,
        f_data: f_data,
        n_data: n_data,
      },
    };
  };