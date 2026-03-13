import { getStoreSettings } from '@/lib/actions';
import SettingsForm from '@/components/admin/SettingsForm';
import { Settings as SettingsIcon } from 'lucide-react';

export default async function AdminSettingsPage() {
  const settings = await getStoreSettings();

  return (
    <SettingsForm settings={settings} />
  );
}
