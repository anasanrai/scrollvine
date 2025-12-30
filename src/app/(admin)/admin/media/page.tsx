import AdminForm from '@/components/AdminForm';
import MediaManager from '@/components/MediaManager';

export const metadata = {
  title: 'Media — Admin'
};

export default function AdminMediaPage() {
  return (
    <AdminForm title="Media library" description="Upload book covers and press kit assets.">
      <MediaManager />
    </AdminForm>
  );
}
