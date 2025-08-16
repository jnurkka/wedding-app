import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getDictionary, Lang } from "../dictionaries";

export default async function GuestListPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const lang = (await params).lang;
  const sp = await searchParams;
  const filter = (typeof sp?.food === 'string' ? sp.food : Array.isArray(sp?.food) ? sp.food[0] : undefined) ?? 'all';
  const dict = await getDictionary(lang);
  const supabase = await createClient();

  // Auth check
  const { data: userData, error } = await supabase.auth.getUser();
  if (error || !userData?.user) {
    redirect("/login");
  }

  // Fetch registrations with optional food order filter
  let query = supabase
    .from("registrations")
    .select("name, people_fr, people_sat, user_id, created_at, has_food_order");

  if (filter === 'missing') {
    query = query.eq('has_food_order', false);
  } else if (filter === 'done') {
    query = query.eq('has_food_order', true);
  }

  const { data: registrations, error: regError } = await query.order("created_at", { ascending: true });

  if (regError) {
    return <div>Error loading guest list.</div>;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f7fa" }}>
      <style>{`
        .guest-list-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1.5px 4px rgba(0,0,0,0.04);
          padding: 2.5rem 2rem 2rem 2rem;
          max-width: 700px;
          width: 100%;
        }
        .guest-list-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(0,0,0,0.03);
        }
        .guest-list-table th, .guest-list-table td {
          padding: 0.85rem 1.1rem;
          text-align: left;
        }
        .guest-list-table th {
          background: #f3f4f6;
          font-weight: 600;
          color: #333;
          border-bottom: 2px solid #e5e7eb;
        }
        .guest-list-table tr {
          transition: background 0.18s;
        }
        .guest-list-table tbody tr:nth-child(even) {
          background: #fafbfc;
        }
        .guest-list-table tbody tr:hover {
          background: #f0f4ff;
        }
        .guest-list-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-align: center;
          letter-spacing: -0.5px;
          color: #2d3748;
        }
        @media (max-width: 600px) {
          .guest-list-card {
            padding: 1.2rem 0.3rem;
          }
          .guest-list-title {
            font-size: 1.3rem;
          }
          .guest-list-table th, .guest-list-table td {
            padding: 0.5rem 0.4rem;
            font-size: 0.97rem;
          }
        }
      `}</style>
      <div className="guest-list-card">
        <div className="guest-list-title">{dict.rsvp.title} - Guest List</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: '1rem' }}>
          <a href="?food=all" style={{ padding: '6px 10px', borderRadius: 8, textDecoration: 'none', border: '1px solid #e5e7eb', background: filter === 'all' ? '#e5e7eb' : '#fff', color: '#111827' }}>All</a>
          <a href="?food=missing" style={{ padding: '6px 10px', borderRadius: 8, textDecoration: 'none', border: '1px solid #e5e7eb', background: filter === 'missing' ? '#e5e7eb' : '#fff', color: '#111827' }}>Missing order</a>
          <a href="?food=done" style={{ padding: '6px 10px', borderRadius: 8, textDecoration: 'none', border: '1px solid #e5e7eb', background: filter === 'done' ? '#e5e7eb' : '#fff', color: '#111827' }}>Has order</a>
        </div>
        <table className="guest-list-table">
          <thead>
            <tr>
              <th>{dict.rsvp.name}</th>
              <th>{dict.rsvp.people_friday}</th>
              <th>{dict.rsvp.people_saturday}</th>
              <th>{dict.rsvp.title}</th>
              <th>Food order</th>
            </tr>
          </thead>
          <tbody>
            {registrations && registrations.length > 0 ? (
              registrations.map((reg, i) => (
                <tr key={i}>
                  <td>{reg.name}</td>
                  <td>{reg.people_fr}</td>
                  <td>{reg.people_sat}</td>
                  <td>{new Date(reg.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                  <td>{reg.has_food_order ? '✅' : '—'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: 16 }}>
                  No guests registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}