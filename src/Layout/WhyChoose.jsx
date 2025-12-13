import React from "react";

const WhyChoose = () => {
  const whyChooseData = [
    {
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with years of experience.",
      icon: "👨‍🏫",
    },
    {
      title: "Flexible Learning",
      description: "Access courses anytime, anywhere to suit your schedule.",
      icon: "⏰",
    },
    {
      title: "Practical Projects",
      description: "Hands-on projects to apply your knowledge effectively.",
      icon: "🛠️",
    },
    {
      title: "Certification",
      description: "Get certified and boost your career opportunities.",
      icon: "📜",
    },
  ];
  return (
    <div>
      <section className="mt-16">
        <h2 className="text-3xl md:text-5xl text-center font-bold mb-10">
          Why Choose This Course?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded shadow hover:shadow-lg transition transform hover:scale-110 text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyChoose;
