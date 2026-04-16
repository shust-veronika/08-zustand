import Link from "next/link";

const CATEGORIES = [
  { id: "all", name: "All Notes", slug: "all" },
  { id: "work", name: "Work", slug: "work" },
  { id: "personal", name: "Personal", slug: "personal" },
  { id: "todo", name: "Todo", slug: "todo" },
  { id: "meeting", name: "Meeting", slug: "meeting" },
  { id: "shopping", name: "Shopping", slug: "shopping" },
];

export default function Default() {
  return (
    <nav className="sidebar-navigation">
      <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Categories</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {CATEGORIES.map((category) => (
          <li key={category.id} style={{ marginBottom: "0.5rem" }}>
            <Link 
              href={`/notes/filter/${category.slug}`}
              style={{
                textDecoration: "none",
                color: "#0070f3",
                fontWeight: "500"
              }}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}