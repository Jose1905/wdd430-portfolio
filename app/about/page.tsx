import ContactCard from "@/components/ContactCard";

const contactInfo = {
  phone: "+506 86223400",
  email: "davarela231@gmail.com",
  linkedIn: "https://github.com/Jose1905"
}

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <p className="text-lg text-gray-700">
        This about page shares more information about my background and work.
      </p>
      <ContactCard {...contactInfo}></ContactCard>
    </main>
  );
}