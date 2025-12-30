import ArticleLayout from '@/components/ArticleLayout';

export const metadata = {
  title: 'About — ScrollVine',
  description: 'About Dan A Rai.'
};

export default function AboutPage() {
  return (
    <ArticleLayout title="About Dan A Rai" eyebrow="About">
      <p>
        Dan A Rai is an author devoted to intimate storytelling, lyrical prose, and human-scale
        narratives. ScrollVine is the studio where his books, essays, and press materials live.
      </p>
      <p>
        The platform is designed to feel like an editorial journal—quiet, purposeful, and crafted
        for immersive reading.
      </p>
    </ArticleLayout>
  );
}
