import ArticleLayout from '@/components/ArticleLayout';

export const metadata = {
  title: 'Privacy — ScrollVine',
  description: 'Privacy policy for ScrollVine.'
};

export default function PrivacyPage() {
  return (
    <ArticleLayout title="Privacy Policy" eyebrow="Privacy">
      <p>
        ScrollVine collects only the information needed to respond to inquiries and deliver updates.
        We never sell your data. Contact submissions are stored securely in Supabase.
      </p>
      <p>
        For any questions about how your data is used, email press@scrollvine.com.
      </p>
    </ArticleLayout>
  );
}
