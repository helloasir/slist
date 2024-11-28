import fs from 'fs';
import path from 'path';
import { useRouter } from 'next/router';

export async function getServerSideProps({ params }) {
  const { domain } = params;

  // Load all JSON files and find the domain
  const allData = [];
  for (let i = 1; i <= 10; i++) {
    const filePath = path.join(process.cwd(), 'app/data', `webs_${i}.json`);
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    allData.push(...fileData);
  }

  // Find the specific domain's data
  const domainData = allData.find(item => item.Domain === domain);

  if (!domainData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      domainData,
    },
  };
}

export default function Domain({ domainData }) {
  if (!domainData) {
    return <div>Domain not found.</div>;
  }

  return (
    <div className="container">
      <header>
        <h1>Domain Details: {domainData.Domain}</h1>
      </header>

      <main>
        <section>
          <h2>Details for {domainData.Domain}</h2>
          <ul>
            <li>Rank: {domainData.Rank}</li>
            <li>Detail 1: {domainData['Detail 1']}</li>
            <li>Detail 2: {domainData['Detail 2']}</li>
            <li>Detail 3: {domainData['Detail 3']}</li>
            <li>Detail 4: {domainData['Detail 4']}</li>
            <li>Detail 5: {domainData['Detail 5']}</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 My App. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: Arial, sans-serif;
        }
        header {
          background-color: #0070f3;
          color: white;
          width: 100%;
          text-align: center;
          padding: 1rem;
        }
        h1 {
          font-size: 1.5rem;
        }
        main {
          padding: 1rem;
          width: 100%;
        }
        section {
          margin-bottom: 2rem;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin: 0.5rem 0;
        }
        footer {
          background-color: #f5f5f5;
          width: 100%;
          text-align: center;
          padding: 1rem;
        }
        p {
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}
