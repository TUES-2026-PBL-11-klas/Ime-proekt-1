type Params = {
  id: string;
};

export default function AdminEditBookPage({ params }: { params: Params }) {
  const { id } = params;
  return <h1>Admin - Edit Book ({id})</h1>;
}

