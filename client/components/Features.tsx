const features = [
  {
    title: "AI Prediction",
    description: "Get smart college recommendations based on your rank.",
  },
  {
    title: "Safe / Target / Dream",
    description: "Understand your admission chances clearly.",
  },
  {
    title: "Placement Insights",
    description: "Compare average packages and opportunities.",
  },
  {
    title: "College Comparison",
    description: "Compare colleges side-by-side easily.",
  },
];

export default function Features() {
  return (
    <section className="w-full max-w-6xl mt-24 px-4">
      
      <h2 className="text-4xl font-bold text-center mb-12">
        Why UniFixed?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl"
          >
            <h3 className="text-2xl font-semibold mb-3">
              {feature.title}
            </h3>

            <p className="text-zinc-400">
              {feature.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}