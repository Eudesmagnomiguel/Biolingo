'use client';

import AppLayout from '@/components/AppLayout';
import AnimalCard from '@/components/AnimalCard';
import { animalContributors } from '@/lib/animal-data';

function ExploreContent() {
  return (
    <div className="py-6">
      <section className="text-left my-8">
        <h1 className="text-4xl font-bold mb-2">Explore o Mundo Animal</h1>
        <p className="text-muted-foreground text-lg">
          Descubra as criaturas incríveis que partilham o nosso planeta.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {animalContributors.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <AppLayout>
      <ExploreContent />
    </AppLayout>
  );
}
