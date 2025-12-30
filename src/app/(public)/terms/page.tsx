import ArticleLayout from '@/components/ArticleLayout';

export const metadata = {
  title: 'Terms — ScrollVine',
  description: 'Terms of service for ScrollVine.'
};

export default function TermsPage() {
  return (
    <ArticleLayout title="Terms of Service" eyebrow="Terms">
      <p>
        By using ScrollVine, you agree to respect the intellectual property of Dan A Rai and the
        content presented on this site. Do not redistribute materials without written permission.
      </p>
      <p>
        ScrollVine may update these terms as the platform evolves.
      </p>
    </ArticleLayout>
  );
}
