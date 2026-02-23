type Params = {
  id: string;
};

export default async function BookDetailsPage({ params }: { params: Params }) {
  const { id } = await params
  return <h1>Books/{id}</h1>;
}

