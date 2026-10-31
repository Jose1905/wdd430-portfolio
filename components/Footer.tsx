export default async function Footer() {
  "use cache";

  return (
    <footer className="bg-gray-800 text-white py-4 mt-12">
      <div className="container mx-auto text-center">
        <p>
          Copyright &copy; {new Date().getFullYear()} | David Vega | All rights
          reserved
        </p>
      </div>
    </footer>
  );
}
