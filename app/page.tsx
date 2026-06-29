import { prisma } from '@/lib/prisma';
import ListingGrid from '@/components/ListingGrid';

// This "export default" is the crucial part that Next.js requires
export default async function Dashboard() {
  const grants = await prisma.grant.findMany();
  
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Available Grants</h1>
      <ListingGrid grants={grants} />
    </main>
  );
}