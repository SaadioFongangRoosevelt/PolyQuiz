import useFetch from "../hooks/useFetch";

function TestFetch() {
  const { data, loading, error } = useFetch("/questions.json");

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div>
      {data.map((q) => (
        <p key={q.id}>{q.libelle}</p>
      ))}
    </div>
  );
}

export default TestFetch;