interface RegistrationSectionProps {
  title: string;
  cards: CardProps[];
}

interface CardProps {
  content: string;
  buttonText: string;
}

const InfoCard = ({ content, buttonText }: CardProps) => (
  <div className="bg-white rounded-lg shadow-lg p-6 text-blue-800 border border-gray-200 flex flex-col justify-between">
    <div>
      <span className="text-yellow-500 text-2xl">💬</span>
      <p className="mt-2">{content}</p>
    </div>
    <div className="mt-4 bg-blue-600 text-white text-center py-3 rounded-b-lg font-bold">
      {buttonText}
    </div>
  </div>
);

export default function RegistrationSection({
  title,
  cards
}: RegistrationSectionProps) {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: "url('/assets/bg-image.png')" }}
    >
      <h2 className="text-2xl font-bold text-blue-800 text-center mb-6">
        {title}
      </h2>
      <div className="container max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <InfoCard
            key={index}
            content={card.content}
            buttonText={card.buttonText}
          />
        ))}
      </div>
    </div>
  );
}
