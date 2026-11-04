import BoardDirectors from "@/components/about/BoardDirectors";

export default function BoardCommittees({ committees }) {
  return (
    <div className="board-committee-list">
      {committees.map((committee) => (
        <section className="board-committee" key={committee.id} aria-labelledby={committee.id}>
          <h2 className="board-title" id={committee.id}>{committee.name}</h2>
          <BoardDirectors
            directors={committee.members.map((member) => ({
              ...member,
              bio: `Serves as ${member.role.toLowerCase()} of the ${committee.name}.`,
            }))}
          />
        </section>
      ))}
    </div>
  );
}
