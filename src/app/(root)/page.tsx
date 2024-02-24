import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <div>Home</div>
      <UserButton afterSignOutUrl='/' />
    </div>
  );
}
