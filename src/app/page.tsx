import Section from "./_components/Section";

export default async function Home() {
  return (
    <div>
      <Section title="Upcoming" endpoint="upcoming" />
      <Section title="Popular" endpoint="popular" />
      <Section title="Top rated" endpoint="top_rated" />
    </div>
  );
}
