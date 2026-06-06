import { redirect } from 'next/navigation';

// Root redirects to the clients page once the dashboard shell is built.
// For now, redirect to a placeholder.
export default function RootPage() {
  redirect('/overview');
}
