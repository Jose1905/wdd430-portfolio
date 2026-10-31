interface ContactCardProps {
  phone: string;
  email: string;
  linkedIn: string;
}

export default function ContactCard({
  phone,
  email,
  linkedIn,
}: ContactCardProps) {
  return (
    <article className="p-4 border-l-4 border-blue-600 bg-gray-50 rounded">
      <h3 className="text-xl font-bold mb-2">Contact information</h3>
      <p className="text-gray-700 mb-3"><strong>Phone number:</strong> {phone}</p>
      <p className="text-gray-700 mb-3"><strong>Email:</strong> {email}</p>
      <a
        href={linkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 mb-3"
      >
        <strong>linkedIn:</strong> {linkedIn}
      </a>
    </article>
  );
}
