import type { ReactNode } from 'react';
import LegalHeader from './LegalHeader';
import LegalTableOfContents from './LegalTableOfContents';
import LegalContactCard from './LegalContactCard';
import LegalNavigation from './LegalNavigation';

interface LegalPageLayoutProps {
  badge?: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  toc?: { id: string; label: string }[];
  current?: string;
  children: ReactNode;
}

export default function LegalPageLayout({
  badge,
  title,
  subtitle,
  lastUpdated,
  toc = [],
  current,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12 md:py-16">
      <LegalHeader badge={badge} title={title} subtitle={subtitle} lastUpdated={lastUpdated} />
      {toc.length > 0 && <LegalTableOfContents items={toc} />}
      <article className="mt-16 space-y-16">{children}</article>
      <div className="mt-16">
        <LegalContactCard email="spaceyisusshop@gmail.com" />
      </div>
      <div className="mt-12">
        <LegalNavigation current={current} />
      </div>
    </div>
  );
}
