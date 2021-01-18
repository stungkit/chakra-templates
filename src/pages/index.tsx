import path from 'path';
import * as fs from 'fs';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { AppLayout } from '@/layout/AppLayout';
import { Hero } from '@/components/HomepageSections/Hero';
import { GettingStarted } from '@/components/HomepageSections/GettingStarted';
import {
  OpenSource,
  OpenSourceProps,
} from '@/components/HomepageSections/OpenSource';
import { DiscordBanner } from '@/components/HomepageSections/DiscordBanner';
import { fetchStargazers } from '../api/stargazers';
import { data } from '../data';
import { getCategoriesCount } from '@/utils/getCategoriesCount';
import { getTemplatesCount } from '@/utils/getTemplatesCount';

type PageProps = OpenSourceProps & {};

const Home: NextPage<PageProps> = ({
  contributors,
  stargazers,
  categoriesCount,
  templatesCount,
}: PageProps) => {
  return (
    <AppLayout>
      <NextSeo
        title="Chakra Templates - Production-ready Chakra UI Templates for developers"
        description="Production-ready Chakra UI Templates for developers"
      />
      <Hero />
      <GettingStarted />
      <OpenSource
        contributors={contributors}
        stargazers={stargazers}
        categoriesCount={categoriesCount}
        templatesCount={templatesCount}
      />
      <DiscordBanner />
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  // Get contributors from .all-contributorsrc
  const contributorsRcPath = path.resolve('.all-contributorsrc');
  const { contributors } = JSON.parse(
    fs.readFileSync(contributorsRcPath, 'utf-8')
  );

  // Get stargazers from GitHub API
  const stargazers = await fetchStargazers();

  // Counts
  const templatesCount = getTemplatesCount(data);
  const categoriesCount = getCategoriesCount(data);

  return {
    props: { contributors, stargazers, categoriesCount, templatesCount },
  };
};

export default Home;
