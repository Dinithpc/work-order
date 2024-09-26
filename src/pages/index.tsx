import type { NextPage } from 'next';
import Head from 'next/head';
import { usePageView } from '../hooks/use-page-view';
import { Layout as MarketingLayout } from '../layouts/marketing';
import { HomeCompare } from '../sections/home/home-compare';
import { HomeFaqs } from '../sections/home/home-faqs';
import { HomeFeatures } from '../sections/home/home-features';
import { HomeHero } from '../sections/home/home-hero';
import { HomePricing } from '../sections/home/home-pricing';
import { HomeSupport } from '../sections/home/home-support';
import { HomeUserFlows } from '../sections/home/home-user-flows';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Home | Carpatin
        </title>
      </Head>
      <main>
        <HomeHero />
        <HomeSupport />
        <HomeFeatures />
        <HomeUserFlows />
        <HomeCompare />
        <HomePricing />
        <HomeFaqs />
      </main>
    </>
  );
};

Page.getLayout = (page) => (
  <MarketingLayout>
    {page}
  </MarketingLayout>
);

export default Page;
