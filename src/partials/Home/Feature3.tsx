import Feature from "../../components/Feature";
import FeatureImage4 from "../../assets/features/4.png";

export default function Feature3() {
  return (
    <Feature
      title="Empower Your Gaming Community"
      description=""
      direction="ltr"
      image={FeatureImage4}
    >
      {/* checkmarks */}
      <ol className="checkmark-list space-y-3 text-left">
        <li data-aos="fade-up" data-aos-delay={0}>
          <span className="font-bold">Character Performance Tracking:</span>{" "}
          Keep an eye on your performance with specific champions, agents, and
          heroes. Compete to become the best one-trick Teemo and dominate the
          leaderboards!
        </li>

        <li data-aos="fade-up" data-aos-delay={100}>
          <span className="font-bold">Casual Server Customization:</span> Tailor
          the bot to your server's needs, whether you're a casual player or a
          competitive gamer. Choose captains, join queues without specifying
          roles, and let the bot handle the rest!
        </li>

        <li data-aos="fade-up" data-aos-delay={200}>
          <span className="font-bold">Comprehensive Profile and Stats:</span>{" "}
          Access a centralized hub for your profile and stats, tracking MMR, MVP
          votes, longest winstreaks, best duo partners, and your top 3
          characters. For admins, monitor server performance with an overview of
          player participation and total games played.
        </li>

        <p data-aos="fade-up" data-aos-delay={300}>
          <span className="font-bold">Coming Soon!</span>
        </p>

        <li data-aos="fade-up" data-aos-delay={400}>
          <span className="font-bold">Best of 3/5 Series:</span> Organize
          intense scrimmages with a best-of series for those serious about
          competition.
        </li>

        <li data-aos-delay={500} data-aos="fade-up">
          <span className="font-bold">InHouseQueue Challenges:</span> Engage
          your members by offering exclusive Discord roles for completing
          challenges or reaching milestones.
        </li>
      </ol>
    </Feature>
  );
}
